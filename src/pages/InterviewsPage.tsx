import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Video,
  MapPin,
  Clock,
  Plus,
  ChevronRight,
  Sparkles,
  Users,
  CheckCircle2,
  AlertTriangle,
  Award,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { interviewService } from '../services/interviewService';
import { candidateService } from '../services/candidateService';
import { jobService } from '../services/jobService';
import { mockInterviews } from '../mock/interviewsData';
import { mockCandidates } from '../mock/candidatesData';
import { mockJobs } from '../mock/jobsData';
import { Interview } from '../types/interview';
import { Candidate } from '../types/candidate';
import { Job } from '../types/job';
import { Badge, Button, Card, Input, Textarea, Modal, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const InterviewsPage: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const [selectedCandId, setSelectedCandId] = useState(mockCandidates[0].id);
  const [selectedJobId, setSelectedJobId] = useState(mockJobs[0].id);
  const [type, setType] = useState<Interview['type']>('Technical Round');
  const [scheduledAt, setScheduledAt] = useState('2026-08-28 14:00');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [prepNotes, setPrepNotes] = useState('Review SAGD brownfield tie-in experience and Plant 3D modeling mastery.');
  const [meetingLocation, setMeetingLocation] = useState('Microsoft Teams / Calgary Studio 4B');

  const navigate = useNavigate();
  const { toast } = useToast();

  const loadData = async () => {
    const [iList, cList, jList] = await Promise.all([
      interviewService.getInterviews(),
      candidateService.getCandidates(),
      jobService.getJobs({ status: 'active' })
    ]);
    setInterviews(iList);
    setCandidates(cList);
    setJobs(jList);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.chime();
    const cand = candidates.find((c) => c.id === selectedCandId);
    const job = jobs.find((j) => j.id === selectedJobId);

    if (!cand || !job) return;

    const created = await interviewService.scheduleInterview({
      candidateId: cand.id,
      candidateName: cand.name,
      candidateRole: cand.currentRole,
      jobId: job.id,
      jobTitle: job.title,
      type,
      scheduledAt,
      durationMinutes,
      interviewers: [
        {
          name: 'Elena Rostova, P.Eng.',
          email: 'elena.rostova@epcm.ca',
          role: 'Piping Discipline Lead',
          hasSubmittedScorecard: false
        }
      ],
      location: meetingLocation,
      prepNotes: prepNotes,
      status: 'scheduled'
    });

    setInterviews([created, ...interviews]);
    setShowScheduleModal(false);
    toast('Interview Scheduled', `${type} booked for ${cand.name}.`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT INTERVIEWS HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <CalendarIcon className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Interview Schedules</span>
                <span className="opacity-30">•</span>
                <span>{interviews.length} Scheduled Sessions</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Technical Panels & Evaluations
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="xs"
              variant="champagne"
              onClick={() => {
                sound.click();
                setShowScheduleModal(true);
              }}
              className="gap-1.5 font-semibold text-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" strokeWidth={2} />
              <span>Book Panel Session</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. INTERVIEW LIST WITH THEMATIC SURFACES */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interviews.map((intv, idx) => (
            <div
              key={intv.id}
              className={cn(
                'rounded-[12px] p-6 space-y-4 shadow-sm border border-black/[0.08] dark:border-white/10 transition-all specimen-chamfer bg-white dark:bg-[#12151D]'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {intv.candidateAvatar ? (
                    <img
                      src={intv.candidateAvatar}
                      alt={intv.candidateName}
                      className="w-11 h-11 rounded-[8px] object-cover border border-black/10 dark:border-white/15 shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-[8px] bg-[#242834] text-[#d4c5a9] border border-black/10 dark:border-white/15 flex items-center justify-center font-bold text-xs shrink-0">
                      {intv.candidateName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{intv.candidateName}</h3>
                      <Badge variant="champagne" size="sm">{intv.type}</Badge>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5 font-medium">{intv.jobTitle}</div>
                  </div>
                </div>
                <Badge variant={intv.status === 'completed' ? 'success' : 'neutral'} size="sm">
                  {intv.status}
                </Badge>
              </div>

              <div className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/50 border border-black/[0.06] dark:border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700 dark:text-zinc-300 flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{intv.scheduledAt.includes('T') ? intv.scheduledAt.split('T')[0] + ' @ ' + intv.scheduledAt.split('T')[1].substring(0, 5) : intv.scheduledAt} ({intv.durationMinutes} min)</span>
                  </span>
                  <span className="font-mono text-slate-500 dark:text-zinc-400 text-[11px]">{intv.location}</span>
                </div>
                <div className="text-slate-600 dark:text-zinc-400">
                  Panelists: <strong className="text-slate-900 dark:text-white">{intv.interviewers.map((i) => i.name).join(', ')}</strong>
                </div>
              </div>

              {intv.prepNotes && (
                <p className="text-xs text-slate-600 dark:text-zinc-300 italic leading-relaxed">
                  "{intv.prepNotes}"
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-black/[0.06] dark:border-white/10">
                <button
                  onClick={() => {
                    sound.chime();
                    toast('Joined Meeting', `Launching video room for ${intv.candidateName}...`, 'info');
                  }}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Session</span>
                </button>

                <Button
                  size="xs"
                  variant="machined"
                  onClick={() => {
                    sound.click();
                    navigate(`/candidates/${intv.candidateId}`);
                  }}
                  className="font-semibold text-xs"
                >
                  <span>Candidate Dossier →</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. SCHEDULE TECHNICAL PANEL MODAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Schedule Technical Panel Session"
        subtitle="Book EPCM panel interview, assign evaluators and structured rubrics"
        maxWidth="lg"
      >
        <form onSubmit={handleSchedule} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Candidate Profile</label>
              <select
                value={selectedCandId}
                onChange={(e) => setSelectedCandId(e.target.value)}
                className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-medium"
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} ({c.currentRole})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Assigned Requisition</label>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-medium"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Round Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-medium"
              >
                <option value="Technical Round">Technical Round (3D CAD)</option>
                <option value="Phone Screen">Phone Screen</option>
                <option value="Hiring Manager">Hiring Manager Deep Dive</option>
                <option value="Culture Fit">EPCM Culture & Safety</option>
                <option value="Executive Review">Executive Sign-Off</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Session Date & Time</label>
              <Input
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
                placeholder="2026-08-28 14:00"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Duration (Minutes)</label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-medium"
              >
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
                <option value={90}>90 Minutes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Location / Video Link</label>
            <Input
              value={meetingLocation}
              onChange={(e) => setMeetingLocation(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Interviewer Preparation & Rubric</label>
            <Textarea
              rows={2}
              value={prepNotes}
              onChange={(e) => setPrepNotes(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowScheduleModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit" className="font-semibold">
              Confirm & Send Invites
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
