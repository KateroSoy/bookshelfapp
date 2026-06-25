import React, { useState } from 'react';
import { Book } from '../types';
import { Search, Grid, List, Plus, SlidersHorizontal, BookOpen, Check, Star, Filter, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BookCover from './BookCover';

interface LibraryViewProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAddBook: (newBook: Book) => void;
  theme: 'light' | 'dark';
}

const GENRE_OPTIONS = ['Semua Kategori', 'Pengembangan Diri', 'Bisnis', 'Teknologi', 'Filsafat', 'Fiksi', 'Seni & Filsafat', 'Sains'];

export default function LibraryView({ books, onSelectBook, onAddBook, theme }: LibraryViewProps) {
  // Filters & State
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'finished' | 'tbr' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'progress' | 'rating' | 'pages'>('title');
  const [selectedGenre, setSelectedGenre] = useState('Semua Kategori');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddingBook, setIsAddingBook] = useState(false);

  // New Book Form State
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newGenre, setNewGenre] = useState('Pengembangan Diri');
  const [newPages, setNewPages] = useState(300);
  const [newStatus, setNewStatus] = useState<'reading' | 'finished' | 'tbr'>('tbr');
  const [newGradient, setNewGradient] = useState('linear-gradient(135deg, #7A5C3E 0%, #D9B88F 100%)');

  const GRADIENTS = [
    { name: 'Walnut', style: 'linear-gradient(135deg, #7A5C3E 0%, #D9B88F 100%)' },
    { name: 'Sage Forest', style: 'linear-gradient(135deg, #4F7661 0%, #769F88 100%)' },
    { name: 'Cosmic Indigo', style: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)' },
    { name: 'Tangerine Sunset', style: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' },
    { name: 'Onyx Slate', style: 'linear-gradient(135deg, #111827 0%, #374151 100%)' },
    { name: 'Crimson Rose', style: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)' }
  ];

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    const added: Book = {
      id: Date.now().toString(),
      title: newTitle,
      author: newAuthor,
      coverGradient: newGradient,
      coverTextColor: '#FFFFFF',
      status: newStatus,
      progress: newStatus === 'finished' ? 100 : newStatus === 'reading' ? 10 : 0,
      rating: 0,
      genre: newGenre,
      shelf: newStatus === 'finished' ? 'Favorit' : newStatus === 'reading' ? 'Pengembangan Diri' : 'Ingin Dibaca',
      pages: newPages,
      pagesRead: newStatus === 'finished' ? newPages : newStatus === 'reading' ? Math.round(newPages * 0.1) : 0,
      notesCount: 0,
      quotesCount: 0,
      aiSummary: `Ringkasan asisten AI sedang dipersiapkan. Bookshelf AI akan menganalisis buku "${newTitle}" secara dinamis. Pelajaran penting mencakup topik ${newGenre} untuk membantu Anda mengingat informasi melalui kartu memori.`,
      keyTakeaways: [
        'Sistem utama yang dijelaskan oleh penulis menyajikan pendekatan praktis yang terbukti bermanfaat.',
        'Pengetahuan bertumpuk secara perlahan melalui latihan memori. Mulailah mencatat kutipan dan pelajaran penting Anda.'
      ],
      reviewDue: false,
      notes: [],
      quotes: [],
      reviewCards: [],
      isFavorite: false
    };

    onAddBook(added);
    
    // Reset form
    setNewTitle('');
    setNewAuthor('');
    setNewGenre('Pengembangan Diri');
    setNewPages(300);
    setNewStatus('tbr');
    setIsAddingBook(false);
  };

  // Filter books list
  const filteredBooks = books
    .filter((book) => {
      // 1. Tab Status Filter
      if (activeTab === 'reading' && book.status !== 'reading') return false;
      if (activeTab === 'finished' && book.status !== 'finished') return false;
      if (activeTab === 'tbr' && book.status !== 'tbr') return false;
      if (activeTab === 'favorites' && !book.isFavorite) return false;

      // 2. Search Filter
      const matchQuery = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 3. Genre Filter
      const matchGenre = selectedGenre === 'Semua Kategori' || book.genre === selectedGenre;

      return matchQuery && matchGenre;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'pages') return b.pages - a.pages;
      return 0;
    });

  return (
    <div className="space-y-4 overflow-y-auto pb-24 px-1 text-left scrollbar-none animate-slide-up">
      {/* Top action header */}
      <div className="flex justify-between items-end pt-2">
        <div className="space-y-1">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold block">
            / katalog koleksi
          </span>
          <h1 className="text-2xl font-serif font-bold text-charcoal dark:text-cream tracking-tight">
            Rak Buku Anda
          </h1>
        </div>
        <button
          onClick={() => setIsAddingBook(true)}
          className="bg-charcoal dark:bg-cream dark:text-charcoal text-cream hover:opacity-95 text-[10px] font-mono uppercase tracking-wider px-3.5 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <Plus size={14} /> Tambah Buku
        </button>
      </div>

      <div className="h-[1px] bg-sand dark:bg-neutral-800/40" />

      {/* Adding book form overlay */}
      <AnimatePresence>
        {isAddingBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-cream dark:bg-[#151312] rounded-3xl border border-sand dark:border-neutral-800 max-w-sm w-full p-6 text-left space-y-4 shadow-2xl overflow-y-auto max-h-[85vh] scrollbar-none"
            >
              <div className="flex justify-between items-center pb-2 border-b border-sand dark:border-neutral-800">
                <h2 className="text-base font-serif font-bold text-charcoal dark:text-cream">Tambah Buku Baru</h2>
                <button 
                  onClick={() => setIsAddingBook(false)}
                  className="text-charcoal/40 dark:text-cream/40 hover:text-charcoal dark:hover:text-cream p-1 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateBook} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] tracking-wider uppercase text-charcoal/50 dark:text-neutral-500 block">Judul Buku</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: The Creative Act" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 bg-white dark:bg-[#1E1B19] border border-sand dark:border-neutral-800 rounded-xl text-charcoal dark:text-cream outline-none focus:border-charcoal dark:focus:border-cream transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] tracking-wider uppercase text-charcoal/50 dark:text-neutral-500 block">Nama Penulis</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Rick Rubin" 
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full p-3 bg-white dark:bg-[#1E1B19] border border-sand dark:border-neutral-800 rounded-xl text-charcoal dark:text-cream outline-none focus:border-charcoal dark:focus:border-cream transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-wider uppercase text-charcoal/50 dark:text-neutral-500 block">Kategori</label>
                    <select 
                      value={newGenre}
                      onChange={(e) => setNewGenre(e.target.value)}
                      className="w-full p-3 bg-white dark:bg-[#1E1B19] border border-sand dark:border-neutral-800 rounded-xl text-charcoal dark:text-cream outline-none focus:border-charcoal dark:focus:border-cream"
                    >
                      {GENRE_OPTIONS.filter(g => g !== 'Semua Kategori').map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-wider uppercase text-charcoal/50 dark:text-neutral-500 block">Jumlah Halaman</label>
                    <input 
                      type="number" 
                      min="1"
                      value={newPages}
                      onChange={(e) => setNewPages(parseInt(e.target.value) || 300)}
                      className="w-full p-3 bg-white dark:bg-[#1E1B19] border border-sand dark:border-neutral-800 rounded-xl text-charcoal dark:text-cream outline-none focus:border-charcoal dark:focus:border-cream transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] tracking-wider uppercase text-charcoal/50 dark:text-neutral-500 block">Status Membaca</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['reading', 'finished', 'tbr'] as const).map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setNewStatus(status)}
                        className={`py-2 text-[9px] font-mono tracking-wider uppercase rounded-lg border transition-all ${
                          newStatus === status 
                            ? 'bg-charcoal text-cream border-transparent' 
                            : 'bg-white dark:bg-[#1E1B19] border-sand dark:border-neutral-800 text-charcoal/70 dark:text-cream/70'
                        }`}
                      >
                        {status === 'tbr' ? 'Ingin Dibaca' : status === 'reading' ? 'Dibaca' : 'Selesai'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] tracking-wider uppercase text-charcoal/50 dark:text-neutral-500 block">Preset Desain Sampul</label>
                  <div className="flex gap-2 flex-wrap justify-between pt-1">
                    {GRADIENTS.map((g) => (
                      <button
                        key={g.name}
                        type="button"
                        onClick={() => setNewGradient(g.style)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          newGradient === g.style ? 'border-charcoal scale-110 shadow-xs' : 'border-transparent opacity-80'
                        }`}
                        style={{ background: g.style }}
                        title={g.name}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-charcoal dark:bg-cream dark:text-charcoal text-cream font-mono tracking-wider uppercase text-[10px] font-bold py-3.5 rounded-xl mt-6 shadow-md hover:opacity-95 transition-all active:scale-98"
                >
                  Simpan Buku ke Perpustakaan
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and filter controls */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream/30" size={14} />
          <input 
            type="text" 
            placeholder="Cari buku berdasarkan judul atau penulis..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-[#151312] border border-sand/50 dark:border-neutral-800 rounded-xl outline-none focus:border-charcoal dark:focus:border-cream text-charcoal dark:text-cream placeholder-charcoal/45 dark:placeholder-neutral-600 transition-colors"
          />
        </div>

        {/* Muted luxury selector bar */}
        <div className="flex gap-2 items-center justify-between overflow-x-auto py-1 scrollbar-none text-[10px] font-medium text-charcoal/60 dark:text-cream/50">
          <div className="flex gap-1.5 items-center shrink-0">
            <Filter size={11} className="text-charcoal dark:text-cream" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800 rounded-lg px-2 py-1 text-[10px] text-charcoal dark:text-cream outline-none cursor-pointer focus:border-charcoal dark:focus:border-cream"
            >
              {GENRE_OPTIONS.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-1.5 items-center shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800 rounded-lg px-2 py-1 text-[10px] text-charcoal dark:text-cream outline-none cursor-pointer focus:border-charcoal dark:focus:border-cream"
            >
              <option value="title">Urutan Abjad</option>
              <option value="progress">Kemajuan Membaca</option>
              <option value="rating">Nilai Buku</option>
              <option value="pages">Jumlah Halaman</option>
            </select>

            <div className="flex bg-white dark:bg-[#151312] rounded-lg p-0.5 border border-sand dark:border-neutral-800">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-neutral-100 dark:bg-neutral-800 text-charcoal dark:text-cream' : 'opacity-50'}`}
              >
                <Grid size={12} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1 rounded-md transition-colors ${viewMode === 'list' ? 'bg-neutral-100 dark:bg-neutral-800 text-charcoal dark:text-cream' : 'opacity-50'}`}
              >
                <List size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented active Tab controls - ultra thin borders */}
      <div className="grid grid-cols-5 bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 rounded-xl p-0.5 text-[9px] font-mono tracking-wider uppercase text-center gap-0.5 shadow-xs">
        {(['all', 'reading', 'finished', 'tbr', 'favorites'] as const).map(tab => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 rounded-lg transition-all duration-300 ${
                isSelected 
                  ? 'bg-charcoal dark:bg-cream text-cream dark:text-charcoal font-black shadow-xs' 
                  : 'text-charcoal/50 dark:text-cream/50 hover:text-charcoal dark:hover:text-cream hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              }`}
            >
              {tab === 'all' ? 'Semua' : tab === 'reading' ? 'Dibaca' : tab === 'finished' ? 'Selesai' : tab === 'tbr' ? 'Ingin Dibaca' : 'Favorit'}
            </button>
          );
        })}
      </div>

      {/* Books Content Grid */}
      {filteredBooks.length === 0 ? (
        <div className="py-16 border border-dashed border-sand dark:border-neutral-800 rounded-2xl text-center space-y-2 bg-white/40 dark:bg-[#151312]/30">
          <BookOpen className="mx-auto text-sand dark:text-neutral-700" size={32} />
          <h3 className="font-serif font-bold text-xs text-charcoal dark:text-cream">Buku tidak ditemukan</h3>
          <p className="text-[10px] text-charcoal/40 dark:text-cream/40 max-w-[200px] mx-auto">Coba bersihkan filter atau kata kunci pencarian Anda.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Pinterest style asymmetrical grid */
        <motion.div 
          layout
          className="grid grid-cols-3 gap-x-3 gap-y-5 pt-1.5"
        >
          {filteredBooks.map((book) => (
            <motion.div 
              layout
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="flex flex-col items-center cursor-pointer group text-center space-y-1.5 animate-fade-in"
            >
              <BookCover book={book} size="sm" showProgress />
              <div className="w-full">
                <h4 className="font-serif font-bold text-[10px] text-charcoal dark:text-cream line-clamp-1 leading-tight group-hover:underline">
                  {book.title}
                </h4>
                <p className="text-[8px] text-charcoal/40 dark:text-cream/40 font-mono tracking-wider uppercase scale-90 mt-0.5">
                  {book.author.split(' ').pop()}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* List view - clean design lines */
        <motion.div layout className="space-y-2 pt-1">
          {filteredBooks.map((book) => (
            <motion.div 
              layout
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="flex p-3 bg-white dark:bg-[#151312] border border-sand/40 dark:border-neutral-800/40 rounded-xl items-center justify-between cursor-pointer hover:border-charcoal dark:hover:border-cream hover:shadow-xs transition-all duration-300"
            >
              <div className="flex gap-3 items-center">
                <BookCover book={book} size="xs" />
                <div className="text-left space-y-0.5">
                  <h4 className="font-serif font-bold text-xs text-charcoal dark:text-cream line-clamp-1">{book.title}</h4>
                  <p className="text-[10px] text-charcoal/40 dark:text-cream/40 font-medium">{book.author}</p>
                  <span className="inline-block text-[8px] font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-charcoal dark:text-cream border border-neutral-200/50 dark:border-neutral-700 px-1.5 py-0.5 rounded">
                    {book.genre}
                  </span>
                </div>
              </div>

              <div className="text-right space-y-1 shrink-0 pl-2">
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-charcoal/40 dark:text-cream/40 bg-sand dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                  {book.status === 'tbr' ? 'Ingin Dibaca' : book.status === 'reading' ? 'Dibaca' : 'Selesai'}
                </span>
                {book.progress > 0 && (
                  <div className="text-[10px] font-mono font-bold text-charcoal dark:text-cream">{book.progress}%</div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
