import React from 'react';
import { Book, ReadingGoal, UserProfile } from '../types';
import { BookOpen, Sparkles, Brain, Award, ChevronRight, CheckCircle2, Bookmark, Flame, Star, User } from 'lucide-react';
import BookCover from './BookCover';

interface DashboardViewProps {
  books: Book[];
  readingGoal: ReadingGoal;
  user: UserProfile;
  onSelectBook: (book: Book) => void;
  onNavigateToTab: (tab: string) => void;
  onFavoriteToggle: (bookId: string, isFav: boolean) => void;
  theme: 'light' | 'dark';
}

export default function DashboardView({ 
  books, 
  readingGoal, 
  user, 
  onSelectBook, 
  onNavigateToTab,
  onFavoriteToggle,
  theme
}: DashboardViewProps) {
  const currentlyReading = books.filter(b => b.status === 'reading');
  const wantToRead = books.filter(b => b.status === 'tbr');
  const finished = books.filter(b => b.status === 'finished');
  
  const totalBooks = books.length;
  const memoryScore = 94; // Optimized for high-end recall algorithm visual representation

  // Clean, high-end quote of the day
  const dailyQuote = {
    content: "Creativity is not a professional output, but an active state of spiritual being. Pay exquisite attention.",
    author: "Rick Rubin",
    bookTitle: "The Creative Act"
  };

  return (
    <div className="space-y-7 overflow-y-auto pb-24 px-1 text-left animate-slide-up">
      {/* Editorial Header */}
      <div className="flex justify-between items-end pt-3">
        <div className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 font-bold uppercase">
            / edisi nº 24
          </span>
          <h1 className="text-3xl font-serif italic font-normal tracking-tight leading-none text-charcoal dark:text-cream">
            halo, <span className="font-serif font-semibold not-italic">{user.name.split(' ')[0]}</span>.
          </h1>
        </div>
        <div className="relative group">
          <div className="w-11 h-11 rounded-full border-2 border-sand dark:border-[#2d2926] bg-stone-100 dark:bg-neutral-800/60 flex items-center justify-center text-stone-600 dark:text-stone-300 pinterest-card cursor-pointer">
            <User size={18} className="stroke-[2.5]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-charcoal dark:bg-neutral-800 border-2 border-cream dark:border-stone-900 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-cream animate-pulse" />
          </div>
        </div>
      </div>

      {/* Elegant, minimalist Separator Line */}
      <div className="h-[1px] bg-sand/60 dark:bg-neutral-800 w-full" />

      {/* Tactile Streak Highlight */}
      <div className="bg-alabaster dark:bg-[#1C1916] p-4 rounded-2xl border border-sand/40 dark:border-neutral-800/40 flex items-center justify-between pinterest-card">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-charcoal/10 dark:bg-cream/10 flex items-center justify-center text-charcoal dark:text-cream">
            <Flame size={18} className="animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-bold text-charcoal dark:text-cream font-sans">
              {readingGoal.currentStreak} Hari Kebiasaan Membaca
            </p>
            <p className="text-[10px] text-charcoal/60 dark:text-neutral-400 mt-0.5">
              Konsistensi membaca dengan {readingGoal.monthlyPagesCompleted} halaman diselesaikan bulan ini
            </p>
          </div>
        </div>
        <button 
          onClick={() => onNavigateToTab('goals')}
          className="p-2 bg-cream dark:bg-neutral-800 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight size={14} className="text-charcoal dark:text-cream" />
        </button>
      </div>

      {/* Bento Layout: Clean Minimalist Squares */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Books */}
        <div 
          onClick={() => onNavigateToTab('library')}
          className="p-4 rounded-2xl bg-white dark:bg-[#151312] border border-sand/30 dark:border-neutral-800/30 cursor-pointer pinterest-card text-left flex flex-col justify-between h-[110px]"
        >
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-mono tracking-widest text-charcoal dark:text-cream font-bold uppercase">01 / BUKU</span>
            <BookOpen size={13} className="text-charcoal/60 dark:text-cream/60" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-charcoal dark:text-cream leading-none">{totalBooks}</h3>
            <p className="text-[9px] font-mono text-charcoal/50 dark:text-cream/50 mt-1 uppercase tracking-wider">dicatat</p>
          </div>
        </div>

        {/* Finished Books */}
        <div 
          onClick={() => onNavigateToTab('library')}
          className="p-4 rounded-2xl bg-white dark:bg-[#151312] border border-sand/30 dark:border-neutral-800/30 cursor-pointer pinterest-card text-left flex flex-col justify-between h-[110px]"
        >
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-mono tracking-widest text-stone-500 dark:text-stone-300 font-bold uppercase">02 / SELESAI</span>
            <CheckCircle2 size={13} className="text-stone-500 dark:text-stone-300" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-charcoal dark:text-cream leading-none">{finished.length}</h3>
            <p className="text-[9px] font-mono text-charcoal/50 dark:text-cream/50 mt-1 uppercase tracking-wider">selesai dibaca</p>
          </div>
        </div>

        {/* Want to Read */}
        <div 
          onClick={() => onNavigateToTab('library')}
          className="p-4 rounded-2xl bg-white dark:bg-[#151312] border border-sand/30 dark:border-neutral-800/30 cursor-pointer pinterest-card text-left flex flex-col justify-between h-[110px]"
        >
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-mono tracking-widest text-stone-400 dark:text-stone-400 font-bold uppercase">03 / DAFTAR</span>
            <Bookmark size={13} className="text-stone-400 dark:text-stone-400" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-charcoal dark:text-cream leading-none">{wantToRead.length}</h3>
            <p className="text-[9px] font-mono text-charcoal/50 dark:text-cream/50 mt-1 uppercase tracking-wider">ingin dibaca</p>
          </div>
        </div>

        {/* Memory Score */}
        <div 
          onClick={() => onNavigateToTab('memory')}
          className="p-4 rounded-2xl bg-white dark:bg-[#151312] border border-sand/30 dark:border-neutral-800/30 cursor-pointer pinterest-card text-left flex flex-col justify-between h-[110px]"
        >
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-mono tracking-widest text-stone-500 dark:text-stone-300 font-bold uppercase">04 / MEMORI</span>
            <Brain size={13} className="text-stone-500 dark:text-stone-300" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-charcoal dark:text-cream leading-none">{memoryScore}%</h3>
            <p className="text-[9px] font-mono text-charcoal/50 dark:text-cream/50 mt-1 uppercase tracking-wider">daya ingat</p>
          </div>
        </div>
      </div>

      {/* Currently Reading (Fluid scrollable strip) */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h2 className="font-serif italic font-medium text-lg text-charcoal dark:text-cream">
            sedang dibaca <span className="font-sans not-italic text-[11px] font-mono bg-sand/50 dark:bg-neutral-800 px-2 py-0.5 rounded-full ml-1.5 text-charcoal/70 dark:text-cream/70">{currentlyReading.length}</span>
          </h2>
          <button 
            onClick={() => onNavigateToTab('library')}
            className="text-[10px] font-mono uppercase tracking-widest text-charcoal dark:text-cream hover:underline font-bold cursor-pointer"
          >
            lihat rak buku
          </button>
        </div>

        {currentlyReading.length === 0 ? (
          <div className="p-8 rounded-2xl border border-dashed border-sand dark:border-neutral-800 text-center space-y-2 bg-white/40 dark:bg-transparent">
            <p className="text-xs text-charcoal/60 dark:text-cream/60">Tidak ada buku yang sedang aktif dibaca.</p>
            <button 
              onClick={() => onNavigateToTab('library')}
              className="text-xs font-bold text-charcoal dark:text-cream hover:underline cursor-pointer"
            >
              tambahkan buku pertama Anda
            </button>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 pr-2 scrollbar-none snap-x">
            {currentlyReading.map((book) => (
              <div 
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="flex bg-white dark:bg-[#151312] border border-sand/30 dark:border-neutral-800/30 p-3.5 rounded-2xl gap-4 items-center min-w-[285px] w-[285px] snap-center cursor-pointer pinterest-card relative"
              >
                <BookCover book={book} size="sm" showProgress />

                <div className="flex-1 min-w-0 space-y-2 text-left">
                  <div>
                    <h4 className="font-serif font-bold text-xs truncate text-charcoal dark:text-cream leading-tight">
                      {book.title}
                    </h4>
                    <p className="text-[9px] text-charcoal/50 dark:text-cream/50 mt-0.5 font-mono uppercase tracking-wider truncate">
                      by {book.author}
                    </p>
                  </div>
                  
                  {/* Minimalistic progress bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-center text-[8px] font-mono text-charcoal/60 dark:text-cream/60">
                      <span>{book.pagesRead}/{book.pages} hlm</span>
                      <span className="font-bold text-charcoal dark:text-cream">{book.progress}%</span>
                    </div>
                    <div className="h-[3px] bg-sand/40 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-charcoal dark:bg-cream rounded-full transition-all duration-300" 
                        style={{ width: `${book.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Review Smart Trigger */}
      <div 
        onClick={() => onNavigateToTab('memory')}
        className="bg-charcoal dark:bg-neutral-800 text-cream dark:text-cream p-4 rounded-2xl cursor-pointer flex justify-between items-center text-left pinterest-card"
      >
        <div className="space-y-1 pr-4">
          <div className="flex items-center gap-1.5 text-[8px] font-mono tracking-widest text-neutral-400 font-bold">
            <Sparkles size={11} className="text-cream" />
            LATIHAN MEMORI DIANJURKAN
          </div>
          <h4 className="text-xs font-serif italic font-normal text-cream">
            Tinjau kartu memori aktif Anda
          </h4>
          <p className="text-[9px] text-cream/70">
            Gunakan latihan kartu memori untuk memperkuat pemahaman poin-poin penting dari buku Anda.
          </p>
        </div>
        <div className="bg-white hover:bg-neutral-100 text-charcoal text-[10px] font-mono font-bold px-3 py-1.5 rounded-full transition-all shrink-0">
          latih sekarang
        </div>
      </div>

      {/* Beautiful Editorial Quote Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#151312] border border-sand/40 dark:border-[#24211e] text-left space-y-4 relative overflow-hidden pinterest-card">
        {/* Giant decorative quote marks */}
        <span className="absolute -right-3 -top-6 text-[100px] font-serif italic text-sand/20 dark:text-neutral-800/20 select-none">“</span>
        
        <div className="flex justify-between items-center relative z-10">
          <span className="text-[8px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 font-bold uppercase">
            indeks kebijaksanaan
          </span>
          <span className="text-[8px] font-mono text-charcoal/50 dark:text-cream/50 bg-sand/30 dark:bg-neutral-800 px-2 py-0.5 rounded uppercase font-bold">
            kutipan harian
          </span>
        </div>

        <p className="font-serif italic text-[13px] text-charcoal dark:text-cream leading-relaxed relative z-10 pr-2">
          "{dailyQuote.content}"
        </p>

        <div className="flex justify-between items-end text-[10px] pt-1 relative z-10 border-t border-sand/45 dark:border-neutral-800/40">
          <span className="text-charcoal/60 dark:text-cream/60">
            — <b className="font-sans text-charcoal dark:text-cream font-bold">{dailyQuote.author}</b> <span className="text-[9px] italic opacity-75 font-serif">dalam {dailyQuote.bookTitle}</span>
          </span>
          <button 
            onClick={() => {
              const b = books.find(bk => bk.title === dailyQuote.bookTitle);
              if (b) onSelectBook(b);
            }} 
            className="text-charcoal dark:text-cream hover:underline font-bold font-mono text-[9px] uppercase tracking-widest cursor-pointer"
          >
            lihat catatan
          </button>
        </div>
      </div>
    </div>
  );
}
