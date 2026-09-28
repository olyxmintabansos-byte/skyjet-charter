'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Aircraft,
  CharterQuoteRequest,
  EmptyLegFlight,
  AviationContextType
} from '@/types/aviation';

const INITIAL_FLEET: Aircraft[] = [
  {
    id: 'g700-01',
    tailNumber: 'N700SJ',
    model: 'Gulfstream G700',
    manufacturer: 'Gulfstream Aerospace',
    category: 'ULTRA_LONG_RANGE',
    passengerCapacity: 19,
    maxRangeNM: 7750,
    cruiseSpeedMach: 0.90,
    hourlyRateUSD: 14800,
    homeBaseICAO: 'KTEB (Teterboro / NYC)',
    status: 'READY_AT_FBO',
    fuelBurnGPH: 420,
  },
  {
    id: 'global7500-02',
    tailNumber: '9H-SKJ',
    model: 'Bombardier Global 7500',
    manufacturer: 'Bombardier Aviation',
    category: 'ULTRA_LONG_RANGE',
    passengerCapacity: 16,
    maxRangeNM: 7700,
    cruiseSpeedMach: 0.89,
    hourlyRateUSD: 15200,
    homeBaseICAO: 'LFPB (Paris Le Bourget)',
    status: 'AIRBORNE',
    fuelBurnGPH: 440,
  },
  {
    id: 'challenger350-03',
    tailNumber: 'HB-JEX',
    model: 'Challenger 3500',
    manufacturer: 'Bombardier Aviation',
    category: 'SUPER_MIDSIZE',
    passengerCapacity: 10,
    maxRangeNM: 3400,
    cruiseSpeedMach: 0.83,
    hourlyRateUSD: 8500,
    homeBaseICAO: 'LSGG (Geneva Cointrin)',
    status: 'READY_AT_FBO',
    fuelBurnGPH: 260,
  },
  {
    id: 'bbj-787-04',
    tailNumber: 'P4-SKY',
    model: 'Boeing 787-8 BBJ VIP Sovereign',
    manufacturer: 'Boeing Business Jets',
    category: 'VIP_AIRLINER',
    passengerCapacity: 30,
    maxRangeNM: 9945,
    cruiseSpeedMach: 0.85,
    hourlyRateUSD: 28500,
    homeBaseICAO: 'OMDB (Dubai International)',
    status: 'READY_AT_FBO',
    fuelBurnGPH: 1250,
  },
];

const INITIAL_EMPTY_LEGS: EmptyLegFlight[] = [
  {
    id: 'el-1',
    tailNumber: 'N700SJ',
    aircraftModel: 'Gulfstream G700',
    originICAO: 'LFPB',
    originCity: 'Paris (Le Bourget)',
    destICAO: 'OMDB',
    destCity: 'Dubai (World Central)',
    departureWindow: 'Tomorrow, 14:00 UTC',
    regularPriceUSD: 89000,
    emptyLegPriceUSD: 24500,
    discountPct: 72,
    seatsAvailable: 14,
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
    regularPriceUSD: 112000,
    emptyLegPriceUSD: 36000,
    discountPct: 68,
    seatsAvailable: 16,
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
    regularPriceUSD: 44000,
    emptyLegPriceUSD: 14200,
    discountPct: 67,
    seatsAvailable: 8,
  },
];

const DEFAULT_QUOTE: CharterQuoteRequest = {
  id: 'quote-sample',
  originICAO: 'KTEB',
  originName: 'New York (Teterboro)',
  destinationICAO: 'LFPB',
  destinationName: 'Paris (Le Bourget)',
  distanceNM: 3150,
  flightHours: 6.8,
  selectedAircraftId: 'g700-01',
  passengerCount: 8,
  departureDate: 'Tomorrow 10:00 EST',
  cateringTier: 'MICHELIN_CAVIAR_SPECIAL',
  estimatedCostUSD: 104640,
};

const LOCAL_STORAGE_KEY = 'skyjet_charter_state_v1';

const AviationContext = createContext<AviationContextType | undefined>(undefined);

export function AviationProvider({ children }: { children: React.ReactNode }) {
  const [fleet] = useState<Aircraft[]>(INITIAL_FLEET);
  const [emptyLegs] = useState<EmptyLegFlight[]>(INITIAL_EMPTY_LEGS);
  const [activeQuote, setActiveQuote] = useState<CharterQuoteRequest>(DEFAULT_QUOTE);
  const [bookedFlights, setBookedFlights] = useState<CharterQuoteRequest[]>([]);

  // Load persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.bookedFlights) setBookedFlights(parsed.bookedFlights);
        if (parsed.activeQuote) setActiveQuote(parsed.activeQuote);
      }
    } catch {}
  }, []);

  // Save persistence
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ bookedFlights, activeQuote }));
    } catch {}
  }, [bookedFlights, activeQuote]);

  const calculateQuote = (origin: string, destination: string, aircraftId: string, passengers: number) => {
    const ac = fleet.find((f) => f.id === aircraftId) || fleet[0];
    const estDistanceNM = 3200; // Standard Transatlantic approx
    const speedKts = ac.cruiseSpeedMach * 575; // Approx True Airspeed
    const flightHours = parseFloat((estDistanceNM / speedKts).toFixed(1));
    const baseCharterCost = flightHours * ac.hourlyRateUSD;
    const fboHandlingFees = 4500;
    const cateringFee = 3200;
    const estimatedCostUSD = Math.round(baseCharterCost + fboHandlingFees + cateringFee);

    setActiveQuote({
      id: `quote-${Date.now()}`,
      originICAO: origin,
      originName: origin === 'KTEB' ? 'New York (Teterboro)' : origin,
      destinationICAO: destination,
      destinationName: destination === 'LFPB' ? 'Paris (Le Bourget)' : destination,
      distanceNM: estDistanceNM,
      flightHours,
      selectedAircraftId: aircraftId,
      passengerCount: passengers,
      departureDate: 'On Demand 24/7',
      cateringTier: 'MICHELIN_CAVIAR_SPECIAL',
      estimatedCostUSD,
    });
  };

  const confirmBooking = (quote: CharterQuoteRequest) => {
    setBookedFlights((prev) => [quote, ...prev]);
  };

  return (
    <AviationContext.Provider
      value={{
        fleet,
        emptyLegs,
        activeQuote,
        calculateQuote,
        confirmBooking,
        bookedFlights,
      }}
    >
      {children}
    </AviationContext.Provider>
  );
}

export function useAviation() {
  const context = useContext(AviationContext);
  if (!context) throw new Error('useAviation must be used within an AviationProvider');
  return context;
}
