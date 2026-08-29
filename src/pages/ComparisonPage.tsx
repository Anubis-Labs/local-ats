import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Scale,
  Plus,
  X,
  Star,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  DollarSign
} from 'lucide-react';
import { candidateService } from '../services/candidateService';
import { mockCandidates } from '../mock/candidatesData';
import { Candidate } from '../types/candidate';
import { Badge, Button, Card, cn } from '../components/ui';
import { useAssistant } from '../context/AssistantContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const ComparisonPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openAssistant } = useAssistant();

  const [candidates, setCandidates] = useState<Candidate[]>([mockCandidates[0], mockCandidates[2]]);
  const [allCandidates, setAllCandidates] = useState<Candidate[]>(mockCandidates);
  const [showAddSelect, setShowAddSelect] = useState(false);

  useEffect(() => {
    const load = async () => {
      const all = await candidateService.getCandidates();
      setAllCandidates(all);

      const idsParam = searchParams.get('ids');
      let targetIds = idsParam ? idsParam.split(',').filter(Boolean) : ['cand-001', 'cand-003'];

      if (targetIds.length === 0 && all.length >= 2) {
        targetIds = [all[0].id, all[1].id];
      }

      const selected = all.filter((c) => targetIds.includes(c.id));
      if (selected.length > 0) setCandidates(selected);
    };
    load();
  }, [searchParams]);

  const handleRemove = (id: string) => {
    sound.click();
    const updated = candidates.filter((c) => c.id !== id);
    setCandidates(updated);
    setSearchParams({ ids: updated.map((c) => c.id).join(',') });
  };

  const handleAdd = (id: string) => {
    sound.click();
    if (candidates.some((c) => c.id === id)) return;
    const target = allCandidates.find((c) => c.id === id);
    if (!target) return;
    const updated = [...candidates, target];
    setCandidates(updated);
    setSearchParams({ ids: updated.map((c) => c.id).join(',') });
    setShowAddSelect(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT COMPARISON HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/candidates')}
              className="p-1.5 rounded-[6px] text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors"
              title="Back to candidates"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <div className="flex items-center gap-2.5">
              <Scale className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Side-by-Side Spec Sheet</span>
                  <span className="opacity-30">•</span>
                  <span>{candidates.length} Profiles Selected</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Candidate Head-to-Head Compare
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <select
              onChange={(e) => {
                if (e.target.value) handleAdd(e.target.value);
              }}
              value=""
              className="h-8 px-3 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-xs font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none shadow-xs cursor-pointer"
            >
              <option value="" disabled>+ Add Profile to Compare</option>
              {allCandidates.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.currentRole})</option>
              ))}
            </select>

            <Button
              size="xs"
              variant="champagne"
              onClick={() => {
                sound.chime();
                openAssistant(`Analyze tradeoffs between ${candidates.map((c) => c.name).join(' and ')}`);
              }}
              className="gap-1.5 font-semibold text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" strokeWidth={2} />
              <span>AI Tradeoff Brief</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN SPEC SHEET GRID */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-8 max-w-7xl mx-auto w-full">
        {/* AI Tradeoff Surface */}
        <div className="p-6 rounded-[12px] bg-[#8A6D3B]/[0.06] dark:bg-[#d4c5a9]/[0.08] border border-[#8A6D3B]/30 dark:border-[#d4c5a9]/30 space-y-3 specimen-chamfer specimen-chamfer-champagne shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8A6D3B] dark:text-[#d4c5a9] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#8A6D3B] dark:text-[#d4c5a9]" />
            <span>AI Comparative Tradeoff Analysis</span>
          </div>
          <p className="text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-sans">
            <strong className="text-slate-900 dark:text-white">Tariq Al-Mansoor</strong> brings superior SAGD brownfield modeling depth (12y Fluor Canada) and active CET certification, ready for immediate unassisted tie-in coordination. <strong className="text-slate-900 dark:text-white">Brendan Gallagher</strong> (7y Jacobs) represents a high-potential intermediate designer with strong CADWorx modeling capability at a lower compensation band ($115k vs $120k CAD).
          </p>
        </div>

        {/* Spec Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((c) => (
            <div
              key={c.id}
              className="rounded-[12px] p-6 space-y-5 shadow-sm border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#12151D] specimen-chamfer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-12 h-12 rounded-[9px] object-cover border border-black/10 dark:border-white/15 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{c.name}</h3>
                    <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{c.currentRole}</div>
                  </div>
                </div>
                {candidates.length > 2 && (
                  <button onClick={() => handleRemove(c.id)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white p-1">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="divide-y divide-black/[0.06] dark:divide-white/10 text-xs space-y-3 pt-2">
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Fit Score</span>
                  <span className="font-mono font-bold text-[#8A6D3B] dark:text-[#d4c5a9]">{c.rating >= 4 ? '98%' : '84%'}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Experience</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{c.experienceYears} Years</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Current Employer</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{c.currentCompany}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Location</span>
                  <span className="text-slate-700 dark:text-zinc-200">{c.location}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Target Comp</span>
                  <span className="font-semibold text-[#8A6D3B] dark:text-[#d4c5a9]">{c.compensationExpectation || '$120,000 CAD'}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Availability</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{c.availability}</span>
                </div>
              </div>

              {/* Competency Tags */}
              <div className="space-y-2 pt-2 border-t border-black/[0.06] dark:border-white/10">
                <div className="text-[10px] font-bold uppercase text-slate-500 dark:text-zinc-400">Core Competencies</div>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <Badge key={t} variant="neutral" size="sm">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-3 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between">
                <Button
                  size="xs"
                  variant="machined"
                  onClick={() => navigate(`/candidates/${c.id}`)}
                  className="font-semibold text-xs"
                >
                  <span>Open Dossier →</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
