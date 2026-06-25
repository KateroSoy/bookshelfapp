import React, { useState } from 'react';
import { Target, BookOpen, Compass, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { UserProfile, ReadingGoal } from '../types';

interface OnboardingProps {
  onComplete: (onboardingData: {
    favoriteGenres: string[];
    annualTarget: number;
    monthlyPagesTarget: number;
    selectedInitialBooks: string[];
  }) => void;
  theme: 'light' | 'dark';
}

const ALL_GENRES = [
  'Pengembangan Diri', 'Bisnis', 'Teknologi', 'Filsafat', 
  'Fiksi', 'Psikologi', 'Seni & Filsafat', 'Sains'
];

const STARTER_BOOKS = [
  { id: '1', title: 'Atomic Habits', author: 'James Clear', genre: 'Pengembangan Diri' },
  { id: '2', title: 'Zero to One', author: 'Peter Thiel', genre: 'Bisnis' },
  { id: '3', title: 'The Creative Act', author: 'Rick Rubin', genre: 'Seni & Filsafat' },
  { id: '4', title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Sains' },
  { id: '7', title: 'Deep Work', author: 'Cal Newport', genre: 'Pengembangan Diri' },
  { id: '10', title: 'Meditations', author: 'Marcus Aurelius', genre: 'Filsafat' }
];

export default function Onboarding({ onComplete, theme }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [genres, setGenres] = useState<string[]>(['Pengembangan Diri', 'Filsafat']);
  const [annualGoal, setAnnualGoal] = useState(12);
  const [pagesGoal, setPagesGoal] = useState(500);
  const [starterBooks, setStarterBooks] = useState<string[]>(['1', '10']);

  const toggleGenre = (genre: string) => {
    setGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleStarterBook = (bookId: string) => {
    setStarterBooks(prev => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        favoriteGenres: genres,
        annualTarget: annualGoal,
        monthlyPagesTarget: pagesGoal,
        selectedInitialBooks: starterBooks
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className={`min-h-full flex flex-col justify-between p-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#11100E] text-cream' : 'bg-cream text-charcoal'
    }`}>
      {/* Header and Step Indicator */}
      <div className="space-y-4 pt-4">
        <div className="flex justify-between items-center">
          <span className="font-serif text-lg font-bold text-charcoal dark:text-cream">Atur Perpustakaan Anda</span>
          <span className="text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500">LANGKAH {step} DARI 3</span>
        </div>
        {/* Progress bar */}
        <div className="h-[2px] w-full bg-sand dark:bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-charcoal dark:bg-cream transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Main step content */}
      <div className="flex-1 flex flex-col justify-center py-6">
        {step === 1 && (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <Compass className="text-charcoal dark:text-cream animate-spin" style={{ animationDuration: '8s' }} size={28} />
              <h2 className="text-2xl font-serif font-bold text-charcoal dark:text-cream">Pilih minat bacaan Anda</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Kami akan membantu menyesuaikan penataan dan latihan memori sesuai dengan pilihan Anda.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {ALL_GENRES.map((g) => {
                const isSelected = genres.includes(g);
                return (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={`p-4 rounded-lg text-xs font-semibold border text-left flex justify-between items-center transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-charcoal dark:border-cream bg-charcoal/5 dark:bg-cream/5 font-bold text-charcoal dark:text-cream' 
                        : 'border-sand dark:border-neutral-800/80 hover:bg-[#F5F5F5] dark:hover:bg-[#1E1B19]/50 text-charcoal/70 dark:text-cream/70'
                    }`}
                  >
                    <span>{g}</span>
                    {isSelected && <Check size={14} className="text-charcoal dark:text-cream" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <Target className="text-charcoal dark:text-cream" size={28} />
              <h2 className="text-2xl font-serif font-bold text-charcoal dark:text-cream">Tentukan target membaca</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Buat kebiasaan membaca harian yang konsisten dan sesuai dengan kecepatan Anda.</p>
            </div>

            <div className="space-y-5 pt-2">
              {/* Annual Book Goal Slider */}
              <div className="space-y-2.5 p-4 rounded-lg border border-sand dark:border-neutral-800/60 bg-white dark:bg-[#151312]">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Target Buku Tahunan</span>
                  <span className="text-base font-serif font-bold text-charcoal dark:text-cream">{annualGoal} buku</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="100" 
                  value={annualGoal} 
                  onChange={(e) => setAnnualGoal(parseInt(e.target.value))}
                  className="w-full accent-charcoal dark:accent-cream cursor-pointer h-1 rounded-lg bg-sand dark:bg-neutral-800"
                />
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">Rata-rata pembaca menyelesaikan 12 buku setahun. Anda bisa mengubah ini kapan saja.</p>
              </div>

              {/* Monthly Page Goal Slider */}
              <div className="space-y-2.5 p-4 rounded-lg border border-sand dark:border-neutral-800/60 bg-white dark:bg-[#151312]">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Target Halaman Bulanan</span>
                  <span className="text-base font-serif font-bold text-charcoal dark:text-cream">{pagesGoal} halaman</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="3000" 
                  step="50"
                  value={pagesGoal} 
                  onChange={(e) => setPagesGoal(parseInt(e.target.value))}
                  className="w-full accent-charcoal dark:accent-cream cursor-pointer h-1 rounded-lg bg-sand dark:bg-neutral-800"
                />
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">Setara dengan sekitar 15-20 menit membaca santai setiap hari.</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <BookOpen className="text-charcoal dark:text-cream" size={28} />
              <h2 className="text-2xl font-serif font-bold text-charcoal dark:text-cream">Pilih buku pertama Anda</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Pilih buku klasik pemula yang ingin langsung Anda tambahkan ke dalam rak buku.</p>
            </div>

            <div className="space-y-2 pt-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-none">
              {STARTER_BOOKS.map((b) => {
                const isSelected = starterBooks.includes(b.id);
                return (
                  <button
                    key={b.id}
                    onClick={() => toggleStarterBook(b.id)}
                    className={`w-full p-3.5 rounded-lg text-xs border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-charcoal dark:border-cream bg-charcoal/5 dark:bg-cream/5 font-bold text-charcoal dark:text-cream' 
                        : 'border-sand dark:border-neutral-800/80 hover:bg-[#F5F5F5] dark:hover:bg-[#1E1B19]/50 text-charcoal/70 dark:text-cream/70'
                    }`}
                  >
                    <div>
                      <h4 className="font-serif font-bold text-neutral-800 dark:text-neutral-200">{b.title}</h4>
                      <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 font-medium">{b.author} • {b.genre}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-charcoal dark:bg-cream border-transparent text-white dark:text-charcoal' : 'border-sand dark:border-neutral-800'
                    }`}>
                      {isSelected && <Check size={12} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Nav Buttons */}
      <div className="flex gap-4 pt-4 border-t border-sand dark:border-neutral-800/60">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="flex-1 py-3 border border-sand dark:border-neutral-800/60 rounded-lg text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#F5F5F5] dark:hover:bg-[#1E1B19]/40 text-charcoal dark:text-cream transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Kembali
          </button>
        )}
        <button
          onClick={handleNext}
          className="flex-[2] py-3 bg-charcoal dark:bg-cream text-cream dark:text-charcoal rounded-lg text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-90 transition-all shadow-md active:scale-98 cursor-pointer"
        >
          {step === 3 ? 'Selesaikan Aturan' : 'Lanjutkan'} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
