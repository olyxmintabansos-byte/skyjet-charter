'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plane,
  Gauge,
  Navigation,
  Compass,
  Zap,
  ArrowRight,
  ShieldCheck,
  Fuel,
  Users,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAviation } from '@/context/AviationContext';
import { Aircraft } from '@/types/aviation';

export default function FleetShowcasePage() {
  const { fleet, emptyLegs } = useAviation();
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft>(fleet[0]);

  return (
    <div className="min-h-screen bg-[#0c0d10] text-zinc-100 pb-20 radar-grid font-mono">
      {/* Aerodynamic Hero Section */}
      <div className="border-b border-[#1b202c] bg-gradient-to-r from-[#0c0d10] via-[#141724] to-[#0a0b0e] px-4 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>SUPERSONIC CRUISE // TRANSATLANTIC NON-STOP CERTIFIED</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              AERODYNAMIC <span className="text-cyan-400 cyan-hud-glow">GLOBAL FLEET</span>
            </h1>
            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
              Ultra-long-range executive aviation. Gulfstream G700 and Bombardier Global 7500 on instant 2-hour worldwide dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/charter/"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-xl shadow-cyan-500/20 cursor-pointer"
            >
              <span>INSTANT FLIGHT CALCULATOR →</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {/* Quick Fleet Telemetry Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aerodynamic-card rounded-xl p-5 border-l-4 border-l-cyan-400">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">MAX FLEET RANGE</span>
            <strong className="text-2xl font-extrabold text-white block mt-1">9,945 NM</strong>
            <span className="text-xs text-cyan-400">London to Singapore direct</span>
          </div>

          <div className="aerodynamic-card rounded-xl p-5 border-l-4 border-l-amber-400">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">CRUISE MACH RATING</span>
            <strong className="text-2xl font-extrabold text-amber-400 block mt-1">MACH 0.925</strong>
            <span className="text-xs text-zinc-400">Near-supersonic transit</span>
          </div>

          <div className="aerodynamic-card rounded-xl p-5 border-l-4 border-l-emerald-400">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">CABIN ALTITUDE</span>
            <strong className="text-2xl font-extrabold text-emerald-400 block mt-1">4,100 FT</strong>
            <span className="text-xs text-zinc-400">100% Fresh Air / Low Fatigue</span>
          </div>

          <div className="aerodynamic-card rounded-xl p-5 border-l-4 border-l-purple-400">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">DISPATCH RESPONSE</span>
            <strong className="text-2xl font-extrabold text-white block mt-1">&lt; 120 MIN</strong>
            <span className="text-xs text-zinc-400">Worldwide FBO ramp ready</span>
          </div>
        </div>

        {/* Master Aircraft Fleet Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <Plane className="w-5 h-5 text-cyan-400" />
              <span>ACTIVE EXECUTIVE CHARTER SQUADRON</span>
            </h2>
            <span className="text-xs text-zinc-400">{fleet.length} Aircraft In Fleet</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fleet.map((ac) => {
              const isSelected = selectedAircraft.id === ac.id;

              return (
                <div
                  key={ac.id}
                  onClick={() => setSelectedAircraft(ac)}
                  className={`aerodynamic-card rounded-xl p-6 flex flex-col justify-between cursor-pointer transition-all ${
                    isSelected ? 'border-cyan-400 bg-[#161a26] shadow-xl shadow-cyan-950/40' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-bold text-cyan-400 text-sm tracking-wider">{ac.tailNumber}</span>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded font-bold uppercase ${
                          ac.status === 'READY_AT_FBO'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                            : ac.status === 'AIRBORNE'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 animate-pulse'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {ac.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white tracking-tight">{ac.model}</h3>
                    <div className="text-xs text-zinc-400 mt-0.5">{ac.manufacturer} • {ac.category.replace('_', ' ')}</div>

                    <div className="grid grid-cols-3 gap-3 my-5 bg-black/40 p-3 rounded-lg border border-[#1b202c]">
                      <div>
                        <span className="text-[10px] text-zinc-500 block">MAX RANGE</span>
                        <strong className="text-base text-white font-bold">{ac.maxRangeNM.toLocaleString()} NM</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block">SPEED</span>
                        <strong className="text-base text-cyan-400 font-bold">Mach {ac.cruiseSpeedMach}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block">SEATS</span>
                        <strong className="text-base text-amber-400 font-bold">{ac.passengerCapacity} VIP</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>HOME BASE: <strong className="text-white">{ac.homeBaseICAO}</strong></span>
                      <span>RATE: <strong className="text-white font-bold">${ac.hourlyRateUSD.toLocaleString()}</strong> / hr</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500">Jet A-1 Burn: {ac.fuelBurnGPH} GPH</span>
                    <Link
                      href="/charter/"
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>QUOTE THIS JET</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Aircraft Deep Range & Cabin Telemetry */}
        <div className="aerodynamic-card rounded-xl p-6 border-l-4 border-l-cyan-400">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-6">
            <div>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest block">
                AIRCRAFT PERFORMANCE SPECIFICATION
              </span>
              <h2 className="text-2xl font-extrabold text-white">{selectedAircraft.model} ({selectedAircraft.tailNumber})</h2>
              <p className="text-xs text-zinc-400 mt-1">
                FAA Part 135 Certified • Ka-band Ultra High Speed Satellite Wi-Fi • Master Stateroom with En-Suite Shower
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/charter/"
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg"
              >
                PROCEED TO ROUTE ESTIMATOR
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-black/50 p-3.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 block">SERVICE CEILING</span>
              <strong className="text-base text-white font-bold block mt-1">51,000 FT</strong>
              <span className="text-[10px] text-emerald-400">Flies far above airline traffic</span>
            </div>

            <div className="bg-black/50 p-3.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 block">TAKEOFF DISTANCE</span>
              <strong className="text-base text-white font-bold block mt-1">5,900 FT</strong>
              <span className="text-[10px] text-zinc-400">Access to Aspen & St. Moritz runways</span>
            </div>

            <div className="bg-black/50 p-3.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 block">CABIN LIVING ZONES</span>
              <strong className="text-base text-amber-400 font-bold block mt-1">4 Distinct Zones</strong>
              <span className="text-[10px] text-zinc-400">Conference, Dining, Bedroom, Crew rest</span>
            </div>

            <div className="bg-black/50 p-3.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 block">EST. TRANSPORTER RANGE</span>
              <strong className="text-base text-cyan-400 font-bold block mt-1">
                {selectedAircraft.maxRangeNM.toLocaleString()} Nautical Miles
              </strong>
              <span className="text-[10px] text-zinc-400">Zero-fuel reserve buffer included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
