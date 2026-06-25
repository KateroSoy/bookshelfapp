import React from 'react';
import { BookOpen, Sparkles, BookMarked, Brain, Target, Compass, ArrowRight, Star, Heart, Check, Smartphone, ArrowDown } from 'lucide-react';
import { Book } from '../types';
import BookCover from './BookCover';

interface LandingHeroProps {
  onStartApp: () => void;
  featuredBooks: Book[];
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function LandingHero({ onStartApp, featuredBooks, theme, onToggleTheme }: LandingHeroProps) {
  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      theme === 'dark' ? 'bg-charcoal text-cream' : 'bg-cream text-charcoal'
    }`}>
      {/* Texture Layer */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/2 pointer-events-none opacity-50" />

      {/* Sticky Navbar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        theme === 'dark' ? 'bg-charcoal/80 border-neutral-800' : 'bg-cream/80 border-sand'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={onStartApp}>
            <div className="w-9 h-9 rounded-full bg-charcoal flex items-center justify-center shadow-sm">
              <BookMarked className="text-cream" size={17} />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-charcoal">
              Bookshelf<span className="text-gold font-sans font-light">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider">
            <a href="#features" className="hover:opacity-60 transition-opacity">Fitur</a>
            <a href="#workflow" className="hover:opacity-60 transition-opacity">Cara Kerja</a>
            <a href="#pricing" className="hover:opacity-60 transition-opacity">Harga</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleTheme}
              className={`px-3 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-wider transition-all ${
                theme === 'dark' 
                  ? 'bg-neutral-900 border-neutral-800 text-cream' 
                  : 'bg-white border-sand text-charcoal hover:bg-alabaster'
              }`}
            >
              {theme === 'dark' ? 'Tema Terang' : 'Tema Gelap'}
            </button>
            <button
              onClick={onStartApp}
              className="bg-charcoal text-cream hover:opacity-90 font-mono text-xs uppercase tracking-wider px-5 h-10 rounded-full flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              Mulai Membaca
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Animated AI Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-charcoal/5 text-charcoal">
            <Sparkles size={11} className="animate-pulse" />
            Pendamping Membaca Pribadi Anda
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1]">
            Kelola perpustakaan Anda. <br />
            <span className="text-charcoal/50">Ingat setiap pelajaran penting.</span>
          </h1>

          <p className="text-sm sm:text-base opacity-80 max-w-xl leading-relaxed">
            Bookshelf AI membantu Anda menyusun buku fisik dan digital, mencatat kutipan berharga, mengingat pelajaran dengan kartu memori interaktif, dan membangun kebiasaan membaca yang baik secara konsisten.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={onStartApp}
              className="bg-charcoal text-cream hover:opacity-90 font-mono text-xs uppercase tracking-wider px-8 h-12 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
            >
              Buka Aplikasi
              <ArrowRight size={16} />
            </button>
            <a
              href="#features"
              className="border border-sand font-mono text-xs uppercase tracking-wider px-8 h-12 rounded-full flex items-center justify-center gap-2 hover:bg-alabaster transition-all"
            >
              Lihat Fitur
              <ArrowDown size={16} />
            </a>
          </div>

          {/* Social Proof */}
          <div className="pt-6 flex items-center gap-6">
            <div className="flex -space-x-3">
              <img className="w-9 h-9 rounded-full border-2 border-[#FFFDF8]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="User" />
              <img className="w-9 h-9 rounded-full border-2 border-[#FFFDF8]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="User" />
              <img className="w-9 h-9 rounded-full border-2 border-[#FFFDF8]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" alt="User" />
            </div>
            <div>
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
              </div>
              <p className="text-xs opacity-75 mt-0.5 font-medium">Disukai oleh lebih dari 4.200 pembaca setia</p>
            </div>
          </div>
        </div>

        {/* Dynamic App Preview Device */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#4F7661]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#7A5C3E]/10 rounded-full blur-3xl" />
          
          {/* Mockup Floating Container */}
          <div 
            onClick={onStartApp}
            className={`
              relative p-4 rounded-[44px] cursor-pointer group shadow-[0_30px_70px_rgba(0,0,0,0.25)] border transition-all duration-500 hover:scale-[1.02] ${
                theme === 'dark' ? 'bg-[#1C1916] border-white/5' : 'bg-[#FFFDF8] border-black/5'
              }
            `}
          >
            {/* Play Button Hover overlay */}
            <div className="absolute inset-0 rounded-[44px] bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-50">
              <div className="bg-[#FFFDF8] text-[#1F1A17] px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold shadow-xl scale-95 group-hover:scale-100 transition-transform duration-300">
                <Smartphone size={18} className="text-[#4F7661]" />
                Demo Aplikasi Interaktif
              </div>
            </div>

            {/* Simulated iPhone container inside the hero */}
            <div className="w-[280px] h-[540px] rounded-[32px] overflow-hidden relative shadow-inner bg-[#F7F1E8] border border-black/10 dark:border-white/10 flex flex-col justify-between">
              {/* Cover Gradient Header */}
              <div className="p-4 bg-gradient-to-b from-[#7A5C3E]/10 to-transparent flex flex-col items-center justify-center pt-8">
                <span className="text-[9px] font-mono tracking-widest text-[#7A5C3E] font-bold uppercase">SEDANG DIBACA</span>
                <div className="mt-3 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <BookCover book={featuredBooks[0]} size="sm" showProgress />
                </div>
                <h4 className="font-serif font-bold text-xs text-[#1F1A17] mt-3">{featuredBooks[0].title}</h4>
                <p className="text-[10px] text-[#75695F]">{featuredBooks[0].author}</p>
              </div>

              {/* Minimal App Preview Widget */}
              <div className="p-4 bg-white/60 dark:bg-[#1C1916]/60 backdrop-blur-md rounded-t-2xl border-t border-black/5 dark:border-white/5 space-y-3.5">
                <div className="flex justify-between items-center text-[10px] font-semibold text-[#75695F]">
                  <span>ASISTEN MEMORI</span>
                  <span className="text-[#4F7661] dark:text-[#769F88]">● 92% Kemudahan Mengingat</span>
                </div>
                <div className="bg-[#FFFDF8] dark:bg-[#11100E] p-2.5 rounded-xl border border-black/5 space-y-1 text-left shadow-sm">
                  <p className="text-[9px] font-bold text-[#4F7661]">Pelajaran Utama</p>
                  <p className="text-[10px] italic text-[#1F1A17] dark:text-white line-clamp-2">"Anda tidak naik ke tingkat target Anda. Anda jatuh ke tingkat sistem Anda."</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#F7F1E8]/70 dark:bg-black/10 p-1.5 rounded-lg border border-black/5">
                    <p className="text-[13px] font-bold text-[#1F1A17] dark:text-white">14</p>
                    <p className="text-[8px] text-[#75695F]">Buku</p>
                  </div>
                  <div className="bg-[#F7F1E8]/70 dark:bg-black/10 p-1.5 rounded-lg border border-black/5">
                    <p className="text-[13px] font-bold text-[#1F1A17] dark:text-white">68%</p>
                    <p className="text-[8px] text-[#75695F]">Kemajuan</p>
                  </div>
                  <div className="bg-[#F7F1E8]/70 dark:bg-black/10 p-1.5 rounded-lg border border-black/5">
                    <p className="text-[13px] font-bold text-[#1F1A17] dark:text-white">18h</p>
                    <p className="text-[8px] text-[#75695F]">Konsistensi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Section */}
      <section id="features" className={`py-20 transition-colors border-t border-b ${
        theme === 'dark' ? 'bg-[#1C1916] border-[#EDE3D2]/10' : 'bg-[#FFFDF8] border-[#75695F]/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">Sistem terbaik untuk kebiasaan membaca Anda</h2>
            <p className="opacity-80">Jangan biarkan pelajaran berharga dari buku terlupakan begitu saja. Kami membantu Anda menyusun buku, mengumpulkan catatan, dan melacak target membaca dalam satu aplikasi yang rapi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {/* Feature 1 */}
            <div className={`p-8 rounded-3xl border transition-all hover:shadow-md ${
              theme === 'dark' ? 'bg-[#11100E] border-white/5' : 'bg-[#F7F1E8] border-black/5'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-[#7A5C3E]/10 flex items-center justify-center text-[#7A5C3E] mb-6">
                <BookOpen size={22} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Perpustakaan Digital yang Rapi</h3>
              <p className="text-sm opacity-80 leading-relaxed">Susun semua koleksi buku Anda dengan desain sampul menarik, rak khusus (Ingin Dibaca, Sedang Dibaca, Selesai), penilaian, dan pencarian cepat.</p>
            </div>

            {/* Feature 2 */}
            <div className={`p-8 rounded-3xl border transition-all hover:shadow-md ${
              theme === 'dark' ? 'bg-[#11100E] border-white/5' : 'bg-[#F7F1E8] border-black/5'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-[#4F7661]/10 flex items-center justify-center text-[#4F7661] mb-6">
                <Brain size={22} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Asisten Pengingat Cerdas</h3>
              <p className="text-sm opacity-80 leading-relaxed">Dapatkan ringkasan otomatis, rangkuman pelajaran penting, kartu ingatan interaktif, dan latihan mengingat yang disesuaikan untuk Anda.</p>
            </div>

            {/* Feature 3 */}
            <div className={`p-8 rounded-3xl border transition-all hover:shadow-md ${
              theme === 'dark' ? 'bg-[#11100E] border-white/5' : 'bg-[#F7F1E8] border-black/5'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-[#D9B88F]/20 flex items-center justify-center text-[#7A5C3E] mb-6">
                <Target size={22} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Pelacak Target Membaca</h3>
              <p className="text-sm opacity-80 leading-relaxed">Bangun konsistensi harian dengan diagram interaktif, pelacak kemajuan bulanan, dan grafik halaman yang telah dibaca.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="workflow" className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">Bagaimana aplikasi ini meningkatkan kebiasaan membaca Anda</h2>
            <p className="opacity-80">Langkah-langkah sederhana yang dirancang untuk mendukung rutinitas membaca harian Anda.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left relative">
            <div className="space-y-4">
              <div className="text-4xl font-serif font-bold text-[#7A5C3E]/30">01</div>
              <h3 className="text-xl font-bold">Masukkan Buku Anda</h3>
              <p className="text-sm opacity-80 leading-relaxed">Catat buku yang sedang Anda baca dengan cepat, tentukan kategori, dan buat rak buku Anda sendiri.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-serif font-bold text-[#7A5C3E]/30">02</div>
              <h3 className="text-xl font-bold">Tulis Catatan & Kutipan</h3>
              <p className="text-sm opacity-80 leading-relaxed">Simpan kalimat inspiratif dan refleksi pribadi Anda langsung selagi memperbarui persentase kemajuan membaca.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-serif font-bold text-[#7A5C3E]/30">03</div>
              <h3 className="text-xl font-bold">Latih Ingatan Bersama Asisten</h3>
              <p className="text-sm opacity-80 leading-relaxed">Gunakan kartu memori cerdas atau buka kartu latihan berkala untuk mengingat kembali pelajaran penting kapan saja.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section id="pricing" className={`py-20 transition-colors border-t border-b ${
        theme === 'dark' ? 'bg-[#1C1916] border-[#EDE3D2]/10' : 'bg-[#FFFDF8] border-[#75695F]/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">Pilihan yang sesuai untuk setiap pembaca</h2>
            <p className="opacity-80">Mulai rapikan perpustakaan pribadi Anda secara gratis, atau dapatkan fitur asisten pengingat cerdas tanpa batas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tier 1 */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between text-left ${
              theme === 'dark' ? 'bg-[#11100E] border-white/5' : 'bg-[#F7F1E8] border-black/5'
            }`}>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Pendamping Gratis</h3>
                <p className="text-sm opacity-75">Cocok untuk menyusun buku yang ingin dibaca dan melihat statistik dasar.</p>
                <div className="pt-2">
                  <span className="text-3xl font-serif font-bold">$0</span>
                  <span className="text-xs opacity-60"> / selamanya</span>
                </div>
                <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-2.5 text-xs">
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#4F7661]" /> <span>Hingga 15 Buku</span></div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#4F7661]" /> <span>Kategori Rak Dasar</span></div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#4F7661]" /> <span>Pelacak Target Membaca</span></div>
                </div>
              </div>
              <button onClick={onStartApp} className="w-full bg-espresso/5 text-espresso dark:bg-white/10 dark:text-white font-medium py-3 rounded-xl mt-8 text-sm hover:opacity-85 transition-opacity">
                Mulai Sekarang
              </button>
            </div>

            {/* Tier 2 */}
            <div className={`p-8 rounded-3xl border-2 border-[#7A5C3E] flex flex-col justify-between text-left relative shadow-lg ${
              theme === 'dark' ? 'bg-[#1C1916]' : 'bg-[#FFFDF8]'
            }`}>
              <div className="absolute -top-3.5 right-6 bg-[#7A5C3E] text-[#FFFDF8] text-[9px] font-mono tracking-widest uppercase font-bold px-3 py-1.5 rounded-full shadow-sm">
                DIREKOMENDASIKAN
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Bookshelf Pro</h3>
                <p className="text-sm opacity-75">Untuk pembaca aktif yang menginginkan asisten pengingat lengkap.</p>
                <div className="pt-2">
                  <span className="text-3xl font-serif font-bold">$8</span>
                  <span className="text-xs opacity-60"> / bulan</span>
                </div>
                <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-2.5 text-xs">
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#4F7661]" /> <span>Penyimpanan Buku <b>Tanpa Batas</b></span></div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#4F7661]" /> <span>Ringkasan & Pelajaran Utama Tanpa Batas</span></div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#4F7661]" /> <span>Kartu Latihan Mengingat Berkala</span></div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#4F7661]" /> <span>Diskusi Interaktif tentang Buku Anda</span></div>
                </div>
              </div>
              <button onClick={onStartApp} className="w-full bg-[#7A5C3E] text-[#FFFDF8] font-medium py-3 rounded-xl mt-8 text-sm hover:bg-[#7A5C3E]/90 transition-colors shadow-md">
                Coba Versi Demo Pro
              </button>
            </div>

            {/* Tier 3 */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between text-left ${
              theme === 'dark' ? 'bg-[#11100E] border-white/5' : 'bg-[#F7F1E8] border-black/5'
            }`}>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Akses Seumur Hidup</h3>
                <p className="text-sm opacity-75">Bayar sekali untuk memiliki seluruh fitur asisten selamanya.</p>
                <div className="pt-2">
                  <span className="text-3xl font-serif font-bold">$99</span>
                  <span className="text-xs opacity-60"> / sekali bayar</span>
                </div>
                <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-2.5 text-xs">
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#4F7661]" /> <span>Semua Fitur Pro Seumur Hidup</span></div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#4F7661]" /> <span>Akses Server Prioritas</span></div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#4F7661]" /> <span>Akses Lebih Cepat ke Fitur Baru</span></div>
                </div>
              </div>
              <button onClick={onStartApp} className="w-full bg-espresso/5 text-espresso dark:bg-white/10 dark:text-white font-medium py-3 rounded-xl mt-8 text-sm hover:opacity-85 transition-opacity">
                Miliki Selamanya
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between text-xs opacity-75 gap-4">
        <p>© 2026 Bookshelf AI. Dibuat untuk para pembaca aktif. Tanpa kuki, tanpa pelacak.</p>
        <div className="flex gap-6">
          <a href="#features" className="hover:underline">Kebijakan Privasi</a>
          <a href="#workflow" className="hover:underline">Ketentuan Layanan</a>
          <button onClick={onStartApp} className="hover:underline">Hubungi Dukungan</button>
        </div>
      </footer>
    </div>
  );
}
