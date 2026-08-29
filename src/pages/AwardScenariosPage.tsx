import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Percent,
  AlertTriangle,
  CheckCircle2,
  HardHat,
  DollarSign,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Sliders,
  Layers,
  Trophy
} from 'lucide-react';
import { Badge, Button, Input, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface ProjectAwardScenario {
  id: string;
  projectName: string;
  client: string;
  awardProbability: number; // e.g. 75
  targetStartDate: string;
  headcountDemand: number;
  internalStaffAvailable: number;
  externalHiresRequired: number;
  estimatedContractValue: string;
  status: 'bid_in_review' | 'preferred_proponent' | 'sanctioned';
}

export const AwardScenariosPage: React.FC = () => {
  const [scenarios, setScenarios] = useState<ProjectAwardScenario[]>([
    {
      id: 'sc-1',
      projectName: 'Surmont SAGD Phase 2 Debottlenecking',
      client: 'ConocoPhillips Canada',
      awardProbability: 90,
      targetStartDate: 'Oct 01, 2026',
      headcountDemand: 12,
      internalStaffAvailable: 5,
      externalHiresRequired: 7,
      estimatedContractValue: '$18.5M EPCM',
      status: 'sanctioned'
    },
    {
      id: 'sc-2',
      projectName: 'Kearl Lake Oil Sands Extraction Expansion',
      client: 'Imperial Oil',
      awardProbability: 75,
      targetStartDate: 'Nov 15, 2026',
      headcountDemand: 18,
      internalStaffAvailable: 6,
      externalHiresRequired: 12,
      estimatedContractValue: '$24.0M EPCM',
      status: 'preferred_proponent'
    },
    {
      id: 'sc-3',
      projectName: 'Heartland Petrochemical Complex Phase 3',
      client: 'Inter Pipeline',
      awardProbability: 50,
      targetStartDate: 'Jan 10, 2027',
      headcountDemand: 14,
      internalStaffAvailable: 3,
      externalHiresRequired: 11,
      estimatedContractValue: '$16.2M EPCM',
      status: 'bid_in_review'
    }
  ]);

  const { toast } = useToast();
  const navigate = useNavigate();

  // Aggregate stats
  const totalDemand = scenarios.reduce((acc, s) => acc + s.headcountDemand, 0);
  const totalInternal = scenarios.reduce((acc, s) => acc + s.internalStaffAvailable, 0);
  const totalExternal = scenarios.reduce((acc, s) => acc + s.externalHiresRequired, 0);

  const handleAdjustProbability = (id: string, newProb: number) => {
    sound.pop();
    setScenarios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, awardProbability: newProb } : s))
    );
    toast('Probability Adjusted', 'Recalculated weighted recruitment demand curve.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. SCENARIOS HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="analytics-harmonics" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Pre-Award Workforce Intelligence</span>
                <span className="opacity-30">•</span>
                <span>Project Win Probability & Staffing Deficit Modeling</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Award Scenario Planning & Demand Forecaster
              </h1>
            </div>
          </div>

          <Badge variant="champagne" size="sm">3 Major Capital Bids Under Simulation</Badge>
        </div>
      </header>

      {/* 2. SCENARIO SIMULATION DASHBOARD */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Tension Warning Banner */}
        <div className="p-6 rounded-[12px] bg-amber-500/10 border border-amber-500/30 text-xs space-y-2 specimen-chamfer">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400 text-sm">
            <ShieldAlert className="w-5 h-5" />
            <span>Simultaneous Award Tension Warning: Severe Senior Piping Lead Deficit</span>
          </div>
          <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
            If both <strong>Surmont Phase 2</strong> and <strong>Kearl Lake Expansion</strong> achieve sanctioning in Q4 2026, the firm faces a net deficit of <strong>19 external engineering hires</strong>, with critical bottlenecks in Plant 3D layout leads and stamped ASME B31.3 stress engineers.
          </p>
        </div>

        {/* Unified Staffing Outlook Panel */}
        <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-5">
          {/* Header & Context */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
            <div>
              <h2 className="type-section-title text-slate-900 dark:text-white">Staffing Outlook</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Projected demand across 3 pursuits</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Net Equation:</span>
              <span className="text-xs font-semibold tabular-nums text-slate-800 dark:text-zinc-200">
                {totalDemand} total − {totalInternal} internal = {totalExternal} external hires
              </span>
            </div>
          </div>

          {/* Three Aligned Metric Groups */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-black/[0.06] dark:md:divide-white/[0.06]">
            {/* Metric 1: Total Roles */}
            <div className="md:pr-6 space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-display tabular-nums tracking-tight text-slate-900 dark:text-white">
                {totalDemand}
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-zinc-200">Total roles</div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">Anticipated project demand</div>
            </div>

            {/* Metric 2: Internal Capacity */}
            <div className="md:px-6 space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-display tabular-nums tracking-tight text-emerald-600 dark:text-emerald-400">
                {totalInternal}
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-zinc-200">Internal capacity</div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">
                {Math.round((totalInternal / totalDemand) * 100)}% covered by deployable staff
              </div>
            </div>

            {/* Metric 3: External Hires */}
            <div className="md:pl-6 space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-display tabular-nums tracking-tight text-amber-600 dark:text-amber-400">
                {totalExternal}
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-zinc-200">External hires</div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">
                {Math.round((totalExternal / totalDemand) * 100)}% sourcing requirement
              </div>
            </div>
          </div>

          {/* Segmented Horizontal Capacity Bar */}
          <div className="space-y-2 pt-1">
            <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-black/40 overflow-hidden flex border border-black/[0.06] dark:border-white/[0.06] p-0.5">
              <div
                style={{ width: `${(totalInternal / totalDemand) * 100}%` }}
                className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
                title={`${totalInternal} Internal Roles (${Math.round((totalInternal / totalDemand) * 100)}%)`}
              />
              <div
                style={{ width: `${(totalExternal / totalDemand) * 100}%` }}
                className="h-full bg-amber-500 rounded-r-full transition-all duration-500"
                title={`${totalExternal} External Hires (${Math.round((totalExternal / totalDemand) * 100)}%)`}
              />
            </div>

            {/* Segment Legend */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 pt-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-700 dark:text-zinc-300 tabular-nums">{totalInternal} internal roles</strong> ({Math.round((totalInternal / totalDemand) * 100)}%)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-700 dark:text-zinc-300 tabular-nums">{totalExternal} external hires</strong> ({Math.round((totalExternal / totalDemand) * 100)}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Probability Cards */}
        <div className="space-y-4">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-zinc-400 pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
            Active Capital Bid Pipeline Simulation
          </div>

          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{sc.projectName}</h3>
                    <Badge variant={sc.awardProbability >= 75 ? 'success' : 'champagne'} size="sm">
                      {sc.awardProbability}% WIN PROBABILITY
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-zinc-300 font-medium mt-0.5">
                    Client: {sc.client} • Target Mobilization: <strong className="text-slate-900 dark:text-white font-semibold">{sc.targetStartDate}</strong>
                  </div>
                  <div className="text-[12px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    Estimated Value: <span className="font-semibold text-slate-800 dark:text-zinc-200 tabular-nums">{sc.estimatedContractValue}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-semibold text-sm text-slate-900 dark:text-white font-display tabular-nums">
                      {sc.externalHiresRequired} external of {sc.headcountDemand} total
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-zinc-400">Staffing Sourcing Ratio</div>
                  </div>
                </div>
              </div>

              {/* Interactive Probability Slider */}
              <div className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-700 dark:text-zinc-300">Adjust Commercial Award Probability:</span>
                  <span className="font-semibold text-[#8A6D3B] dark:text-[#d4c5a9] text-sm tabular-nums">{sc.awardProbability}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={sc.awardProbability}
                  onChange={(e) => handleAdjustProbability(sc.id, Number(e.target.value))}
                  className="w-full accent-[#8A6D3B] cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
