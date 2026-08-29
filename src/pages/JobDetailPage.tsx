import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  Users,
  Plus,
  Sparkles,
  CheckCircle2,
  Trash2,
  Scale,
  PanelRightClose,
  PanelRightOpen,
  DollarSign,
  MapPin,
  Calendar,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { jobService } from '../services/jobService';
import { candidateService } from '../services/candidateService';
import { mockJobs } from '../mock/jobsData';
import { mockCandidates } from '../mock/candidatesData';
import { Job, JobRequirement } from '../types/job';
import { Candidate } from '../types/candidate';
import { Badge, Button, Input, Textarea, Card, RatingStars, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { useAssistant } from '../context/AssistantContext';
import { sound } from '../utils/sound';

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { openAssistant } = useAssistant();

  const [job, setJob] = useState<Job | null>(
    () => mockJobs.find((j) => j.id === id) || mockJobs[0]
  );
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [activeView, setActiveView] = useState<'requirements' | 'candidates' | 'team'>('requirements');
  const [showInspector, setShowInspector] = useState(true);

  const [reqLabel, setReqLabel] = useState('');
  const [reqCategory, setReqCategory] = useState<'must_have' | 'nice_to_have' | 'certification'>('must_have');
  const [reqDesc, setReqDesc] = useState('');

  const loadJob = async () => {
    if (!id) return;
    const [j, cList] = await Promise.all([
      jobService.getJobById(id),
      candidateService.getCandidates({ jobId: id })
    ]);
    if (j) setJob(j);
    setCandidates(cList);
  };

  useEffect(() => {
    loadJob();
  }, [id]);

  if (!job) {
    return (
      <div className="p-12 text-center text-zinc-500 text-xs">
        Loading requisition workspace...
      </div>
    );
  }

  const handleAddRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqLabel.trim()) return;

    sound.click();
    const newReq: JobRequirement = {
      id: `req-${Date.now()}`,
      label: reqLabel,
      category: reqCategory,
      description: reqDesc || reqLabel,
      keywords: reqLabel.split(' ')
    };

    setJob({
      ...job,
      requirements: [...job.requirements, newReq]
    });

    setReqLabel('');
    setReqDesc('');
    toast('Requirement Added', 'Added structured requirement to requisition matrix.', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT STICKY IDENTITY HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/90 dark:bg-[#07080A]/90 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-3.5 select-none shrink-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <button
                onClick={() => navigate('/jobs')}
                className="p-1.5 rounded-[6px] text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors"
                title="Back to requisitions"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              </button>

              <Briefcase className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight truncate">
                    {job.title}
                  </h1>
                  <Badge variant={job.status === 'active' ? 'champagne' : 'outline'} size="sm">
                    {job.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5 flex items-center gap-2 truncate">
                  <span className="font-semibold text-zinc-200">{job.department}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>Target: <strong className="text-white font-semibold">{job.targetHires} hires</strong> ({job.hiresCount} made)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Button
                size="xs"
                variant="champagne"
                onClick={() => {
                  sound.chime();
                  navigate(`/intelligence`);
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4c5a9]" strokeWidth={2} />
                <span>Match Matrix</span>
              </Button>

              <button
                onClick={() => setShowInspector(!showInspector)}
                className={cn(
                  'p-1.5 rounded-[6px] transition-colors',
                  showInspector
                    ? 'bg-white/[0.08] text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                )}
                title="Toggle reference inspector"
              >
                {showInspector ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Views Navigation */}
          <div className="flex items-center gap-1 nav-rail-pill mt-3 w-fit">
            {[
              { id: 'requirements', label: `1. Requirements (${job.requirements.length})` },
              { id: 'candidates', label: `2. Candidates Pool (${candidates.length})` },
              { id: 'team', label: `3. Hiring Team (${job.hiringTeam.length})` }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  sound.click();
                  setActiveView(v.id as any);
                }}
                className={cn(
                  'nav-rail-item',
                  activeView === v.id && 'nav-rail-item-active'
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKING CANVAS */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* VIEW 1: REQUIREMENTS BUILDER */}
          {activeView === 'requirements' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Deterministic Matching Criteria
                  </h3>
                  <span className="text-[10px] font-mono text-[#d4c5a9]">Used by Local Retrieval Engine</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.requirements.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-[10px] bg-card-cad space-y-1.5 text-xs shadow-md specimen-chamfer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{r.label}</span>
                        <Badge
                          variant={r.category === 'must_have' ? 'champagne' : 'neutral'}
                          size="sm"
                        >
                          {r.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-zinc-300 text-xs">{r.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirement Creation Form */}
              <div className="p-6 rounded-[12px] bg-card-topography space-y-4 shadow-xl specimen-chamfer specimen-chamfer-champagne">
                <div className="font-bold text-xs uppercase tracking-wider text-white pb-2 border-b border-white/10">
                  Add Structured Requirement
                </div>

                <form onSubmit={handleAddRequirement} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-300 mb-1 font-semibold">Requirement Name</label>
                      <Input
                        required
                        placeholder="e.g. Navisworks Clash Detection, ASET CET"
                        value={reqLabel}
                        onChange={(e) => setReqLabel(e.target.value)}
                        className="bg-[#12151D] border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 mb-1 font-semibold">Category Priority</label>
                      <select
                        value={reqCategory}
                        onChange={(e) => setReqCategory(e.target.value as any)}
                        className="w-full h-8 px-2.5 rounded-[6px] border border-white/10 bg-[#12151D] text-white font-medium text-xs"
                      >
                        <option value="must_have">Must Have (Hard Gate)</option>
                        <option value="nice_to_have">Preferred / Nice to Have</option>
                        <option value="certification">Official Engineering License</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-semibold">Verification Rubric & Notes</label>
                    <Input
                      placeholder="e.g. Must have lead 3D clash resolution on brownfield revamps"
                      value={reqDesc}
                      onChange={(e) => setReqDesc(e.target.value)}
                      className="bg-[#12151D] border-white/10 text-white"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button size="xs" variant="champagne" type="submit" className="font-semibold">
                      Add to Requisition Matrix
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* VIEW 2: CANDIDATES POOL */}
          {activeView === 'candidates' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidates.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/candidates/${c.id}`)}
                    className="p-5 rounded-[12px] bg-card-cad hover:scale-[1.01] transition-all cursor-pointer space-y-3 shadow-lg specimen-chamfer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-10 h-10 rounded-[8px] object-cover border border-white/15 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{c.name}</div>
                          <div className="text-xs text-zinc-300">{c.currentRole}</div>
                        </div>
                      </div>
                      <Badge variant="champagne" size="sm">{c.stage.replace('_', ' ')}</Badge>
                    </div>
                    <p className="text-xs text-zinc-200 line-clamp-2 italic">
                      "{c.parsedResume.summary}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: HIRING TEAM */}
          {activeView === 'team' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.hiringTeam.map((m) => (
                  <div
                    key={m.userId}
                    className="p-5 rounded-[12px] bg-card-mesh space-y-2 shadow-lg specimen-chamfer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-10 h-10 rounded-[8px] object-cover border border-white/15 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{m.name}</div>
                        <div className="text-xs text-zinc-300">{m.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Collapsible Requisition Inspector */}
        {showInspector && (
          <aside className="w-80 border-l border-white/[0.08] bg-card-topography p-6 space-y-5 overflow-y-auto shrink-0 select-none text-xs">
            <div className="font-bold text-xs uppercase tracking-wider text-white pb-3 border-b border-white/10">
              Requisition Profile
            </div>

            <div className="space-y-2 text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">Department:</span>
                <span className="font-semibold text-white">{job.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Hiring Manager:</span>
                <span className="font-semibold text-white">{job.hiringManager}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Target Salary:</span>
                <span className="font-semibold text-[#d4c5a9]">{job.salaryRange}</span>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
