import React, { useState } from 'react';
import { KeyRound, Shield, HelpCircle, Eye, EyeOff, UserPlus } from 'lucide-react';

interface LoginViewProps {
  credentials: { username?: string; password?: string };
  onUnlock: () => void;
  onCreateCredentials: (username?: string, password?: string) => void;
  theme: 'light' | 'dark';
}

export default function LoginView({ credentials, onUnlock, onCreateCredentials, theme }: LoginViewProps) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCreating = !credentials.password; // If no password saved, we are in creation mode

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const userInput = usernameInput.trim().toLowerCase();
    const passInput = passwordInput.trim();

    if (isCreating) {
      if (!userInput || !passInput) {
        setError('Nama pengguna dan kata sandi wajib diisi.');
        return;
      }
      onCreateCredentials(usernameInput.trim(), passInput);
      onUnlock();
    } else {
      const targetUser = (credentials.username || '').trim().toLowerCase();
      const targetPass = (credentials.password || '').trim();

      if (userInput === targetUser && passInput === targetPass) {
        onUnlock();
      } else {
        setError('Nama pengguna atau kata sandi tidak cocok. Silakan coba lagi.');
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 transition-colors duration-300 font-sans ${
      theme === 'dark' ? 'bg-[#12100E] text-cream' : 'bg-cream text-charcoal'
    }`}>
      {/* Decorative clean line elements */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.03] dark:opacity-[0.01]">
        <div className="border-r border-stone-900 col-span-3 h-full" />
        <div className="border-r border-stone-900 col-span-3 h-full" />
        <div className="border-r border-stone-900 col-span-3 h-full" />
        <div className="border-r border-stone-900 col-span-3 h-full" />
      </div>

      <div className="max-w-md w-full bg-white dark:bg-[#1C1916] border border-sand dark:border-neutral-800 p-8 rounded-3xl space-y-7 shadow-xl relative z-10 text-left">
        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-charcoal dark:bg-neutral-800 flex items-center justify-center mx-auto shadow-sm text-cream">
            <Shield size={20} />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-charcoal dark:text-cream">
              Bookshelf<span className="text-gold font-sans font-light">AI</span>
            </h2>
            <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 font-bold uppercase block">
              {isCreating ? 'BUAT AKUN BARU' : 'AKSES TERBATAS'}
            </span>
          </div>
        </div>

        <div className="h-[1px] bg-sand dark:bg-neutral-800" />

        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center leading-relaxed max-w-xs mx-auto font-medium">
          {isCreating 
            ? 'Buat nama pengguna dan kata sandi untuk melindungi catatan dan target membaca Anda.'
            : 'Aplikasi terkunci untuk melindungi catatan membaca, kutipan buku, dan target membaca harian Anda.'}
        </p>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
              NAMA PENGGUNA
            </label>
            <input
              type="text"
              required
              placeholder={isCreating ? "Pilih nama pengguna" : "Masukkan nama pengguna"}
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="w-full p-3 text-xs bg-neutral-50 dark:bg-neutral-900 border border-sand dark:border-neutral-800 rounded-xl text-charcoal dark:text-cream outline-none focus:border-charcoal dark:focus:border-cream transition-colors"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
                KATA SANDI
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder={isCreating ? "Buat kata sandi" : "Masukkan kata sandi"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-3 pr-10 text-xs bg-neutral-50 dark:bg-neutral-900 border border-sand dark:border-neutral-800 rounded-xl text-charcoal dark:text-cream outline-none focus:border-charcoal dark:focus:border-cream transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 hover:text-charcoal dark:hover:text-cream cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[11px] text-rose-600 dark:text-rose-400 text-center font-semibold leading-relaxed animate-pulse">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-charcoal hover:opacity-95 dark:bg-cream dark:text-charcoal text-cream font-mono tracking-wider uppercase text-[10px] font-bold rounded-xl shadow-md hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isCreating ? <><UserPlus size={13} /> Buat Akun</> : <><KeyRound size={13} /> Buka Kunci</>}
          </button>
        </form>

        <div className="flex justify-center items-center gap-1 text-[9px] text-neutral-400 font-mono uppercase text-center">
          <HelpCircle size={10} className="shrink-0" /> 
          {isCreating 
            ? 'Akun ini hanya tersimpan di perangkat Anda. Data dijamin privat.'
            : 'Lupa kata sandi? Anda dapat memulihkan data dengan mengunggah file cadangan Anda kapan saja di halaman pengaturan.'}
        </div>
      </div>
    </div>
  );
}
