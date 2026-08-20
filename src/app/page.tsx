'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Headphones, 
  Play, 
  ChevronRight, 
  Home, 
  Compass, 
  Trophy, 
  BarChart3, 
  User,
  Sparkles,
  LayoutGrid,
  Activity,
  Award,
  Target
} from 'lucide-react';

export default function FanAtlasApp() {
  // Navigation active tab: 'home' | 'games' | 'predict' | 'leaderboard' | 'profile'
  const [activeTab, setActiveTab] = useState<'home' | 'games' | 'predict' | 'leaderboard' | 'profile'>('games');

  // Home state
  const [selectedSportHome, setSelectedSportHome] = useState<string>('football');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Games page sport filter
  const [selectedSportGames, setSelectedSportGames] = useState<string>('football');

  return (
    <div className="w-full max-w-[430px] min-h-screen bg-[#060911] text-white flex flex-col relative pb-24 shadow-2xl selection:bg-purple-600 selection:text-white font-sans mx-auto">
      {/* 1. Global Header (Common across screens) */}
      <header className="flex items-center justify-between px-5 pt-5 pb-3 select-none">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center space-x-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] p-[1.5px] shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center">
            <div className="w-full h-full bg-[#070A12] rounded-[6.5px] flex items-center justify-center">
              {/* Stylized 'F' */}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current"
                style={{ stroke: 'url(#fGrad)' }}
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <defs>
                  <linearGradient id="fGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                </defs>
                <path d="M5 4h14M5 11h10M5 4v16" />
              </svg>
            </div>
          </div>
          <span className="text-[19px] font-black tracking-[0.16em] text-white">
            FANATLAS
          </span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-3.5">
          {/* Notification Bell */}
          <div className="relative p-1.5 text-gray-300">
            <Bell className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full ring-2 ring-[#060911]" />
          </div>

          {/* User Avatar */}
          <div className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-400 shadow-[0_0_12px_rgba(139,92,246,0.35)]">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#060911] bg-[#161D2E]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#060911] rounded-full" />
          </div>
        </div>
      </header>

      {/* ===================== VIEW 1: GAMES PAGE (NEW FIGMA DESIGN) ===================== */}
      {activeTab === 'games' && (
        <div className="flex flex-col space-y-4 select-none">
          {/* Title Header: [1] GAMES + Subtitle */}
          <section className="px-5 pt-1">
            <div className="flex items-start space-x-3">
              {/* Purple 1 Badge */}
              <div className="w-6 h-6 rounded-lg bg-[#5330E6] flex items-center justify-center text-white text-[12px] font-black shrink-0 mt-0.5 shadow-[0_0_10px_rgba(83,48,230,0.5)]">
                1
              </div>
              <div>
                <h1 className="text-[17px] font-black text-white tracking-wide uppercase">
                  GAMES
                </h1>
                <p className="text-[11px] text-gray-400 font-medium">
                  All live & upcoming matches
                </p>
              </div>
            </div>
          </section>

          {/* Sport Filter Chips (All, ⚽ Football, 🏀 Basketball, 田 Other) */}
          <section className="px-5">
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
              {/* All */}
              <button
                onClick={() => setSelectedSportGames('all')}
                className={`px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all ${
                  selectedSportGames === 'all'
                    ? 'bg-[#5533EB] border-indigo-400/60 shadow-[0_0_15px_rgba(85,51,235,0.4)] text-white'
                    : 'bg-[#0E1424] border-[#1A243A] text-gray-300'
                }`}
              >
                All
              </button>

              {/* ⚽ Football (Active Purple) */}
              <button
                onClick={() => setSelectedSportGames('football')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all ${
                  selectedSportGames === 'football'
                    ? 'bg-[#5533EB] border-indigo-400/60 shadow-[0_0_15px_rgba(85,51,235,0.4)] text-white'
                    : 'bg-[#0E1424] border-[#1A243A] text-gray-300'
                }`}
              >
                <span className="text-[14px]">⚽</span>
                <span>Football</span>
              </button>

              {/* 🏀 Basketball */}
              <button
                onClick={() => setSelectedSportGames('basketball')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all ${
                  selectedSportGames === 'basketball'
                    ? 'bg-[#5533EB] border-indigo-400/60 shadow-[0_0_15px_rgba(85,51,235,0.4)] text-white'
                    : 'bg-[#0E1424] border-[#1A243A] text-gray-300'
                }`}
              >
                <span className="text-[14px]">🏀</span>
                <span>Basketball</span>
              </button>

              {/* 田 Other */}
              <button
                onClick={() => setSelectedSportGames('other')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all ${
                  selectedSportGames === 'other'
                    ? 'bg-[#5533EB] border-indigo-400/60 shadow-[0_0_15px_rgba(85,51,235,0.4)] text-white'
                    : 'bg-[#0E1424] border-[#1A243A] text-gray-300'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-gray-400" />
                <span>Other</span>
              </button>
            </div>
          </section>

          {/* LIVE NOW Header + ECG Pulse Icon */}
          <section className="px-5 pt-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[13px] font-extrabold tracking-wider text-emerald-400 uppercase">
                LIVE NOW
              </h2>
              {/* Green ECG pulse graph */}
              <div className="text-emerald-400">
                <svg className="w-5 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h4l3-7 4 14 3-7h6" />
                </svg>
              </div>
            </div>

            {/* Featured Match Card (Liverpool vs Man City) */}
            <div className="w-full bg-[#0D1322] border border-[#1B2640] rounded-3xl p-4 shadow-xl flex flex-col space-y-3 relative overflow-hidden">
              {/* Card Top: League + LIVE pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-[11px] text-gray-400 font-medium">
                  <span className="text-[13px]">⚽</span>
                  <span>Premier League</span>
                </div>

                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E11D48] text-white text-[9px] font-bold tracking-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-1" />
                  LIVE
                </span>
              </div>

              {/* Match Teams & Score */}
              <div className="flex items-center justify-between px-2 pt-1 pb-1">
                {/* Home Team (LIV) */}
                <div className="flex flex-col items-center w-16">
                  <div className="w-12 h-12 rounded-full bg-[#181F33] p-1.5 flex items-center justify-center border border-white/5 shadow-md mb-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"
                      alt="Liverpool"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-[12px] font-extrabold text-gray-200 tracking-wider">
                    LIV
                  </span>
                </div>

                {/* Center Score & Glowing Purple Time */}
                <div className="flex flex-col items-center">
                  <div className="text-[26px] font-black text-white tracking-widest leading-none mb-1">
                    2 - 1
                  </div>
                  <span className="text-[12px] font-extrabold text-[#9D54FF] font-mono tracking-wider">
                    78:24
                  </span>
                </div>

                {/* Away Team (MCI) */}
                <div className="flex flex-col items-center w-16">
                  <div className="w-12 h-12 rounded-full bg-[#181F33] p-1.5 flex items-center justify-center border border-white/5 shadow-md mb-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"
                      alt="Man City"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-[12px] font-extrabold text-gray-200 tracking-wider">
                    MCI
                  </span>
                </div>
              </div>

              {/* AI Audio Commentary Sub-Banner */}
              <div className="pt-2 border-t border-white/[0.06] flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-purple-400">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </span>
                    <span className="text-[12px] font-bold text-gray-200">
                      AI Audio Commentary
                    </span>
                  </div>

                  {/* AI Badge (Circle Pill) */}
                  <span className="w-6 h-6 rounded-full border border-purple-500/60 bg-purple-950/30 text-purple-300 text-[10px] font-bold flex items-center justify-center">
                    AI
                  </span>
                </div>

                {/* Glowing Purple/Blue Waveform Visualizer & Play Button */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-[2.5px] flex-1 mr-3 h-6 overflow-hidden">
                    {[
                      20, 45, 70, 40, 85, 60, 95, 75, 40, 90, 60, 100, 80, 50, 90, 65, 45, 80,
                      55, 95, 70, 85, 40, 75, 50, 90, 65, 100, 80, 45, 70, 35, 60, 25,
                    ].map((h, i) => (
                      <span
                        key={i}
                        className="w-[2px] rounded-full bg-gradient-to-t from-[#4F46E5] via-[#818CF8] to-[#C084FC]"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>

                  {/* Circular Play Button */}
                  <div className="w-8 h-8 rounded-full bg-transparent border border-purple-500 text-purple-400 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.35)]">
                    <Play className="w-3.5 h-3.5 fill-purple-400 text-purple-400 ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* UPCOMING MATCHES Section */}
          <section className="px-5 pt-1 space-y-2.5">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-[12px] font-extrabold tracking-wider text-[#A855F7] uppercase">
                UPCOMING MATCHES
              </h2>
              <span className="text-[12px] font-semibold text-purple-400 cursor-pointer">
                See all
              </span>
            </div>

            {/* Match 1: Arsenal vs Chelsea */}
            <div className="w-full bg-[#0D1322] border border-[#1A243A] rounded-2xl p-3.5 shadow-md flex flex-col space-y-2">
              <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                <span>Today • 8:00 PM</span>
                <span>Premier League</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#161D2E] p-1 flex items-center justify-center border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" alt="Arsenal" className="w-5 h-5 object-contain" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-100">
                    Arsenal
                  </span>
                </div>

                <span className="text-[11px] font-bold text-gray-500">vs</span>

                <div className="flex items-center space-x-2.5">
                  <span className="text-[13px] font-bold text-gray-100">
                    Chelsea
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#161D2E] p-1 flex items-center justify-center border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" alt="Chelsea" className="w-5 h-5 object-contain" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Match 2: Real Madrid vs Barcelona */}
            <div className="w-full bg-[#0D1322] border border-[#1A243A] rounded-2xl p-3.5 shadow-md flex flex-col space-y-2">
              <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                <span>Today • 10:15 PM</span>
                <span>La Liga</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#161D2E] p-1 flex items-center justify-center border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" alt="Real Madrid" className="w-5 h-5 object-contain" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-100">
                    Real Madrid
                  </span>
                </div>

                <span className="text-[11px] font-bold text-gray-500">vs</span>

                <div className="flex items-center space-x-2.5">
                  <span className="text-[13px] font-bold text-gray-100">
                    Barcelona
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#161D2E] p-1 flex items-center justify-center border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" alt="Barcelona" className="w-5 h-5 object-contain" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Match 3: AC Milan vs Inter Milan (with PREDICT THIS MATCH chips) */}
            <div className="w-full bg-[#0D1322] border border-[#1A243A] rounded-2xl p-3.5 shadow-md flex flex-col space-y-3">
              <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                <span>Tomorrow • 6:45 PM</span>
                <span>Serie A</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#161D2E] p-1 flex items-center justify-center border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" alt="AC Milan" className="w-5 h-5 object-contain" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-100">
                    AC Milan
                  </span>
                </div>

                <span className="text-[11px] font-bold text-gray-500">vs</span>

                <div className="flex items-center space-x-2.5">
                  <span className="text-[13px] font-bold text-gray-100">
                    Inter Milan
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#161D2E] p-1 flex items-center justify-center border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" alt="Inter Milan" className="w-5 h-5 object-contain" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* PREDICT THIS MATCH Sub-Section */}
              <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase tracking-wider block">
                  PREDICT THIS MATCH
                </span>

                <div className="grid grid-cols-4 gap-1.5">
                  {/* 1. Match Result */}
                  <div className="bg-[#121828] border border-[#1E2840] rounded-xl p-1.5 text-center flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-gray-300 leading-tight">Match Result</span>
                    <span className="text-[8px] text-purple-400 font-medium">Predict</span>
                  </div>

                  {/* 2. Correct Score */}
                  <div className="bg-[#121828] border border-[#1E2840] rounded-xl p-1.5 text-center flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-gray-300 leading-tight">Correct Score</span>
                    <span className="text-[8px] text-purple-400 font-medium">Predict</span>
                  </div>

                  {/* 3. First Scorer */}
                  <div className="bg-[#121828] border border-[#1E2840] rounded-xl p-1.5 text-center flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-gray-300 leading-tight">First Scorer</span>
                    <span className="text-[8px] text-purple-400 font-medium">Predict</span>
                  </div>

                  {/* 4. Total Goals */}
                  <div className="bg-[#121828] border border-[#1E2840] rounded-xl p-1.5 text-center flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-gray-300 leading-tight">Total Goals</span>
                    <span className="text-[8px] text-purple-400 font-medium">Predict</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ===================== VIEW 2: HOME PAGE (PREVIOUS FIGMA DESIGN) ===================== */}
      {activeTab === 'home' && (
        <div className="flex flex-col space-y-1 select-none">
          {/* Search Bar */}
          <section className="px-5 py-2">
            <div className="flex items-center w-full bg-[#0F1422] border border-[#1B2338] rounded-2xl px-3.5 py-2.5 shadow-inner">
              <Search className="w-4 h-4 text-gray-400 shrink-0 mr-2.5 stroke-[2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teams, leagues, players..."
                className="w-full bg-transparent text-[13px] text-gray-200 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </section>

          {/* MY SPORTS */}
          <section className="px-5 py-2.5 select-none">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-[12px] font-bold tracking-wider text-gray-400 uppercase">
                MY SPORTS
              </h2>
              <span className="text-[12px] font-semibold text-purple-400 cursor-pointer">
                Edit
              </span>
            </div>

            <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setSelectedSportHome('football')}
                className={`flex flex-col items-center justify-center min-w-[76px] h-[70px] rounded-2xl p-2 transition-all border ${
                  selectedSportHome === 'football'
                    ? 'bg-[#5533EB] border-indigo-400/60 shadow-[0_0_20px_rgba(85,51,235,0.45)] text-white'
                    : 'bg-[#0E1424] border-[#1A2338] text-gray-300'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center mb-0.5">
                  <span className="text-[17px] leading-none">⚽</span>
                </div>
                <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
                  Football
                </span>
              </button>

              <button
                onClick={() => setSelectedSportHome('basketball')}
                className={`flex flex-col items-center justify-center min-w-[76px] h-[70px] rounded-2xl p-2 transition-all border ${
                  selectedSportHome === 'basketball'
                    ? 'bg-[#5533EB] border-indigo-400/60 shadow-[0_0_20px_rgba(85,51,235,0.45)] text-white'
                    : 'bg-[#0E1424] border-[#1A2338] text-gray-300'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center mb-0.5">
                  <span className="text-[17px] leading-none">🏀</span>
                </div>
                <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
                  Basketball
                </span>
              </button>

              <button
                onClick={() => setSelectedSportHome('f1')}
                className={`flex flex-col items-center justify-center min-w-[76px] h-[70px] rounded-2xl p-2 transition-all border ${
                  selectedSportHome === 'f1'
                    ? 'bg-[#5533EB] border-indigo-400/60 shadow-[0_0_20px_rgba(85,51,235,0.45)] text-white'
                    : 'bg-[#0E1424] border-[#1A2338] text-gray-300'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center mb-0.5">
                  <span className="text-[13px] font-black text-red-500 italic tracking-tighter">F1</span>
                </div>
                <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
                  Formula 1
                </span>
              </button>

              <button
                onClick={() => setSelectedSportHome('cricket')}
                className={`flex flex-col items-center justify-center min-w-[76px] h-[70px] rounded-2xl p-2 transition-all border ${
                  selectedSportHome === 'cricket'
                    ? 'bg-[#5533EB] border-indigo-400/60 shadow-[0_0_20px_rgba(85,51,235,0.45)] text-white'
                    : 'bg-[#0E1424] border-[#1A2338] text-gray-300'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center mb-0.5">
                  <span className="text-[17px] leading-none">🏏</span>
                </div>
                <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
                  Cricket
                </span>
              </button>

              <button
                onClick={() => setSelectedSportHome('more')}
                className={`flex flex-col items-center justify-center min-w-[70px] h-[70px] rounded-2xl p-2 transition-all border ${
                  selectedSportHome === 'more'
                    ? 'bg-[#5533EB] border-indigo-400/60 shadow-[0_0_20px_rgba(85,51,235,0.45)] text-white'
                    : 'bg-[#0E1424] border-[#1A2338] text-gray-400'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center text-[15px] font-bold text-purple-400 mb-0.5">
                  +
                </div>
                <span className="text-[11px] font-medium whitespace-nowrap">
                  More
                </span>
              </button>
            </div>
          </section>

          {/* LIVE NOW (37) */}
          <section className="px-5 py-2.5 select-none">
            <div className="flex items-center space-x-2 mb-2.5">
              <h2 className="text-[13px] font-extrabold tracking-wider text-emerald-400 uppercase">
                LIVE NOW
              </h2>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold rounded-full">
                37
              </span>
            </div>

            <div className="flex items-stretch space-x-3 overflow-x-auto no-scrollbar pb-1.5">
              {/* Liverpool vs Arsenal */}
              <div className="flex-shrink-0 w-[138px] bg-[#0E1424] border border-[#1A243A] rounded-2xl p-3 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-end w-full mb-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#E11D48] text-white text-[9px] font-bold tracking-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mr-1" />
                    LIVE
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 my-1">
                  <div className="w-7 h-7 rounded-full bg-red-950/30 border border-red-500/30 p-1 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" alt="Liverpool" className="w-5 h-5 object-contain" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-500">vs</span>
                  <div className="w-7 h-7 rounded-full bg-red-950/30 border border-red-500/30 p-1 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" alt="Arsenal" className="w-5 h-5 object-contain" />
                  </div>
                </div>
                <div className="text-center my-0.5">
                  <div className="text-[15px] font-black text-white tracking-wider">2 - 1</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">Liverpool vs Arsenal</div>
                </div>
                <div className="text-center mt-1">
                  <span className="text-[10px] font-bold text-emerald-400">78&apos;</span>
                </div>
              </div>

              {/* Celtics vs Mavericks */}
              <div className="flex-shrink-0 w-[138px] bg-[#0E1424] border border-[#1A243A] rounded-2xl p-3 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-end w-full mb-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#E11D48] text-white text-[9px] font-bold tracking-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mr-1" />
                    LIVE
                  </span>
                </div>
                <div className="flex items-center justify-center my-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/40 border border-blue-500/30 p-1 flex items-center justify-center">
                    <span className="text-[11px] font-black text-blue-400 tracking-wider">NBA</span>
                  </div>
                </div>
                <div className="text-center my-0.5">
                  <div className="text-[14px] font-black text-white tracking-wide">112 - 108</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">Celtics vs Mavericks</div>
                </div>
                <div className="text-center mt-1">
                  <span className="text-[10px] font-bold text-emerald-400">4th 2:45</span>
                </div>
              </div>

              {/* Monaco GP */}
              <div className="flex-shrink-0 w-[138px] bg-[#0E1424] border border-[#1A243A] rounded-2xl p-3 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-end w-full mb-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#E11D48] text-white text-[9px] font-bold tracking-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mr-1" />
                    LIVE
                  </span>
                </div>
                <div className="flex items-center justify-center my-1">
                  <div className="w-10 h-7 rounded-lg bg-red-950/40 border border-red-500/30 p-1 flex items-center justify-center">
                    <span className="text-[13px] font-black italic text-red-500 tracking-tighter">F1</span>
                  </div>
                </div>
                <div className="text-center my-0.5">
                  <div className="text-[14px] font-black text-emerald-400 tracking-wider">Q2</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">Monaco Grand Prix</div>
                </div>
                <div className="text-center mt-1">
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">12:34</span>
                </div>
              </div>
            </div>
          </section>

          {/* CONTINUE LISTENING */}
          <section className="px-5 py-2.5 select-none">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[12px] font-bold tracking-wider text-gray-400 uppercase">
                CONTINUE LISTENING
              </h2>
              <span className="text-gray-400"><Headphones className="w-4 h-4" /></span>
            </div>

            <div className="w-full bg-[#0D1322] border border-[#1B253B] rounded-2xl p-3 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3 flex-1 min-w-0 mr-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-[#181D33] to-[#0A0D18] border border-white/10 flex flex-col items-center justify-between p-1.5 shrink-0 shadow-inner">
                  <div className="flex items-center justify-center space-x-1 mt-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" alt="" className="w-4 h-4 object-contain" />
                    <span className="text-[8px] text-gray-500 font-bold">vs</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" alt="" className="w-4 h-4 object-contain" />
                  </div>
                  <div className="flex items-end justify-center space-x-[2px] h-3 w-full px-1">
                    {[35, 75, 50, 90, 65, 100, 70, 45, 80, 55, 30].map((h, i) => (
                      <span key={i} className="w-[2px] rounded-full bg-gradient-to-t from-indigo-500 to-purple-400" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-bold text-white truncate tracking-tight">Arsenal vs Chelsea</h3>
                  <p className="text-[11px] text-gray-400 truncate mb-1.5">AI Commentary</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-1 bg-[#1C253B] rounded-full overflow-hidden">
                      <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '52%' }} />
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono tracking-tight shrink-0">12:34 / 24:15</span>
                  </div>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-transparent border border-purple-500/80 text-purple-400 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                <Play className="w-4 h-4 fill-purple-400 text-purple-400 ml-0.5" />
              </div>
            </div>
          </section>

          {/* PROMOTIONAL CARD */}
          <section className="px-5 pt-2 pb-5 select-none">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#281D63] via-[#33207E] to-[#451A8D] border border-purple-400/30 p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-3.5 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center border border-white/20 shrink-0 shadow-inner">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-[13px] font-extrabold text-white tracking-tight">Smarter Predictions. Better Insights.</h4>
                  <p className="text-[11px] text-purple-200/80 font-medium">Make predictions and earn Fan Points</p>
                </div>
              </div>
              <div className="text-purple-300 relative z-10"><ChevronRight className="w-5 h-5" /></div>
            </div>
          </section>
        </div>
      )}

      {/* ===================== VIEW 3: PREDICT / LEADERBOARD / PROFILE PLACEHOLDERS ===================== */}
      {activeTab === 'predict' && (
        <div className="px-5 py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center mx-auto text-purple-300">
            <Trophy className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-[16px] font-black text-white">Prediction Arena</h2>
          <p className="text-[12px] text-gray-400 max-w-xs mx-auto">
            Make match predictions and compete against FanAtlas AI.
          </p>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="px-5 py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center mx-auto text-purple-300">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-[16px] font-black text-white">Leaderboards</h2>
          <p className="text-[12px] text-gray-400 max-w-xs mx-auto">
            Track top predictors and weekly standings across the US/UK leagues.
          </p>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="px-5 py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center mx-auto text-purple-300">
            <User className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-[16px] font-black text-white">Fan Profile</h2>
          <p className="text-[12px] text-gray-400 max-w-xs mx-auto">
            Manage your favorite teams, sports feeds, and notifications.
          </p>
        </div>
      )}

      {/* 9. Bottom Navigation Bar (5 tabs with smooth switching) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-40 bg-[#070A12]/95 backdrop-blur-xl border-t border-white/[0.08] pb-4 pt-2">
        <div className="flex items-center justify-around px-2">
          {/* Home */}
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-16 py-1 relative transition-colors ${
              activeTab === 'home' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {activeTab === 'home' && (
              <div className="absolute -top-2 w-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            )}
            <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] mt-0.5 ${activeTab === 'home' ? 'font-semibold text-purple-400' : 'font-medium text-gray-400'}`}>
              Home
            </span>
          </button>

          {/* Games */}
          <button 
            onClick={() => setActiveTab('games')}
            className={`flex flex-col items-center justify-center w-16 py-1 relative transition-colors ${
              activeTab === 'games' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {activeTab === 'games' && (
              <div className="absolute -top-2 w-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            )}
            <Compass className={`w-5 h-5 ${activeTab === 'games' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] mt-0.5 ${activeTab === 'games' ? 'font-semibold text-purple-400' : 'font-medium text-gray-400'}`}>
              Games
            </span>
          </button>

          {/* Predict */}
          <button 
            onClick={() => setActiveTab('predict')}
            className={`flex flex-col items-center justify-center w-16 py-1 relative transition-colors ${
              activeTab === 'predict' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {activeTab === 'predict' && (
              <div className="absolute -top-2 w-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            )}
            <Trophy className={`w-5 h-5 ${activeTab === 'predict' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] mt-0.5 ${activeTab === 'predict' ? 'font-semibold text-purple-400' : 'font-medium text-gray-400'}`}>
              Predict
            </span>
          </button>

          {/* Leaderboard */}
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`flex flex-col items-center justify-center w-16 py-1 relative transition-colors ${
              activeTab === 'leaderboard' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {activeTab === 'leaderboard' && (
              <div className="absolute -top-2 w-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            )}
            <BarChart3 className={`w-5 h-5 ${activeTab === 'leaderboard' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] mt-0.5 ${activeTab === 'leaderboard' ? 'font-semibold text-purple-400' : 'font-medium text-gray-400'}`}>
              Leaderboard
            </span>
          </button>

          {/* Profile */}
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center w-16 py-1 relative transition-colors ${
              activeTab === 'profile' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {activeTab === 'profile' && (
              <div className="absolute -top-2 w-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            )}
            <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] mt-0.5 ${activeTab === 'profile' ? 'font-semibold text-purple-400' : 'font-medium text-gray-400'}`}>
              Profile
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
