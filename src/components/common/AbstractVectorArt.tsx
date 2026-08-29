import React from 'react';

export type VectorArtVariant = 
  | 'briefing-ribbon'       // Home: Warm champagne & teal executive fluid ribbon
  | 'engineering-cad'       // Technical / Candidates: Orthographic CAD isometric & dimension traces
  | 'pipeline-velocity'     // Pipeline / Kanban: Directional streamline flow & acceleration tracks
  | 'epcm-structural'       // Mobilization / Team: 3D isometric structural truss & grid lattice
  | 'analytics-harmonics'   // Reports: Multi-frequency harmonic curves & Gaussian interference
  | 'radar-compliance';     // Compliance / Safety: Radial sweep arcs & concentric targeting rings

interface VectorArtProps {
  className?: string;
  variant?: VectorArtVariant;
  opacity?: string;
}

export const AbstractVectorArt: React.FC<VectorArtProps> = ({
  className = '',
  variant = 'briefing-ribbon',
  opacity = 'opacity-35 dark:opacity-20'
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none transition-opacity duration-300 ${opacity} ${className}`}
      aria-hidden="true"
    >
      {/* ========================================================================= */}
      {/* 1. BRIEFING RIBBON (Home / Operational Briefing) */}
      {/* Silky champagne & eucalyptus ribbons inspired by modern editorial luxury */}
      {/* ========================================================================= */}
      {variant === 'briefing-ribbon' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="briefing-gold-teal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A880" stopOpacity="0.0" />
              <stop offset="25%" stopColor="#D4C5A9" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#56A396" stopOpacity="0.55" />
              <stop offset="85%" stopColor="#C5A880" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#C5A880" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="briefing-counter-strand" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#56A396" stopOpacity="0.0" />
              <stop offset="35%" stopColor="#8A6D3B" stopOpacity="0.6" />
              <stop offset="75%" stopColor="#56A396" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#D4C5A9" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Primary Warm Ribbon Swirl */}
          <g stroke="url(#briefing-gold-teal)" strokeWidth="0.75" fill="none">
            {Array.from({ length: 14 }).map((_, i) => {
              const spread = i * 4;
              const y1 = 25 + spread * 0.7;
              const cp1x = 380 + i * 8;
              const cp1y = 190 + spread * 1.2;
              const cp2x = 860 - i * 10;
              const cp2y = 15 + spread * 0.8;
              const y2 = 140 + spread * 0.6;
              return (
                <path
                  key={`ribbon-main-${i}`}
                  d={`M-80,${y1} C${cp1x},${cp1y} ${cp2x},${cp2y} 1520,${y2}`}
                />
              );
            })}
          </g>

          {/* Secondary Counter-Swirl */}
          <g stroke="url(#briefing-counter-strand)" strokeWidth="0.6" fill="none">
            {Array.from({ length: 8 }).map((_, i) => {
              const spread = i * 6;
              const y1 = 110 + spread * 0.5;
              const cp1x = 460 - i * 12;
              const cp1y = 10 + spread * 1.3;
              const cp2x = 980 + i * 10;
              const cp2y = 210 - spread * 0.9;
              const y2 = 50 + spread * 0.6;
              return (
                <path
                  key={`ribbon-counter-${i}`}
                  d={`M-80,${y1} C${cp1x},${cp1y} ${cp2x},${cp2y} 1520,${y2}`}
                />
              );
            })}
          </g>
        </svg>
      )}

      {/* ========================================================================= */}
      {/* 2. ENGINEERING CAD (Candidate Dossier / Technical Interviews) */}
      {/* Precision drafting blueprints, tie-in crosshairs, dimension callouts */}
      {/* ========================================================================= */}
      {variant === 'engineering-cad' && (
        <svg
          className="w-full h-full text-blue-600 dark:text-blue-400"
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="cad-micro-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="cad-fade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
              <stop offset="30%" stopColor="currentColor" stopOpacity="0.7" />
              <stop offset="70%" stopColor="currentColor" stopOpacity="0.7" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#cad-micro-grid)" />

          <g stroke="url(#cad-fade)" strokeWidth="0.8" fill="none">
            {/* Orthogonal piping traces */}
            <path d="M-50,140 L280,140 L340,80 L760,80 L820,170 L1200,170 L1260,110 L1500,110" />
            <path d="M280,140 L280,220" strokeDasharray="3 3" />
            <path d="M760,80 L760,10" strokeDasharray="3 3" />
            <path d="M820,170 L820,240" strokeDasharray="3 3" />
            <path d="M1200,170 L1200,30" strokeDasharray="3 3" />

            {/* Tie-in Nodal Circles */}
            <circle cx="280" cy="140" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="340" cy="80" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="760" cy="80" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="820" cy="170" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="1200" cy="170" r="3.5" fill="currentColor" stroke="none" />
            
            {/* Dimension marks */}
            <line x1="340" y1="65" x2="760" y2="65" strokeWidth="0.6" />
            <line x1="340" y1="60" x2="340" y2="70" strokeWidth="0.8" />
            <line x1="760" y1="60" x2="760" y2="70" strokeWidth="0.8" />
            <text x="520" y="60" fill="currentColor" fontSize="8" fontFamily="monospace" stroke="none" opacity="0.85">ΔX = 420.00mm</text>
            <text x="770" y="95" fill="currentColor" fontSize="8" fontFamily="monospace" stroke="none" opacity="0.85">SPEC ASME-B31.3</text>
            <text x="1210" y="185" fill="currentColor" fontSize="8" fontFamily="monospace" stroke="none" opacity="0.85">NODE-78B</text>
          </g>
        </svg>
      )}

      {/* ========================================================================= */}
      {/* 3. PIPELINE VELOCITY (Pipeline / Kanban / Applications Triage) */}
      {/* High-speed laminar flow lines & acceleration vectors with arrowheads */}
      {/* ========================================================================= */}
      {variant === 'pipeline-velocity' && (
        <svg
          className="w-full h-full text-emerald-600 dark:text-[#56A396]"
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="velocity-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
              <stop offset="20%" stopColor="currentColor" stopOpacity="0.8" />
              <stop offset="80%" stopColor="currentColor" stopOpacity="0.6" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
            </linearGradient>
            <marker id="arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="currentColor" />
            </marker>
          </defs>

          <g stroke="url(#velocity-grad)" strokeWidth="0.8" fill="none">
            {/* Speed streamline rays */}
            <path d="M-50,60 Q350,110 700,60 T1450,80" markerEnd="url(#arrow)" />
            <path d="M-50,90 Q400,160 800,90 T1450,120" strokeDasharray="16 6" />
            <path d="M-50,120 Q300,50 750,140 T1450,100" markerEnd="url(#arrow)" />
            <path d="M-50,150 Q450,210 900,130 T1450,160" strokeDasharray="24 8" />
            <path d="M-50,180 Q380,120 780,200 T1450,140" markerEnd="url(#arrow)" />

            {/* Particle Acceleration Pulse Clusters */}
            <circle cx="350" cy="110" r="2" fill="currentColor" />
            <circle cx="700" cy="60" r="2.5" fill="currentColor" />
            <circle cx="800" cy="90" r="2" fill="currentColor" />
            <circle cx="750" cy="140" r="3" fill="currentColor" />
            <circle cx="900" cy="130" r="2" fill="currentColor" />
          </g>
        </svg>
      )}

      {/* ========================================================================= */}
      {/* 4. EPCM STRUCTURAL (Mobilization / Team Builder / Site Readiness) */}
      {/* 3D structural isometric truss lattices, elevation topography, spatial grids */}
      {/* ========================================================================= */}
      {variant === 'epcm-structural' && (
        <svg
          className="w-full h-full text-[#8A6D3B] dark:text-[#D4C5A9]"
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="truss-fade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
              <stop offset="30%" stopColor="currentColor" stopOpacity="0.65" />
              <stop offset="70%" stopColor="currentColor" stopOpacity="0.65" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Isometric Structural Truss Lattice */}
          <g stroke="url(#truss-fade)" strokeWidth="0.75" fill="none">
            {/* Top chord & bottom chord */}
            <line x1="-50" y1="70" x2="1500" y2="70" />
            <line x1="-50" y1="160" x2="1500" y2="160" />

            {/* Diagonal Web Members */}
            {Array.from({ length: 18 }).map((_, i) => {
              const x = i * 90;
              return (
                <g key={`truss-bay-${i}`}>
                  <line x1={x} y1="70" x2={x + 45} y2="160" />
                  <line x1={x + 45} y1="160" x2={x + 90} y2="70" />
                  <line x1={x + 45} y1="70" x2={x + 45} y2="160" strokeDasharray="2 4" strokeWidth="0.5" />
                  <circle cx={x + 45} cy="70" r="2" fill="currentColor" />
                  <circle cx={x + 45} cy="160" r="2" fill="currentColor" />
                </g>
              );
            })}
          </g>
        </svg>
      )}

      {/* ========================================================================= */}
      {/* 5. ANALYTICS HARMONICS (Reports / Funnel Velocity / Cost Calculator) */}
      {/* Multi-frequency sine harmonics & Gaussian statistical density bell curves */}
      {/* ========================================================================= */}
      {variant === 'analytics-harmonics' && (
        <svg
          className="w-full h-full text-indigo-600 dark:text-[#A78BFA]"
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="harmonics-fade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
              <stop offset="25%" stopColor="currentColor" stopOpacity="0.7" />
              <stop offset="75%" stopColor="currentColor" stopOpacity="0.7" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <g stroke="url(#harmonics-fade)" strokeWidth="0.75" fill="none">
            {/* Superimposed harmonic waves */}
            {Array.from({ length: 10 }).map((_, i) => {
              const amp = 40 + i * 6;
              const yMid = 120;
              return (
                <path
                  key={`harmonic-${i}`}
                  d={`M-50,${yMid} Q180,${yMid - amp} 450,${yMid} T950,${yMid} T1490,${yMid}`}
                />
              );
            })}
            {/* Gaussian bell curve */}
            <path
              d="M100,210 C450,210 580,30 720,30 C860,30 990,210 1340,210"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <circle cx="720" cy="30" r="3.5" fill="currentColor" />
            <text x="735" y="35" fill="currentColor" fontSize="8" fontFamily="monospace" stroke="none" opacity="0.8">μ = PEAK CONVERSION</text>
          </g>
        </svg>
      )}

      {/* ========================================================================= */}
      {/* 6. RADAR COMPLIANCE (Compliance Radar / Safety / Certifications) */}
      {/* Concentric radar range rings, 360-deg crosshairs, 45-deg sweep vectors */}
      {/* ========================================================================= */}
      {variant === 'radar-compliance' && (
        <svg
          className="w-full h-full text-amber-600 dark:text-[#D69738]"
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="radar-fade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
              <stop offset="30%" stopColor="currentColor" stopOpacity="0.6" />
              <stop offset="70%" stopColor="currentColor" stopOpacity="0.6" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <g stroke="url(#radar-fade)" strokeWidth="0.8" fill="none">
            {/* Range rings centered at (1050, 120) */}
            <circle cx="1050" cy="120" r="45" />
            <circle cx="1050" cy="120" r="90" strokeDasharray="3 4" />
            <circle cx="1050" cy="120" r="140" />
            <circle cx="1050" cy="120" r="200" strokeDasharray="2 5" />

            {/* Sweep axis crosshairs */}
            <line x1="820" y1="120" x2="1280" y2="120" />
            <line x1="1050" y1="-20" x2="1050" y2="260" />
            <line x1="900" y1="-30" x2="1200" y2="270" strokeDasharray="4 4" strokeWidth="0.6" />

            {/* Blip Target Markers */}
            <circle cx="1050" cy="120" r="3" fill="currentColor" />
            <circle cx="980" cy="80" r="2.5" fill="currentColor" />
            <circle cx="1140" cy="65" r="2.5" fill="currentColor" />
            <circle cx="1110" cy="175" r="2.5" fill="currentColor" />
            <text x="1150" y="70" fill="currentColor" fontSize="8" fontFamily="monospace" stroke="none" opacity="0.85">ACSA CSTS-2020: 100% VERIFIED</text>
          </g>
        </svg>
      )}
    </div>
  );
};
