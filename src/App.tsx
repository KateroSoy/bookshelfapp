import React, { useState, useEffect } from 'react';
import { Book, ReadingGoal, UserProfile } from './types';
import { mockBooks, mockReadingGoal, mockUserProfile } from './mockData';
import PhoneShell from './components/PhoneShell';
import LandingHero from './components/LandingHero';
import Onboarding from './components/Onboarding';
import DashboardView from './components/DashboardView';
import LibraryView from './components/LibraryView';
import BookDetailView from './components/BookDetailView';
import GoalsView from './components/GoalsView';
import MemoryView from './components/MemoryView';
import SettingsView from './components/SettingsView';
import LoginView from './components/LoginView';

// Nav icons for Mobile Tab Bar
import { Home, Library, Target, Brain, Settings, Sparkles, BookMarked, Smartphone, Monitor, Sun, Moon, User } from 'lucide-react';

export default function App() {
  // Navigation & Router State
  const [route, setRoute] = useState<'landing' | 'onboarding' | 'app'>(() => {
    try {
      const saved = localStorage.getItem('bookshelf_route');
      return (saved as 'landing' | 'onboarding' | 'app') || 'landing';
    } catch (e) {
      return 'landing';
    }
  });
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'library' | 'goals' | 'memory' | 'settings'>(() => {
    try {
      const saved = localStorage.getItem('bookshelf_active_tab');
      return (saved as 'dashboard' | 'library' | 'goals' | 'memory' | 'settings') || 'dashboard';
    } catch (e) {
      return 'dashboard';
    }
  });

  const [credentials, setCredentials] = useState<{ username?: string; password?: string }>(() => {
    try {
      const saved = localStorage.getItem('bookshelf_credentials');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [isLocked, setIsLocked] = useState<boolean>(() => {
    try {
      const savedCreds = localStorage.getItem('bookshelf_credentials');
      if (savedCreds) {
        const parsed = JSON.parse(savedCreds);
        if (parsed.password) return true;
      }
    } catch (e) {
      // Ignored
    }
    // If no password, force lock so they have to create one
    return true;
  });
  
  // Selected Book for Detail View Overlay
  const [selectedBook, setSelectedBook] = useState<Book | null>(() => {
    try {
      const saved = localStorage.getItem('bookshelf_selected_book');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Core App State (With safe fallback to mockData)
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('bookshelf_books');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error parsing books from localStorage', e);
    }
    return [];
  });

  const [readingGoal, setReadingGoal] = useState<ReadingGoal>(() => {
    try {
      const saved = localStorage.getItem('bookshelf_reading_goal');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error parsing reading goal from localStorage', e);
    }
    return mockReadingGoal;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    let profile = { name: '', email: '', avatarUrl: '', favoriteGenres: [], joinedAt: new Date().toISOString() };
    try {
      const saved = localStorage.getItem('bookshelf_user_profile');
      if (saved) {
        profile = { ...profile, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error parsing user profile from localStorage', e);
    }

    // Always override profile name with credentials.username if present
    try {
      const savedCreds = localStorage.getItem('bookshelf_credentials');
      if (savedCreds) {
        const creds = JSON.parse(savedCreds);
        if (creds && creds.username) {
          profile.name = creds.username;
        }
      }
    } catch (e) {
      // Ignored
    }
    return profile;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return (saved as 'light' | 'dark') || 'light';
    } catch (e) {
      return 'light';
    }
  });

  // Presentation Layout State (Desktop only)
  const [layoutMode, setLayoutMode] = useState<'phone' | 'desktop'>(() => {
    try {
      const saved = localStorage.getItem('bookshelf_layout_mode');
      return (saved as 'phone' | 'desktop') || 'phone';
    } catch (e) {
      return 'phone';
    }
  });

  // Handle setting active dark/light mode classes on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Synchronizers to guarantee auto-saving across updates without manual saves
  useEffect(() => {
    try {
      localStorage.setItem('bookshelf_books', JSON.stringify(books));
    } catch (e) {
      console.error('Error writing books to localStorage', e);
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem('bookshelf_reading_goal', JSON.stringify(readingGoal));
    } catch (e) {
      console.error('Error writing reading goal to localStorage', e);
    }
  }, [readingGoal]);

  useEffect(() => {
    try {
      localStorage.setItem('bookshelf_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error('Error writing user profile to localStorage', e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('bookshelf_route', route);
    } catch (e) {
      console.error('Error writing route to localStorage', e);
    }
  }, [route]);

  useEffect(() => {
    try {
      localStorage.setItem('bookshelf_active_tab', activeTab);
    } catch (e) {
      console.error('Error writing active tab to localStorage', e);
    }
  }, [activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem('bookshelf_selected_book', selectedBook ? JSON.stringify(selectedBook) : '');
    } catch (e) {
      console.error('Error writing selected book to localStorage', e);
    }
  }, [selectedBook]);

  useEffect(() => {
    try {
      localStorage.setItem('bookshelf_layout_mode', layoutMode);
    } catch (e) {
      console.error('Error writing layout mode to localStorage', e);
    }
  }, [layoutMode]);

  useEffect(() => {
    try {
      localStorage.setItem('bookshelf_credentials', JSON.stringify(credentials));
    } catch (e) {
      console.error('Error writing credentials to localStorage', e);
    }
  }, [credentials]);

  // Keep user profile name in sync with login username (nama pengguna)
  useEffect(() => {
    if (credentials.username && userProfile.name !== credentials.username) {
      setUserProfile(prev => ({
        ...prev,
        name: credentials.username || prev.name
      }));
    }
  }, [credentials.username]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch (e) {
      console.error('Error writing theme to localStorage', e);
    }
  };

  // Onboarding Complete Handler
  const handleCompleteOnboarding = (data: {
    favoriteGenres: string[];
    annualTarget: number;
    monthlyPagesTarget: number;
    selectedInitialBooks: string[];
  }) => {
    // 1. Update user profile favorite genres
    setUserProfile(prev => ({
      ...prev,
      favoriteGenres: data.favoriteGenres
    }));

    // 2. Update annual/monthly target goals
    setReadingGoal(prev => ({
      ...prev,
      annualTarget: data.annualTarget,
      monthlyPagesTarget: data.monthlyPagesTarget
    }));

    // 3. Mark selected starter books as 'reading' and add them to the library
    const starterBooksToAdd = mockBooks
      .filter(b => data.selectedInitialBooks.includes(b.id))
      .map(b => ({ ...b, status: 'reading' as const, progress: 10, pagesRead: Math.round(b.pages * 0.1) }));
      
    setBooks(prevBooks => {
      const existingIds = new Set(prevBooks.map(b => b.id));
      const newBooks = starterBooksToAdd.filter(b => !existingIds.has(b.id));
      return [...newBooks, ...prevBooks];
    });

    // 4. Advance route
    setRoute('app');
    setActiveTab('dashboard');
  };

  // Add Book handler from catalog modal
  const handleAddBook = (newBook: Book) => {
    setBooks(prev => [newBook, ...prev]);
  };

  // Update singular Book metadata (progress, notes, ratings)
  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
    setSelectedBook(updatedBook); // Sync details
  };

  // Handle single-card rating adjustments
  const handleFavoriteToggle = (bookId: string, isFav: boolean) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, isFavorite: isFav } : b));
  };

  // Side benefit: auto close details when navigating away
  const handleNavigateTab = (tab: any) => {
    setActiveTab(tab);
    setSelectedBook(null);
  };

  // Credentials and Security Handlers
  const handleSaveCredentials = (username?: string, password?: string) => {
    if (!username || !password) {
      setCredentials({});
      setIsLocked(false);
    } else {
      setCredentials({ username, password });
      setUserProfile(prev => ({
        ...prev,
        name: username
      }));
    }
  };

  const handleRestoreBackup = (data: {
    books: Book[];
    readingGoal: ReadingGoal;
    userProfile: UserProfile;
    credentials?: { username?: string; password?: string };
  }) => {
    setBooks(data.books);
    setReadingGoal(data.readingGoal);
    
    const restoredProfile = { ...data.userProfile };
    if (data.credentials?.username) {
      restoredProfile.name = data.credentials.username;
    }
    setUserProfile(restoredProfile);
    
    if (data.credentials) {
      setCredentials(data.credentials);
    }
    setIsLocked(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      theme === 'dark' ? 'bg-[#1C1917] text-cream' : 'bg-cream text-charcoal'
    }`}>
      {/* Route 1: Landing Marketing Page */}
      {route === 'landing' && (
        <LandingHero 
          onStartApp={() => setRoute('onboarding')}
          featuredBooks={books.length > 0 ? books : mockBooks}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      )}

      {/* Route 2: Onboarding Setup Flow */}
      {route === 'onboarding' && (
        <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center py-8 px-4">
          <div className="bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200/60 dark:border-stone-800 overflow-hidden w-full h-[680px]">
            <Onboarding onComplete={handleCompleteOnboarding} theme={theme} />
          </div>
        </div>
      )}

      {/* Route 3: Main Core SaaS App */}
      {route === 'app' && isLocked && (
        <LoginView 
          credentials={credentials} 
          onUnlock={() => setIsLocked(false)} 
          onCreateCredentials={handleSaveCredentials}
          theme={theme} 
        />
      )}

      {route === 'app' && !isLocked && (
        <div className="min-h-screen flex flex-col">
          {/* Header Controls toolbar */}
          <header className="h-16 px-6 border-b border-sand dark:border-neutral-800/60 flex items-center justify-between bg-white/90 dark:bg-[#151312]/90 backdrop-blur-md sticky top-0 z-40">
            {/* Left side logo branding */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setRoute('landing')}>
              <div className="w-8 h-8 rounded-full bg-charcoal dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                <BookMarked className="text-cream" size={15} />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-charcoal dark:text-cream">
                Bookshelf<span className="text-gold font-sans font-light">AI</span>
              </span>
            </div>

            {/* Layout Mode selector (hidden on mobile devices, responsive) */}
            <div className="hidden md:flex bg-alabaster dark:bg-[#1E1B19]/50 rounded-full p-0.5 border border-sand dark:border-neutral-800/60">
              <button 
                onClick={() => setLayoutMode('phone')}
                className={`px-3 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === 'phone' 
                    ? 'bg-white dark:bg-[#2A2624] text-charcoal dark:text-cream shadow-sm' 
                    : 'opacity-50 hover:opacity-100 text-charcoal dark:text-cream/70'
                }`}
              >
                <Smartphone size={11} /> Tampilan Seluler
              </button>
              <button 
                onClick={() => setLayoutMode('desktop')}
                className={`px-3 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === 'desktop' 
                    ? 'bg-white dark:bg-[#2A2624] text-charcoal dark:text-cream shadow-sm' 
                    : 'opacity-50 hover:opacity-100 text-charcoal dark:text-cream/70'
                }`}
              >
                <Monitor size={11} /> Tampilan Desktop
              </button>
            </div>

            {/* Right side Profile & settings */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={handleToggleTheme}
                className="p-1.5 bg-alabaster dark:bg-neutral-800 hover:bg-sand dark:hover:bg-neutral-700 text-charcoal dark:text-cream rounded-full transition-all active:scale-95 flex items-center justify-center border border-transparent cursor-pointer"
                title={theme === 'dark' ? 'Tema Terang' : 'Tema Gelap'}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button
                onClick={() => handleNavigateTab('settings')}
                className={`p-1.5 hover:bg-sand dark:hover:bg-neutral-800 rounded-full text-charcoal dark:text-cream transition-all active:scale-95 flex items-center justify-center border cursor-pointer ${
                  activeTab === 'settings' ? 'border-charcoal dark:border-cream/30 bg-sand dark:bg-[#1E1B19]' : 'border-transparent'
                }`}
                title="Pengaturan & Cadangan"
              >
                <Settings size={15} />
              </button>
              <div 
                className="flex items-center gap-2 border-l border-sand dark:border-neutral-800/60 pl-2.5 cursor-pointer hover:opacity-85"
                onClick={() => handleNavigateTab('settings')}
              >
                <div className="w-8 h-8 rounded-full border border-stone-200 dark:border-neutral-800/60 bg-stone-100 dark:bg-neutral-800/60 flex items-center justify-center text-stone-600 dark:text-stone-300 shadow-xs">
                  <User size={14} className="stroke-[2.5]" />
                </div>
                <span className="hidden sm:inline text-xs font-bold text-stone-800 dark:text-cream/90">{userProfile.name}</span>
              </div>
            </div>
          </header>

          {/* Active Workspaces rendering based on Layout Mode */}
          <main className="flex-1 flex justify-center items-stretch relative overflow-hidden">
            
            {/* LAYOUT 1: Interactive Smartphone mockup (Highly polished, tactile) */}
            {layoutMode === 'phone' && (
              <div className="flex-1 w-full flex items-center justify-center py-6 relative">
                {/* Minimal Editorial grids reminiscent of modern art directories */}
                <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.03] dark:opacity-[0.01]">
                  <div className="border-r border-stone-900 h-full col-span-3" />
                  <div className="border-r border-stone-900 h-full col-span-3" />
                  <div className="border-r border-stone-900 h-full col-span-3" />
                  <div className="border-r border-stone-900 h-full col-span-3" />
                </div>

                <div className="hidden lg:block absolute left-10 xl:left-20 top-1/3 max-w-[260px] text-left space-y-4 animate-slide-up">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-clay font-bold uppercase">/ MATRIKS KONSEP</span>
                  <h3 className="font-serif italic font-normal text-3xl text-stone-900 dark:text-white leading-snug">
                    menyusun pemikiran Anda, <span className="font-semibold not-italic text-clay">lembar</span> demi lembar.
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-medium">
                    Bookshelf AI adalah wadah belajar aktif untuk menyusun karya tulis, memetakan kemajuan, dan memperkuat ingatan konsep penting.
                  </p>
                </div>

                <div className="hidden lg:block absolute right-10 xl:right-20 top-1/3 max-w-[260px] text-left space-y-4 animate-slide-up">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-sage font-bold uppercase">/ DESAIN INTERAKTIF</span>
                  <h3 className="font-serif italic font-normal text-3xl text-stone-900 dark:text-white leading-snug">
                    akurasi ramah <span className="font-semibold not-italic text-sage">seluler</span>.
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-medium">
                    Berinteraksi langsung dengan simulator visual. Geser persentase kemajuan, klik menu navigasi, tandai buku favorit, atau latih memori Anda.
                  </p>
                </div>

                <PhoneShell theme={theme}>
                  <div className={`w-full h-full flex flex-col justify-between relative px-5 pt-2 overflow-hidden bg-cream dark:bg-[#11100E]`}>
                    {/* The main App Content inside the phone frame */}
                    <div className="flex-1 overflow-hidden relative">
                      {selectedBook ? (
                        <BookDetailView 
                          book={selectedBook}
                          onBack={() => setSelectedBook(null)}
                          onUpdateBook={handleUpdateBook}
                          theme={theme}
                        />
                      ) : (
                        <>
                          {activeTab === 'dashboard' && (
                            <DashboardView 
                              books={books}
                              readingGoal={readingGoal}
                              user={userProfile}
                              onSelectBook={setSelectedBook}
                              onNavigateToTab={handleNavigateTab}
                              onFavoriteToggle={handleFavoriteToggle}
                              theme={theme}
                            />
                          )}
                          {activeTab === 'library' && (
                            <LibraryView 
                              books={books}
                              onSelectBook={setSelectedBook}
                              onAddBook={handleAddBook}
                              theme={theme}
                            />
                          )}
                          {activeTab === 'goals' && (
                            <GoalsView 
                              readingGoal={readingGoal}
                              books={books}
                              user={userProfile}
                              theme={theme}
                            />
                          )}
                          {activeTab === 'memory' && (
                            <MemoryView 
                              books={books}
                              theme={theme}
                            />
                          )}
                          {activeTab === 'settings' && (
                            <SettingsView 
                              books={books}
                              readingGoal={readingGoal}
                              user={userProfile}
                              credentials={credentials}
                              onSaveCredentials={handleSaveCredentials}
                              onRestore={handleRestoreBackup}
                              onLock={() => setIsLocked(true)}
                              theme={theme}
                              isCompact={true}
                            />
                          )}
                        </>
                      )}
                    </div>

                    {/* Bottom iOS Navigation Tab Bar (only if no detail card is open) */}
                    {!selectedBook && (
                      <nav className="h-16 border-t border-stone-200/50 dark:border-neutral-800/60 -mx-5 px-6 flex justify-between items-center z-30 bg-white/95 dark:bg-[#1E1B19]/95 backdrop-blur-md">
                        <button 
                          onClick={() => setActiveTab('dashboard')}
                          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === 'dashboard' ? 'text-charcoal dark:text-cream scale-105 font-bold' : 'text-stone-500 hover:text-charcoal dark:text-stone-400 dark:hover:text-cream'}`}
                        >
                          <Home size={15} />
                          <span className="text-[8px] font-mono uppercase tracking-wider">Beranda</span>
                        </button>
                        <button 
                          onClick={() => setActiveTab('library')}
                          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === 'library' ? 'text-charcoal dark:text-cream scale-105 font-bold' : 'text-stone-500 hover:text-charcoal dark:text-stone-400 dark:hover:text-cream'}`}
                        >
                          <Library size={15} />
                          <span className="text-[8px] font-mono uppercase tracking-wider">Rak Buku</span>
                        </button>
                        <button 
                          onClick={() => setActiveTab('goals')}
                          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === 'goals' ? 'text-charcoal dark:text-cream scale-105 font-bold' : 'text-stone-500 hover:text-charcoal dark:text-stone-400 dark:hover:text-cream'}`}
                        >
                          <Target size={15} />
                          <span className="text-[8px] font-mono uppercase tracking-wider">Target</span>
                        </button>
                        <button 
                          onClick={() => setActiveTab('memory')}
                          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === 'memory' ? 'text-charcoal dark:text-cream scale-105 font-bold' : 'text-stone-500 hover:text-charcoal dark:text-stone-400 dark:hover:text-cream'}`}
                        >
                          <Brain size={15} />
                          <span className="text-[8px] font-mono uppercase tracking-wider">Memori</span>
                        </button>
                        <button 
                          onClick={() => setActiveTab('settings')}
                          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === 'settings' ? 'text-charcoal dark:text-cream scale-105 font-bold' : 'text-stone-500 hover:text-charcoal dark:text-stone-400 dark:hover:text-cream'}`}
                        >
                          <Settings size={15} />
                          <span className="text-[8px] font-mono uppercase tracking-wider">Pengaturan</span>
                        </button>
                      </nav>
                    )}
                  </div>
                </PhoneShell>
              </div>
            )}

            {/* LAYOUT 2: Classic Fullscreen Desktop SaaS workspace (Widescreen optimized) */}
            {layoutMode === 'desktop' && (
              <div className="flex-1 flex max-w-7xl mx-auto w-full text-left overflow-hidden">
                {/* Left persistent Sidebar */}
                <aside className="w-64 border-r border-stone-200/50 dark:border-neutral-800/60 p-6 flex flex-col justify-between hidden md:flex shrink-0">
                  <div className="space-y-6">
                    <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase font-bold block">NAVIGASI</span>
                    <nav className="space-y-1 text-xs">
                      <button 
                        onClick={() => handleNavigateTab('dashboard')}
                        className={`w-full p-3 rounded-lg flex items-center gap-3 font-bold transition-all cursor-pointer ${
                          activeTab === 'dashboard' && !selectedBook
                            ? 'bg-charcoal/10 dark:bg-cream/10 text-charcoal dark:text-cream' 
                            : 'text-stone-600 hover:text-charcoal dark:text-stone-400 dark:hover:text-cream hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
                        }`}
                      >
                        <Home size={15} /> Beranda
                      </button>
                      <button 
                        onClick={() => handleNavigateTab('library')}
                        className={`w-full p-3 rounded-lg flex items-center gap-3 font-bold transition-all cursor-pointer ${
                          activeTab === 'library' || selectedBook
                            ? 'bg-charcoal/10 dark:bg-cream/10 text-charcoal dark:text-cream' 
                            : 'text-stone-600 hover:text-charcoal dark:text-stone-400 dark:hover:text-cream hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
                        }`}
                      >
                        <Library size={15} /> Rak Buku Anda
                      </button>
                      <button 
                        onClick={() => handleNavigateTab('goals')}
                        className={`w-full p-3 rounded-lg flex items-center gap-3 font-bold transition-all cursor-pointer ${
                          activeTab === 'goals' && !selectedBook
                            ? 'bg-charcoal/10 dark:bg-cream/10 text-charcoal dark:text-cream' 
                            : 'text-stone-600 hover:text-charcoal dark:text-stone-400 dark:hover:text-cream hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
                        }`}
                      >
                        <Target size={15} /> Target Membaca
                      </button>
                      <button 
                        onClick={() => handleNavigateTab('memory')}
                        className={`w-full p-3 rounded-lg flex items-center gap-3 font-bold transition-all cursor-pointer ${
                          activeTab === 'memory' && !selectedBook
                            ? 'bg-charcoal/10 dark:bg-cream/10 text-charcoal dark:text-cream' 
                            : 'text-stone-600 hover:text-charcoal dark:text-stone-400 dark:hover:text-cream hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
                        }`}
                      >
                        <Brain size={15} /> Latihan Memori
                      </button>
                      <button 
                        onClick={() => handleNavigateTab('settings')}
                        className={`w-full p-3 rounded-lg flex items-center gap-3 font-bold transition-all cursor-pointer ${
                          activeTab === 'settings' && !selectedBook
                            ? 'bg-charcoal/10 dark:bg-cream/10 text-charcoal dark:text-cream' 
                            : 'text-stone-600 hover:text-charcoal dark:text-stone-400 dark:hover:text-cream hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
                        }`}
                      >
                        <Settings size={15} /> Pengaturan Sistem
                      </button>
                    </nav>
                  </div>

                  {/* Tiny account details block */}
                  <div className="space-y-4">
                    <div className="border-t border-stone-200/50 dark:border-neutral-800/60 pt-4 flex gap-2.5 items-center">
                      <div className="w-9 h-9 rounded-full border border-stone-200 dark:border-neutral-800/60 bg-stone-100 dark:bg-neutral-800/60 flex items-center justify-center text-stone-600 dark:text-stone-300 shadow-xs">
                        <User size={16} className="stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold truncate text-stone-800 dark:text-stone-200">{userProfile.name}</h4>
                        <p className="text-[10px] text-stone-400 truncate">{userProfile.email}</p>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Main scrollable workspace layout */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  {selectedBook ? (
                    <BookDetailView 
                      book={selectedBook}
                      onBack={() => setSelectedBook(null)}
                      onUpdateBook={handleUpdateBook}
                      theme={theme}
                    />
                  ) : (
                    <div className="max-w-4xl mx-auto">
                      {activeTab === 'dashboard' && (
                        <DashboardView 
                          books={books}
                          readingGoal={readingGoal}
                          user={userProfile}
                          onSelectBook={setSelectedBook}
                          onNavigateToTab={handleNavigateTab}
                          onFavoriteToggle={handleFavoriteToggle}
                          theme={theme}
                        />
                      )}
                      {activeTab === 'library' && (
                        <LibraryView 
                          books={books}
                          onSelectBook={setSelectedBook}
                          onAddBook={handleAddBook}
                          theme={theme}
                        />
                      )}
                      {activeTab === 'goals' && (
                        <GoalsView 
                          readingGoal={readingGoal}
                          books={books}
                          user={userProfile}
                          theme={theme}
                        />
                      )}
                      {activeTab === 'memory' && (
                        <MemoryView 
                          books={books}
                          theme={theme}
                        />
                      )}
                      {activeTab === 'settings' && (
                        <SettingsView 
                          books={books}
                          readingGoal={readingGoal}
                          user={userProfile}
                          credentials={credentials}
                          onSaveCredentials={handleSaveCredentials}
                          onRestore={handleRestoreBackup}
                          onLock={() => setIsLocked(true)}
                          theme={theme}
                          isCompact={false}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

          </main>
        </div>
      )}
    </div>
  );
}
