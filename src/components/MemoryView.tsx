import React, { useState } from 'react';
import { Book, ReviewCard } from '../types';
import { Brain, Sparkles, Send, RefreshCw, MessageSquare, HelpCircle, Check, HelpCircle as QuestionIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MemoryViewProps {
  books: Book[];
  theme: 'light' | 'dark';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function MemoryView({ books, theme }: MemoryViewProps) {
  // Chat state
  const [query, setQuery] = useState('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    { id: '1', sender: 'ai', text: 'Halo! Saya adalah Bookshelf AI. Saya siap membantu Anda menelusuri catatan dan ringkasan buku Anda. Silakan ajukan pertanyaan, dan saya akan menjawabnya berdasarkan koleksi buku Anda.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Review Deck state
  const [showDeckAnswer, setShowDeckAnswer] = useState(false);
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);

  // Filter books with flashcards
  const booksWithCards = books.filter(b => b.reviewCards.length > 0);
  const allCards = booksWithCards.flatMap(b => b.reviewCards.map(c => ({ ...c, bookTitle: b.title })));

  // Fallback cards if no books have card entries yet
  const defaultRecallCards = [
    { id: 'dc1', bookTitle: 'Atomic Habits', question: 'Apa yang dimaksud dengan "Perubahan Identitas" menurut James Clear?', answer: 'James Clear berpendapat bahwa cara paling efektif untuk mengubah kebiasaan adalah fokus pada siapa yang ingin Anda capai (identitas), bukan pada hasil akhir. Setiap tindakan kecil adalah suara untuk identitas baru Anda.' },
    { id: 'dc2', bookTitle: 'Zero to One', question: 'Jelaskan salah satu pertanyaan kunci yang harus dijawab setiap startup menurut Peter Thiel.', answer: 'Pertanyaan rahasia: "Kebenaran penting apa yang sangat sedikit orang setujui dengan Anda?" Menemukan kebenaran yang tidak disadari orang lain adalah dasar dari inovasi sejati.' },
    { id: 'dc3', bookTitle: 'Meditations', question: 'Bagaimana Marcus Aurelius memandang hambatan dalam kehidupan sehari-hari?', answer: 'Beliau memandang hambatan sebagai bahan bakar untuk bertindak. "Apa yang menghalangi jalan akan menjadi jalan itu sendiri." Setiap rintangan adalah kesempatan untuk melatih kesabaran atau ketahanan.' }
  ];

  const cardsToReview = allCards.length > 0 ? allCards : defaultRecallCards;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setChatLog(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    // Simulate intelligent response based on query keywords
    setTimeout(() => {
      let responseText = `Saya telah mencari di perpustakaan Anda, namun belum menemukan catatan spesifik untuk pertanyaan tersebut. Namun secara umum, ingat bahwa Atomic Habits menyarankan untuk mempermudah kebiasaan baik, sementara Marcus Aurelius mengajarkan bahwa kedamaian pikiran datang dari dalam diri sendiri.`;

      const q = query.toLowerCase();
      if (q.includes('habit') || q.includes('clear') || q.includes('kebiasaan') || q.includes('atomic')) {
        responseText = `Dalam buku "Atomic Habits", James Clear menjelaskan bahwa konsistensi kecil akan berdampak besar. Caranya:\n\n1. Kurangi hambatan untuk kebiasaan baik (Buat menjadi jelas).\n2. Tentukan lokasi fisik yang konsisten untuk rutinitas Anda.\n3. Catat kemajuan Anda setiap hari untuk memicu motivasi positif.`;
      } else if (q.includes('thiel') || q.includes('zero') || q.includes('bisnis') || q.includes('startup')) {
        responseText = `Peter Thiel menjelaskan dalam "Zero to One" bahwa persaingan dapat mengurangi keuntungan. Untuk membangun bisnis yang sukses, buatlah monopoli dengan:\n\n• Menemukan jawaban unik atas pertanyaan: "Kebenaran penting apa yang hanya disetujui oleh sedikit orang?"\n• Menghasilkan produk yang 10x lipat lebih baik dari yang ada.\n• Menguasai pasar kecil terlebih dahulu.`;
      } else if (q.includes('meditation') || q.includes('marcus') || q.includes('stoic') || q.includes('filsafat')) {
        responseText = `Marcus Aurelius dalam "Meditations" merenungkan bahwa kedamaian sejati bergantung pada kualitas pikiran Anda.\n\n• Hambatan adalah bahan bakar tindakan ("Apa yang menghalangi jalan akan menjadi jalan itu sendiri").\n• Bebaskan diri dari penyesalan dan kecemasan. Saat ini adalah satu-satunya momen yang dapat Anda kendalikan.`;
      } else if (q.includes('rubin') || q.includes('creative') || q.includes('seni') || q.includes('kreatif')) {
        responseText = `Dalam "The Creative Act", Rick Rubin menulis bahwa kreativitas bukanlah pencapaian profesional, melainkan cara kita memandang alam semesta. Tugas utama Anda adalah memperhatikan sinyal dan keindahan di sekitar Anda.`;
      }

      setChatLog(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText
      }]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <div className="space-y-6 overflow-y-auto pb-24 px-1 text-left scrollbar-none animate-slide-up">
      {/* View Header */}
      <div className="pt-2">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-clay font-bold block">
          / asisten cerdas
        </span>
        <h1 className="text-2xl font-serif font-bold text-charcoal dark:text-cream tracking-tight mt-0.5">
          Latihan Memori & Tanya Jawab
        </h1>
      </div>

      <div className="h-[1px] bg-sand/60 dark:bg-neutral-800/60" />

      {/* Spaced-Repetition Deck Section */}
      <div className="space-y-3.5">
        <div className="flex justify-between items-center px-1">
          <div className="flex gap-2 items-center text-xs font-bold text-charcoal dark:text-cream">
            <Brain size={14} className="text-sage" />
            <span className="font-serif">Kartu Memori Pembelajaran</span>
          </div>
          <span className="text-[9px] font-mono text-charcoal/50 dark:text-cream/50 font-semibold">{activeDeckIndex + 1} DARI {cardsToReview.length} KARTU</span>
        </div>

        {/* Tactile Flip Card */}
        <div 
          onClick={() => setShowDeckAnswer(!showDeckAnswer)}
          className={`
            p-5 min-h-[175px] rounded-3xl border cursor-pointer select-none
            flex flex-col justify-between text-left transition-all duration-500 hover:shadow-md
            ${showDeckAnswer 
              ? 'bg-alabaster dark:bg-[#1C1916] border-sand dark:border-neutral-800' 
              : 'bg-white dark:bg-[#151312] border-sand dark:border-neutral-800/40'
            }
          `}
        >
          <div className="space-y-3.5">
            <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold uppercase">
              <span>{cardsToReview[activeDeckIndex].bookTitle}</span>
              <span>{showDeckAnswer ? 'JAWABAN' : 'PERTANYAAN'}</span>
            </div>
            
            {showDeckAnswer ? (
              <p className="font-serif text-xs leading-relaxed text-charcoal dark:text-cream whitespace-pre-line">
                {cardsToReview[activeDeckIndex].answer}
              </p>
            ) : (
              <h3 className="font-serif font-bold text-sm text-charcoal dark:text-cream leading-snug">
                {cardsToReview[activeDeckIndex].question}
              </h3>
            )}
          </div>

          <div className="text-[9px] text-neutral-400 font-bold text-right mt-4 uppercase tracking-wider font-mono">
            {showDeckAnswer ? 'Sentuh untuk menutup jawaban' : 'Sentuh kartu untuk melihat jawaban'}
          </div>
        </div>

        {/* Quality feedback after revealing answer */}
        {showDeckAnswer && (
          <div className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/45 p-4 rounded-2xl text-xs space-y-2.5 animate-slide-up shadow-xs">
            <p className="text-[10px] text-charcoal/60 dark:text-cream/60 font-semibold text-center uppercase tracking-wider font-mono">Tingkat kemudahan mengingat:</p>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => {
                  setShowDeckAnswer(false);
                  setActiveDeckIndex((activeDeckIndex + 1) % cardsToReview.length);
                }}
                className="py-2.5 bg-charcoal dark:bg-cream dark:text-charcoal text-cream font-mono uppercase tracking-wider text-[9px] font-bold rounded-xl active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                Mudah (5h)
              </button>
              <button 
                onClick={() => {
                  setShowDeckAnswer(false);
                  setActiveDeckIndex((activeDeckIndex + 1) % cardsToReview.length);
                }}
                className="py-2.5 bg-neutral-600 dark:bg-neutral-800 dark:text-cream text-cream font-mono uppercase tracking-wider text-[9px] font-bold rounded-xl active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                Sedang (2h)
              </button>
              <button 
                onClick={() => {
                  setShowDeckAnswer(false);
                  setActiveDeckIndex((activeDeckIndex + 1) % cardsToReview.length);
                }}
                className="py-2.5 bg-alabaster dark:bg-neutral-900 text-charcoal dark:text-neutral-300 font-mono uppercase tracking-wider text-[9px] font-bold rounded-xl border border-sand dark:border-neutral-800 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                Ulangi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ask Bookshelf AI Workspace Panel */}
      <div className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 rounded-[28px] p-4 space-y-4 text-left shadow-xs">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center text-xs font-bold text-charcoal dark:text-cream">
            <MessageSquare size={14} className="text-charcoal dark:text-cream" />
            <span className="font-serif">Konsultasi Catatan Buku</span>
          </div>
          <Sparkles size={14} className="text-neutral-500 dark:text-neutral-400 animate-pulse" />
        </div>

        {/* Chat log messages */}
        <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1 text-[11px] scrollbar-none">
          {chatLog.map((msg) => (
            <div 
              key={msg.id}
              className={`p-3.5 rounded-2xl leading-relaxed space-y-1 ${
                msg.sender === 'user' 
                  ? 'bg-sand/40 dark:bg-neutral-800/60 ml-8 text-right text-charcoal dark:text-cream' 
                  : 'bg-alabaster dark:bg-[#1C1916] border border-sand dark:border-neutral-800/40 mr-8 text-charcoal/90 dark:text-cream/90'
              }`}
            >
              <span className="text-[8px] font-mono tracking-widest uppercase opacity-60 block">
                {msg.sender === 'user' ? 'PERTANYAAN ANDA' : 'ASISTEN MEMBACA'}
              </span>
              <p className="whitespace-pre-line text-left font-medium">{msg.text}</p>
            </div>
          ))}

          {isTyping && (
            <div className="bg-sand/30 dark:bg-neutral-800/40 p-3 rounded-2xl mr-8 text-[10px] italic flex items-center gap-1.5 animate-pulse text-charcoal/50 dark:text-neutral-400">
              <RefreshCw size={10} className="animate-spin text-charcoal dark:text-cream" />
              Menganalisis catatan membaca Anda...
            </div>
          )}
        </div>

        {/* Input prompt line */}
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Ketik pertanyaan Anda tentang buku..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-3.5 pr-12 py-2.5 bg-sand/30 dark:bg-[#1E1B19]/50 border border-transparent focus:border-charcoal/20 rounded-2xl outline-none text-xs text-charcoal dark:text-cream placeholder-charcoal/45 dark:placeholder-neutral-600 transition-colors"
          />
          <button 
            type="submit"
            className="absolute right-2 bg-charcoal dark:bg-cream hover:opacity-90 text-cream dark:text-charcoal p-1.5 rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            <Send size={12} />
          </button>
        </form>
      </div>
    </div>
  );
}
