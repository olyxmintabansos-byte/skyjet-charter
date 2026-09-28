'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Radio,
  Gauge,
  Compass,
  Wind,
  Navigation,
  Activity,
  Plane,
  Wifi,
  ShieldAlert,
  Flame,
  Clock,
  Layers,
  Sparkles,
  RefreshCw,
  Satellite,
  Volume2
} from 'lucide-react';
import { useAviation } from '@/context/AviationContext';

interface Waypoint {
  name: string;
  coords: string;
  passed: boolean;
  etaUTC: string;
  fl: string;
  speed: string;
}

const WAYPOINTS: Waypoint[] = [
  { name: 'KTEB', coords: '40.85°N / 74.06°W', passed: true, etaUTC: '19:30 UTC', fl: 'GND', speed: '0 KT' },
  { name: 'ALLEX', coords: '44.38°N / 67.55°W', passed: true, etaUTC: '20:45 UTC', fl: 'FL410', speed: 'M 0.88' },
  { name: 'DOGAL', coords: '53.00°N / 50.00°W', passed: true, etaUTC: '22:15 UTC', fl: 'FL450', speed: 'M 0.89' },
  { name: '54N040W', coords: '54.00°N / 40.00°W', passed: true, etaUTC: '23:10 UTC', fl: 'FL450', speed: 'M 0.89' },
  { name: '55N030W', coords: '55.00°N / 30.00°W', passed: false, etaUTC: '00:05 UTC', fl: 'FL450', speed: 'M 0.89' },
  { name: '56N020W', coords: '56.00°N / 20.00°W', passed: false, etaUTC: '01:00 UTC', fl: 'FL470', speed: 'M 0.90' },
  { name: 'MALOT', coords: '54.00°N / 15.00°W', passed: false, etaUTC: '01:45 UTC', fl: 'FL470', speed: 'M 0.90' },
  { name: 'EGLF', coords: '51.27°N / 0.77°W', passed: false, etaUTC: '02:30 UTC', fl: 'GND', speed: '140 KT' },
];

