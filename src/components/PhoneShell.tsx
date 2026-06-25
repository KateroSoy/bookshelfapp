import React, { useEffect, useState } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneShellProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
}

export default function PhoneShell({ children, theme }: PhoneShellProps) {
  const [time, setTime] = useState('2:13 PM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="phone-wrapper" className="relative flex flex-col items-center justify-center py-2 sm:py-4 px-1 select-none">
      {/* Outer Phone Shell Case - Designed with a sleek minimalist matte aluminum frame */}
      <div 
        id="phone-frame"
        className="relative w-full max-w-[385px] h-[770px] rounded-[52px] bg-alabaster dark:bg-[#181615] p-3.5 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.4)] border-[8px] border-sand dark:border-neutral-800 ring-1 ring-sand/50 dark:ring-neutral-800/50 flex flex-col overflow-hidden transition-all duration-500"
      >
        {/* Dynamic Notch Speaker & Sensors */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[22px] bg-charcoal dark:bg-neutral-900 rounded-b-xl z-50 flex items-center justify-center">
          <div className="w-10 h-0.5 bg-neutral-800 dark:bg-neutral-700 rounded-full absolute top-[4px]" />
          <div className="w-1.5 h-1.5 bg-neutral-900 dark:bg-black rounded-full absolute right-6 top-1" />
        </div>

        {/* Status Bar inside the screen */}
        <div 
          className="h-10 px-6 pt-2 flex justify-between items-center text-xs font-semibold z-40 relative select-none text-charcoal/80 dark:text-cream/80"
        >
          <span className="text-[10px] font-bold tracking-tight mt-1 font-mono">{time}</span>
          <div className="flex items-center gap-1.5">
            <Signal size={11} className="opacity-70 stroke-[2]" />
            <span className="text-[8px] font-black tracking-tighter">5G</span>
            <Wifi size={11} className="opacity-70 stroke-[2]" />
            <Battery size={13} className="opacity-70 stroke-[2] ml-0.5" />
          </div>
        </div>

        {/* The screen actual viewport area - Pristine Background */}
        <div 
          id="phone-screen-viewport"
          className="flex-1 w-full rounded-[38px] overflow-hidden relative flex flex-col bg-cream dark:bg-[#11100E] border border-sand/40 dark:border-neutral-900"
        >
          {children}
        </div>

        {/* iOS Home Indicator Bar - clean and subtle */}
        <div className="h-4 w-full flex items-end justify-center pb-1 z-40 relative pointer-events-none">
          <div className="w-24 h-[3px] bg-charcoal/10 dark:bg-cream/15 rounded-full" />
        </div>
      </div>
    </div>
  );
}
