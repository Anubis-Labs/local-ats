import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Tag,
  FileText,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Award,
  Network,
  Clock,
  Sparkles,
  Plus,
  Send,
  Trash2,
  ShieldCheck,
  Scale,
  BookmarkCheck,
  ChevronRight,
  ExternalLink,
  Layers,
  PanelRightClose,
  PanelRightOpen,
  Calendar,
  DollarSign,
  User,
  Activity,
  Check,
  Star,
  Download,
  Printer
} from 'lucide-react';
import { candidateService } from '../services/candidateService';
import { mockCandidates } from '../mock/candidatesData';
import { mockApplications } from '../mock/applicationsData';
import { Candidate, PipelineStageId } from '../types/candidate';
import { Badge, Button, Input, Textarea, Card, Modal, RatingStars, cn } from '../components/ui';
import { ResumeViewer } from '../components/candidate/ResumeViewer';
import { EmailModal } from '../components/candidate/EmailModal';
import { CompetencyRadarChart } from '../components/common/VisualCharts';
import { useToast } from '../context/ToastContext';
import { useAssistant } from '../context/AssistantContext';
import { sound } from '../utils/sound';

import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { openAssistant } = useAssistant();

  const initialTab = (searchParams.get('tab') as any) || 'overview';

  const [candidate, setCandidate] = useState<Candidate | null>(
    () => mockCandidates.find((c) => c.id === id) || mockCandidates[0]
  );
  const [activeView, setActiveView] = useState<'overview' | 'applications' | 'resume' | 'evidence' | 'history' | 'activity' | 'compensation'>(initialTab);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [stageSelect, setStageSelect] = useState<PipelineStageId>(
    () => (mockCandidates.find((c) => c.id === id) || mockCandidates[0]).stage
  );

  // Modal States
  const [showScorecardModal, setShowScorecardModal] = useState(false);
  const [scorecardTechRating, setScorecardTechRating] = useState(5);
  const [scorecardSagdRating, setScorecardSagdRating] = useState(5);
  const [scorecardFitRating, setScorecardFitRating] = useState(4);
  const [scorecardRecommendation, setScorecardRecommendation] = useState<'Strong Hire' | 'Hire' | 'No Hire'>('Strong Hire');
  const [scorecardNotes, setScorecardNotes] = useState('Exceptional knowledge of SAGD brownfield tie-in procedures and Plant 3D modeling standards.');

  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerBaseSalary, setOfferBaseSalary] = useState(135000);
  const [offerBonus, setOfferBonus] = useState(10000);
  const [offerStartDate, setOfferStartDate] = useState('2026-09-15');

  const [showEmailModal, setShowEmailModal] = useState(false);

  const loadCandidate = async () => {
    if (!id) return;
    const c = await candidateService.getCandidateById(id);
    if (c) {
      setCandidate(c);
      setStageSelect(c.stage);
    }
  };

  useEffect(() => {
    loadCandidate();
  }, [id]);

  if (!candidate) {
    return (
      <div className="p-16 text-center text-slate-500 dark:text-zinc-500 text-xs font-medium">
        Loading candidate dossier...
      </div>
    );
  }

  const handleStageChange = async (newStage: PipelineStageId) => {
    sound.latch();
    setStageSelect(newStage);
    const updated = await candidateService.updateStage(candidate.id, newStage);
    setCandidate(updated);
    toast('Stage Updated', `Candidate moved to ${newStage.replace('_', ' ')}.`, 'success');
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    sound.click();
    setIsAddingNote(true);
    await candidateService.addNote(candidate.id, newNoteText, 'Sarah Jenkins');
    setNewNoteText('');
    setIsAddingNote(false);
    toast('Note Added', 'Recruiter note recorded to candidate timeline.', 'success');
    loadCandidate();
  };

  const handleSubmitScorecard = (e: React.FormEvent) => {
    e.preventDefault();
    sound.chime();
    setShowScorecardModal(false);
    toast(
      'Scorecard Submitted',
      `Recorded "${scorecardRecommendation}" evaluation by Elena Rostova, P.Eng.`,
      'success'
    );
  };

  const handleExtendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    sound.chime();
    setShowOfferModal(false);
    handleStageChange('offer');
    toast(
      'Formal Offer Extended',
      `Generated compensation packet for $${offerBaseSalary.toLocaleString()} CAD base.`,
      'success'
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. STICKY IDENTITY HEADER (~96px) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/90 dark:bg-[#07080A]/90 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-3.5 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-40 dark:opacity-25" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            {/* Identity Block */}
            <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => navigate('/candidates')}
              className="p-1.5 rounded-[6px] text-slate-400 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.05] transition-colors"
              title="Back to directory"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            </button>

            <div className="w-11 h-11 rounded-[9px] bg-gradient-to-br from-[#242834] to-[#12141a] border border-black/10 dark:border-white/15 flex items-center justify-center font-bold text-sm text-[#8A6D3B] dark:text-[#d4c5a9] shadow-2xs shrink-0 overflow-hidden">
              {candidate.avatar ? (
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span>{candidate.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none truncate">
                  {candidate.name}
                </h1>
                <Badge variant="champagne" size="sm">
                  98% Fit Score
                </Badge>
              </div>

              <div className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-2 mt-1 truncate">
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{candidate.currentRole}</span>
                <span>•</span>
                <span>{candidate.currentCompany} ({candidate.experienceYears}y exp)</span>
                <span>•</span>
                <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-slate-400" /> {candidate.location}</span>
              </div>
            </div>
          </div>

          {/* Contextual Requisition & Action Strip */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1 rounded-[6px] bg-white/60 dark:bg-white/[0.04] border border-black/10 dark:border-white/[0.06] text-xs">
              <span className="text-[11px] text-slate-500 dark:text-zinc-400">Requisition:</span>
              <span className="font-semibold text-slate-800 dark:text-zinc-200 truncate max-w-[150px]">
                {candidate.jobTitle ? candidate.jobTitle.split('(')[0] : 'General Sourcing'}
              </span>
              <span className="opacity-25">|</span>
              <select
                value={stageSelect}
                onChange={(e) => handleStageChange(e.target.value as PipelineStageId)}
                className="bg-transparent font-semibold text-[#8A6D3B] dark:text-[#d4c5a9] focus:outline-none cursor-pointer text-xs"
              >
                <option value="new" className="bg-white dark:bg-[#12151D] text-slate-900 dark:text-white">New Inbound</option>
                <option value="review" className="bg-white dark:bg-[#12151D] text-slate-900 dark:text-white">Under Review</option>
                <option value="phone_screen" className="bg-white dark:bg-[#12151D] text-slate-900 dark:text-white">Phone Screen</option>
                <option value="interview" className="bg-white dark:bg-[#12151D] text-slate-900 dark:text-white">Technical Panel</option>
                <option value="final_interview" className="bg-white dark:bg-[#12151D] text-slate-900 dark:text-white">Final Round</option>
                <option value="reference_check" className="bg-white dark:bg-[#12151D] text-slate-900 dark:text-white">References</option>
                <option value="offer" className="bg-white dark:bg-[#12151D] text-slate-900 dark:text-white">Offer Extended</option>
                <option value="hired" className="bg-white dark:bg-[#12151D] text-slate-900 dark:text-white">Hired</option>
              </select>
            </div>

            <Button
              size="xs"
              variant="machined"
              onClick={() => {
                sound.glass();
                setShowEmailModal(true);
              }}
              className="gap-1.5 font-semibold"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Message</span>
            </Button>

            <Button
              size="xs"
              variant="machined"
              onClick={() => {
                sound.glass();
                setShowScorecardModal(true);
              }}
              className="gap-1.5 font-semibold"
            >
              <Award className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
              <span>Scorecard</span>
            </Button>

            <Button
              size="xs"
              variant="champagne"
              onClick={() => {
                sound.glass();
                setShowOfferModal(true);
              }}
              className="gap-1.5 font-semibold"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
              <span>Extend Offer</span>
            </Button>
          </div>
        </div>

        {/* Multi-Tab ATS Dossier Navigation */}
        <div className="flex items-center gap-1 nav-rail-pill mt-3 w-fit overflow-x-auto">
          {[
            { id: 'overview', label: '1. Overview' },
            { id: 'applications', label: `2. Applications Slate (${mockApplications.filter((a) => a.candidateId === candidate.id).length})` },
            { id: 'resume', label: '3. Resume Document' },
            { id: 'evidence', label: '4. Skills & Evidence' },
            { id: 'history', label: `5. Work History (${candidate.parsedResume.workHistory.length})` },
            { id: 'activity', label: `6. Activity & Notes (${candidate.scorecards.length + candidate.notes.length})` },
            { id: 'compensation', label: '7. Compensation & Offer' }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => {
                sound.warp();
                setActiveView(view.id as any);
              }}
              className={cn(
                'nav-rail-item',
                activeView === view.id && 'nav-rail-item-active'
              )}
            >
              {view.label}
            </button>
          ))}
        </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKING CANVAS + COLLAPSIBLE RIGHT REFERENCE INSPECTOR */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* VIEW 1: OVERVIEW */}
          {activeView === 'overview' && (() => {
            const isPEng = candidate.tags.includes('P.Eng.') || candidate.name.includes('P.Eng.');
            const isCET = candidate.tags.includes('CET') || candidate.name.includes('CET');
            const primaryStamp = isPEng
              ? { title: 'Engineering Stamp', name: 'APEGA P.Eng. Active', sub: 'Professional Engineer (AB)', regId: '#84920' }
              : isCET
              ? { title: 'Engineering Stamp', name: 'ASET CET Active', sub: 'Certified Eng. Technologist', regId: '#39481' }
              : candidate.parsedResume.certifications?.[0]
              ? { title: 'Certification', name: candidate.parsedResume.certifications[0].name, sub: candidate.parsedResume.certifications[0].issuer, regId: '#VERIFIED' }
              : { title: 'Technical Registry', name: 'Technical Specialist', sub: 'Verified Experience', regId: '#39481' };

            const safetyStatus = candidate.tags.includes('HVAC') || candidate.tags.includes('P.Eng.')
              ? { title: 'Site Safety Clearance', status: 'CSTS-2020 & WHMIS Active', sub: '4/4 Tickets Active • Valid thru 2027', isWarning: false }
              : { title: 'Site Safety Tickets', status: 'CSTS-2020 Expiring in 14d', sub: '3/4 Active • Renewal In Progress', isWarning: true };

            const topWork = candidate.parsedResume.workHistory[0];
            const topScorecard = candidate.scorecards?.[0];
            const topNote = candidate.notes?.[0];

            return (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* 1. ASYMMETRICAL & VISUALLY DIFFERENTIATED CLEARANCE BAR */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: DNH & Integrity Clearance */}
                  <div className="p-4 rounded-[12px] bg-white dark:bg-[#12151D] border border-emerald-500/30 shadow-sm specimen-chamfer flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-[8px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <Badge variant="success" size="sm">CLEARED</Badge>
                    </div>
                    <div>
                      <div className="type-eyebrow text-emerald-800 dark:text-emerald-300">DNH & Integrity Gate</div>
                      <div className="text-base font-bold font-display text-slate-900 dark:text-white mt-0.5">0 Blacklist Flags</div>
                      <div className="text-xs text-slate-500 dark:text-zinc-400">Past contractor rating: {candidate.rating.toFixed(1)} / 5.0</div>
                    </div>
                  </div>

                  {/* Card 2: Professional Engineering Stamp */}
                  <div className="p-4 rounded-[12px] bg-[#8A6D3B]/5 dark:bg-[#d4c5a9]/5 border border-[#8A6D3B]/30 dark:border-[#d4c5a9]/30 shadow-sm specimen-chamfer flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-[8px] bg-[#8A6D3B]/20 dark:bg-[#d4c5a9]/20 text-[#8A6D3B] dark:text-[#d4c5a9] flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </div>
                      <Badge variant="champagne" size="sm">{primaryStamp.regId}</Badge>
                    </div>
                    <div>
                      <div className="type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9]">{primaryStamp.title}</div>
                      <div className="text-base font-bold font-display text-slate-900 dark:text-white mt-0.5">{primaryStamp.name}</div>
                      <div className="text-xs text-slate-500 dark:text-zinc-400">{primaryStamp.sub}</div>
                    </div>
                  </div>

                  {/* Card 3: Site Safety Passport */}
                  <div className={cn(
                    'p-4 rounded-[12px] shadow-sm specimen-chamfer flex flex-col justify-between space-y-3 border',
                    safetyStatus.isWarning
                      ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30'
                      : 'bg-white dark:bg-[#12151D] border-emerald-500/30'
                  )}>
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        'w-8 h-8 rounded-[8px] flex items-center justify-center',
                        safetyStatus.isWarning
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400'
                          : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                      )}>
                        {safetyStatus.isWarning ? <AlertTriangle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                      </div>
                      <Badge variant={safetyStatus.isWarning ? 'warning' : 'success'} size="sm">
                        {safetyStatus.isWarning ? 'EXPIRING SOON' : 'ACTIVE'}
                      </Badge>
                    </div>
                    <div>
                      <div className={cn('type-eyebrow', safetyStatus.isWarning ? 'text-amber-800 dark:text-amber-300' : 'text-emerald-800 dark:text-emerald-300')}>
                        {safetyStatus.title}
                      </div>
                      <div className="text-base font-bold font-display text-slate-900 dark:text-white mt-0.5">{safetyStatus.status}</div>
                      <div className="text-xs text-slate-500 dark:text-zinc-400">{safetyStatus.sub}</div>
                    </div>
                  </div>

                  {/* Card 4: Mobilization Window */}
                  <div className="p-4 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-[8px] bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-zinc-300 flex items-center justify-center">
                        <Clock className="w-4 h-4" />
                      </div>
                      <Badge variant="neutral" size="sm">MOBILITY</Badge>
                    </div>
                    <div>
                      <div className="type-eyebrow text-slate-500 dark:text-zinc-400">Notice & Dispatch</div>
                      <div className="text-base font-bold font-display text-slate-900 dark:text-white mt-0.5">{candidate.availability} Notice</div>
                      <div className="text-xs text-slate-500 dark:text-zinc-400">No client non-compete • Ready</div>
                    </div>
                  </div>
                </div>

                {/* 2. MAIN 2-COLUMN DOSSIER CANVAS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column (8 cols): Spec Match 2x2 Matrix + Executive Intelligence + Team Scorecard */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Requisition Requirement Match: Visual 2x2 Matrix */}
                    <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-black/[0.08] dark:border-white/10">
                        <div>
                          <h3 className="type-section-title text-slate-900 dark:text-white">
                            Requisition Requirement Audit
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                            Automated compliance analysis against <strong className="text-slate-700 dark:text-zinc-300">{candidate.jobTitle || candidate.currentRole}</strong>
                          </p>
                        </div>
                        <Badge variant="champagne" size="sm">4 of 4 Criteria Satisfied</Badge>
                      </div>

                      {/* 2x2 Visual Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Matrix Card 1: Experience Scale */}
                        <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10 space-y-3 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="type-eyebrow text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                              <span>Experience Depth</span>
                            </span>
                            <Badge variant="success" size="sm">Exceeds Spec</Badge>
                          </div>
                          <div>
                            <div className="text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">
                              {candidate.experienceYears}+ Years
                            </div>
                            <div className="text-xs text-slate-600 dark:text-zinc-300 mt-1">
                              Req: 8+ yrs • Current: <strong className="text-slate-900 dark:text-white">{candidate.currentCompany}</strong>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-slate-400 dark:text-zinc-500">
                            {candidate.experienceYears >= 10 ? 'Senior Leadership Level' : 'Intermediate Specialist'}
                          </div>
                        </div>

                        {/* Matrix Card 2: Core Toolset & Software */}
                        <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10 space-y-3 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="type-eyebrow text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-slate-400" />
                              <span>Software & Toolset</span>
                            </span>
                            <Badge variant="success" size="sm">Verified</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1.5">
                              {candidate.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="px-2 py-0.5 rounded-[5px] bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-zinc-200">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-zinc-300">
                              Direct project deliverables parsed from work history
                            </div>
                          </div>
                          <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-slate-400 dark:text-zinc-500">
                            Hands-on verified production skills
                          </div>
                        </div>

                        {/* Matrix Card 3: Stamped Standards & Code */}
                        <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10 space-y-3 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="type-eyebrow text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-slate-400" />
                              <span>Code & Standards</span>
                            </span>
                            <Badge variant="success" size="sm">Certified</Badge>
                          </div>
                          <div>
                            <div className="text-base font-bold text-slate-900 dark:text-white">
                              {primaryStamp.name}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-zinc-300 mt-1">
                              Alberta Regulatory & Stamped Documentation
                            </div>
                          </div>
                          <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-slate-400 dark:text-zinc-500">
                            Reg ID: {primaryStamp.regId} • In Good Standing
                          </div>
                        </div>

                        {/* Matrix Card 4: Mobilization & Regional Fit */}
                        <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10 space-y-3 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="type-eyebrow text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>Regional Mobilization</span>
                            </span>
                            <Badge variant="champagne" size="sm">Available</Badge>
                          </div>
                          <div>
                            <div className="text-base font-bold text-slate-900 dark:text-white">
                              {candidate.location}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-zinc-300 mt-1">
                              Notice Period: <strong className="text-slate-900 dark:text-white">{candidate.availability}</strong>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-slate-400 dark:text-zinc-500">
                            Canadian Citizen • FIFO Ready
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Executive Intelligence & Verified Deliverable */}
                    <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] space-y-5 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer specimen-chamfer-champagne">
                      <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.1]">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-[8px] bg-[#8A6D3B]/20 dark:bg-[#d4c5a9]/20 border border-[#8A6D3B]/40 dark:border-[#d4c5a9]/40 flex items-center justify-center text-[#8A6D3B] dark:text-[#d4c5a9]">
                            <Sparkles className="w-4 h-4" strokeWidth={2} />
                          </div>
                          <div>
                            <h3 className="type-section-title text-slate-900 dark:text-white">
                              Executive Profile & Project Track Record
                            </h3>
                            <div className="text-xs text-slate-500 dark:text-zinc-400">
                              Deterministic parsing from {candidate.experienceYears}+ years of heavy engineering deliverables
                            </div>
                          </div>
                        </div>
                        <Badge variant="champagne" size="sm">{Math.round(candidate.rating * 20)}% Verified Match</Badge>
                      </div>

                      <p className="text-sm text-slate-700 dark:text-zinc-200 leading-relaxed font-sans">
                        {candidate.parsedResume.summary}
                      </p>

                      {topWork && (
                        <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 space-y-2.5 border-l-4 border-l-[#8A6D3B] dark:border-l-[#d4c5a9] border border-black/[0.06] dark:border-white/10">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                              <span>Key Deliverable • {topWork.company} ({topWork.role})</span>
                            </span>
                            <span className="text-[11px] tabular-nums text-slate-500 dark:text-zinc-400">{topWork.startDate} – {topWork.endDate}</span>
                          </div>
                          <p className="text-xs text-slate-700 dark:text-zinc-300 italic leading-relaxed">
                            "{topWork.description}"
                          </p>
                        </div>
                      )}

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-black/[0.06] dark:border-white/[0.08]">
                        <button
                          onClick={() => setActiveView('evidence')}
                          className="text-xs text-[#8A6D3B] dark:text-[#d4c5a9] hover:underline font-semibold flex items-center gap-1.5"
                        >
                          <span>Open Technical Competency Radar & Citations</span>
                          <span>→</span>
                        </button>
                        <Button
                          size="xs"
                          variant="machined"
                          onClick={() => setActiveView('resume')}
                          className="font-semibold text-xs gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Full Verified Resume Document</span>
                        </Button>
                      </div>
                    </div>

                    {/* Latest Hiring Team Scorecard & Panel Notes */}
                    <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] space-y-4 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
                      <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/10">
                        <div>
                          <h3 className="type-section-title text-slate-900 dark:text-white">
                            Latest Hiring Team Scorecard & Notes
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                            Feedback from technical panel assessments and recruiter evaluations
                          </p>
                        </div>
                        <Button
                          size="xs"
                          variant="champagne"
                          onClick={() => setShowScorecardModal(true)}
                          className="gap-1 font-semibold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Scorecard</span>
                        </Button>
                      </div>

                      {topScorecard ? (
                        <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white text-sm">{topScorecard.interviewer}</span>
                              <span className="text-xs text-slate-500 dark:text-zinc-400">• Lead Technical Reviewer</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center text-amber-500 text-xs">
                                {'★'.repeat(topScorecard.rating)}{'☆'.repeat(5 - topScorecard.rating)}
                              </div>
                              <Badge variant={topScorecard.recommendation.includes('strong') ? 'success' : 'champagne'} size="sm">
                                {topScorecard.recommendation.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                            "{topScorecard.summary}"
                          </p>
                          <div className="text-[11px] text-slate-400 dark:text-zinc-500 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                            <span>Evaluation completed on {topScorecard.submittedAt}</span>
                            <span className="text-[#8A6D3B] dark:text-[#d4c5a9] font-medium">Verified Evaluation Scorecard</span>
                          </div>
                        </div>
                      ) : topNote ? (
                        <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white text-sm">{topNote.author}</span>
                              <span className="text-xs text-slate-500 dark:text-zinc-400">• Screening Recruiter</span>
                            </div>
                            <Badge variant="champagne" size="sm">Screening Note</Badge>
                          </div>
                          <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                            "{topNote.text}"
                          </p>
                          <div className="text-[11px] text-slate-400 dark:text-zinc-500 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                            Recorded on {topNote.createdAt}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10 text-xs text-slate-600 dark:text-zinc-400">
                          Initial screening in progress. Candidate application received and awaiting formal panel review.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column (4 cols): Compensation, Safety Passport, Direct Connect & Disciplines */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Target Compensation & Offer Band */}
                    <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                        <span className="type-eyebrow text-slate-500 dark:text-zinc-400">Compensation & Band</span>
                        <Badge variant="champagne" size="sm">In Budget</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="type-eyebrow text-slate-400 dark:text-zinc-500">Target Annual Base</div>
                        <div className="text-2xl font-bold font-display text-[#8A6D3B] dark:text-[#d4c5a9]">
                          {candidate.compensationExpectation || '$120,000 CAD'}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400 pt-1">
                          Market Requisition Band: <strong className="text-slate-800 dark:text-zinc-200">$110k – $135k CAD</strong>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-zinc-400">Notice Required:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{candidate.availability}</span>
                      </div>
                    </div>

                    {/* Site Safety Passport Badges */}
                    <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                        <span className="type-eyebrow text-slate-500 dark:text-zinc-400">Site Safety Passport</span>
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active Clearance</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={cn(
                          'p-2.5 rounded-[8px] border flex flex-col justify-between space-y-1',
                          safetyStatus.isWarning
                            ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/40'
                            : 'bg-slate-50 dark:bg-black/30 border-black/[0.06] dark:border-white/[0.06]'
                        )}>
                          <div className="font-semibold text-slate-900 dark:text-white">CSTS-2020</div>
                          <div className={cn(
                            'text-[10px] font-semibold',
                            safetyStatus.isWarning ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                          )}>
                            {safetyStatus.isWarning ? 'Expires in 14d' : 'Valid thru 2027'}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] flex flex-col justify-between space-y-1">
                          <div className="font-semibold text-slate-900 dark:text-white">H2S Alive</div>
                          <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Valid thru 2028</div>
                        </div>

                        <div className="p-2.5 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] flex flex-col justify-between space-y-1">
                          <div className="font-semibold text-slate-900 dark:text-white">WHMIS 2015</div>
                          <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Valid</div>
                        </div>

                        <div className="p-2.5 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] flex flex-col justify-between space-y-1">
                          <div className="font-semibold text-slate-900 dark:text-white">First Aid CPR-C</div>
                          <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Valid</div>
                        </div>
                      </div>
                    </div>

                    {/* Direct Contact */}
                    <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-3">
                      <div className="type-eyebrow text-slate-500 dark:text-zinc-400 pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
                        Direct Contact
                      </div>
                      <div className="space-y-2.5 text-xs">
                        <a href={`mailto:${candidate.email}`} className="flex items-center gap-2.5 text-slate-700 dark:text-zinc-300 hover:text-[#8A6D3B] dark:hover:text-[#d4c5a9] transition-colors p-2 rounded-[6px] hover:bg-slate-50 dark:hover:bg-white/[0.03]">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="truncate">{candidate.email}</span>
                        </a>
                        <a href={`tel:${candidate.phone}`} className="flex items-center gap-2.5 text-slate-700 dark:text-zinc-300 hover:text-[#8A6D3B] dark:hover:text-[#d4c5a9] transition-colors p-2 rounded-[6px] hover:bg-slate-50 dark:hover:bg-white/[0.03]">
                          <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{candidate.phone}</span>
                        </a>
                        <div className="flex items-center gap-2.5 text-slate-700 dark:text-zinc-300 p-2">
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{candidate.location}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-[#8A6D3B] dark:text-[#d4c5a9]">
                        <span className="flex items-center gap-1 font-medium">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>LinkedIn Profile Verified</span>
                        </span>
                        <Badge variant="neutral" size="sm">ID: {candidate.id}</Badge>
                      </div>
                    </div>

                    {/* Core Disciplines & Software */}
                    <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-3">
                      <div className="type-eyebrow text-slate-500 dark:text-zinc-400 pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
                        Discipline & Domain Tags ({candidate.tags.length})
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.tags.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded-[6px] bg-slate-100 dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-zinc-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
          
          {/* VIEW 2: MULTI-JOB APPLICATIONS SLATE */}
          {activeView === 'applications' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                    Active & Historical Job Applications ({mockApplications.filter((a) => a.candidateId === candidate.id).length})
                  </span>
                  <Badge variant="champagne" size="sm">First-Class Application Architecture</Badge>
                </div>

                <div className="space-y-3 text-xs">
                  {mockApplications
                    .filter((a) => a.candidateId === candidate.id)
                    .map((app) => (
                      <div
                        key={app.id}
                        onClick={() => {
                          sound.click();
                          navigate(`/applications/${app.id}`);
                        }}
                        className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 hover:border-[#8A6D3B]/40 transition-all cursor-pointer space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm">{app.jobTitle}</div>
                            <div className="text-slate-500 dark:text-zinc-400 text-xs">
                              {app.department} • Applied: {new Date(app.appliedAt).toLocaleDateString()} • Source: {app.source.replace('_', ' ')}
                            </div>
                          </div>
                          <Badge
                            variant={
                              app.stage === 'technical_panel'
                                ? 'indigo'
                                : app.stage === 'dispositioned'
                                ? 'neutral'
                                : 'champagne'
                            }
                            size="sm"
                          >
                            {app.stage.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>

                        {app.disposition && (
                          <div className="p-2.5 rounded-[6px] bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-300 text-[11px]">
                            <strong>Disposition Reason:</strong> {app.disposition.reason.replace(/_/g, ' ')} — "{app.disposition.comment}"
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 pt-1">
                          <span>Hiring Manager: <strong className="text-slate-700 dark:text-zinc-300">{app.hiringManager}</strong></span>
                          <span className="text-[#8A6D3B] dark:text-[#d4c5a9] font-semibold flex items-center gap-1">
                            <span>Open Application Workspace</span>
                            <span>→</span>
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: FULL RESUME / CV DOCUMENT */}
          {activeView === 'resume' && (
            <ResumeViewer candidate={candidate} />
          )}

          {/* VIEW 4: EVIDENCE, RADAR & CITATIONS */}
          {activeView === 'evidence' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Engineering Competency Radar Chart (5 cols) */}
                <div className="lg:col-span-5 p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                    <span className="type-section-title text-slate-900 dark:text-white">
                      Technical Competency Radar
                    </span>
                    <Badge variant="indigo" size="sm">ASME B31.3 Calibrated</Badge>
                  </div>

                  <div className="py-2 flex justify-center">
                    <CompetencyRadarChart />
                  </div>

                  <div className="p-3 rounded-[7px] bg-slate-50 dark:bg-black/40 border border-black/[0.06] dark:border-white/[0.08] text-[11px] text-slate-600 dark:text-zinc-400 leading-tight">
                    Candidate exceeds Alberta Senior Piping Designer benchmark by <strong className="text-slate-900 dark:text-white font-semibold">+18.4%</strong> across 3D Layout and Laser Scan tie-in resolution.
                  </div>
                </div>

                {/* Extracted Evidence Citations (7 cols) */}
                <div className="lg:col-span-7 p-6 rounded-[12px] bg-white dark:bg-[#12151D] space-y-4 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/10">
                    <span className="type-section-title text-slate-900 dark:text-white">
                      Extracted Evidence Citations ({candidate.parsedResume.evidenceChunks.length})
                    </span>
                    <Badge variant="champagne" size="sm">Deterministic NLP Verification</Badge>
                  </div>
                  <div className="space-y-3 text-xs">
                    {candidate.parsedResume.evidenceChunks.map((ev) => (
                      <div key={ev.id} className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/50 border border-black/[0.06] dark:border-white/10 space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          <span>{ev.section}</span>
                          <span className="font-medium tabular-nums">{Math.round(ev.confidence * 100)}% confidence</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-zinc-200">"{ev.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: WORK HISTORY */}
          {activeView === 'history' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {candidate.parsedResume.workHistory.map((wh) => (
                <div key={wh.id} className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] space-y-3 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{wh.role}</h3>
                      <div className="text-xs text-slate-600 dark:text-zinc-300">{wh.company} • {wh.location}</div>
                    </div>
                    <Badge variant="champagne" size="sm">{wh.startDate} – {wh.endDate}</Badge>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-zinc-200">{wh.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* VIEW 5: ACTIVITY & NOTES */}
          {activeView === 'activity' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <form onSubmit={handleAddNote} className="p-4 rounded-[10px] bg-white dark:bg-[#12151D] space-y-3 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
                <Textarea
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record an interview observation or salary feedback..."
                  className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
                />
                <div className="flex justify-end">
                  <Button size="xs" variant="champagne" type="submit" loading={isAddingNote}>
                    <span>Save Note</span>
                  </Button>
                </div>
              </form>

              <div className="space-y-3">
                {candidate.notes.map((n) => (
                  <div key={n.id} className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/[0.06] dark:border-white/10 space-y-1">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-zinc-400">
                      <strong className="text-slate-900 dark:text-white">{n.author}</strong>
                      <span className="text-[10px] tabular-nums">{n.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-zinc-200">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 6: COMPENSATION & OFFERS */}
          {activeView === 'compensation' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] space-y-5 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/10">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                    Compensation Band & Offer Specs
                  </span>
                  <Badge variant="champagne" size="sm">{candidate.stage === 'offer' ? 'Active Offer' : 'Pre-Offer'}</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/[0.06] dark:border-white/10 space-y-1">
                    <div className="text-slate-500 dark:text-zinc-400 font-semibold">Candidate Target</div>
                    <div className="text-xl font-bold text-[#8A6D3B] dark:text-[#d4c5a9]">
                      {candidate.compensationExpectation || '$120,000 CAD'}
                    </div>
                  </div>

                  <div className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/[0.06] dark:border-white/10 space-y-1">
                    <div className="text-slate-500 dark:text-zinc-400 font-semibold">Requisition Band</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">
                      $110k – $135k CAD
                    </div>
                  </div>

                  <div className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/[0.06] dark:border-white/10 space-y-1">
                    <div className="text-slate-500 dark:text-zinc-400 font-semibold">Availability</div>
                    <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                      {candidate.availability}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button size="xs" variant="champagne" onClick={() => setShowOfferModal(true)} className="gap-1.5 font-semibold">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Generate Formal Offer Packet</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. SUBMIT SCORECARD MODAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={showScorecardModal}
        onClose={() => setShowScorecardModal(false)}
        title="Engineering Technical Scorecard"
        subtitle={`Evaluation for ${candidate.name} • ${candidate.jobTitle || 'Senior Piping Designer'}`}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmitScorecard} className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 space-y-1 text-center">
              <label className="block text-slate-700 dark:text-zinc-300 text-[11px] font-semibold">Technical Mastery</label>
              <div className="text-lg font-bold text-[#8A6D3B] dark:text-[#d4c5a9]">{scorecardTechRating} / 5</div>
            </div>

            <div className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 space-y-1 text-center">
              <label className="block text-slate-700 dark:text-zinc-300 text-[11px] font-semibold">SAGD Tie-In Depth</label>
              <div className="text-lg font-bold text-[#8A6D3B] dark:text-[#d4c5a9]">{scorecardSagdRating} / 5</div>
            </div>

            <div className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 space-y-1 text-center">
              <label className="block text-slate-700 dark:text-zinc-300 text-[11px] font-semibold">Team Collaboration</label>
              <div className="text-lg font-bold text-[#8A6D3B] dark:text-[#d4c5a9]">{scorecardFitRating} / 5</div>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Recommendation</label>
            <select
              value={scorecardRecommendation}
              onChange={(e) => setScorecardRecommendation(e.target.value as any)}
              className="w-full h-8 px-2 rounded-[6px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-bold"
            >
              <option value="Strong Hire">Strong Hire (Top 5% Candidate)</option>
              <option value="Hire">Hire (Meets Requisition Specs)</option>
              <option value="No Hire">No Hire (Gaps in SAGD / CAD)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Panel Interviewer Notes</label>
            <Textarea
              rows={3}
              value={scorecardNotes}
              onChange={(e) => setScorecardNotes(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowScorecardModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit">
              Submit Scorecard
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* 4. EXTEND FORMAL OFFER MODAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={showOfferModal}
        onClose={() => setShowOfferModal(false)}
        title="Extend Formal Employment Offer"
        subtitle={`Generate formal EPCM offer for ${candidate.name}`}
        maxWidth="lg"
      >
        <form onSubmit={handleExtendOffer} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Base Annual Salary (CAD)</label>
              <Input
                type="number"
                step="1000"
                value={offerBaseSalary}
                onChange={(e) => setOfferBaseSalary(Number(e.target.value))}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-bold tabular-nums"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Signing / Relocation Bonus (CAD)</label>
              <Input
                type="number"
                step="1000"
                value={offerBonus}
                onChange={(e) => setOfferBonus(Number(e.target.value))}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Proposed Start Date</label>
            <Input
              type="date"
              value={offerStartDate}
              onChange={(e) => setOfferStartDate(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-700 dark:text-zinc-300 text-[11px] leading-relaxed">
            Generating this offer will automatically advance <strong>{candidate.name}</strong> to the <em>Offer Extended</em> stage and generate the formal salary spec sheet for hiring manager sign-off.
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowOfferModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit">
              Extend Formal Offer
            </Button>
          </div>
        </form>
      </Modal>

      {/* 5. DIRECT EMAIL & MESSAGING MODAL */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        candidate={candidate}
      />
    </div>
  );
};
