import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Layers,
  ArrowRight,
  ShieldCheck,
  User,
  Merge,
  ChevronRight
} from 'lucide-react';
import { Badge, Button, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface DuplicatePair {
  id: string;
  confidence: number;
  matchReason: string;
  recordA: {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    experience: string;
    source: string;
    activeApplications: string[];
  };
  recordB: {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    experience: string;
    source: string;
    activeApplications: string[];
  };
}

export const DuplicateResolutionPage: React.FC = () => {
  const [duplicatePairs, setDuplicatePairs] = useState<DuplicatePair[]>([
    {
      id: 'dup-01',
      confidence: 96,
      matchReason: 'Exact Phone Match (+1 403 555-0142) & 92% Name Levenshtein distance',
      recordA: {
        id: 'cand-001',
        name: 'Tariq Al-Mansoor, CET',
        email: 'tariq.almansoor@email.com',
        phone: '+1 (403) 555-0142',
        company: 'Fluor Canada (12y exp)',
        experience: 'Senior Piping Designer • Plant 3D & Surmont SAGD',
        source: 'LinkedIn RSC (Synced 3m ago)',
        activeApplications: ['Senior Piping Designer (app-101)']
      },
      recordB: {
        id: 'cand-089',
        name: 'Tariq Mansoor',
        email: 'tariq.m.piping@gmail.com',
        phone: '+1 (403) 555-0142',
        company: 'Fluor Corp (10y exp)',
        experience: 'Piping Designer • CADWorx & Plant 3D',
        source: 'Indeed Apply (Synced 2w ago)',
        activeApplications: ['Lead Mechanical HVAC Engineer (app-102)']
      }
    }
  ]);

  const [selectedPrimary, setSelectedPrimary] = useState<'A' | 'B'>('A');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleMerge = (pairId: string) => {
    sound.chime();
    setDuplicatePairs((prev) => prev.filter((p) => p.id !== pairId));
    toast('Records Merged', 'Successfully consolidated applications, work histories, and notes into primary dossier.', 'success');
  };

  const handleDismiss = (pairId: string) => {
    sound.latch();
    setDuplicatePairs((prev) => prev.filter((p) => p.id !== pairId));
    toast('Marked Not a Duplicate', 'Records will remain separate in candidate directory.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. DUPLICATE RESOLUTION HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="radar-compliance" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <Layers className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Data Quality & Integrity</span>
                <span className="opacity-30">•</span>
                <span>{duplicatePairs.length} Ambiguous Matches Detected</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Candidate Duplicate Resolution Studio
              </h1>
            </div>
          </div>

          <Badge variant="champagne" size="sm">Deterministic OCR & Phone Matching</Badge>
        </div>
      </header>

      {/* 2. DUPLICATES RESOLUTION CARDS */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        {duplicatePairs.length === 0 ? (
          <div className="p-12 text-center rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Candidate Directory Clean</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              No unresolved duplicates detected. All phone numbers, emails, and APEGA/ASET numbers are unique.
            </p>
          </div>
        ) : (
          duplicatePairs.map((pair) => (
            <div
              key={pair.id}
              className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                    {pair.matchReason}
                  </span>
                </div>
                <span className="text-xs font-semibold tabular-nums text-amber-600 dark:text-amber-400">
                  {pair.confidence}% Match Confidence
                </span>
              </div>

              {/* Side by Side Diff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Record A */}
                <div
                  onClick={() => setSelectedPrimary('A')}
                  className={cn(
                    'p-4 rounded-[10px] border cursor-pointer transition-all space-y-3',
                    selectedPrimary === 'A'
                      ? 'bg-amber-50/70 dark:bg-[#201C14] border-[#8A6D3B] dark:border-[#d4c5a9]'
                      : 'bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{pair.recordA.name}</span>
                    {selectedPrimary === 'A' && <Badge variant="champagne" size="sm">Primary Master Record</Badge>}
                  </div>
                  <div className="space-y-1 text-slate-700 dark:text-zinc-300">
                    <div><strong>Email:</strong> {pair.recordA.email}</div>
                    <div><strong>Phone:</strong> {pair.recordA.phone}</div>
                    <div><strong>Company:</strong> {pair.recordA.company}</div>
                    <div><strong>Source:</strong> {pair.recordA.source}</div>
                    <div><strong>Active Applications:</strong> {pair.recordA.activeApplications.join(', ')}</div>
                  </div>
                </div>

                {/* Record B */}
                <div
                  onClick={() => setSelectedPrimary('B')}
                  className={cn(
                    'p-4 rounded-[10px] border cursor-pointer transition-all space-y-3',
                    selectedPrimary === 'B'
                      ? 'bg-amber-50/70 dark:bg-[#201C14] border-[#8A6D3B] dark:border-[#d4c5a9]'
                      : 'bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{pair.recordB.name}</span>
                    {selectedPrimary === 'B' && <Badge variant="champagne" size="sm">Primary Master Record</Badge>}
                  </div>
                  <div className="space-y-1 text-slate-700 dark:text-zinc-300">
                    <div><strong>Email:</strong> {pair.recordB.email}</div>
                    <div><strong>Phone:</strong> {pair.recordB.phone}</div>
                    <div><strong>Company:</strong> {pair.recordB.company}</div>
                    <div><strong>Source:</strong> {pair.recordB.source}</div>
                    <div><strong>Active Applications:</strong> {pair.recordB.activeApplications.join(', ')}</div>
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/[0.06] dark:border-white/10">
                <Button
                  size="xs"
                  variant="machined"
                  onClick={() => handleDismiss(pair.id)}
                  className="font-semibold text-xs"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1" />
                  <span>Not a Duplicate</span>
                </Button>

                <Button
                  size="xs"
                  variant="champagne"
                  onClick={() => handleMerge(pair.id)}
                  className="font-semibold text-xs"
                >
                  <Merge className="w-3.5 h-3.5 mr-1" />
                  <span>Merge into Record {selectedPrimary}</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};
