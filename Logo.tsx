
import React, { useState } from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-16 w-16" }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center ${className} group overflow-hidden shrink-0`}>
      {hasError ? (
        <div className="w-full h-full bg-gradient-to-br from-kgh-blue via-kgh-violet to-kgh-azure rounded-[1.5rem] flex items-center justify-center text-white font-black shadow-2xl border border-white/40">
          <div className="flex flex-col items-center">
            <span className="leading-none text-[45%] tracking-tighter">KGH</span>
            <div className="w-1/2 h-[1px] bg-transparent mt-[8%] rounded-full" />
          </div>
        </div>
      ) : (
        <img 
          src="logoo.png" 
          alt="KGH Logo"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          loading="eager"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};
