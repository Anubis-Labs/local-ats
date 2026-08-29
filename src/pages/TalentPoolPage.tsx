import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookmarkCheck,
  Search,
  Users,
  ChevronRight,
  Plus,
  Tag,
  MapPin,
  Sparkles,
  Award,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { candidateService } from '../services/candidateService';
import { mockCandidates } from '../mock/candidatesData';
import { Candidate } from '../types/candidate';
import { Badge, Button, Input, Modal, Textarea, Card, RatingStars, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const TalentPoolPage: React.FC = () => {
  const [poolCandidates, setPoolCandidates] = useState<Candidate[]>(() =>
    mockCandidates.filter((c) => c.inTalentPool || c.stage === 'archived' || c.rating >= 4)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activePoolFilter, setActivePoolFilter] = useState('all');
  const [showCreatePoolModal, setShowCreatePoolModal] = useState(false);
  const [poolName, setPoolName] = useState('');
  const [poolDept, setPoolDept] = useState('Piping & Mechanical');
  const [poolDesc, setPoolDesc] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  const load = async () => {
    const all = await candidateService.getCandidates({ inTalentPool: true });
    if (all.length > 0) setPoolCandidates(all);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreatePool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poolName.trim()) return;

    sound.chime();
    setShowCreatePoolModal(false);
    toast('Talent Pool Created', `"${poolName}" roster established for future requisitions.`, 'success');
    setPoolName('');
    setPoolDesc('');
  };

  const poolCategories = [
    { id: 'all', label: `All Reserves (${poolCandidates.length})` },
    { id: 'piping', label: 'Piping & Layout (SAGD)' },
    { id: 'mechanical', label: 'Mechanical & HVAC' },
    { id: 'controls', label: 'Project Controls & Cost' },
    { id: 'silver', label: 'Silver Medalists' }
  ];

  const filtered = poolCandidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      activePoolFilter === 'all' ||
      (activePoolFilter === 'piping' && c.currentRole.toLowerCase().includes('piping')) ||
      (activePoolFilter === 'mechanical' && c.currentRole.toLowerCase().includes('mechanical')) ||
      (activePoolFilter === 'controls' && (c.currentRole.toLowerCase().includes('controls') || c.currentRole.toLowerCase().includes('cost'))) ||
      (activePoolFilter === 'silver' && (c.stage === 'archived' || c.stage === 'rejected'));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT TALENT POOL HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="briefing-ribbon" opacity="opacity-40 dark:opacity-25" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Talent Nurturing Roster</span>
                  <span className="opacity-30">•</span>
                  <span>{poolCandidates.length} Silver Medalists & Bench Talent</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Talent Pools & Pipeline Reserves
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                size="xs"
                variant="champagne"
                onClick={() => {
                  sound.click();
                  setShowCreatePoolModal(true);
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" strokeWidth={2} />
                <span>Create Talent Pool</span>
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-2.5" />
              <Input
                placeholder="Search talent pool by skill or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-8 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {poolCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.click();
                    setActivePoolFilter(cat.id);
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-all',
                    activePoolFilter === cat.id
                      ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black shadow-xs'
                      : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08]'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. TALENT POOL CARDS WITH TOPOGRAPHY & CAD SURFACES */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c) => {
            return (
              <div
                key={c.id}
                onClick={() => {
                  sound.click();
                  navigate(`/candidates/${c.id}`);
                }}
                className="rounded-[14px] p-5 space-y-4 shadow-sm border border-black/[0.08] dark:border-white/10 cursor-pointer hover:scale-[1.01] transition-all specimen-chamfer bg-white dark:bg-[#12151D] group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-12 h-12 rounded-[8px] object-cover border border-black/10 dark:border-white/15 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-slate-900 dark:text-white font-display group-hover:text-[#8A6D3B] dark:group-hover:text-[#d4c5a9] transition-colors">{c.name}</h3>
                        {(c.name.includes('P.Eng.') || c.name.includes('CET') || c.parsedResume?.certifications?.some(cert => cert.isVerified)) && (
                          <Badge variant="champagne" size="sm">STAMPED</Badge>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-zinc-300 font-medium mt-0.5">{c.currentRole}</div>
                    </div>
                  </div>
                  <Badge variant={c.stage === 'archived' ? 'neutral' : 'success'} size="sm">
                    {c.stage === 'archived' ? 'Silver Medalist' : 'Bench Active'}
                  </Badge>
                </div>

                <div className="text-xs text-slate-600 dark:text-zinc-300 line-clamp-2 italic leading-relaxed bg-slate-50 dark:bg-black/20 p-2.5 rounded-[6px] border border-black/[0.04] dark:border-white/[0.04]">
                  "{c.parsedResume.summary}"
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {c.tags.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-[4px] bg-slate-100 dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-[10px] font-semibold text-slate-800 dark:text-zinc-200">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/[0.06] dark:border-white/10 text-xs">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">{c.location} • <strong className="text-slate-700 dark:text-zinc-300">{c.experienceYears} yrs exp</strong></span>
                  <span className="font-semibold text-[#8A6D3B] dark:text-[#d4c5a9] flex items-center gap-1">
                    <span>Candidate Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. CREATE TALENT POOL MODAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={showCreatePoolModal}
        onClose={() => setShowCreatePoolModal(false)}
        title="Create Specialized Talent Pool"
        subtitle="Establish dedicated reserve bench for ongoing engineering disciplines"
        maxWidth="md"
      >
        <form onSubmit={handleCreatePool} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Talent Pool Name</label>
            <Input
              required
              placeholder="e.g. SAGD Piping Designers (Brownfield Surmont / Firebag)"
              value={poolName}
              onChange={(e) => setPoolName(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Discipline / Department</label>
            <select
              value={poolDept}
              onChange={(e) => setPoolDept(e.target.value)}
              className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-medium"
            >
              <option value="Piping & Mechanical">Piping & Mechanical</option>
              <option value="Civil & Structural">Civil & Structural</option>
              <option value="Electrical & Instrumentation">Electrical & Instrumentation (E&I)</option>
              <option value="Process & Chemical">Process & Chemical</option>
              <option value="Project Controls & Estimating">Project Controls & Estimating</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Pool Strategy & Ingestion Criteria</label>
            <Textarea
              rows={2}
              placeholder="e.g. Track all senior designers with 8+ years Plant 3D and ASET CET licenses for upcoming Q4 turnaround expansions."
              value={poolDesc}
              onChange={(e) => setPoolDesc(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowCreatePoolModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit" className="font-semibold">
              Create Talent Pool
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