export default function AvionicsPage() {
  const { fleet } = useAviation();
  const [selectedJetTail, setSelectedJetTail] = useState<string>('9H-SKJ');
  const [radarDegree, setRadarDegree] = useState<number>(0);
  const [machNumber, setMachNumber] = useState<number>(0.89);
  const [altitudeFL, setAltitudeFL] = useState<number>(450);
  const [tcasAlertFilter, setTcasAlertFilter] = useState<boolean>(false);
  const [weatherRadarOverlay, setWeatherRadarOverlay] = useState<boolean>(true);

  // Rotating Radar sweep simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarDegree((prev) => (prev + 3) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const activeAircraft = fleet.find((f) => f.tailNumber === selectedJetTail) || fleet[1];

  return (
    <div className="min-h-screen bg-[#090b10] text-[#e2e8f0] pb-24 font-mono">
      {/* Avionics Top Tactical Ribbon */}
      <section className="bg-[#0e111a] border-b border-cyan-950/80 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold tracking-wider">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>TACTICAL AVIONICS RADAR // ADS-B LIVE TELEMETRY</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px]">
                ONLINE & SYNCED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              FLIGHT LEVEL 450 <span className="text-cyan-400">TELEMETRY</span>
            </h1>
          </div>

          {/* Jet Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">MONITOR TAIL:</span>
            <div className="flex items-center gap-1.5">
              {['9H-SKJ', 'N700SJ', 'HB-JEX', 'P4-SKY'].map((tail) => (
                <button
                  key={tail}
                  onClick={() => setSelectedJetTail(tail)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedJetTail === tail
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                      : 'bg-[#151926] text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {tail}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Tactical Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tactical Radar Display (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0d1017] border border-cyan-900/60 rounded-2xl p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Satellite className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase">PRIMARY SURVEILLANCE RADAR (PSR / ADS-B)</span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <button
                  onClick={() => setWeatherRadarOverlay(!weatherRadarOverlay)}
                  className={`px-2 py-0.5 rounded border transition-colors ${
                    weatherRadarOverlay
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                      : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                  }`}
                >
                  WX RADAR: {weatherRadarOverlay ? 'ON' : 'OFF'}
                </button>
                <span className="text-zinc-500">RANGE: 500 NM</span>
              </div>
            </div>

            {/* Radar Circular Scope */}
            <div className="relative w-full aspect-square max-h-[460px] mx-auto flex items-center justify-center">
              {/* Concentric Range Rings */}
              <div className="absolute inset-0 rounded-full border border-cyan-900/30" />
              <div className="absolute inset-[15%] rounded-full border border-cyan-900/40" />
              <div className="absolute inset-[30%] rounded-full border border-cyan-900/50" />
              <div className="absolute inset-[45%] rounded-full border border-cyan-900/60" />

              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-cyan-900/40" />
              <div className="absolute h-full w-[1px] bg-cyan-900/40" />

              {/* Rotating Sweep Beam */}
              <div
                className="absolute w-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-cyan-300 origin-left"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${radarDegree}deg)`,
                  boxShadow: '0 0 15px rgba(34, 211, 238, 0.4)',
                }}
              />

              {/* Weather Echo Layer */}
              {weatherRadarOverlay && (
                <div className="absolute top-[20%] right-[22%] w-36 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none border border-emerald-500/20 flex items-center justify-center">
                  <span className="text-[9px] text-emerald-400 opacity-60">LIGHT CIRRUS FL380</span>
                </div>
              )}

              {/* Aircraft Target Marker */}
              <div className="absolute top-[42%] left-[54%] flex flex-col items-center group cursor-pointer">
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center animate-ping absolute" />
                  <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center text-black shadow-lg">
                    <Plane className="w-3 h-3 -rotate-45" />
                  </div>
                </div>

                {/* Target Data Tag */}
                <div className="mt-2 bg-[#090b10]/90 border border-cyan-500/60 p-2 rounded-lg text-[10px] space-y-0.5 shadow-2xl backdrop-blur-md">
                  <div className="text-cyan-400 font-black">{selectedJetTail} // FL450</div>
                  <div className="text-white">MACH {machNumber} // 512 KT</div>
                  <div className="text-zinc-400">{activeAircraft.model}</div>
                </div>
              </div>

              {/* Scope Center Cross */}
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 z-10 shadow-lg shadow-cyan-400/50" />
            </div>

            {/* Scope Bottom Data Bar */}
            <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-zinc-900 text-center text-xs">
              <div className="bg-[#090c12] p-2 rounded-lg border border-zinc-900">
                <div className="text-[10px] text-zinc-500">HEADING (HDG)</div>
                <div className="font-bold text-white">078° TRUE</div>
              </div>
              <div className="bg-[#090c12] p-2 rounded-lg border border-zinc-900">
                <div className="text-[10px] text-zinc-500">GROUND SPEED</div>
                <div className="font-bold text-cyan-400">578 KNOTS</div>
              </div>
              <div className="bg-[#090c12] p-2 rounded-lg border border-zinc-900">
                <div className="text-[10px] text-zinc-500">WIND COMPONENT</div>
                <div className="font-bold text-emerald-400">+66 KT TAIL</div>
              </div>
              <div className="bg-[#090c12] p-2 rounded-lg border border-zinc-900">
                <div className="text-[10px] text-zinc-500">TRANSPONDER</div>
                <div className="font-bold text-amber-400">7724 ADS-B</div>
              </div>
            </div>
          </div>

          {/* Engine & Stratospheric HUD Telemetry (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Flight Telemetry Instruments */}
            <div className="bg-[#0d1017] border border-cyan-900/60 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white uppercase">DIGITAL COCKPIT TELEMETRY</span>
                </div>
                <span className="text-[10px] text-amber-400">RVSM COMPLIANT</span>
              </div>

              {/* Mach & Altitude Gauges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#121522] border border-zinc-800 p-3.5 rounded-xl">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                    <span>CRUISE MACH:</span>
                    <span className="text-cyan-400 font-bold">{machNumber}</span>
                  </div>
                  <div className="text-2xl font-black text-white">MACH {machNumber}</div>
                  <div className="text-[10px] text-zinc-500 mt-1">TRUE AIRSPEED: 512 KT</div>
                  <input
                    type="range"
                    min="0.80"
                    max="0.925"
                    step="0.005"
                    value={machNumber}
                    onChange={(e) => setMachNumber(parseFloat(e.target.value))}
                    className="w-full mt-2 accent-cyan-400"
                  />
                </div>

                <div className="bg-[#121522] border border-zinc-800 p-3.5 rounded-xl">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                    <span>ALTITUDE:</span>
                    <span className="text-amber-400 font-bold">FL{altitudeFL}</span>
                  </div>
                  <div className="text-2xl font-black text-white">{altitudeFL * 100} FT</div>
                  <div className="text-[10px] text-emerald-400 mt-1">CABIN ALT: 4,100 FT</div>
                  <input
                    type="range"
                    min="410"
                    max="510"
                    step="10"
                    value={altitudeFL}
                    onChange={(e) => setAltitudeFL(parseInt(e.target.value))}
                    className="w-full mt-2 accent-amber-400"
                  />
                </div>
              </div>

              {/* Dual Turbofan Engine Core Gauges */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>DUAL ROLLS-ROYCE PEARL 700 / GE PASSPORT ENGINES</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {/* Engine 1 */}
                  <div className="bg-[#090b10] border border-zinc-800/80 p-3 rounded-xl space-y-2">
                    <div className="text-[11px] font-bold text-cyan-400">ENGINE #1 (PORT)</div>
                    <div className="flex justify-between text-zinc-400 text-[11px]">
                      <span>N1 FAN:</span>
                      <strong className="text-white">98.2%</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400 text-[11px]">
                      <span>ITT TURBINE:</span>
                      <strong className="text-white">718°C</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400 text-[11px]">
                      <span>FUEL FLOW:</span>
                      <strong className="text-cyan-300">1,475 LBS/HR</strong>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full w-[98%]" />
                    </div>
                  </div>

                  {/* Engine 2 */}
                  <div className="bg-[#090b10] border border-zinc-800/80 p-3 rounded-xl space-y-2">
                    <div className="text-[11px] font-bold text-cyan-400">ENGINE #2 (STBD)</div>
                    <div className="flex justify-between text-zinc-400 text-[11px]">
                      <span>N1 FAN:</span>
                      <strong className="text-white">98.4%</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400 text-[11px]">
                      <span>ITT TURBINE:</span>
                      <strong className="text-white">722°C</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400 text-[11px]">
                      <span>FUEL FLOW:</span>
                      <strong className="text-cyan-300">1,475 LBS/HR</strong>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full w-[98.4%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SATCOM & In-Flight VIP Connectivity */}
              <div className="bg-[#0a0d14] border border-cyan-950 p-3 rounded-xl text-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Wifi className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-bold text-white text-[11px]">STARLINK HIGH-SPEED KA-BAND</div>
                    <div className="text-[10px] text-zinc-500">LOW EARTH ORBIT SATELLITE ARRAY</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-bold text-xs">148.6 MBPS</div>
                  <div className="text-[10px] text-zinc-400">18MS LATENCY</div>
                </div>
              </div>
            </div>

            {/* Live ATC CPDLC Logs Stream */}
            <div className="bg-[#0d1017] border border-cyan-900/60 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase">
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>OCEANIC CPDLC & ATC DATALINK</span>
                </div>
                <span className="text-[10px] text-zinc-500">DIRECT CPDLC LINK</span>
              </div>

              <div className="space-y-2 text-[11px] text-zinc-400 max-h-44 overflow-y-auto pr-1">
                <div className="bg-[#090b10] border border-zinc-900 p-2 rounded-lg">
                  <div className="text-cyan-400 text-[10px]">23:12:05 UTC // SHANWICK OCEANIC</div>
                  <p className="text-zinc-200 mt-0.5">
                    "SKYJET 9H-SKJ CLEARED ROUTE NAT ALFA FL450 CRUISE MACH DECIMAL EIGHT NINE CROSS 55N030W AT 0005 UTC"
                  </p>
                </div>
                <div className="bg-[#090b10] border border-zinc-900 p-2 rounded-lg">
                  <div className="text-emerald-400 text-[10px]">23:14:40 UTC // FMS DISPATCH</div>
                  <p className="text-zinc-200 mt-0.5">
                    "FUEL RESERVES REMAINING: 18,400 LBS. SUFFICIENT FOR 04:30 HRS BEYOND FARNBOROUGH ALTERNATE"
                  </p>
                </div>
                <div className="bg-[#090b10] border border-zinc-900 p-2 rounded-lg">
                  <div className="text-amber-400 text-[10px]">23:18:22 UTC // COCKPIT SYSTEM</div>
                  <p className="text-zinc-200 mt-0.5">
                    "TCAS-II SURVEILLANCE NOMINAL: ZERO CONFLICTING TRAFFIC IN TRANSOCEANIC STRATOSPHERE"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transatlantic Oceanic Waypoint Progression */}
        <section className="mt-8 bg-[#0d1017] border border-cyan-900/60 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-900">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>TRANSATLANTIC WAYPOINT CORRIDOR (KTEB → EGLF)</span>
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                North Atlantic Track (NAT-A) Waypoint Sequence with ETOPS-330 Oceanic Divert Options
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1 rounded-full">
              PROGRESS: 58% FLIGHT COMPLETED
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {WAYPOINTS.map((wp) => (
              <div
                key={wp.name}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  wp.passed
                    ? 'bg-[#10141f] border-cyan-500/40 text-zinc-300'
                    : 'bg-[#090b10] border-zinc-800/80 text-zinc-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-black text-sm ${wp.passed ? 'text-cyan-400' : 'text-zinc-400'}`}>
                    {wp.name}
                  </span>
                  {wp.passed ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-zinc-700" />
                  )}
                </div>
                <div className="text-[10px] text-zinc-400 truncate">{wp.coords}</div>
                <div className="mt-2 pt-2 border-t border-zinc-900/80 text-[10px] space-y-0.5">
                  <div className="flex justify-between">
                    <span>ETA:</span>
                    <strong className="text-white">{wp.etaUTC}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>LEVEL:</span>
                    <span className="text-amber-400 font-semibold">{wp.fl}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
