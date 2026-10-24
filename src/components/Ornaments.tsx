import React from 'react';

export function FiligreeScrollDivider({
  className = 'w-64 h-6 text-[#b3956f]',
  flipped = false
}: {
  className?: string;
  flipped?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 320 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flipped ? 'scale-y-[-1]' : ''}`}
      aria-hidden="true"
    >
      {/* Extending side hairlines */}
      <line x1="10" y1="14" x2="108" y2="14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.65" />
      <line x1="212" y1="14" x2="310" y2="14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.65" />
      {/* Center diamond & scroll filigree */}
      <path
        d="M160 4 L165 14 L160 24 L155 14 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M155 14 C146 6, 134 6, 128 12 C124 16, 128 21, 133 19 C137 17, 135 12, 131 13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M165 14 C174 6, 186 6, 192 12 C196 16, 192 21, 187 19 C183 17, 185 12, 189 13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M148 14 C142 20, 122 22, 112 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M172 14 C178 20, 198 22, 208 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="112" cy="14" r="1.8" fill="currentColor" />
      <circle cx="208" cy="14" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function CornerFlourish({
  position,
  colorClass = 'text-[#b99972]'
}: {
  position: 'tl' | 'tr' | 'bl' | 'br';
  colorClass?: string;
}) {
  const transforms: Record<string, string> = {
    tl: '',
    tr: 'scale-x-[-1]',
    bl: 'scale-y-[-1]',
    br: 'scale-x-[-1] scale-y-[-1]'
  };

  const posClasses: Record<string, string> = {
    tl: 'top-2 left-2',
    tr: 'top-2 right-2',
    bl: 'bottom-2 left-2',
    br: 'bottom-2 right-2'
  };

  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className={`pointer-events-none absolute w-6 h-6 ${posClasses[position]} ${transforms[position]} ${colorClass}`}
      aria-hidden="true"
    >
      <path
        d="M2 24 L2 6 C2 3.8 3.8 2 6 2 L24 2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />
      <path
        d="M5 18 L5 8 C5 6.3 6.3 5 8 5 L18 5"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeOpacity="0.6"
      />
      <path
        d="M6 12 C9 12, 12 9, 12 6"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.75"
      />
      <circle cx="8" cy="8" r="1.3" fill="currentColor" fillOpacity="0.8" />
    </svg>
  );
}

export function IconTestTeaching({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Person head & shoulders */}
      <circle cx="19" cy="22" r="5.5" stroke="url(#goldGrad1)" strokeWidth="1.6" />
      <path
        d="M9.5 37 C9.5 31.5 13.5 29 19 29 C24.5 29 28.5 31.5 28.5 37"
        stroke="url(#goldGrad1)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Speech / teaching box with lines */}
      <rect
        x="24"
        y="9"
        width="16"
        height="12"
        rx="2"
        stroke="url(#goldGrad1)"
        strokeWidth="1.5"
      />
      <path
        d="M27 21 L25 24.5 L30 21"
        stroke="url(#goldGrad1)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="27.5" y1="13" x2="36.5" y2="13" stroke="url(#goldGrad1)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="27.5" y1="16.8" x2="34.5" y2="16.8" stroke="url(#goldGrad1)" strokeWidth="1.4" strokeLinecap="round" />
      <defs>
        <linearGradient id="goldGrad1" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5C185" />
          <stop offset="1" stopColor="#9E7640" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconSearchScriptures({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Open Scripture Book */}
      <path
        d="M24 14 C19.5 11.5 13.5 11.5 8 13.5 L8 34.5 C13.5 32.5 19.5 32.5 24 35 C28.5 32.5 34.5 32.5 40 34.5 L40 13.5 C34.5 11.5 28.5 11.5 24 14 Z"
        stroke="url(#goldGrad2)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <line x1="24" y1="14" x2="24" y2="35" stroke="url(#goldGrad2)" strokeWidth="1.5" />
      <path
        d="M11 37.5 C15.5 35.8 20 36 24 38 C28 36 32.5 35.8 37 37.5"
        stroke="url(#goldGrad2)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="goldGrad2" x1="8" y1="11" x2="40" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5C185" />
          <stop offset="1" stopColor="#9E7640" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconHoldFastCross({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Four-way cross with flared arrow/bud ends matching screenshot */}
      <line x1="24" y1="8" x2="24" y2="40" stroke="url(#goldGrad3)" strokeWidth="1.7" />
      <line x1="11" y1="21" x2="37" y2="21" stroke="url(#goldGrad3)" strokeWidth="1.7" />
      {/* Top arrow */}
      <path d="M20.5 11.5 L24 7.5 L27.5 11.5" stroke="url(#goldGrad3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bottom arrow */}
      <path d="M20.5 36.5 L24 40.5 L27.5 36.5" stroke="url(#goldGrad3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Left arrow */}
      <path d="M14.5 17.5 L10.5 21 L14.5 24.5" stroke="url(#goldGrad3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right arrow */}
      <path d="M33.5 17.5 L37.5 21 L33.5 24.5" stroke="url(#goldGrad3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Center diamond */}
      <polygon points="24,18 27,21 24,24 21,21" stroke="url(#goldGrad3)" strokeWidth="1.3" fill="#131728" />
      <defs>
        <linearGradient id="goldGrad3" x1="10" y1="7" x2="38" y2="41" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5C185" />
          <stop offset="1" stopColor="#9E7640" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SmallCrossDivider() {
  return (
    <div className="flex items-center gap-3 my-4" aria-hidden="true">
      <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#a8824a]/70 to-[#c89d5c]" />
      <svg viewBox="0 0 20 24" fill="none" className="w-4 h-5 text-[#c89d5c]">
        <line x1="10" y1="2" x2="10" y2="22" stroke="currentColor" strokeWidth="1.6" />
        <line x1="4" y1="8.5" x2="16" y2="8.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="10" cy="2" r="1.3" fill="currentColor" />
        <circle cx="4" cy="8.5" r="1.3" fill="currentColor" />
        <circle cx="16" cy="8.5" r="1.3" fill="currentColor" />
        <circle cx="10" cy="22" r="1.3" fill="currentColor" />
      </svg>
      <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-[#a8824a]/70 to-[#c89d5c]" />
    </div>
  );
}
