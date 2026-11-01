import React from 'react';

interface KromaqLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  iconOnly?: boolean;
}

export const KromaqIcon: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Outer ambient glow */}
      <div 
        className="absolute inset-0 rounded-full blur-md opacity-70 bg-gradient-to-tr from-cyan-400 via-blue-600 to-purple-600 pointer-events-none"
        style={{ transform: 'scale(0.85)' }}
      />
      
      {/* Faceted Low-Poly Isometric Crystal "Q" SVG */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_0_12px_rgba(0,242,254,0.65)]"
      >
        <defs>
          <linearGradient id="facet-top-left" x1="20" y1="20" x2="50" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="facet-top-right" x1="50" y1="10" x2="80" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F2FE" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="facet-left" x1="15" y1="35" x2="50" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="facet-center" x1="35" y1="35" x2="65" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="40%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="facet-right" x1="55" y1="30" x2="85" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="facet-bottom-left" x1="25" y1="65" x2="50" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
          <linearGradient id="facet-bottom-right" x1="50" y1="55" x2="80" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="60%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="facet-tail" x1="60" y1="70" x2="95" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F2FE" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Facet Polygons matching Kromaq Brand Identity */}
        {/* Top facet */}
        <polygon points="50,10 78,26 50,42 22,26" fill="url(#facet-top-right)" opacity="0.95" />
        
        {/* Left top facet */}
        <polygon points="22,26 50,42 36,60 12,48" fill="url(#facet-top-left)" />
        
        {/* Right top facet */}
        <polygon points="78,26 88,52 64,62 50,42" fill="url(#facet-right)" />
        
        {/* Center core crystal */}
        <polygon points="50,42 64,62 50,75 36,60" fill="url(#facet-center)" />
        
        {/* Bottom left facet */}
        <polygon points="12,48 36,60 50,75 28,86" fill="url(#facet-bottom-left)" />
        
        {/* Bottom right / Q interior facet */}
        <polygon points="50,75 64,62 76,72 58,84" fill="url(#facet-bottom-right)" />
        
        {/* The prominent Q tail extending down-right */}
        <polygon points="62,65 80,68 94,88 78,92 68,78" fill="url(#facet-tail)" filter="url(#glow-filter)" />
        
        {/* Inner geometric accent wirelines */}
        <line x1="50" y1="10" x2="50" y2="42" stroke="#E0F2FE" strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="50" y1="42" x2="12" y2="48" stroke="#7DD3FC" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="50" y1="42" x2="88" y2="52" stroke="#BAE6FD" strokeWidth="1" strokeOpacity="0.7" />
        <line x1="50" y1="42" x2="50" y2="75" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.8" />
        <line x1="50" y1="75" x2="28" y2="86" stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="64" y1="62" x2="94" y2="88" stroke="#C084FC" strokeWidth="1.5" strokeOpacity="0.9" />
      </svg>
    </div>
  );
};

export const KromaqLogo: React.FC<KromaqLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  iconOnly = false,
}) => {
  const iconSizes = {
    sm: 26,
    md: 34,
    lg: 44,
    xl: 60,
  };

  const textSizes = {
    sm: 'text-lg tracking-wider',
    md: 'text-2xl tracking-widest',
    lg: 'text-3xl tracking-[0.2em]',
    xl: 'text-4xl md:text-5xl tracking-[0.22em]',
  };

  const currentIconSize = iconSizes[size];

  if (iconOnly) {
    return <KromaqIcon size={currentIconSize} className={className} />;
  }

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div className="flex items-center gap-1 font-display font-extrabold text-white select-none">
        {/* Letters K R O M */}
        <span className={`${textSizes[size]} font-black text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] flex items-center`}>
          <span>K</span>
          <span className="ml-[1px]">R</span>
          <span className="ml-[1px]">O</span>
          <span className="ml-[1px]">M</span>
          {/* Custom Stylized Chevron "A" without crossbar */}
          <span className="relative inline-flex items-center justify-center mx-[1px]">
            <svg
              className="inline-block"
              style={{
                width: size === 'sm' ? 14 : size === 'md' ? 18 : size === 'lg' ? 24 : 32,
                height: size === 'sm' ? 18 : size === 'md' ? 22 : size === 'lg' ? 30 : 38,
              }}
              viewBox="0 0 24 28"
              fill="none"
            >
              <path
                d="M3 26L12 3L21 26"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="miter"
              />
            </svg>
          </span>
        </span>

        {/* The Faceted Crystal Q Icon integrated into the brandmark */}
        <div className="ml-[1px] transform -translate-y-[1px]">
          <KromaqIcon size={currentIconSize} />
        </div>
      </div>

      {showTagline && (
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[10px] tracking-[0.28em] uppercase font-semibold text-cyan-400">
            Social Media in Motion
          </span>
          <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
          <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-slate-400">
            Performance • Creativity • AI
          </span>
        </div>
      )}
    </div>
  );
};
