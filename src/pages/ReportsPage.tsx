import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Award,
  Users,
  Calendar,
  Download,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  AlertTriangle
} from 'lucide-react';
import { mockReportsData } from '../mock/reportsData';
import { Badge, Button, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const ReportsPage: React.FC = () => {
  const [data] = useState(mockReportsData);
  const { toast } = useToast();

  const handleExport = () => {
    toast('Report Exported', 'Analytics CSV snapshot downloaded to your local disk.', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT REPORTS HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="analytics-harmonics" opacity="opacity-45 dark:opacity-25" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Executive Reporting & Analytics</span>
                <span className="opacity-30">•</span>
                <span>Q3 2026</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Hiring Funnel & Velocity
              </h1>
            </div>
          </div>

          <Button size="xs" variant="champagne" onClick={handleExport} className="gap-1.5 font-semibold text-xs whitespace-nowrap shrink-0">
            <Download className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" strokeWidth={2} />
            <span>Export Analytics CSV</span>
          </Button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN REPORT CANVAS WITH THEMATIC BACKGROUNDS */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-8 max-w-7xl mx-auto w-full">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] space-y-2 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">Active Requisitions</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{data.totalOpenJobs}</div>
            <div className="text-xs text-slate-600 dark:text-zinc-300 font-medium">58 active candidates in pipeline</div>
          </div>

          <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] space-y-2 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer specimen-chamfer-champagne">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A6D3B] dark:text-[#d4c5a9]">Offers Pending</div>
            <div className="text-3xl font-bold text-[#8A6D3B] dark:text-[#d4c5a9] tracking-tight">{data.offersPendingCount}</div>
            <div className="text-xs text-slate-600 dark:text-zinc-200 font-medium">Awaiting executive sign-off</div>
          </div>

          <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] space-y-2 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Active Candidates</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-emerald-400 tracking-tight">{data.totalActiveCandidates}</div>
            <div className="text-xs text-slate-600 dark:text-zinc-300 font-medium">Across 5 live requisitions</div>
          </div>

          <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] space-y-2 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">Stalled Candidates</div>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 tracking-tight">{data.stalledCandidatesCount}</div>
            <div className="text-xs text-slate-600 dark:text-zinc-300 font-medium">&gt; 7 days without update</div>
          </div>
        </div>

        {/* Funnel Conversion Surface */}
        <div className="rounded-[12px] bg-white dark:bg-[#12151D] p-6 space-y-6 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/10">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Stage Conversion Funnel
            </span>
            <span className="text-[10px] font-semibold text-[#8A6D3B] dark:text-[#d4c5a9] tabular-nums">148 Total Intake</span>
          </div>

          <div className="space-y-4">
            {data.funnel.map((stg) => (
              <div key={stg.stage} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-white">
                  <span>{stg.stage}</span>
                  <span className="text-slate-600 dark:text-[#d4c5a9] tabular-nums">{stg.count} candidates ({stg.conversionRate}%) • avg {stg.avgDaysInStage}d</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-black/60 overflow-hidden border border-black/10 dark:border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-[#8A6D3B] dark:from-[#56A396] dark:to-[#D4C5A9]"
                    style={{ width: `${Math.max(stg.conversionRate, 6)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
