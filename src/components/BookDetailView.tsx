import React, { useState } from 'react';
import { Book, Note, Quote } from '../types';
import { ArrowLeft, Star, Heart, Sliders, BookOpen, Quote as QuoteIcon, Sparkles, Plus, Check, Brain, RefreshCw, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BookCover from './BookCover';

interface BookDetailViewProps {
  book: Book;
  onBack: () => void;
  onUpdateBook: (updatedBook: Book) => void;
  theme: 'light' | 'dark';
}

export default function BookDetailView({ book, onBack, onUpdateBook, theme }: BookDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'quotes' | 'ai' | 'recall'>('notes');
  const [rating, setRating] = useState(book.rating);
  const [progress, setProgress] = useState(book.progress);
  const [isFavorite, setIsFavorite] = useState(book.isFavorite);

  // Notes Form State
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNotePage, setNewNotePage] = useState<number | ''>('');

  // Quotes Form State
  const [newQuoteContent, setNewQuoteContent] = useState('');
  const [newQuotePage, setNewQuotePage] = useState<number | ''>('');

  // AI Generation simulation
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiText, setAiText] = useState(book.aiSummary);

  const handleProgressChange = (newVal: number) => {
    setProgress(newVal);
    const pagesRead = Math.round((newVal / 100) * book.pages);
    
    // Auto shift status based on progress
    let status = book.status;
    if (newVal === 100) status = 'finished';
    else if (newVal > 0) status = 'reading';
    else status = 'tbr';

    onUpdateBook({
      ...book,
      progress: newVal,
      pagesRead,
      status
    });
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onUpdateBook({ ...book, rating: newRating });
  };

  const handleFavoriteToggle = () => {
    const nextFav = !isFavorite;
    setIsFavorite(nextFav);
    onUpdateBook({ ...book, isFavorite: nextFav });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      content: newNoteContent,
      page: newNotePage !== '' ? newNotePage : undefined,
      createdAt: new Date().toISOString()
    };

    const updatedNotes = [newNote, ...book.notes];
    onUpdateBook({
      ...book,
      notes: updatedNotes,
      notesCount: updatedNotes.length
    });

    setNewNoteContent('');
    setNewNotePage('');
  };

  const handleAddQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuoteContent.trim()) return;

    const newQuote: Quote = {
      id: Date.now().toString(),
      content: newQuoteContent,
      page: newQuotePage !== '' ? newQuotePage : undefined,
      createdAt: new Date().toISOString()
    };

    const updatedQuotes = [newQuote, ...book.quotes];
    onUpdateBook({
      ...book,
      quotes: updatedQuotes,
      quotesCount: updatedQuotes.length
    });

    setNewQuoteContent('');
    setNewQuotePage('');
  };

  // Simulated AI Summary Engine
  const triggerAiSynopsis = () => {
    setIsAiGenerating(true);
    setAiText('Mengakses asisten cerdas...');
    setTimeout(() => {
      setAiText('Menyusun catatan dan kutipan...');
    }, 1000);
    setTimeout(() => {
      setAiText(`Merangkum intisari penting dari buku ${book.title}...`);
    }, 2000);
    setTimeout(() => {
      setAiText(`Berhasil merangkum! Berikut ringkasan pengetahuan Anda tentang buku ini:\n\n"${book.title}" mengajarkan pentingnya pengembangan diri yang terstruktur. Dibandingkan hanya berfokus pada target besar, buku ini menekankan bahwa perubahan besar terjadi dari kebiasaan kecil yang dibangun secara konsisten.\n\nCatatan dan kutipan yang Anda kumpulkan sangat selaras dengan konsep ini. Terus tingkatkan konsistensi membaca harian Anda.`);
      setIsAiGenerating(false);
    }, 3200);
  };

  // Flashcards state
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const mockCards = book.reviewCards.length > 0 ? book.reviewCards : [
    { id: 'm1', question: `Apa filosofi utama dari buku ${book.title}?`, answer: 'Fokus pada hal-hal yang berada dalam kendali Anda. Perubahan di luar diri dapat diterima dengan lapang dada, namun disiplin diri dari dalam tetap yang paling utama.' },
    { id: 'm2', question: `Bagaimana menerapkan prinsip buku ${book.title} dalam rutinitas pagi?`, answer: 'Tinjau kembali kutipan atau catatan penting Anda selama 3 menit sebelum membuka media sosial. Biarkan pengetahuan baik meresap sebelum memulai hari.' }
  ];

  return (
    <div className="space-y-5 overflow-y-auto pb-24 px-1 text-left relative scrollbar-none animate-slide-up">
      {/* Top action bar */}
      <div className="flex justify-between items-center pt-2">
        <button 
          onClick={onBack}
          className="p-2.5 -ml-2 rounded-lg bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={15} />
        </button>
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-bold">MANUAL BUKU</span>
        <button 
          onClick={handleFavoriteToggle}
          className={`p-2.5 rounded-lg border transition-all ${
            isFavorite 
              ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400' 
              : 'bg-white dark:bg-[#151312] border-sand dark:border-neutral-800/60 text-neutral-400 dark:text-neutral-500'
          }`}
        >
          <Heart size={15} className={isFavorite ? 'fill-current animate-pulse' : ''} />
        </button>
      </div>

      {/* Book Primary Header section - Boutique Linen styling */}
      <div className="flex bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 rounded-xl p-4 gap-5 items-center shadow-xs">
        <BookCover book={book} size="sm" />
        <div className="flex-1 min-w-0 space-y-1">
          <span className="inline-block text-[8px] font-mono tracking-widest bg-charcoal/5 dark:bg-white/10 text-charcoal dark:text-cream px-2.5 py-1 rounded-md uppercase font-bold">
            {book.genre}
          </span>
          <h2 className="font-serif font-bold text-base text-charcoal dark:text-cream leading-tight line-clamp-2">
            {book.title}
          </h2>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-semibold">{book.author}</p>
          
          {/* Custom Stars Rating Selector */}
          <div className="flex items-center gap-1 pt-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="focus:outline-none transition-transform active:scale-125"
              >
                <Star 
                  size={14} 
                  className={star <= rating ? 'text-amber-400 fill-current' : 'text-neutral-200 dark:text-neutral-800'} 
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reading Progress interactive Slider */}
      <div className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 p-4 rounded-xl space-y-3.5 shadow-xs">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">Kemajuan Membaca</span>
          <span className="font-mono font-bold text-charcoal dark:text-cream">{progress}% Selesai</span>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={progress}
          onChange={(e) => handleProgressChange(parseInt(e.target.value))}
          className="w-full accent-charcoal dark:accent-cream cursor-pointer h-1 rounded-lg bg-sand dark:bg-neutral-800"
        />

        <div className="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
          <span>{Math.round((progress/100)*book.pages)} dari {book.pages} halaman</span>
          <span className="capitalize tracking-wider font-mono text-[9px] font-bold text-charcoal dark:text-cream bg-alabaster dark:bg-neutral-800 border border-sand dark:border-neutral-700 px-1.5 py-0.5 rounded">
            {book.status === 'tbr' ? 'Belum Dibaca' : book.status === 'reading' ? 'Sedang Dibaca' : 'Selesai'}
          </span>
        </div>
      </div>

      {/* Editorial segment tabs */}
      <div className="grid grid-cols-4 bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 rounded-lg p-0.5 text-[9px] font-mono tracking-wider uppercase text-center gap-0.5 shadow-xs">
        {(['notes', 'quotes', 'ai', 'recall'] as const).map(tab => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 rounded transition-all duration-300 ${
                isSelected 
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-charcoal dark:text-cream font-bold' 
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-charcoal dark:hover:text-cream'
              }`}
            >
              {tab === 'notes' ? 'Catatan' : tab === 'quotes' ? 'Kutipan' : tab === 'ai' ? 'Asisten AI' : 'Latihan'}
            </button>
          );
        })}
      </div>

      {/* Tab contents block */}
      <div className="space-y-4">
        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {/* Note addition Form */}
            <form onSubmit={handleAddNote} className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 p-2.5 rounded-lg flex gap-2 shadow-xs">
              <input 
                type="text" 
                required
                placeholder="Tulis intisari atau pelajaran penting..." 
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="flex-1 text-xs bg-transparent border-none outline-none text-charcoal dark:text-cream placeholder-neutral-400 dark:placeholder-neutral-600"
              />
              <input 
                type="number" 
                placeholder="Hlm" 
                value={newNotePage}
                onChange={(e) => setNewNotePage(e.target.value ? parseInt(e.target.value) : '')}
                className="w-10 text-xs bg-neutral-100 dark:bg-neutral-800 border-none text-center rounded outline-none text-charcoal dark:text-cream"
              />
              <button 
                type="submit"
                className="bg-charcoal dark:bg-cream dark:text-charcoal text-cream p-2 rounded-md active:scale-95 transition-all cursor-pointer hover:opacity-95"
              >
                <Plus size={14} />
              </button>
            </form>

            {/* Note Listing */}
            {book.notes.length === 0 ? (
              <div className="py-12 border border-dashed border-sand dark:border-neutral-800 rounded-xl text-center space-y-1 bg-white/40 dark:bg-[#151312]/30">
                <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">Belum ada catatan pribadi.</p>
                <p className="text-[10px] text-neutral-400/85 dark:text-neutral-500/85">Mulai catat pelajaran penting selagi Anda membaca!</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1 scrollbar-none">
                {book.notes.map((note) => (
                  <div key={note.id} className="p-3 bg-white dark:bg-[#151312] border border-neutral-100 dark:border-neutral-800 rounded-lg space-y-1 text-xs">
                    <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">{note.content}</p>
                    <div className="flex justify-between text-[9px] font-mono text-neutral-400 dark:text-neutral-500 font-semibold pt-1">
                      <span>Hlm {note.page || 'Tidak bertanda'}</span>
                      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            {/* Quote addition form */}
            <form onSubmit={handleAddQuote} className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 p-2.5 rounded-lg flex gap-2 shadow-xs">
              <input 
                type="text" 
                required
                placeholder="Catat kutipan menarik dari buku..." 
                value={newQuoteContent}
                onChange={(e) => setNewQuoteContent(e.target.value)}
                className="flex-1 text-xs bg-transparent border-none outline-none text-charcoal dark:text-cream placeholder-neutral-400 dark:placeholder-neutral-600"
              />
              <input 
                type="number" 
                placeholder="Hlm" 
                value={newQuotePage}
                onChange={(e) => setNewQuotePage(e.target.value ? parseInt(e.target.value) : '')}
                className="w-10 text-xs bg-neutral-100 dark:bg-neutral-800 border-none text-center rounded outline-none text-charcoal dark:text-cream"
              />
              <button 
                type="submit"
                className="bg-charcoal dark:bg-cream dark:text-charcoal text-cream p-2 rounded-md active:scale-95 transition-all cursor-pointer hover:opacity-95"
              >
                <Plus size={14} />
              </button>
            </form>

            {/* Quote list */}
            {book.quotes.length === 0 ? (
              <div className="py-12 border border-dashed border-sand dark:border-neutral-800 rounded-xl text-center space-y-1 bg-white/40 dark:bg-[#151312]/30">
                <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">Belum ada kutipan menarik yang disimpan.</p>
                <p className="text-[10px] text-neutral-400/85 dark:text-neutral-500/85">Simpan kalimat berharga yang menginspirasi Anda.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1 scrollbar-none">
                {book.quotes.map((quote) => (
                  <div key={quote.id} className="p-3.5 bg-white dark:bg-[#151312] border border-neutral-100 dark:border-neutral-800 rounded-lg space-y-2 text-xs">
                    <div className="flex gap-2 items-start">
                      <QuoteIcon size={12} className="text-neutral-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                      <p className="italic font-serif leading-relaxed text-neutral-800 dark:text-neutral-200">"{quote.content}"</p>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-neutral-400 dark:text-neutral-500 font-semibold">
                      <span>Hlm {quote.page || 'Tidak bertanda'}</span>
                      <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI summary & Takeaways */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="bg-alabaster dark:bg-[#1C1916] p-4 rounded-xl border border-sand dark:border-neutral-800/45 text-xs text-left space-y-3 shadow-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold text-charcoal dark:text-cream tracking-widest">
                  <Sparkles size={11} className={isAiGenerating ? 'animate-spin' : ''} />
                  ASISTEN RINGKASAN AI
                </div>
                <button 
                  onClick={triggerAiSynopsis}
                  disabled={isAiGenerating}
                  className="text-[9px] font-mono font-bold text-charcoal dark:text-cream hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={10} className={isAiGenerating ? 'animate-spin' : ''} /> PERBARUI
                </button>
              </div>

              <p className="leading-relaxed text-charcoal dark:text-cream/90 whitespace-pre-line font-medium text-[11px]">
                {aiText}
              </p>
            </div>

            {/* Takeaways list */}
            <div className="space-y-3 pt-1">
              <h3 className="font-serif font-bold text-xs text-charcoal dark:text-cream">Pelajaran Penting Utama</h3>
              <ul className="space-y-2 text-xs">
                {book.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 border border-neutral-200/50 dark:border-neutral-800">
                      {idx + 1}
                    </span>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">{takeaway}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Recall spaced repetition Tab */}
        {activeTab === 'recall' && (
          <div className="space-y-4 text-xs animate-slide-up">
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-bold">
              <Brain className="text-charcoal dark:text-cream" size={15} />
              <span className="font-mono text-[10px] tracking-wider uppercase">Latihan Mengingat Spaced Repetition</span>
            </div>

            {/* Tactile cardboard flashcard */}
            <div 
              onClick={() => setShowAnswer(!showAnswer)}
              className={`
                p-5 min-h-[170px] rounded-xl border cursor-pointer select-none
                flex flex-col justify-between text-left transition-all duration-500 hover:shadow-md
                ${showAnswer 
                  ? 'bg-alabaster dark:bg-[#1C1916] border-sand dark:border-neutral-800' 
                  : 'bg-white dark:bg-[#151312] border-sand dark:border-neutral-800/40'
                }
              `}
            >
              <div className="space-y-3.5">
                <span className="text-[8px] font-mono tracking-[0.15em] text-neutral-400 dark:text-neutral-500 uppercase font-bold block">
                  {showAnswer ? 'JAWABAN' : `KARTU MEMORI ${activeCardIndex + 1} DARI ${mockCards.length}`}
                </span>
                
                {showAnswer ? (
                  <p className="italic font-serif leading-relaxed text-charcoal dark:text-cream text-[12px]">
                    {mockCards[activeCardIndex].answer}
                  </p>
                ) : (
                  <h3 className="font-serif font-bold text-sm text-charcoal dark:text-cream leading-snug">
                    {mockCards[activeCardIndex].question}
                  </h3>
                )}
              </div>

              <div className="text-[9px] text-neutral-400 font-bold text-right mt-4 uppercase tracking-wider font-mono">
                {showAnswer ? 'Sentuh untuk menutup jawaban' : 'Sentuh kartu untuk melihat jawaban'}
              </div>
            </div>

            {/* Recall ratings feedback */}
            {showAnswer && (
              <div className="space-y-2.5 pt-1">
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium text-center">Tingkat kemudahan mengingat:</p>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => {
                      setShowAnswer(false);
                      setActiveCardIndex((activeCardIndex + 1) % mockCards.length);
                    }}
                    className="p-2.5 bg-charcoal dark:bg-cream dark:text-charcoal text-cream font-mono uppercase tracking-wider text-[9px] font-bold rounded-lg active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    Sangat Ingat
                  </button>
                  <button 
                    onClick={() => {
                      setShowAnswer(false);
                      setActiveCardIndex((activeCardIndex + 1) % mockCards.length);
                    }}
                    className="p-2.5 bg-neutral-600 dark:bg-neutral-800 dark:text-cream text-cream font-mono uppercase tracking-wider text-[9px] font-bold rounded-lg active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    Agak Lupa
                  </button>
                  <button 
                    onClick={() => {
                      setShowAnswer(false);
                      setActiveCardIndex((activeCardIndex + 1) % mockCards.length);
                    }}
                    className="p-2.5 bg-alabaster dark:bg-neutral-900 text-charcoal dark:text-neutral-300 font-mono uppercase tracking-wider text-[9px] font-bold rounded-lg border border-sand dark:border-neutral-800 active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    Lupa
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
