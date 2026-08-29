import React from 'react';
import { cn } from '../ui';

// ============================================================================
// 1. ENGINEERING COMPETENCY RADAR CHART (Pentagon Radar)
// ============================================================================
interface RadarMetric {
  subject: string;
  candidateScore: number; // 0 to 100
  benchmarkScore: number; // 0 to 100
}

interface CompetencyRadarChartProps {
  metrics?: RadarMetric[];
  className?: string;
}

export const CompetencyRadarChart: React.FC<CompetencyRadarChartProps> = ({
  metrics = [
    { subject: '3D Plant 3D / Layout', candidateScore: 96, benchmarkScore: 80 },
    { subject: 'ASME B31.3 Stress', candidateScore: 92, benchmarkScore: 75 },
    { subject: 'Laser Point Cloud', candidateScore: 98, benchmarkScore: 70 },
    { subject: 'Field Coordination', candidateScore: 88, benchmarkScore: 82 },
    { subject: 'HAZOP & Safety', candidateScore: 90, benchmarkScore: 78 }
  ],
  className
}) => {
  const size = 260;
  const center = size / 2;
  const radius = 95;
  const totalSides = metrics.length;

  const getCoordinates = (index: number, value: number, maxVal = 100) => {
    const angle = (Math.PI * 2 / totalSides) * index - Math.PI / 2;
    const r = (value / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Grid levels (25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1.0];

  const candidatePoints = metrics
    .map((m, i) => {
      const { x, y } = getCoordinates(i, m.candidateScore);
      return `${x},${y}`;
    })
    .join(' ');

  const benchmarkPoints = metrics
    .map((m, i) => {
      const { x, y } = getCoordinates(i, m.benchmarkScore);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={cn('flex flex-col items-center select-none', className)}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid Rings */}
        {levels.map((level, lvlIdx) => {
          const ringPoints = metrics
            .map((_, i) => {
              const { x, y } = getCoordinates(i, level * 100);
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <polygon
              key={lvlIdx}
              points={ringPoints}
              fill="none"
              stroke="currentColor"
              className="text-black/[0.08] dark:text-white/[0.08]"
              strokeWidth="1"
              strokeDasharray={lvlIdx < 3 ? '2 2' : undefined}
            />
          );
        })}

        {/* Axis Lines */}
        {metrics.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="currentColor"
              className="text-black/[0.08] dark:text-white/[0.08]"
              strokeWidth="1"
            />
          );
        })}

        {/* Benchmark Polygon */}
        <polygon
          points={benchmarkPoints}
          fill="rgba(100, 116, 139, 0.12)"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Candidate Score Polygon */}
        <polygon
          points={candidatePoints}
          fill="rgba(138, 109, 59, 0.25)"
          stroke="#8A6D3B"
          className="dark:fill-[rgba(212,197,169,0.22)] dark:stroke-[#d4c5a9]"
          strokeWidth="2.5"
        />

        {/* Candidate Vertices Nodes */}
        {metrics.map((m, i) => {
          const { x, y } = getCoordinates(i, m.candidateScore);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              className="fill-[#8A6D3B] dark:fill-[#d4c5a9] stroke-white dark:stroke-[#12151D]"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Text Labels */}
        {metrics.map((m, i) => {
          const angle = (Math.PI * 2 / totalSides) * i - Math.PI / 2;
          const labelRadius = radius + 24;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-bold font-sans fill-slate-700 dark:fill-zinc-300"
            >
              {m.subject}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] font-semibold mt-2">
        <span className="flex items-center gap-1.5 text-[#8A6D3B] dark:text-[#d4c5a9]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8A6D3B] dark:bg-[#d4c5a9]" />
          <span>Candidate Skill Match</span>
        </span>
        <span className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400">
          <span className="w-2.5 h-1 border-t-2 border-dashed border-slate-400" />
          <span>Requisition Benchmark</span>
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// 2. WEEKLY SOURCING & PANEL VELOCITY CHART (SVG Wave & Bars)
// ============================================================================
export const WeeklyVelocityChart: React.FC<{ className?: string }> = ({ className }) => {
  const days = [
    { day: 'Mon', inbound: 14, panels: 3, offers: 1 },
    { day: 'Tue', inbound: 22, panels: 5, offers: 2 },
    { day: 'Wed', inbound: 31, panels: 6, offers: 3 },
    { day: 'Thu', inbound: 28, panels: 4, offers: 2 },
    { day: 'Fri', inbound: 19, panels: 2, offers: 1 }
  ];

  return (
    <div className={cn('space-y-3 select-none', className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
          7-Day Sourcing & Interview Velocity
        </span>
        <div className="flex items-center gap-3 text-[10px] font-semibold">
          <span className="flex items-center gap-1 text-slate-600 dark:text-zinc-400">
            <span className="w-2 h-2 rounded-xs bg-[#8A6D3B] dark:bg-[#d4c5a9]" />
            <span>Inbound Sourced</span>
          </span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-xs bg-emerald-500" />
            <span>Panels Held</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 h-28 items-end pt-2 pb-1 border-b border-black/[0.06] dark:border-white/[0.08]">
        {days.map((d, i) => {
          const maxInbound = 35;
          const heightPct = Math.round((d.inbound / maxInbound) * 100);
          const panelHeight = d.panels * 12;

          return (
            <div key={i} className="flex flex-col items-center justify-end h-full gap-1 group">
              <div className="text-[9px] text-slate-400 dark:text-zinc-500 tabular-nums opacity-0 group-hover:opacity-100 transition-opacity">
                {d.inbound}
              </div>
              <div className="w-full flex items-end justify-center gap-1">
                {/* Inbound Bar */}
                <div
                  style={{ height: `${heightPct}%` }}
                  className="w-3.5 rounded-t-[3px] bg-[#8A6D3B]/80 dark:bg-[#d4c5a9]/80 group-hover:bg-[#8A6D3B] dark:group-hover:bg-[#d4c5a9] transition-all"
                />
                {/* Panels Bar */}
                <div
                  style={{ height: `${panelHeight}px` }}
                  className="w-2.5 rounded-t-[3px] bg-emerald-500/80 group-hover:bg-emerald-500 transition-all"
                />
              </div>
              <span className="text-[10px] font-semibold text-slate-600 dark:text-zinc-400 mt-1 tabular-nums">
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 3. DISCIPLINE PIPELINE RADIAL DONUT
// ============================================================================
export const DisciplineRadialDonut: React.FC<{ className?: string }> = ({ className }) => {
  const slices = [
    { label: 'Piping & Layout', pct: 38, color: '#8A6D3B', strokeDark: '#d4c5a9' },
    { label: 'Mechanical HVAC', pct: 24, color: '#0696D7', strokeDark: '#38bdf8' },
    { label: 'Civil / Structural', pct: 18, color: '#10B981', strokeDark: '#34d399' },
    { label: 'Project Controls', pct: 12, color: '#8B5CF6', strokeDark: '#a78bfa' },
    { label: 'Dev / Software', pct: 8, color: '#F59E0B', strokeDark: '#fbbf24' }
  ];

  const circumference = 2 * Math.PI * 40; // radius = 40
  let accumulatedOffset = 0;

  return (
    <div className={cn('flex items-center gap-4 select-none', className)}>
      <div className="relative w-24 h-24 shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-black/[0.06] dark:text-white/[0.06]" strokeWidth="12" />
          {slices.map((slice, i) => {
            const strokeDasharray = `${(slice.pct / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedOffset;
            accumulatedOffset += (slice.pct / 100) * circumference;

            return (
              <circle
                key={i}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={slice.color}
                strokeWidth="12"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
          <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">85</span>
          <span className="text-[8px] text-slate-400 dark:text-zinc-500 font-semibold uppercase mt-0.5">Total</span>
        </div>
      </div>

      <div className="space-y-1 text-[10px] flex-1">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300 font-medium">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span>{s.label}</span>
            </span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
