'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plane,
  Clock,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Wine,
  Car,
  Wifi,
  Search,
  Users,
  Check,
  Compass,
  ArrowRight,
  Flame,
  Radio,
  FileCheck2,
  X,
  CreditCard
} from 'lucide-react';
import { useAviation } from '@/context/AviationContext';
import { EmptyLegFlight, CharterQuoteRequest } from '@/types/aviation';

interface ExpandedEmptyLeg extends EmptyLegFlight {
  departureDate: string;
  hoursLeft: number;
  flightDuration: string;
  catering: string;
  groundTransfer: string;
  availableWifi: string;
}

const EXTENDED_EMPTY_LEGS: ExpandedEmptyLeg[] = [
  {
    id: 'el-1',
    tailNumber: 'N700SJ',
    aircraftModel: 'Gulfstream G700',
    originICAO: 'LFPB',
    originCity: 'Paris (Le Bourget)',
    destICAO: 'OMDB',
    destCity: 'Dubai (World Central)',
    departureWindow: 'Tomorrow, 14:00 UTC',
    departureDate: '29 Sep 2026',
    hoursLeft: 14,
    flightDuration: '6h 15m',
    regularPriceUSD: 89000,
    emptyLegPriceUSD: 24500,
    discountPct: 72,
    seatsAvailable: 14,
    catering: 'Grand Cru Dom Pérignon & Imperial Beluga Caviar',
    groundTransfer: 'Maybach S680 Direct Tarmac Chauffeur',
    availableWifi: 'Starlink High-Speed Ka-Band (150 Mbps)',
  },
  {
    id: 'el-2',
    tailNumber: '9H-SKJ',
    aircraftModel: 'Bombardier Global 7500',
    originICAO: 'KTEB',
    originCity: 'New York (Teterboro)',
    destICAO: 'EGLF',
    destCity: 'London (Farnborough)',
    departureWindow: '30 Sep 2026, 19:30 EST',
    departureDate: '30 Sep 2026',
    hoursLeft: 28,
    flightDuration: '6h 40m',
    regularPriceUSD: 112000,
    emptyLegPriceUSD: 36000,
    discountPct: 68,
    seatsAvailable: 16,
    catering: 'Wagyu A5 Medallions & Vintage Krug Champagne',
    groundTransfer: 'Rolls-Royce Ghost Airside Escort',
    availableWifi: 'Global Inmarsat Jet ConneX (50 Mbps)',
  },
  {
    id: 'el-3',
    tailNumber: 'HB-JEX',
    aircraftModel: 'Challenger 3500',
    originICAO: 'KOPF',
    originCity: 'Miami (Opa-Locka)',
    destICAO: 'KASE',
    destCity: 'Aspen (Pitkin County)',
    departureWindow: '01 Oct 2026, 09:00 EST',
    departureDate: '01 Oct 2026',
    hoursLeft: 42,
    flightDuration: '4h 10m',
    regularPriceUSD: 44000,
    emptyLegPriceUSD: 14200,
    discountPct: 67,
    seatsAvailable: 8,
    catering: 'Florida Stone Crab & Crystal Chilled Champagne',
    groundTransfer: 'Range Rover Sentinel Mountain Transfer',
    availableWifi: 'Gogo AVANCE L5 In-Flight Connectivity',
  },
  {
    id: 'el-4',
    tailNumber: 'N700SJ',
    aircraftModel: 'Gulfstream G700',
    originICAO: 'RJTT',
    originCity: 'Tokyo (Haneda VIP)',
    destICAO: 'WSSL',
    destCity: 'Singapore (Seletar)',
    departureWindow: '02 Oct 2026, 11:00 JST',
    departureDate: '02 Oct 2026',
    hoursLeft: 64,
    flightDuration: '6h 50m',
    regularPriceUSD: 95000,
    emptyLegPriceUSD: 28500,
    discountPct: 70,
    seatsAvailable: 14,
    catering: 'Omakase Sushi by Master Chef & Yamazaki 18',
    groundTransfer: 'Lexus LM350 VIP Lounge Chauffeur',
    availableWifi: 'Starlink High-Speed Ka-Band (150 Mbps)',
  },
  {
    id: 'el-5',
    tailNumber: 'HB-JEX',
    aircraftModel: 'Challenger 3500',
    originICAO: 'LSZH',
    originCity: 'Zurich (Kloten)',
    destICAO: 'LEIB',
    destCity: 'Ibiza (Es Codolar)',
    departureWindow: '02 Oct 2026, 16:30 CEST',
    departureDate: '02 Oct 2026',
    hoursLeft: 70,
    flightDuration: '2h 05m',
    regularPriceUSD: 26000,
    emptyLegPriceUSD: 7800,
    discountPct: 70,
    seatsAvailable: 8,
    catering: 'Mediterranean Tapas, Ibérico Ham & Rosé',
    groundTransfer: 'Mercedes-Maybach GLS600 Yacht Port Dropoff',
    availableWifi: 'Ka-Band SwiftBroadband Unlimited',
  },
  {
    id: 'el-6',
    tailNumber: 'P4-SKY',
    aircraftModel: 'Boeing 787-8 BBJ VIP Sovereign',
    originICAO: 'KVNY',
    originCity: 'Los Angeles (Van Nuys)',
    destICAO: 'PHNL',
    destCity: 'Honolulu (Daniel K. Inouye)',
    departureWindow: '03 Oct 2026, 08:00 PST',
    departureDate: '03 Oct 2026',
    hoursLeft: 86,
    flightDuration: '5h 30m',
    regularPriceUSD: 165000,
    emptyLegPriceUSD: 48000,
    discountPct: 71,
    seatsAvailable: 28,
    catering: 'Royal Presidential Suite 5-Course Banquet',
    groundTransfer: 'Cadillac Escalade V Armored Escort Convoy',
    availableWifi: 'Dual Satellite Ku/Ka Gigabit Array',
  },
];

