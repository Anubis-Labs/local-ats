import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Columns3,
  Search,
  Filter,
  Plus,
  ArrowRight,
  AlertTriangle,
  BookmarkCheck,
  ChevronRight,
  Sparkles,
  Scale,
  PanelRightClose,
  PanelRightOpen,
  Briefcase,
  Layers,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  PhoneCall,
  UserCheck,
  ChevronLeft,
  ArrowLeftRight,
  MousePointer
} from 'lucide-react';
import { candidateService } from '../services/candidateService';
import { jobService } from '../services/jobService';
import { pipelineService } from '../services/pipelineService';
import { mockCandidates } from '../mock/candidatesData';
import { mockJobs } from '../mock/jobsData';
import { DEFAULT_STAGES, PipelineStageConfig } from '../types/pipeline';
import { Candidate, PipelineStageId } from '../types/candidate';
import { Job } from '../types/job';
import { Badge, Button, Input, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const PipelinePage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [stages, setStages] = useState<PipelineStageConfig[]>(
    DEFAULT_STAGES.filter((s) => s.id !== 'rejected' && s.id !== 'archived')
  );
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [draggedCandidateId, setDraggedCandidateId] = useState<string | null>(null);
  const [inspectCandidate, setInspectCandidate] = useState<Candidate | null>(mockCandidates[0]);

  const navigate = useNavigate();
  const { toast } = useToast();

  const loadData = async () => {
    const [cList, jList, sList] = await Promise.all([
      candidateService.getCandidates({ jobId: selectedJob !== 'all' ? selectedJob : undefined }),
      jobService.getJobs({ status: 'active' }),
      pipelineService.getStages()
    ]);
    setCandidates(cList);
    setJobs(jList);
    setStages(sList.filter((s) => s.id !== 'rejected' && s.id !== 'archived'));
  };

  useEffect(() => {
    loadData();
  }, [selectedJob]);

  const skillFilterTags = ['all', 'Plant 3D', 'SAGD', 'P.Eng.', 'STAAD.Pro', 'Heavy Industrial'];

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchSearch =
        !searchQuery.trim() ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchTag =
        selectedTag === 'all' ||
        c.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase())) ||
        (selectedTag === 'P.Eng.' && (c.name.includes('P.Eng') || c.tags.includes('P.Eng.')));

      return matchSearch && matchTag;
    });
  }, [candidates, searchQuery, selectedTag]);

  const handleDragStart = (id: string) => {
    sound.click();
    setDraggedCandidateId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (stageId: PipelineStageId) => {
    if (!draggedCandidateId) return;
    const candidateId = draggedCandidateId;
    setDraggedCandidateId(null);

    const targetCandidate = candidates.find((c) => c.id === candidateId);
    if (!targetCandidate || targetCandidate.stage === stageId) return;

    sound.latch();
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: stageId } : c))
    );

    await candidateService.updateStage(candidateId, stageId);
    toast(
      'Stage Advanced',
      `${targetCandidate.name} moved to ${stageId.replace('_', ' ')}.`,
      'success'
    );
  };

  const advanceStage = async (candidateId: string, currentStage: PipelineStageId) => {
    const stageOrder: PipelineStageId[] = ['new', 'review', 'phone_screen', 'interview', 'final_interview', 'offer', 'hired'];
    const idx = stageOrder.indexOf(currentStage);
    if (idx === -1 || idx >= stageOrder.length - 1) return;

    const nextStage = stageOrder[idx + 1];
    sound.latch();
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: nextStage } : c))
    );
    await candidateService.updateStage(candidateId, nextStage);
    toast('Stage Advanced', `Moved to ${nextStage.replace('_', ' ')}.`, 'success');
  };

  const getStageHeaderStyle = (stageId: string) => {
    switch (stageId) {
      case 'new':
        return 'text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'review':
        return 'text-slate-800 dark:text-zinc-300 border-black/10 dark:border-white/10';
      case 'phone_screen':
        return 'text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'interview':
        return 'text-emerald-800 dark:text-emerald-400 border-emerald-500/40 font-bold';
      case 'final_interview':
        return 'text-[#8A6D3B] dark:text-[#d4c5a9] border-[#d4c5a9]/40 font-bold';
      case 'offer':
        return 'text-[#8A6D3B] dark:text-[#d4c5a9] border-[#d4c5a9]/50 font-bold';
      default:
        return 'text-slate-800 dark:text-zinc-300 border-black/10 dark:border-white/10';
    }
  };

  const getStageColumnBackground = (stageId: string) => {
    switch (stageId) {
      case 'new':
        return 'bg-slate-100/80 dark:bg-[#12151D]/90';
      case 'review':
        return 'bg-slate-100/80 dark:bg-[#12151D]/90';
      case 'phone_screen':
        return 'bg-slate-100/80 dark:bg-[#12151D]/90';
      case 'interview':
        return 'bg-emerald-50/50 dark:bg-emerald-950/20';
      case 'final_interview':
        return 'bg-amber-50/50 dark:bg-amber-950/20';
      case 'offer':
        return 'bg-[#8A6D3B]/10 dark:bg-[#d4c5a9]/10';
      default:
        return 'bg-slate-100/80 dark:bg-[#12151D]/90';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT PAGE HEADER & FILTER RAIL */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="pipeline-velocity" opacity="opacity-40 dark:opacity-25" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <Columns3 className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Hiring Pipeline</span>
                  <span className="opacity-30">•</span>
                  <span>{filteredCandidates.length} Active Candidates</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Pipeline Kanban Board
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <select
                value={selectedJob}
                onChange={(e) => {
                  sound.click();
                  setSelectedJob(e.target.value);
                }}
                className="h-8 px-3 rounded-[6px] border border-black/10 dark:border-white/[0.1] bg-white dark:bg-[#12151D] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none shadow-2xs"
              >
                <option value="all">All Requisitions ({jobs.length})</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>

              <Button size="xs" variant="champagne" onClick={() => navigate('/import')} className="gap-1.5 font-semibold text-xs">
                <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" strokeWidth={2} />
                <span>Intake Candidate</span>
              </Button>
            </div>
          </div>

          {/* Real-Time Skill Filter Chips & Small Print Instructions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
            <div className="flex items-center gap-2 overflow-x-auto">
              <div className="relative flex-1 max-w-xs shrink-0">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <Input
                  placeholder="Filter pipeline candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-7 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {skillFilterTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      sound.click();
                      setSelectedTag(tag);
                    }}
                    className={cn(
                      'px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-all',
                      selectedTag === tag
                        ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black font-bold shadow-xs'
                        : 'bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/10'
                    )}
                  >
                    {tag === 'all' ? 'All Skills' : tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Small Print Scroll Instructions for Idiots */}
            <div className="flex items-center gap-2 text-[10px] tabular-nums text-slate-600 dark:text-zinc-400 bg-black/[0.04] dark:bg-white/[0.04] px-2.5 py-1 rounded-[6px] border border-black/[0.08] dark:border-white/[0.08] select-none shrink-0">
              <ArrowLeftRight className="w-3 h-3 text-[#8A6D3B] dark:text-[#d4c5a9]" />
              <span><strong className="text-slate-800 dark:text-zinc-200 font-semibold">Board Navigation:</strong> Hold <kbd className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[9px] font-sans font-bold text-slate-800 dark:text-zinc-200">Shift</kbd> + Mousewheel or swipe trackpad sideways to view all columns &bull; Drag cards between columns</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. KANBAN BOARD WITH COLOR BLEND STAGE COLUMNS */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-x-auto p-6 lg:p-8">
          <div className="flex gap-4 min-w-max h-full items-start">
            {stages.map((stage) => {
              const stageCandidates = filteredCandidates.filter((c) => c.stage === stage.id);
              const colBg = getStageColumnBackground(stage.id);
              const headerStyle = getStageHeaderStyle(stage.id);

              return (
                <div
                  key={stage.id}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(stage.id)}
                  className={cn(
                    'w-72 flex flex-col rounded-[12px] p-3.5 max-h-[calc(100vh-160px)] shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer',
                    colBg
                  )}
                >
                  {/* Stage Column Header */}
                  <div className={cn('flex items-center justify-between pb-3 mb-2 border-b select-none', headerStyle)}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                        {stage.name}
                      </span>
                    </div>
                    <span className="text-xs font-semibold tabular-nums px-2 py-0.5 rounded-full bg-black/10 dark:bg-black/40 text-slate-900 dark:text-white border border-black/10 dark:border-white/10">
                      {stageCandidates.length}
                    </span>
                  </div>

                  {/* Stage Candidates Cards */}
                  <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
                    {stageCandidates.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 dark:text-zinc-500 text-xs italic">
                        Empty stage
                      </div>
                    ) : (
                      stageCandidates.map((c) => (
                        <div
                          key={c.id}
                          draggable
                          onDragStart={() => handleDragStart(c.id)}
                          onClick={() => {
                            sound.click();
                            setInspectCandidate(c);
                          }}
                          className={cn(
                            'p-3.5 rounded-[9px] bg-white dark:bg-[#12151D]/90 border border-black/[0.08] dark:border-white/10 hover:border-black/20 dark:hover:border-white/25 transition-all cursor-grab active:cursor-grabbing shadow-xs space-y-2 select-none group',
                            inspectCandidate?.id === c.id && 'ring-2 ring-[#8A6D3B] dark:ring-[#d4c5a9] border-transparent'
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white text-xs leading-tight">
                                {c.name}
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-zinc-300 mt-0.5 font-medium">
                                {c.currentRole}
                              </div>
                            </div>
                            <span className="text-[11px] font-semibold text-[#8A6D3B] dark:text-[#d4c5a9] tabular-nums">
                              {c.rating >= 4 ? '98%' : '84%'}
                            </span>
                          </div>

                          <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium truncate">
                            {c.currentCompany} ({c.experienceYears}y)
                          </div>

                          {/* Quick Advance & Tag Bar */}
                          <div className="flex items-center justify-between pt-1 border-t border-black/[0.06] dark:border-white/10 text-[10px]">
                            <span className="text-slate-500 dark:text-zinc-400">{c.location}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                advanceStage(c.id, c.stage);
                              }}
                              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-black/40 hover:bg-[#8A6D3B] hover:text-white dark:hover:bg-[#d4c5a9] dark:hover:text-black border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-semibold transition-colors flex items-center gap-1"
                              title="Advance to next stage"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Selected Candidate Quick Inspector */}
        {inspectCandidate && (
          <aside className="w-80 border-l border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#12151D] p-6 space-y-5 overflow-y-auto shrink-0 select-none text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.1]">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                Candidate Snapshot
              </span>
              <Button size="xs" variant="machined" onClick={() => navigate(`/candidates/${inspectCandidate.id}`)} className="font-semibold">
                Dossier →
              </Button>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{inspectCandidate.name}</h3>
              <div className="text-xs text-slate-600 dark:text-zinc-300 font-medium">
                {inspectCandidate.currentRole} • {inspectCandidate.currentCompany}
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-zinc-200 italic bg-slate-50 dark:bg-black/40 p-3.5 rounded-[8px] border border-black/10 dark:border-white/10 leading-relaxed">
              "{inspectCandidate.parsedResume.summary}"
            </p>

            <div className="space-y-2 pt-2 border-t border-black/[0.08] dark:border-white/10">
              <div className="font-bold text-[10px] text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                Assigned Requisition
              </div>
              <div className="font-semibold text-[#8A6D3B] dark:text-[#d4c5a9]">
                {inspectCandidate.jobTitle || 'General Sourcing'}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
