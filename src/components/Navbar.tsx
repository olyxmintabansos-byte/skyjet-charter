'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Plane,
  Navigation,
  Compass,
  Zap,
  Gauge,
  Tag,
  Radio,
  Clock
} from 'lucide-react';
import { useAviation } from '@/context/AviationContext';

export function Navbar() {
  const pathname = usePathname();
  const { fleet, emptyLegs } = useAviation();

  const navLinks = [
    { href: '/', label: 'FLEET & OVERVIEW', sub: 'MACH 0.90 SPECS' },
    { href: '/charter/', label: 'ROUTE CALCULATOR', sub: 'FUEL & ESTIMATOR' },
    { href: '/emptylegs/', label: 'EMPTY-LEGS VAULT', sub: 'FLASH 70% OFF' },
    { href: '/avionics/', label: 'AVIONICS RADAR', sub: 'FL450 TELEMETRY' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d10]/95 backdrop-blur-md border-b border-cyan-950/80">
      {/* Aerodynamic Cockpit Telemetry Bar */}
      <div className="bg-[#08090c] border-b border-[#1b202c] px-4 py-1 text-xs flex flex-wrap items-center justify-between text-zinc-400 font-mono">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-[11px] tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>GLOBAL DISPATCH COCKPIT // FLIGHT LEVEL 450 (45,000 FT)</span>
          </div>
          <span className="hidden sm:inline-block text-zinc-700">|</span>
          <span className="hidden sm:inline-block text-[11px] text-amber-400">
            FLEET STATUS: <strong className="text-white">4 AIRCRAFT ACTIVE • 100% DISPATCH RELIABILITY</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-0.5 rounded border border-[#232838]">
            <span className="text-zinc-500">MAX SPEED:</span>
            <span className="font-bold text-cyan-400">MACH 0.925</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-0.5 rounded border border-[#232838] text-amber-400">
            <span>EMPTY-LEGS:</span>
            <span className="font-bold">{emptyLegs.length} DEALS LIVE</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-[#141722] border border-cyan-500/40 flex items-center justify-center shadow-lg group-hover:border-cyan-400 transition-all">
              <Plane className="w-6 h-6 text-cyan-400 -rotate-45" />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2 font-mono">
                SKY<span className="text-cyan-400">JET</span>
                <span className="text-[10px] tracking-widest px-1.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded">
                  TITAN #42
                </span>
              </div>
              <div className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                AERODYNAMIC PRIVATE AVIATION CONSOLE
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 font-mono">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col px-3.5 py-1.5 rounded-lg transition-all border ${
                    isActive
                      ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/50 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border-transparent'
                  }`}
                >
                  <span className="text-xs font-bold tracking-wider">{item.label}</span>
                  <span className="text-[9px] text-zinc-500 tracking-tight">{item.sub}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 font-mono">
            <Link
              href="/charter/"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>REQUEST CHARTER</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