export default function EmptyLegsPage() {
  const { confirmBooking } = useAviation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedFlight, setSelectedFlight] = useState<ExpandedEmptyLeg | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState<string | null>(null);

  // Form State
  const [passengerCount, setPassengerCount] = useState<number>(2);
  const [leadPassengerName, setLeadPassengerName] = useState<string>('Lord Sterling Vance');
  const [contactEmail, setContactEmail] = useState<string>('vance@sterling-sovereign.ch');
  const [addChauffeur, setAddChauffeur] = useState<boolean>(true);
  const [specialRequest, setSpecialRequest] = useState<string>('Diplomatic customs pre-clearance requested.');

  const filteredDeals = useMemo(() => {
    return EXTENDED_EMPTY_LEGS.filter((deal) => {
      const matchQuery =
        deal.originCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.destCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.originICAO.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.destICAO.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.aircraftModel.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === 'ALL') return matchQuery;
      if (selectedCategory === 'G700' && deal.aircraftModel.includes('Gulfstream')) return matchQuery;
      if (selectedCategory === 'GLOBAL' && deal.aircraftModel.includes('Global')) return matchQuery;
      if (selectedCategory === 'CHALLENGER' && deal.aircraftModel.includes('Challenger')) return matchQuery;
      if (selectedCategory === 'BBJ' && deal.aircraftModel.includes('Boeing')) return matchQuery;
      return matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleInstantReserve = () => {
    if (!selectedFlight) return;

    const pnrCode = `SKJ-${Math.floor(1000 + Math.random() * 9000)}-EL`;

    const quoteRecord: CharterQuoteRequest = {
      id: pnrCode,
      originICAO: selectedFlight.originICAO,
      originName: selectedFlight.originCity,
      destinationICAO: selectedFlight.destICAO,
      destinationName: selectedFlight.destCity,
      distanceNM: 3200,
      flightHours: parseFloat(selectedFlight.flightDuration.replace('h', '.').replace('m', '')),
      selectedAircraftId: selectedFlight.tailNumber,
      passengerCount: passengerCount,
      departureDate: `${selectedFlight.departureDate} (${selectedFlight.departureWindow})`,
      cateringTier: 'MICHELIN_CAVIAR_SPECIAL',
      estimatedCostUSD: selectedFlight.emptyLegPriceUSD + (addChauffeur ? 1200 : 0),
    };

    confirmBooking(quoteRecord);
    setBookedSuccess(pnrCode);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#e2e8f0] pb-24">
      {/* Aerodynamic Cockpit Header */}
      <section className="relative overflow-hidden border-b border-cyan-950/60 bg-gradient-to-b from-[#10141f] via-[#0d1017] to-[#0c0d10] py-14 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-12 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>FLASH REPOSITIONING VAULT // UP TO 72% CHARTER DISCOUNT</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono uppercase">
                EMPTY-LEGS <span className="text-cyan-400">MARKETPLACE</span>
              </h1>
              <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                Repositioning luxury flights returning to home bases without passengers. Book the entire private jet cabin at fractional wholesale rates with full 5-star FBO handling and VIP champagne service.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="grid grid-cols-3 gap-3 bg-[#131622]/90 border border-cyan-900/40 p-3 rounded-xl font-mono text-center">
              <div className="px-3 py-1 border-r border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase">ACTIVE DEALS</div>
                <div className="text-xl font-bold text-cyan-400">6 FLIGHTS</div>
              </div>
              <div className="px-3 py-1 border-r border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase">MAX SAVINGS</div>
                <div className="text-xl font-bold text-amber-400">-72% OFF</div>
              </div>
              <div className="px-3 py-1">
                <div className="text-[10px] text-zinc-500 uppercase">DEPARTURE</div>
                <div className="text-xl font-bold text-emerald-400">&lt; 72 HRS</div>
              </div>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-[#11141e] border border-cyan-900/50 p-2.5 rounded-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, airport code (LFPB, KTEB, Dubai, Aspen) or aircraft..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#090b10] border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {['ALL', 'G700', 'GLOBAL', 'CHALLENGER', 'BBJ'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-lg transition-all font-semibold ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                      : 'bg-[#181c2b] text-zinc-400 hover:text-white hover:bg-[#20263a]'
                  }`}
                >
                  {cat === 'ALL' ? 'ALL JETS' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Deals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 font-mono text-sm text-zinc-400">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>SHOWING <strong className="text-white">{filteredDeals.length}</strong> CONFIRMED REPOSITIONING FLIGHTS</span>
          </div>
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">ALL RATES INCLUDE LUXURY JET CATERING & LANDING FEES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-[#121520] border border-cyan-950/80 hover:border-cyan-500/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-cyan-500/10"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-zinc-900 bg-gradient-to-r from-[#141824] to-[#121520]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                      {deal.tailNumber}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{deal.aircraftModel}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    <Tag className="w-3 h-3" />
                    -{deal.discountPct}% OFF
                  </span>
                </div>

                {/* Route Vector */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-white font-mono">{deal.originICAO}</div>
                    <div className="text-xs text-zinc-400 truncate max-w-[120px]">{deal.originCity}</div>
                  </div>

                  <div className="flex-1 mx-3 flex flex-col items-center">
                    <div className="text-[10px] font-mono text-zinc-500 mb-1">{deal.flightDuration}</div>
                    <div className="w-full relative flex items-center">
                      <div className="w-full h-[1px] bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20" />
                      <Plane className="w-4 h-4 text-cyan-400 absolute left-1/2 -translate-x-1/2 -rotate-45 group-hover:translate-x-2 transition-transform" />
                    </div>
                    <div className="text-[9px] font-mono text-cyan-400 mt-1 uppercase">NON-STOP LUXURY</div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-white font-mono">{deal.destICAO}</div>
                    <div className="text-xs text-zinc-400 truncate max-w-[120px]">{deal.destCity}</div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3.5 text-xs text-zinc-300 font-mono">
                <div className="flex items-center justify-between text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>DEPARTURE:</span>
                  </div>
                  <span className="text-white font-semibold">{deal.departureWindow}</span>
                </div>

                <div className="flex items-center justify-between text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>FULL CABIN EXCLUSIVE:</span>
                  </div>
                  <span className="text-cyan-300 font-semibold">{deal.seatsAvailable} GUEST SEATS</span>
                </div>

                <div className="pt-2 border-t border-zinc-900/80 space-y-1.5 text-[11px] text-zinc-400">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Wine className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{deal.catering}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Car className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{deal.groundTransfer}</span>
                  </div>
                </div>
              </div>

              {/* Card Pricing & Action */}
              <div className="p-5 border-t border-zinc-900 bg-[#0e1018] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-500 line-through font-mono">
                    REGULAR: ${deal.regularPriceUSD.toLocaleString()}
                  </div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    ${deal.emptyLegPriceUSD.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono">ALL-INCLUSIVE CABIN TOTAL</div>
                </div>

                <button
                  onClick={() => setSelectedFlight(deal)}
                  className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center gap-1.5"
                >
                  <span>FLASH BOOK</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Drawer / Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121522] border border-cyan-500/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative font-mono text-zinc-200">
            <button
              onClick={() => {
                setSelectedFlight(null);
                setBookedSuccess(null);
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {bookedSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase">EMPTY-LEG CONFIRMED!</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Your private jet repositioning flight itinerary is locked with VIP operations dispatch. Electronic PNR and FBO tarmac access pass issued.
                </p>

                <div className="bg-[#090b10] border border-zinc-800 p-4 rounded-xl text-left text-xs space-y-2 max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">DISPATCH PNR:</span>
                    <strong className="text-cyan-400">{bookedSuccess}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">AIRCRAFT:</span>
                    <strong className="text-white">{selectedFlight.aircraftModel} ({selectedFlight.tailNumber})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">ROUTE:</span>
                    <strong className="text-white">{selectedFlight.originICAO} → {selectedFlight.destICAO}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">DEPARTURE:</span>
                    <strong className="text-amber-400">{selectedFlight.departureWindow}</strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-zinc-800">
                    <span className="text-zinc-500">TOTAL CHARTER:</span>
                    <strong className="text-emerald-400 text-sm font-black">
                      ${(selectedFlight.emptyLegPriceUSD + (addChauffeur ? 1200 : 0)).toLocaleString()} USD
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-4">
                  <Link
                    href="/avionics/"
                    className="px-5 py-2.5 bg-cyan-500 text-black font-bold text-xs rounded-xl shadow-lg hover:bg-cyan-400 transition-all flex items-center gap-2"
                  >
                    <Radio className="w-4 h-4" />
                    <span>TRACK ON AVIONICS RADAR</span>
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedFlight(null);
                      setBookedSuccess(null);
                    }}
                    className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Plane className="w-5 h-5 -rotate-45" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">RESERVE EMPTY-LEG CHARTER</h3>
                    <p className="text-xs text-zinc-400">
                      {selectedFlight.originCity} ({selectedFlight.originICAO}) → {selectedFlight.destCity} ({selectedFlight.destICAO})
                    </p>
                  </div>
                </div>

                <div className="bg-[#090b10] border border-cyan-950/80 p-3.5 rounded-xl text-xs space-y-1.5">
                  <div className="flex justify-between text-zinc-400">
                    <span>Aircraft Tail & Model:</span>
                    <strong className="text-white">{selectedFlight.tailNumber} // {selectedFlight.aircraftModel}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Departure Time Window:</span>
                    <strong className="text-amber-400">{selectedFlight.departureWindow}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Standard Charter Price:</span>
                    <span className="line-through text-zinc-500">${selectedFlight.regularPriceUSD.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between text-zinc-200 pt-1.5 border-t border-zinc-800 font-bold">
                    <span>Flash Empty-Leg Rate:</span>
                    <strong className="text-emerald-400 text-base font-black">
                      ${selectedFlight.emptyLegPriceUSD.toLocaleString()} USD (-{selectedFlight.discountPct}%)
                    </strong>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">Lead Passenger Full Legal Name</label>
                    <input
                      type="text"
                      value={leadPassengerName}
                      onChange={(e) => setLeadPassengerName(e.target.value)}
                      className="w-full bg-[#0a0c12] border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 mb-1">Contact Email / Diplomatic Agent</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-[#0a0c12] border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Total Passengers (Max {selectedFlight.seatsAvailable})</label>
                      <input
                        type="number"
                        min={1}
                        max={selectedFlight.seatsAvailable}
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(parseInt(e.target.value) || 1)}
                        className="w-full bg-[#0a0c12] border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                      <input
                        type="checkbox"
                        checked={addChauffeur}
                        onChange={(e) => setAddChauffeur(e.target.checked)}
                        className="rounded border-zinc-700 bg-zinc-900 text-cyan-500 focus:ring-0"
                      />
                      <span>Include Airside Tarmac Limousine Chauffeur (+$1,200)</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedFlight(null)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInstantReserve}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>CONFIRM & LOCK EMPTY-LEG</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
