import React from 'react';
import { Book } from '../types';
import { Bookmark, Star } from 'lucide-react';

interface BookCoverProps {
  book: Book;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showProgress?: boolean;
}

export default function BookCover({ book, size = 'md', showProgress = false }: BookCoverProps) {
  // Determine dimensions
  const dimensions = {
    xs: 'w-12 h-18 text-[6px] rounded-sm',
    sm: 'w-20 h-28 text-[9px] rounded-md',
    md: 'w-28 h-40 text-xs rounded-lg',
    lg: 'w-36 h-52 text-sm rounded-xl',
    xl: 'w-44 h-64 text-base rounded-2xl',
  }[size];

  const padding = {
    xs: 'p-1',
    sm: 'p-2.5',
    md: 'p-3.5',
    lg: 'p-5',
    xl: 'p-6',
  }[size];

  const titleSize = {
    xs: 'leading-none font-serif text-[6px]',
    sm: 'leading-tight font-serif font-bold text-[10px] tracking-tight',
    md: 'leading-tight font-serif font-bold text-[13px] tracking-tight',
    lg: 'leading-snug font-serif font-semibold text-lg tracking-tight',
    xl: 'leading-snug font-serif font-bold text-xl tracking-tight',
  }[size];

  const authorSize = {
    xs: 'truncate text-[4.5px] mt-0.5 opacity-70 font-mono tracking-widest uppercase scale-90 origin-left',
    sm: 'truncate text-[7.5px] mt-1 opacity-75 font-mono tracking-wider uppercase',
    md: 'truncate text-[9px] mt-1.5 opacity-80 font-mono tracking-wider uppercase',
    lg: 'truncate text-xs mt-2 opacity-80 font-mono tracking-widest uppercase',
    xl: 'truncate text-sm mt-2.5 opacity-80 font-mono tracking-widest uppercase',
  }[size];

  // Map book-specific designs for premium luxury/Pinterest vibes
  const getCustomStyle = () => {
    const title = book.title.toLowerCase();
    
    if (title.includes('atomic habits')) {
      return {
        bg: '#B5624E', // Terracotta Clay
        text: '#FDFCF7',
        border: 'border-white/10',
        decor: (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-[1px] bg-white/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#B5624E] border border-white/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white/80 animate-pulse" />
            </div>
          </div>
        )
      };
    }
    
    if (title.includes('zero to one')) {
      return {
        bg: '#1A1C1E', // Charcoal
        text: '#F5F2EC',
        border: 'border-white/5',
        decor: (
          <div className="absolute inset-4 border border-dashed border-white/15 rounded-full flex items-center justify-center">
            <span className="font-serif italic text-[14px] text-white/25">0 → 1</span>
          </div>
        )
      };
    }
    
    if (title.includes('creative act') || title.includes('rick rubin')) {
      return {
        bg: '#F5F1E9', // Warm Oatmeal Linen
        text: '#1C1917', // Rich Charcoal
        border: 'border-black/5',
        decor: (
          <div className="absolute inset-x-2 top-1/3 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#B5624E] opacity-90 shadow-sm" />
          </div>
        )
      };
    }
    
    if (title.includes('meditations')) {
      return {
        bg: '#3F4D43', // Roman Sage Green
        text: '#FAF8F5',
        border: 'border-white/10',
        decor: (
          <div className="absolute inset-2 border border-amber-200/20 rounded-md pointer-events-none" />
        )
      };
    }

    if (title.includes('deep work')) {
      return {
        bg: '#722E2E', // Burgundy Wine
        text: '#F5F2EC',
        border: 'border-white/10',
        decor: (
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[1px] h-10 bg-amber-200/15" />
        )
      };
    }

    if (title.includes('sapiens')) {
      return {
        bg: '#8B7058', // Ochre Clay / Walnut
        text: '#FDFCF7',
        border: 'border-white/10',
        decor: (
          <div className="absolute inset-x-3 bottom-12 h-[2px] bg-amber-200/20" />
        )
      };
    }

    if (title.includes('naval') || title.includes('almanack')) {
      return {
        bg: '#758F8D', // Turquoise Slate
        text: '#FDFCF7',
        border: 'border-white/10',
        decor: (
          <div className="absolute right-4 top-4 w-4 h-4 rounded-full border border-white/20" />
        )
      };
    }

    // Fallbacks mapped to beautiful elegant solid tones with linen texture
    const defaultColor = book.coverGradient.includes('#FF6B6B') ? '#B5624E' 
                      : book.coverGradient.includes('#111827') ? '#1A1C1E'
                      : book.coverGradient.includes('#7F1D1D') ? '#722E2E'
                      : book.coverGradient.includes('#0D9488') ? '#4D6B62'
                      : book.coverGradient.includes('#1E3A8A') ? '#2F4858'
                      : book.coverGradient.includes('#BE123C') ? '#802D3A'
                      : '#8B7058';

    return {
      bg: defaultColor,
      text: '#FDFCF7',
      border: 'border-white/5',
      decor: null
    };
  };

  const coverDesign = getCustomStyle();

  return (
    <div
      id={`book-cover-${book.id}`}
      className={`relative select-none overflow-hidden flex flex-col justify-between transition-all duration-500 hover:scale-[1.03] shadow-lg hover:shadow-2xl border ${coverDesign.border} ${dimensions} ${padding}`}
      style={{
        backgroundColor: coverDesign.bg,
        color: coverDesign.text,
      }}
    >
      {/* Linen/Cloth canvas texture simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:3px_3px] opacity-40 pointer-events-none" />
      
      {/* 3D Spine Depth Shadow on left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-black/15 pointer-events-none z-10" />
      <div className="absolute left-[5px] top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-10" />
      
      {/* Right Edge Page-Edge Highlight */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />

      {/* Decorative center element */}
      {size !== 'xs' && coverDesign.decor}

      {/* Top Section: Genre Label & Fav indicator */}
      <div className="flex justify-between items-start z-10">
        <span 
          className="uppercase tracking-widest font-mono scale-90 origin-left opacity-75 font-semibold text-[6px] sm:text-[7px]"
          style={{ color: coverDesign.text }}
        >
          {book.genre.split(' ')[0]}
        </span>
        {book.isFavorite && (
          <Star className="fill-current text-amber-200 opacity-95 stroke-amber-400" size={size === 'xs' ? 6 : size === 'sm' ? 10 : 12} />
        )}
      </div>

      {/* Title and Author Info */}
      <div className="mt-auto flex flex-col z-10 text-left">
        <h3 className={titleSize}>
          {book.title}
        </h3>
        <p className={authorSize}>
          {book.author}
        </p>
      </div>

      {/* Bottom Progress Bar if Reading */}
      {showProgress && book.progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/25 z-10">
          <div 
            className="h-full bg-white/90 transition-all duration-700"
            style={{ width: `${book.progress}%` }}
          />
        </div>
      )}

      {/* TBR elegant bookmark flag */}
      {book.status === 'tbr' && (
        <div className="absolute -top-[1px] -right-[1px] px-2 py-0.5 bg-[#C5A880] text-[#1C1917] font-mono text-[7px] font-bold uppercase tracking-wider rounded-bl shadow-xs z-10 border-l border-b border-black/5">
          TBR
        </div>
      )}

      {/* Finished custom leaf bookmark */}
      {book.status === 'finished' && (
        <div className="absolute -top-[1px] -right-[1px] px-2 py-0.5 bg-[#3F4D43] text-white font-mono text-[7px] font-bold uppercase tracking-wider rounded-bl shadow-xs z-10 border-l border-b border-white/5">
          ✓ DONE
        </div>
      )}
    </div>
  );
}
