import React, { useState, useRef } from 'react';
import { Book, ReadingGoal, UserProfile } from '../types';
import { Download, Upload, Shield, Lock, KeyRound, Database, Check, AlertTriangle, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface SettingsViewProps {
  books: Book[];
  readingGoal: ReadingGoal;
  user: UserProfile;
  credentials: { username?: string; password?: string };
  onSaveCredentials: (username?: string, password?: string) => void;
  onRestore: (data: { books: Book[]; readingGoal: ReadingGoal; userProfile: UserProfile; credentials?: { username?: string; password?: string } }) => void;
  onLock: () => void;
  theme: 'light' | 'dark';
  isCompact?: boolean;
}

export default function SettingsView({
  books,
  readingGoal,
  user,
  credentials,
  onSaveCredentials,
  onRestore,
  onLock,
  theme,
  isCompact = false
}: SettingsViewProps) {
  // Credentials edit state
  const [username, setUsername] = useState(credentials.username || '');
  const [password, setPassword] = useState(credentials.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // File import state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);

  // Handle saving credentials
  const handleSaveCreds = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      onSaveCredentials(undefined, undefined); // clear
    } else {
      onSaveCredentials(username.trim(), password.trim());
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleClearCreds = () => {
    setUsername('');
    setPassword('');
    onSaveCredentials(undefined, undefined);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Export backup data as JSON file
  const handleExportBackup = () => {
    try {
      const backupData = {
        books,
        readingGoal,
        userProfile: user,
        credentials,
        exportedAt: new Date().toISOString(),
        version: '1.0'
      };

      const dataStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `bookshelf_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export backup', err);
    }
  };

  // Import backup file
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        // Validation schema check
        if (!parsed.books || !Array.isArray(parsed.books)) {
          throw new Error('Missing "books" collection in backup file.');
        }
        if (!parsed.readingGoal) {
          throw new Error('Missing "readingGoal" configuration in backup file.');
        }
        if (!parsed.userProfile) {
          throw new Error('Missing "userProfile" parameters in backup file.');
        }

        // Successfully validated, restore state
        onRestore({
          books: parsed.books,
          readingGoal: parsed.readingGoal,
          userProfile: parsed.userProfile,
          credentials: parsed.credentials || {}
        });

        // Sync local edit fields if credentials exist in the backup
        if (parsed.credentials) {
          setUsername(parsed.credentials.username || '');
          setPassword(parsed.credentials.password || '');
        }

        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 5000);
      } catch (err: any) {
        setImportError(err.message || 'Malformed backup file. Ensure it is a valid JSON export.');
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.onerror = () => {
      setImportError('Failed to read the selected backup file.');
      setIsImporting(false);
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 overflow-y-auto pb-24 px-1 text-left animate-slide-up">
      {/* Top action header */}
      <div className="pt-2">
        <h1 className="text-2xl font-serif font-bold text-charcoal dark:text-cream tracking-tight mt-0.5">
          Pengaturan & Keamanan
        </h1>
      </div>
      <div className="h-[1px] bg-sand dark:bg-neutral-800/40" />

      {/* Security Credentials Section */}
      <div className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 p-5 rounded-2xl space-y-4 shadow-xs">
        <div className="flex gap-2.5 items-center">
          <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-charcoal dark:text-cream">
            <Shield size={16} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm text-charcoal dark:text-cream">Kunci Akses Aplikasi</h3>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Batasi akses dengan nama pengguna dan kata sandi</p>
          </div>
        </div>

        <form onSubmit={handleSaveCreds} className="space-y-3.5 pt-1">
          <div className="space-y-1">
            <label className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Nama Pengguna</label>
            <input
              type="text"
              placeholder="Masukkan nama pengguna"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 text-xs bg-neutral-50 dark:bg-[#1C1916] border border-sand dark:border-neutral-800/60 rounded-xl text-charcoal dark:text-cream outline-none focus:border-charcoal dark:focus:border-cream/20 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Kata Sandi</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan kata sandi pengaman"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 pr-10 text-xs bg-neutral-50 dark:bg-[#1C1916] border border-sand dark:border-neutral-800/60 rounded-xl text-charcoal dark:text-cream outline-none focus:border-charcoal dark:focus:border-cream/20 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-charcoal dark:hover:text-cream cursor-pointer"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div className={`flex ${isCompact ? 'flex-col' : 'flex-col sm:flex-row'} gap-2.5 pt-2`}>
            <button
              type="submit"
              className={`py-2.5 bg-charcoal dark:bg-cream text-cream dark:text-charcoal rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-all cursor-pointer active:scale-98 ${isCompact ? 'w-full' : 'flex-1 sm:flex-initial min-w-[140px]'}`}
            >
              {isSaved ? (
                <>
                  <Check size={13} /> Tersimpan
                </>
              ) : (
                <>
                  <KeyRound size={13} /> Simpan Kunci
                </>
              )}
            </button>
            
            {(credentials.username || credentials.password) && (
              <div className={`flex gap-2 ${isCompact ? 'w-full' : 'flex-1 sm:flex-initial'}`}>
                <button
                  type="button"
                  onClick={onLock}
                  className="flex-1 py-2.5 px-3.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-charcoal dark:text-cream border border-sand dark:border-neutral-700 rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                  title="Kunci layar manual"
                >
                  <Lock size={13} /> Kunci Layar
                </button>
                <button
                  type="button"
                  onClick={handleClearCreds}
                  className="flex-1 py-2.5 px-3.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center transition-all cursor-pointer active:scale-98"
                  title="Hapus kunci pengaman"
                >
                  Matikan Kunci
                </button>
              </div>
            )}
          </div>
        </form>

        {(credentials.username && credentials.password) ? (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/30 p-2.5 rounded-xl flex items-start gap-2 text-emerald-800 dark:text-emerald-300 text-[10px]">
            <Check size={12} className="shrink-0 mt-0.5 text-emerald-600" />
            <p className="font-medium">Kunci Akses Aktif: Catatan Anda aman! Akses berikutnya atau saat layar dikunci akan memerlukan nama pengguna dan kata sandi ini.</p>
          </div>
        ) : (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-800/20 p-2.5 rounded-xl flex items-start gap-2 text-amber-800 dark:text-amber-300 text-[10px]">
            <AlertTriangle size={12} className="shrink-0 mt-0.5 text-amber-600" />
            <p className="font-medium">Akses Bebas: Kunci belum diaktifkan. Anda dapat membuat nama pengguna dan kata sandi di atas jika ingin membatasi akses ke aplikasi ini.</p>
          </div>
        )}
      </div>

      {/* Backup and Safekeeping Controls */}
      <div className="bg-white dark:bg-[#151312] border border-sand dark:border-neutral-800/40 p-5 rounded-2xl space-y-4 shadow-xs">
        <div className="flex gap-2.5 items-center">
          <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-charcoal dark:text-cream">
            <Database size={16} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm text-charcoal dark:text-cream">Ekspor & Impor Data</h3>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Cadangkan atau pulihkan seluruh data perpustakaan Anda</p>
          </div>
        </div>

        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
          Daftar buku, catatan membaca, kutipan, target harian, dan kunci akses Anda disimpan secara pribadi di browser Anda. Kami menyarankan Anda mengunduh salinan cadangan secara berkala.
        </p>

        <div className="h-[1px] bg-neutral-100 dark:bg-neutral-800" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Export Action */}
          <div className="p-3.5 bg-neutral-50 dark:bg-[#1C1916] border border-sand dark:border-neutral-800/50 rounded-xl flex flex-col justify-between text-left space-y-3.5">
            <div>
              <span className="text-[8px] font-mono font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">SIMPAN DATA</span>
              <h4 className="text-xs font-serif font-bold text-charcoal dark:text-cream mt-0.5">Ekspor File Cadangan</h4>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">Unduh seluruh data membaca Anda ke dalam file cadangan.</p>
            </div>
            <button
              onClick={handleExportBackup}
              className="py-2.5 bg-charcoal dark:bg-cream text-cream dark:text-charcoal rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-all cursor-pointer active:scale-98 w-full"
            >
              <Download size={13} /> Unduh Cadangan
            </button>
          </div>

          {/* Import Action */}
          <div className="p-3.5 bg-neutral-50 dark:bg-[#1C1916] border border-sand dark:border-neutral-800/50 rounded-xl flex flex-col justify-between text-left space-y-3.5">
            <div>
              <span className="text-[8px] font-mono font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">PULIHKAN DATA</span>
              <h4 className="text-xs font-serif font-bold text-charcoal dark:text-cream mt-0.5">Impor File Cadangan</h4>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">Unggah file cadangan untuk mengembalikan data membaca Anda.</p>
            </div>
            <div>
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={handleImportBackup}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
                className="py-2.5 bg-white dark:bg-[#151312] border border-sand dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-charcoal dark:text-cream rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98 w-full"
              >
                {isImporting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" /> Memulihkan...
                  </>
                ) : (
                  <>
                    <Upload size={13} /> Unggah Cadangan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Validation Status Feeds */}
        {importSuccess && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/30 p-3 rounded-xl flex items-start gap-2.5 text-emerald-800 dark:text-emerald-300 text-xs animate-slide-up">
            <Check size={14} className="shrink-0 mt-0.5 text-emerald-600" />
            <div>
              <p className="font-bold">Data Berhasil Dipulihkan!</p>
              <p className="text-[10px] text-emerald-700/80 mt-0.5 font-medium">Seluruh buku, target membaca, catatan, dan kunci akses Anda telah berhasil diperbarui dari file cadangan.</p>
            </div>
          </div>
        )}

        {importError && (
          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 p-3 rounded-xl flex items-start gap-2.5 text-rose-800 dark:text-rose-300 text-xs animate-slide-up">
            <AlertTriangle size={14} className="shrink-0 mt-0.5 text-rose-600" />
            <div>
              <p className="font-bold">Gagal Memulihkan Data</p>
              <p className="text-[10px] text-rose-700/85 mt-0.5 font-medium">{importError}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
