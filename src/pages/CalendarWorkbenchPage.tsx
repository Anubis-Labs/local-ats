import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Users,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Plus,
  User,
  ShieldCheck,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { Badge, Button, Input, Modal, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { useSearchParams } from 'react-router-dom';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface CalendarEvent {
  id: string;
  candidateName: string;
  candidateId: string;
  jobTitle: string;
  round: string;
  time: string;
  dayOfWeek: number; // 0: Mon, 1: Tue, 2: Wed, 3: Thu, 4: Fri
  startHour: number; // e.g. 14 for 2 PM
  durationHours: number; // e.g. 1
  duration: string;
  interviewers: string[];
  timezone: string;
  status: 'confirmed' | 'pending_feedback' | 'feedback_completed' | 'conflict_detected';
  meetingLink: string;
}

export const CalendarWorkbenchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = (searchParams.get('view') as 'day' | 'week' | 'agenda') || 'agenda';
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'agenda'>(currentView);

  const handleSelectView = (mode: 'day' | 'week' | 'agenda') => {
    sound.warp();
    setViewMode(mode);
    setSearchParams({ view: mode });
  };
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 'evt-1',
      candidateName: 'Tariq Al-Mansoor, CET',
      candidateId: 'cand-001',
      jobTitle: 'Senior Piping Designer (Brownfield / Plant 3D)',
      round: 'Technical Discipline Panel (Round 2)',
      time: 'Today • 2:00 PM – 3:00 PM MDT',
      dayOfWeek: 3, // Thursday
      startHour: 14,
      durationHours: 1,
      duration: '60 min',
      interviewers: ['Elena Rostova, P.Eng. (Host)', 'Marcus Vance'],
      timezone: 'America/Edmonton (MDT)',
      status: 'confirmed',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/alberta-eng-piping-01'
    },
    {
      id: 'evt-2',
      candidateName: 'Melissa Chen, P.Eng.',
      candidateId: 'cand-002',
      jobTitle: 'Lead Mechanical HVAC Engineer',
      round: 'Engineering Leadership & Offer Sign-off',
      time: 'Today • 4:30 PM – 5:15 PM MDT',
      dayOfWeek: 3, // Thursday
      startHour: 16.5,
      durationHours: 0.75,
      duration: '45 min',
      interviewers: ['Sarah Jenkins', 'David Tremblay'],
      timezone: 'America/Edmonton (MDT)',
      status: 'confirmed',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/alberta-eng-offer-02'
    },
    {
      id: 'evt-3',
      candidateName: 'Brendan Gallagher',
      candidateId: 'cand-003',
      jobTitle: 'Project Controls & Cost Estimator',
      round: 'Initial Recruiter Phone Screen',
      time: 'Tomorrow • 11:00 AM – 11:30 AM MDT',
      dayOfWeek: 4, // Friday
      startHour: 11,
      durationHours: 0.5,
      duration: '30 min',
      interviewers: ['Marcus Vance'],
      timezone: 'America/Edmonton (MDT)',
      status: 'confirmed',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/alberta-eng-screen-03'
    }
  ]);

  const [showBookModal, setShowBookModal] = useState(false);
  const [candidateName, setCandidateName] = useState('Tariq Al-Mansoor, CET');
  const [jobTitle, setJobTitle] = useState('Senior Piping Designer (Brownfield / Plant 3D)');
  const [panelRound, setPanelRound] = useState('Technical Discipline Panel (Round 2)');
  const [panelDate, setPanelDate] = useState('2026-09-02');
  const [panelTime, setPanelTime] = useState('14:00');
  const [interviewers, setInterviewers] = useState('Elena Rostova, P.Eng., Marcus Vance');

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleJoin = (link: string, candidate: string) => {
    sound.bell();
    toast('Joining Video Session', `Opening Teams panel room for ${candidate}.`, 'info');
    window.open(link, '_blank');
  };

  const handleBookPanel = (e: React.FormEvent) => {
    e.preventDefault();
    sound.chime();
    const hour = parseInt(panelTime.split(':')[0], 10) || 14;
    const newEvent: CalendarEvent = {
      id: `evt-${Date.now()}`,
      candidateName,
      candidateId: 'cand-001',
      jobTitle,
      round: panelRound,
      time: `${panelDate} • ${panelTime} MDT`,
      dayOfWeek: 2,
      startHour: hour,
      durationHours: 1,
      duration: '60 min',
      interviewers: interviewers.split(',').map((i) => i.trim()),
      timezone: 'America/Edmonton (MDT)',
      status: 'confirmed',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/alberta-eng-scheduled'
    };
    setEvents([newEvent, ...events]);
    setShowBookModal(false);
    toast('Interview Booked', `Teams panel room generated and dispatched for ${candidateName}.`, 'success');
  };

  const hoursList = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const weekDays = [
    { label: 'Mon', date: 'Aug 24', dayIndex: 0 },
    { label: 'Tue', date: 'Aug 25', dayIndex: 1 },
    { label: 'Wed', date: 'Aug 26', dayIndex: 2 },
    { label: 'Thu (Today)', date: 'Aug 27', dayIndex: 3 },
    { label: 'Fri', date: 'Aug 28', dayIndex: 4 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. CALENDAR WORKBENCH HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <CalendarIcon className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Interview Operations</span>
                <span className="opacity-30">•</span>
                <span>Calgary & Edmonton Panel Rooms</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Interview Calendar & Panel Workbench
              </h1>
            </div>
          </div>

            {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-200/80 dark:bg-white/[0.08] p-0.5 rounded-[7px] border border-black/10 dark:border-white/10 text-xs">
              {(['agenda', 'day', 'week'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleSelectView(mode)}
                  className={cn(
                    'px-3.5 py-1 rounded-[5px] font-semibold capitalize transition-all',
                    viewMode === mode
                      ? 'bg-white dark:bg-[#1E222D] text-slate-900 dark:text-white shadow-xs font-bold border border-black/[0.06] dark:border-white/10'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>

            <Button
              size="xs"
              variant="champagne"
              onClick={() => {
                sound.glass();
                setShowBookModal(true);
              }}
              className="gap-1.5 font-semibold text-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
              <span>Book Panel</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. CALENDAR WORKBENCH SESSIONS - DYNAMIC LAYOUT PER VIEW MODE */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        {/* VIEW 1: AGENDA LIST LAYOUT */}
        {viewMode === 'agenda' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Upcoming Technical Panels & Screenings ({events.length})
              </div>
              <Badge variant="champagne" size="sm">America/Edmonton (MDT)</Badge>
            </div>

            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{evt.candidateName}</h3>
                      <Badge variant="indigo" size="sm">{evt.round}</Badge>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-zinc-300 font-semibold">{evt.jobTitle}</div>
                    <div className="text-[11px] text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                      <span className="flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        <Clock className="w-3 h-3" />
                        <span>{evt.time}</span>
                      </span>
                      <span>•</span>
                      <span>Timezone: {evt.timezone}</span>
                    </div>
                  </div>

                  <Button
                    size="xs"
                    variant="champagne"
                    onClick={() => handleJoin(evt.meetingLink, evt.candidateName)}
                    className="gap-1.5 font-semibold text-xs shrink-0"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Video Room</span>
                  </Button>
                </div>

                {/* Panel Attendees & Lock State */}
                <div className="p-3 rounded-[7px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
                    <Users className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                    <span>Interviewers: <strong className="text-slate-900 dark:text-white">{evt.interviewers.join(', ')}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Private Scorecard Blind Lock Active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: DAY VIEW HOURLY GRID */}
        {viewMode === 'day' && (
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div>
                <h2 className="font-bold text-lg text-slate-900 dark:text-white">Thursday, August 27, 2026</h2>
                <div className="text-xs text-slate-500 dark:text-zinc-400">Day Schedule • Calgary HQ & Teams Video Rooms</div>
              </div>
              <Badge variant="champagne" size="sm">2 Interviews Scheduled Today</Badge>
            </div>

            <div className="bg-white dark:bg-[#12151D] rounded-[12px] border border-black/[0.08] dark:border-white/10 shadow-sm overflow-hidden p-6">
              <div className="space-y-4">
                {hoursList.map((hour) => {
                  const hourLabel = hour < 12 ? `${hour}:00 AM` : hour === 12 ? `12:00 PM` : `${hour - 12}:00 PM`;
                  const matchedEvents = events.filter((e) => Math.floor(e.startHour) === hour && e.dayOfWeek === 3);

                  return (
                    <div key={hour} className="flex items-start gap-4 min-h-[70px] border-b border-black/[0.04] dark:border-white/[0.04] pb-3 last:border-0">
                      <div className="w-20 shrink-0 font-mono text-xs text-slate-400 dark:text-zinc-500 font-bold pt-1">
                        {hourLabel}
                      </div>

                      <div className="flex-1 space-y-2">
                        {matchedEvents.length > 0 ? (
                          matchedEvents.map((evt) => (
                            <div
                              key={evt.id}
                              className="p-3.5 rounded-[8px] bg-amber-50 dark:bg-amber-950/30 border border-[#8A6D3B]/40 flex items-center justify-between shadow-xs"
                            >
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-slate-900 dark:text-white">{evt.candidateName}</span>
                                  <Badge variant="champagne" size="sm">{evt.round}</Badge>
                                </div>
                                <div className="text-xs text-slate-600 dark:text-zinc-300 font-medium">
                                  {evt.jobTitle} • {evt.duration}
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                                  Panel: {evt.interviewers.join(', ')}
                                </div>
                              </div>

                              <Button
                                size="xs"
                                variant="champagne"
                                onClick={() => handleJoin(evt.meetingLink, evt.candidateName)}
                                className="gap-1 font-semibold text-xs"
                              >
                                <Video className="w-3.5 h-3.5" />
                                <span>Join</span>
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="h-full flex items-center text-xs text-slate-300 dark:text-zinc-600 italic">
                            Available Slot
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: WEEK VIEW MATRIX */}
        {viewMode === 'week' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div>
                <h2 className="font-bold text-lg text-slate-900 dark:text-white">Week of August 24 – 28, 2026</h2>
                <div className="text-xs text-slate-500 dark:text-zinc-400">Multi-Discipline Engineering Panel Grid</div>
              </div>
              <Badge variant="champagne" size="sm">5-Day Work Week</Badge>
            </div>

            <div className="bg-white dark:bg-[#12151D] rounded-[12px] border border-black/[0.08] dark:border-white/10 shadow-sm overflow-x-auto p-4">
              <div className="grid grid-cols-5 gap-3 min-w-[750px]">
                {weekDays.map((day) => {
                  const dayEvents = events.filter((e) => e.dayOfWeek === day.dayIndex);
                  return (
                    <div key={day.dayIndex} className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-3 min-h-[380px]">
                      <div className="pb-2 border-b border-black/[0.08] dark:border-white/[0.08] text-center">
                        <div className="font-bold text-xs text-slate-900 dark:text-white">{day.label}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{day.date}</div>
                      </div>

                      <div className="space-y-2.5">
                        {dayEvents.length > 0 ? (
                          dayEvents.map((evt) => (
                            <div
                              key={evt.id}
                              onClick={() => handleJoin(evt.meetingLink, evt.candidateName)}
                              className="p-2.5 rounded-[6px] bg-white dark:bg-[#1E222D] border border-black/10 dark:border-white/10 shadow-xs cursor-pointer hover:border-[#8A6D3B] transition-all space-y-1 group"
                            >
                              <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#8A6D3B] dark:group-hover:text-[#d4c5a9]">
                                {evt.candidateName}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-zinc-400 leading-tight">
                                {evt.jobTitle}
                              </div>
                              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold pt-1">
                                {evt.time.split('•')[1] || evt.time}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-[11px] text-slate-400 dark:text-zinc-600 text-center pt-8 italic">
                            No panels booked
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. BOOK PANEL MODAL */}
      <Modal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        title="Schedule Technical Interview Panel"
        subtitle="Book video room, detect calendar conflicts, and assign private scorecards"
        maxWidth="lg"
      >
        <form onSubmit={handleBookPanel} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Candidate Name</label>
              <Input
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Target Requisition</label>
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Interview Round</label>
              <select
                value={panelRound}
                onChange={(e) => setPanelRound(e.target.value)}
                className="w-full h-8 px-2 rounded-[6px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-medium"
              >
                <option>Round 1: Recruiter Phone Screen</option>
                <option>Technical Discipline Panel (Round 2)</option>
                <option>Engineering Leadership & Offer (Round 3)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Interview Date</label>
              <Input
                type="date"
                value={panelDate}
                onChange={(e) => setPanelDate(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Time (MDT)</label>
              <Input
                type="time"
                value={panelTime}
                onChange={(e) => setPanelTime(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Assigned Interviewers & Discipline Leads</label>
            <Input
              value={interviewers}
              onChange={(e) => setInterviewers(e.target.value)}
              placeholder="Elena Rostova, P.Eng., Marcus Vance..."
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowBookModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit" className="font-semibold">
              Confirm & Generate Teams Room
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
