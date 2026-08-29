import React from 'react';
import { cn } from './index';

interface LocalAtsLogoProps {
  className?: string;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  textClassName?: string;
  subtextClassName?: string;
  showSubtitle?: boolean;
}

const sizeMap = {
  xs: 18,
  sm: 24,
  md: 30,
  lg: 38,
  xl: 48
};

/**
 * Local ATS Brand Vector Mark
 * Pure geometric, letterless stealth-prism insignia with isometric metallic facets,
 * sovereign central core, and precision telemetry accents.
 */
export const LocalAtsMark: React.FC<{ size?: number; className?: string }> = ({
  size = 30,
  className
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 select-none', className)}
      aria-label="Local ATS Vector Mark"
    >
      <defs>
        {/* Top Metallic Champagne Gradient */}
        <linearGradient id="prismTopGrad" x1="8" y1="6" x2="40" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF7EB" />
          <stop offset="35%" stopColor="#EAD8BD" />
          <stop offset="70%" stopColor="#C4A86B" />
          <stop offset="100%" stopColor="#8A6D3B" />
        </linearGradient>

        {/* Left Obsidian-Titanium Gradient */}
        <linearGradient id="prismLeftGrad" x1="8" y1="15" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2E3D" />
          <stop offset="50%" stopColor="#171922" />
          <stop offset="100%" stopColor="#0B0C10" />
        </linearGradient>

        {/* Right Bronze-Smoked Gradient */}
        <linearGradient id="prismRightGrad" x1="40" y1="15" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3D3222" />
          <stop offset="50%" stopColor="#221C14" />
          <stop offset="100%" stopColor="#0E0C09" />
        </linearGradient>

        {/* Outer Gold Wire Gradient */}
        <linearGradient id="prismWireGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5EBD9" />
          <stop offset="50%" stopColor="#D4C5A9" />
          <stop offset="100%" stopColor="#7A5E2E" />
        </linearGradient>
      </defs>

      {/* 1. Isometric Stealth Hex-Prism - Left Facet */}
      <path
        d="M8 15.5L24 24.5V42.5L8 33.5V15.5Z"
        fill="url(#prismLeftGrad)"
        stroke="url(#prismWireGrad)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* 2. Isometric Stealth Hex-Prism - Right Facet */}
      <path
        d="M24 24.5L40 15.5V33.5L24 42.5V24.5Z"
        fill="url(#prismRightGrad)"
        stroke="url(#prismWireGrad)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* 3. Isometric Stealth Hex-Prism - Top Facet */}
      <path
        d="M24 5.5L40 14.5L24 23.5L8 14.5L24 5.5Z"
        fill="url(#prismTopGrad)"
        stroke="url(#prismWireGrad)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* 4. Precision Laser Channels / Inlaid Geometric Paths */}
      {/* Top Face Inlaid Diamond */}
      <path
        d="M24 10.5L33 15.5L24 20.5L15 15.5L24 10.5Z"
        stroke="#1A1813"
        strokeWidth="1.2"
        strokeOpacity="0.4"
        fill="none"
      />

      {/* Left Face Inlaid Channel */}
      <path
        d="M13 21.5L20 25.5V34.5"
        stroke="url(#prismWireGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />

      {/* Right Face Inlaid Channel */}
      <path
        d="M35 21.5L28 25.5V34.5"
        stroke="url(#prismWireGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />

      {/* 5. Center Sovereign Floating Energy Node */}
      <circle cx="24" cy="24.5" r="3" fill="#FFFFFF" />
      <circle cx="24" cy="24.5" r="1.5" fill="#8A6D3B" />

      {/* 6. Micro Satellite Coordinate Pips */}
      <circle cx="24" cy="5.5" r="1.2" fill="#D4C5A9" />
      <circle cx="40" cy="14.5" r="1.2" fill="#D4C5A9" />
      <circle cx="40" cy="33.5" r="1.2" fill="#D4C5A9" />
      <circle cx="24" cy="42.5" r="1.2" fill="#D4C5A9" />
      <circle cx="8" cy="33.5" r="1.2" fill="#D4C5A9" />
      <circle cx="8" cy="14.5" r="1.2" fill="#D4C5A9" />
    </svg>
  );
};

export const LocalAtsLogo: React.FC<LocalAtsLogoProps> = ({
  className,
  size = 'md',
  withText = true,
  textClassName,
  subtextClassName,
  showSubtitle = true
}) => {
  const pixelSize = typeof size === 'number' ? size : sizeMap[size];

  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <LocalAtsMark size={pixelSize} />
      {withText && (
        <div className="flex flex-col justify-center min-w-0">
          <div
            className={cn(
              'font-bold tracking-tight text-slate-900 dark:text-white leading-none flex items-center gap-1.5',
              typeof size === 'string' && size === 'xs' && 'text-xs',
              typeof size === 'string' && size === 'sm' && 'text-sm',
              typeof size === 'string' && size === 'md' && 'text-base',
              typeof size === 'string' && size === 'lg' && 'text-lg',
              typeof size === 'string' && size === 'xl' && 'text-xl',
              textClassName
            )}
          >
            <span>Local ATS</span>
          </div>
          {showSubtitle && (
            <div
              className={cn(
                'text-[10px] font-mono uppercase tracking-wider text-[#8A6D3B] dark:text-[#d4c5a9] mt-0.5 opacity-80 leading-none truncate',
                subtextClassName
              )}
            >
              Private • Fast • Local-First
            </div>
          )}
        </div>
      )}
    </div>
  );
};
