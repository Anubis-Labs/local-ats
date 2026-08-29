import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  User,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Award,
  DollarSign,
  Send,
  MessageSquare,
  FileText,
  Calendar,
  XCircle,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Inbox
} from 'lucide-react';
import { mockApplications } from '../mock/applicationsData';
import { Application, ApplicationStage } from '../types/application';
import { Badge, Button, Input, Modal, Textarea, Card, RatingStars, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const application = mockApplications.find((a) => a.id === id) || mockApplications[0];
  const [currentStage, setCurrentStage] = useState<ApplicationStage>(application.stage);
  const [showScorecardModal, setShowScorecardModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [internalNotes, setInternalNotes] = useState('');
  const [notesList, setNotesList] = useState<{ author: string; text: string; date: string }[]>([
    { author: 'Sarah Jenkins', text: 'Prescreen passed with flying colors. Strong SAGD brownfield background.', date: 'Aug 16, 2026' },
    { author: 'Elena Rostova, P.Eng.', text: 'Technical interview confirmed 5/5 mastery on Plant 3D and Caesar II stress interface.', date: 'Aug 20, 2026' }
  ]);

  const stages: { id: ApplicationStage; label: string }[] = [
    { id: 'inbox', label: '1. Inbound Inbox' },
    { id: 'screen', label: '2. Phone Screen' },
    { id: 'technical_panel', label: '3. Technical Panel' },
    { id: 'hiring_manager', label: '4. Hiring Manager' },
    { id: 'offer_extended', label: '5. Offer Extended' },
    { id: 'hired', label: '6. Hired' }
  ];

  const handleStageChange = (newStage: ApplicationStage) => {
    sound.latch();
    setCurrentStage(newStage);
    toast('Application Stage Updated', `Moved application to ${newStage.replace('_', ' ')}.`, 'success');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNotes.trim()) return;
    sound.pop();
    setNotesList([{ author: 'Sarah Jenkins (You)', text: internalNotes, date: 'Just now' }, ...notesList]);
    setInternalNotes('');
    toast('Note Recorded', 'Internal recruiting note attached to this application.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. APPLICATION WORKSPACE STICKY HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="pipeline-velocity" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.click();
                  navigate('/applications');
                }}
                className="p-1.5 rounded-[6px] text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5">
                <Inbox className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                    <span>Application Workspace</span>
                    <span className="opacity-30">•</span>
                    <span>Ref: {application.id}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 leading-tight">
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                      {application.candidateName}
                    </h1>
                    <span className="text-slate-400 font-mono">→</span>
                    <span className="font-semibold text-sm text-[#8A6D3B] dark:text-[#d4c5a9]">
                      {application.jobTitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="xs"
                variant="machined"
                onClick={() => {
                  sound.click();
                  navigate(`/candidates/${application.candidateId}`);
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <User className="w-3.5 h-3.5" />
                <span>Full Candidate Profile</span>
              </Button>

              <Button
                size="xs"
                variant="champagne"
                onClick={() => {
                  sound.glass();
                  setShowScorecardModal(true);
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <Award className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                <span>Submit Scorecard</span>
              </Button>
            </div>
          </div>

          {/* Interactive Stage Stepper */}
          <div className="flex items-center gap-1.5 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] overflow-x-auto">
            {stages.map((stg) => {
              const isCurrent = currentStage === stg.id;
              return (
                <button
                  key={stg.id}
                  onClick={() => handleStageChange(stg.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5',
                    isCurrent
                      ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black shadow-xs font-bold'
                      : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08]'
                  )}
                >
                  {isCurrent && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{stg.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE GRID */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Left Column: Requirements & Screening (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Prescreening Questionnaire */}
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Prescreening Questionnaire & Hard Gates</span>
                </span>
                <Badge variant="success" size="sm">3/3 Passed</Badge>
              </div>

              <div className="space-y-3 text-xs">
                {application.screeningAnswers.map((ans, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] space-y-1.5"
                  >
                    <div className="font-semibold text-slate-800 dark:text-zinc-200">{ans.question}</div>
                    <div className="text-slate-600 dark:text-zinc-300 italic">"{ans.answer}"</div>
                    <div className="pt-1 flex items-center gap-2">
                      <Badge variant={ans.passed ? 'success' : 'destructive'} size="sm">
                        {ans.passed ? 'Verified Pass' : 'Failed Gate'}
                      </Badge>
                      {ans.notes && <span className="text-[10px] text-slate-400 dark:text-zinc-500">{ans.notes}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirement Matrix */}
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  EPCM Requirement Coverage Matrix
                </span>
                <span className="text-xs font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">98% Match</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { req: 'AutoCAD Plant 3D (10+ yrs)', status: 'Confirmed', evidence: '12 years across Surmont & Christina Lake projects' },
                  { req: 'ASME B31.3 Piping Stress Coordination', status: 'Confirmed', evidence: 'Caesar II thermal stress interface sign-off' },
                  { req: 'Laser Scan Point Cloud Tie-in Modeling', status: 'Confirmed', evidence: 'ConocoPhillips Surmont brownfield laser tie-ins' },
                  { req: 'ASET CET or APEGA Registration', status: 'Confirmed', evidence: 'Active ASET CET #39481' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-[7px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{item.req}</div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">{item.evidence}</div>
                    </div>
                    <Badge variant="success" size="sm">{item.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Scorecards & Notes (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Scorecard Summary */}
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                  <span>Submitted Panel Scorecards (1)</span>
                </span>
                <Badge variant="champagne" size="sm">5.0 / 5.0 Strong Hire</Badge>
              </div>

              {application.scorecards.map((sc) => (
                <div key={sc.id} className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{sc.interviewer}</div>
                      <div className="text-[10px] text-slate-400 dark:text-zinc-500">Submitted: {sc.submittedAt}</div>
                    </div>
                    <RatingStars rating={sc.rating} max={5} />
                  </div>
                  <p className="text-slate-700 dark:text-zinc-300 italic">"{sc.summary}"</p>
                </div>
              ))}
            </div>

            {/* Internal Application Notes */}
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <MessageSquare className="w-4 h-4 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                <span>Internal Hiring Team Notes</span>
              </div>

              <form onSubmit={handleAddNote} className="space-y-2">
                <Textarea
                  rows={3}
                  placeholder="Record an interview observation or compensation discussion..."
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  className="text-xs bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
                />
                <div className="flex justify-end">
                  <Button size="xs" variant="champagne" type="submit" className="font-semibold text-xs">
                    Post Note
                  </Button>
                </div>
              </form>

              <div className="space-y-2.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] text-xs">
                {notesList.map((n, i) => (
                  <div key={i} className="p-3 rounded-[6px] bg-slate-50 dark:bg-black/20 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{n.author}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{n.date}</span>
                    </div>
                    <p className="text-slate-700 dark:text-zinc-300">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. SUBMIT SCORECARD MODAL */}
      <Modal
        isOpen={showScorecardModal}
        onClose={() => setShowScorecardModal(false)}
        title="Discipline Technical Panel Scorecard"
        subtitle={`Evaluation for ${application.candidateName} • ${application.jobTitle}`}
        maxWidth="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sound.chime();
            toast('Scorecard Submitted', 'Rating & rubric evaluation recorded for this application.', 'success');
            setShowScorecardModal(false);
          }}
          className="space-y-4 text-xs"
        >
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 text-center space-y-1">
              <label className="block text-slate-700 dark:text-zinc-300 text-[11px] font-semibold">CAD / 3D Layout</label>
              <div className="text-lg font-bold text-[#8A6D3B] dark:text-[#d4c5a9]">5 / 5</div>
            </div>
            <div className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 text-center space-y-1">
              <label className="block text-slate-700 dark:text-zinc-300 text-[11px] font-semibold">ASME B31.3 Stress</label>
              <div className="text-lg font-bold text-[#8A6D3B] dark:text-[#d4c5a9]">5 / 5</div>
            </div>
            <div className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 text-center space-y-1">
              <label className="block text-slate-700 dark:text-zinc-300 text-[11px] font-semibold">SAGD Tie-Ins</label>
              <div className="text-lg font-bold text-[#8A6D3B] dark:text-[#d4c5a9]">5 / 5</div>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Overall Hiring Recommendation</label>
            <select className="w-full h-8 px-2.5 rounded-[6px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-bold">
              <option value="strong_hire">Strong Hire (Immediate Senior EPCM Project Impact)</option>
              <option value="hire">Hire (Meets Requisition Competency Baseline)</option>
              <option value="mixed">Mixed / Hold (Requires Further Code Review)</option>
              <option value="no_hire">No Hire (Gaps in Stamp / CAD Requirements)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Interviewer Technical Summary</label>
            <Textarea
              rows={3}
              defaultValue="Exceptional proficiency in AutoCAD Plant 3D and Navisworks clash resolution for brownfield SAGD facilities. Direct tie-in experience on ConocoPhillips Surmont."
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowScorecardModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit" className="font-semibold">
              Submit Panel Scorecard
            </Button>
          </div>
        </form>
      </Modal>

      {/* 4. EXTEND FORMAL OFFER MODAL */}
      <Modal
        isOpen={showOfferModal}
        onClose={() => setShowOfferModal(false)}
        title="Extend Formal Employment Offer"
        subtitle={`Generate formal EPCM offer for ${application.candidateName}`}
        maxWidth="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sound.chime();
            toast('Offer Extended', 'Formal offer letter dispatched for executive review.', 'success');
            setShowOfferModal(false);
          }}
          className="space-y-4 text-xs"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Base Annual Salary (CAD)</label>
              <Input
                type="number"
                defaultValue={135000}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-bold tabular-nums"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Relocation / Signing Bonus (CAD)</label>
              <Input
                type="number"
                defaultValue={7500}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Target Mobilization Date</label>
            <Input
              type="date"
              defaultValue="2026-10-01"
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowOfferModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit" className="font-semibold">
              Dispatch Offer for Sign-off
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
