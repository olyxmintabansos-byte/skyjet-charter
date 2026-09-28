'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navigation,
  Compass,
  Plane,
  Fuel,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAviation } from '@/context/AviationContext';

export default function CharterCalculatorPage() {
  const { fleet, activeQuote, calculateQuote, confirmBooking } = useAviation();

  const [origin, setOrigin] = useState<string>('KTEB');
  const [dest, setDest] = useState<string>('LFPB');
  const [selectedJet, setSelectedJet] = useState<string>(fleet[0].id);
  const [passengers, setPassengers] = useState<number>(6);
  const [bookedToast, setBookedToast] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateQuote(origin, dest, selectedJet, passengers);
  };

  const handleBook = () => {
    confirmBooking(activeQuote);
    setBookedToast(`CHARTER CONFIRMED FOR ${activeQuote.originName} → ${activeQuote.destinationName}! DISPATCH TELEMETRY ACTIVE.`);
    setTimeout(() => setBookedToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-zinc-100 pb-20 radar-grid font-mono">
      {/* Header */}
      <div className="border-b border-[#1b202c] bg-gradient-to-r from-[#0c0d10] via-[#141724] to-[#0a0b0e] px-4 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs mb-2">
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span>FLIGHT COST, FUEL & RANGE OPTIMIZATION ENGINE</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              CHARTER <span className="text-cyan-400 cyan-hud-glow">ESTIMATOR</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Calculate Jet A-1 fuel consumption, flight hours, FBO ramp handling fees, and direct luxury charter quotes.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-lg cursor-pointer"
            >
              <span>← FLEET SHOWCASE</span>
            </Link>
          </div>
        </div>
      </div>

      {bookedToast && (
        <div className="bg-emerald-950 border-b border-emerald-500 text-emerald-300 text-xs py-2.5 px-4 text-center sticky top-18 z-40 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{bookedToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Flight Input Parameters Form */}
          <div className="lg:col-span-5 aerodynamic-card rounded-xl p-6 space-y-5">
            <h2 className="text-base font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>ROUTE CONFIGURATION</span>
            </h2>

            <form onSubmit={handleCalculate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">ORIGIN AIRPORT (ICAO)</label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-white font-bold"
                  >
                    <option value="KTEB">KTEB • New York (Teterboro)</option>
                    <option value="LFPB">LFPB • Paris (Le Bourget)</option>
                    <option value="OMDB">OMDB • Dubai (International)</option>
                    <option value="LSGG">LSGG • Geneva (Cointrin)</option>
                    <option value="KOPF">KOPF • Miami (Opa-Locka)</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">DESTINATION (ICAO)</label>
                  <select
                    value={dest}
                    onChange={(e) => setDest(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-white font-bold"
                  >
                    <option value="LFPB">LFPB • Paris (Le Bourget)</option>
                    <option value="KTEB">KTEB • New York (Teterboro)</option>
                    <option value="OMDB">OMDB • Dubai (International)</option>
                    <option value="EGLF">EGLF • London (Farnborough)</option>
                    <option value="VHHH">VHHH • Hong Kong (Chek Lap Kok)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">SELECT AIRCRAFT FROM SQUADRON</label>
                <select
                  value={selectedJet}
                  onChange={(e) => setSelectedJet(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-white font-bold"
                >
                  {fleet.map((ac) => (
                    <option key={ac.id} value={ac.id}>
                      {ac.model} (${ac.hourlyRateUSD.toLocaleString()}/hr • Range: {ac.maxRangeNM} NM)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">PASSENGER MANIFEST COUNT: {passengers}</label>
                <input
                  type="range"
                  min="1"
                  max="19"
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold uppercase rounded-lg shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                RECALCULATE FLIGHT PARAMETERS
              </button>
            </form>
          </div>

          {/* Generated Flight Calculation Blueprint Card */}
          <div className="lg:col-span-7 aerodynamic-card rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <div>
                  <span className="text-[10px] text-cyan-400 uppercase tracking-widest block">
                    FLIGHT DISPATCH COMPUTATION
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    {activeQuote.originName} → {activeQuote.destinationName}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 uppercase block">ALL-IN CHARTER TOTAL</span>
                  <strong className="text-3xl font-extrabold text-cyan-400 block">
                    ${activeQuote.estimatedCostUSD.toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-6">
                <div className="bg-black/50 p-3 rounded-lg border border-zinc-800">
                  <span className="text-zinc-500 block">EST. FLIGHT TIME</span>
                  <strong className="text-lg text-white font-bold">{activeQuote.flightHours} Hours</strong>
                  <span className="text-[10px] text-cyan-400">Cruising FL450</span>
                </div>

                <div className="bg-black/50 p-3 rounded-lg border border-zinc-800">
                  <span className="text-zinc-500 block">DISTANCE</span>
                  <strong className="text-lg text-white font-bold">{activeQuote.distanceNM} NM</strong>
                  <span className="text-[10px] text-zinc-400">Great Circle Route</span>
                </div>

                <div className="bg-black/50 p-3 rounded-lg border border-zinc-800">
                  <span className="text-zinc-500 block">PASSENGERS</span>
                  <strong className="text-lg text-amber-400 font-bold">{activeQuote.passengerCount} VIPs</strong>
                  <span className="text-[10px] text-zinc-400">Full Luggage Bay</span>
                </div>

                <div className="bg-black/50 p-3 rounded-lg border border-zinc-800">
                  <span className="text-zinc-500 block">CATERING</span>
                  <strong className="text-xs text-emerald-400 font-bold block mt-1">Michelin Caviar</strong>
                  <span className="text-[10px] text-zinc-400">Dom Pérignon Bar</span>
                </div>
              </div>

              <div className="p-4 bg-black/40 rounded-lg border border-zinc-800 text-xs space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Base Airframe Charter Time:</span>
                  <strong className="text-white">${Math.round(activeQuote.flightHours * 14800).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>FBO Ramp & Custom Clearance:</span>
                  <strong className="text-white">$4,500</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>In-flight Bespoke Catering & Bar:</span>
                  <strong className="text-white">$3,200</strong>
                </div>
                <div className="flex justify-between text-zinc-400 border-t border-zinc-800 pt-2 font-bold">
                  <span>Subtotal All-Inclusive:</span>
                  <span className="text-cyan-400">${activeQuote.estimatedCostUSD.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-500">2-Hour Rapid Departure Guarantee</span>
              <button
                onClick={handleBook}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                CONFIRM INSTANT DISPATCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
