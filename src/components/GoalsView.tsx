import React from 'react';
import { ReadingGoal, UserProfile, Book } from '../types';
import { Target, Award, Flame, Calendar, BookOpen, Star, PieChart, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface GoalsViewProps {
  readingGoal: ReadingGoal;
  books: Book[];
  user: UserProfile;
  theme: 'light' | 'dark';
}

export default function GoalsView({ readingGoal, books, user, theme }: GoalsViewProps) {
  const completedBooks = books.filter(b => b.status === 'finished');
  const readingBooks = books.filter(b => b.status === 'reading');

  // Math helper
  const annualPercentage = Math.min(Math.round((completedBooks.length / readingGoal.annualTarget) * 100), 100);
  const monthlyPercentage = Math.min(Math.round((readingGoal.monthlyPagesCompleted / readingGoal.monthlyPagesTarget) * 100), 100);

  // Dynamic Genre Stats calculation
  const genreCounts: { [key: string]: number } = {};
  books.forEach(b => {
    genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1;
  });
  const totalGenreBooks = books.length || 1;

  // Reading Heatmap Grid simulator (last 28 days of read log)
  const heatmapData = [
    { day: 1, level: 3, date: 'Jun 1' }, { day: 2, level: 1, date: 'Jun 2' }, { day: 3, level: 0, date: 'Jun 3' }, { day: 4, level: 2, date: 'Jun 4' },
    { day: 5, level: 4, date: 'Jun 5' }, { day: 6, level: 3, date: 'Jun 6' }, { day: 7, level: 2, date: 'Jun 7' }, { day: 8, level: 4, date: 'Jun 8' },
    { day: 9, level: 3, date: 'Jun 9' }, { day: 10, level: 2, date: 'Jun 10' }, { day: 11, level: 1, date: 'Jun 11' }, { day: 12, level: 4, date: 'Jun 12' },
    { day: 13, level: 0, date: 'Jun 13' }, { day: 14, level: 3, date: 'Jun 14' }, { day: 15, level: 3, date: 'Jun 15' }, { day: 16, level: 4, date: 'Jun 16' },
    { day: 17, level: 4, date: 'Jun 17' }, { day: 18, level: 3, date: 'Jun 18' }, { day: 19, level: 2, date: 'Jun 19' }, { day: 20, level: 4, date: 'Jun 20' },
    { day: 21, level: 3, date: 'Jun 21' }, { day: 22, level: 3, date: 'Jun 22' }, { day: 23, level: 4, date: 'Jun 23' }, { day: 24, level: 4, date: 'Jun 24' },
    { day: 25, level: 0, date: 'Jun 25' }, { day: 26, level: 0, date: 'Jun 26' }, { day: 27, level: 0, date: 'Jun 27' }, { day: 28, level: 0, date: 'Jun 28' },
  ];

  // Muted monochrome gray palette for heatmaps
  const getHeatmapColor = (level: number) => {
    if (level === 0) return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-300 dark:text-neutral-700 border-neutral-200/20 dark:border-neutral-800';
    if (level === 1) return 'bg-charcoal/10 dark:bg-cream/10 text-neutral-500 dark:text-cream/50 border-transparent';
    if (level === 2) return 'bg-charcoal/30 dark:bg-cream/35 text-neutral-600 dark:text-cream/70 border-transparent';
    if (level === 3) return 'bg-charcoal/65 dark:bg-cream/70 text-white dark:text-charcoal border-transparent';
    return 'bg-charcoal dark:bg-cream text-white dark:text-charcoal border-transparent';
  };

  return (
    <div className="space-y-6 overflow-y-auto pb-24 px-1 text-left scrollbar-none animate-slide-up">
      {/* Top action header */}
      <div className="pt-2">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold block">
          METRIK KEBIASAAN
        </span>
        <h1 className="text-2xl font-serif font-bold text-charcoal dark:text-cream tracking-tight mt-0.5">
          Target Membaca
        </h1>
      </div>

      <div className="h-[1px] bg-sand dark:bg-neutral-800/40" />

      {/* Goal Cards Horizontal Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Annual books progress card */}
        <div className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 p-4 rounded-xl text-left space-y-4 shadow-xs">
          <div className="flex justify-between items-center">
            <Award className="text-charcoal dark:text-cream" size={16} />
            <span className="text-[8px] font-mono font-bold tracking-[0.15em] text-neutral-400">TAHUNAN</span>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300">Target Buku Tahunan</h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-serif font-black text-charcoal dark:text-cream">{completedBooks.length}</span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">/ {readingGoal.annualTarget} buku</span>
            </div>
            {/* Horizontal progress bar */}
            <div className="mt-4 space-y-1">
              <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-charcoal dark:bg-cream rounded-full transition-all duration-500" 
                  style={{ width: `${annualPercentage}%` }} 
                />
              </div>
              <div className="text-[8px] font-mono opacity-60 dark:opacity-40 text-right text-charcoal dark:text-cream">{annualPercentage}% SELESAI</div>
            </div>
          </div>
        </div>

        {/* Monthly pages progress card */}
        <div className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 p-4 rounded-xl text-left space-y-4 shadow-xs">
          <div className="flex justify-between items-center">
            <BookOpen className="text-charcoal dark:text-cream" size={16} strokeWidth={2.5} />
            <span className="text-[8px] font-mono font-bold tracking-[0.15em] text-neutral-400">BULANAN</span>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300">Target Halaman Bulanan</h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-serif font-black text-charcoal dark:text-cream">{readingGoal.monthlyPagesCompleted}</span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">/ {readingGoal.monthlyPagesTarget} hlm</span>
            </div>
            {/* Horizontal progress bar */}
            <div className="mt-4 space-y-1">
              <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-charcoal dark:bg-cream rounded-full transition-all duration-500" 
                  style={{ width: `${monthlyPercentage}%` }} 
                />
              </div>
              <div className="text-[8px] font-mono opacity-60 dark:opacity-40 text-right text-charcoal dark:text-cream">{monthlyPercentage}% SELESAI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Streak Indicator */}
      <div className="p-4 bg-alabaster dark:bg-[#1C1916] border border-sand dark:border-neutral-800 rounded-xl flex items-center justify-between text-left shadow-xs">
        <div className="flex gap-4 items-center">
          <Flame className="text-charcoal dark:text-cream" size={22} />
          <div>
            <h4 className="text-xs font-bold text-charcoal dark:text-cream">Kebiasaan Membaca Beruntun</h4>
            <div className="flex gap-4 items-center mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <p>Saat ini: <b className="text-charcoal dark:text-cream">{readingGoal.currentStreak} hari</b></p>
              <p>Terlama: <b className="text-neutral-700 dark:text-neutral-300">{readingGoal.longestStreak} hari</b></p>
            </div>
          </div>
        </div>
        <span className="text-[8px] font-mono text-neutral-400 dark:text-neutral-500 font-bold bg-white dark:bg-neutral-800 border border-sand dark:border-neutral-700 px-2 py-0.5 rounded">
          KONSISTENSI
        </span>
      </div>

      {/* Reading Calendar Heatmap */}
      <div className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 p-4 rounded-xl space-y-3.5 shadow-xs">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Calendar className="text-charcoal dark:text-cream" size={14} />
            <h4 className="font-serif font-bold text-xs text-neutral-800 dark:text-neutral-200">Kalender Membaca (Juni)</h4>
          </div>
          <span className="text-[8px] font-mono text-neutral-400 font-semibold tracking-wider">HARI TERCATAT</span>
        </div>

        {/* Heatmap Matrix layout */}
        <div className="grid grid-cols-7 gap-2.5 max-w-[280px] mx-auto pt-1">
          {heatmapData.map((data, idx) => (
            <div 
              key={idx}
              className={`w-7 h-7 rounded-md ${getHeatmapColor(data.level)} flex items-center justify-center text-[9px] font-mono font-medium border border-neutral-100 shadow-xs transition-transform hover:scale-110`}
              title={`${data.date}: Tingkat Level ${data.level}`}
            >
              {data.day}
            </div>
          ))}
        </div>

        {/* Color Legend */}
        <div className="flex justify-end gap-2.5 items-center text-[8px] opacity-75 dark:opacity-40 pt-1.5 pr-2 text-charcoal dark:text-cream">
          <span>Sedikit</span>
          <div className="w-2 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-xs border border-neutral-200/25 dark:border-neutral-800" />
          <div className="w-2 h-2 bg-charcoal/10 dark:bg-cream/10 rounded-xs" />
          <div className="w-2 h-2 bg-charcoal/50 dark:bg-cream/50 rounded-xs" />
          <div className="w-2 h-2 bg-charcoal dark:bg-cream rounded-xs" />
          <span>Banyak</span>
        </div>
      </div>

      {/* Custom SVG monthly statistics bar chart */}
      <div className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 p-4 rounded-xl space-y-3.5 shadow-xs">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <TrendingUp className="text-charcoal dark:text-cream" size={14} />
            <h4 className="font-serif font-bold text-xs text-neutral-800 dark:text-neutral-200">Akumulasi Halaman</h4>
          </div>
          <span className="text-[8px] font-mono text-neutral-400 font-semibold tracking-wider">TREN 6 BULAN</span>
        </div>

        {/* SVG Custom Rendered Bar Chart */}
        <div className="w-full pt-1.5 flex justify-center">
          <svg className="w-full max-w-[280px] h-[100px]" viewBox="0 0 280 100">
            <line x1="0" y1="20" x2="280" y2="20" stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} strokeDasharray="3" />
            <line x1="0" y1="50" x2="280" y2="50" stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} strokeDasharray="3" />
            <line x1="0" y1="80" x2="280" y2="80" stroke={theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)'} />

            {/* Render Bars */}
            {readingGoal.monthlyHistory.map((item, idx) => {
              const barWidth = 24;
              const gap = 20;
              const startX = 20 + idx * (barWidth + gap);
              // Max height maps to 1200 pages
              const barHeight = (item.pagesRead / 1200) * 70;
              const startY = 80 - barHeight;

              return (
                <g key={item.month} className="group">
                  <title>{item.month}: {item.pagesRead} halaman dibaca</title>
                  {/* The actual fill bar */}
                  <rect 
                    x={startX} 
                    y={startY} 
                    width={barWidth} 
                    height={barHeight} 
                    rx="4" 
                    fill={theme === 'dark' ? '#FDFBF7' : '#111111'} 
                    className="opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                  />
                  {/* Month Label */}
                  <text 
                    x={startX + barWidth/2} 
                    y="95" 
                    textAnchor="middle" 
                    fill={theme === 'dark' ? '#888888' : '#666666'} 
                    fontSize="9" 
                    fontWeight="bold"
                    className="font-mono"
                  >
                    {item.month}
                  </text>
                  {/* Page Volume count above bar */}
                  <text 
                    x={startX + barWidth/2} 
                    y={startY - 4} 
                    textAnchor="middle" 
                    fill={theme === 'dark' ? '#FDFBF7' : '#111111'} 
                    fontSize="8" 
                    fontWeight="black"
                    className="font-mono dark:fill-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {item.pagesRead}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Genre distribution indicator */}
      <div className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 p-4 rounded-xl space-y-3.5 shadow-xs">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <PieChart className="text-charcoal dark:text-cream" size={14} />
            <h4 className="font-serif font-bold text-xs text-neutral-800 dark:text-neutral-200">Analisis Kategori</h4>
          </div>
          <span className="text-[8px] font-mono text-neutral-400 font-semibold tracking-wider">PROPORSI</span>
        </div>

        {/* Stacked bar representing percentage allocation */}
        <div className="space-y-3">
          <div className="h-2 w-full rounded-full overflow-hidden flex bg-neutral-100 dark:bg-neutral-800">
            {Object.entries(genreCounts).map(([genre, count], idx) => {
              const pct = (count / totalGenreBooks) * 100;
              const colors = [
                'bg-charcoal dark:bg-cream', 
                'bg-neutral-600 dark:bg-neutral-300', 
                'bg-neutral-400 dark:bg-neutral-500', 
                'bg-neutral-300 dark:bg-neutral-600', 
                'bg-neutral-200 dark:bg-neutral-700', 
                'bg-neutral-100 dark:bg-neutral-800'
              ];
              return (
                <div 
                  key={genre}
                  style={{ width: `${pct}%` }}
                  className={`${colors[idx % colors.length]} h-full`}
                  title={`${genre}: ${Math.round(pct)}%`}
                />
              );
            })}
          </div>

          {/* Legend index labels */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-start text-[10px] pt-1.5">
            {Object.entries(genreCounts).map(([genre, count], idx) => {
              const pct = Math.round((count / totalGenreBooks) * 100);
              const colors = [
                'bg-charcoal dark:bg-cream', 
                'bg-neutral-600 dark:bg-neutral-300', 
                'bg-neutral-400 dark:bg-neutral-500', 
                'bg-neutral-300 dark:bg-neutral-600', 
                'bg-neutral-200 dark:bg-neutral-700', 
                'bg-neutral-100 dark:bg-neutral-800'
              ];
              return (
                <div key={genre} className="flex gap-1.5 items-center">
                  <div className={`w-2 h-2 rounded-full ${colors[idx % colors.length]}`} />
                  <span className="text-neutral-500 dark:text-neutral-400 font-semibold">{genre} <b className="font-mono text-charcoal dark:text-cream">({pct}%)</b></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
