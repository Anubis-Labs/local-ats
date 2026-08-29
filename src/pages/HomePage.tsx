import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  AlertTriangle,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Video,
  Plus,
  Clock,
  UserCheck,
  Activity,
  ShieldCheck,
  CheckSquare,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { candidateService } from '../services/candidateService';
import { jobService } from '../services/jobService';
import { interviewService } from '../services/interviewService';
import { taskService } from '../services/taskService';
import { mockCandidates } from '../mock/candidatesData';
import { mockJobs } from '../mock/jobsData';
import { mockInterviews } from '../mock/interviewsData';
import { mockTasks } from '../mock/tasksData';
import { Candidate } from '../types/candidate';
import { Job } from '../types/job';
import { Interview } from '../types/interview';
import { Task } from '../types/task';
import { Badge, Button, Card, Checkbox, cn } from '../components/ui';
import { WeeklyVelocityChart, DisciplineRadialDonut } from '../components/common/VisualCharts';
import { useAssistant } from '../context/AssistantContext';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';

import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const HomePage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const navigate = useNavigate();
  const { openAssistant } = useAssistant();
  const { toast } = useToast();

  useEffect(() => {
    const loadDashboard = async () => {
      const [cands, jbs, ints, tsks] = await Promise.all([
        candidateService.getCandidates(),
        jobService.getJobs({ status: 'active' }),
        interviewService.getInterviews(),
        taskService.getTasks()
      ]);
      setCandidates(cands);
      setJobs(jbs);
      setInterviews(ints);
      setTasks(tsks);
    };
    loadDashboard();
  }, []);

  const handleToggleTask = async (taskId: string) => {
    sound.latch();
    const updated = await taskService.toggleTaskCompletion(taskId);
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    toast(updated.completed ? 'Task Completed' : 'Task Reopened', updated.title, 'info');
  };

  const todayInterviews = [
    {
      id: 'int-1',
      candidateId: 'cand-001',
      candidateName: 'Tariq Al-Mansoor, CET',
      jobTitle: 'Senior Piping Designer (Fluor / Surmont)',
      type: 'Technical Panel',
      timeFormatted: '2:00 PM Today',
      interviewer: 'Elena Rostova'
    },
    {
      id: 'int-2',
      candidateId: 'cand-002',
      candidateName: 'Melissa Chen, P.Eng.',
      jobTitle: 'Lead Mechanical HVAC Engineer',
      type: 'Offer Sign-off',
      timeFormatted: '4:30 PM Today',
      interviewer: 'Sarah Jenkins'
    },
    {
      id: 'int-3',
      candidateId: 'cand-003',
      candidateName: 'Brendan Gallagher',
      jobTitle: 'Project Controls Analyst',
      type: 'Phone Screen',
      timeFormatted: 'Tomorrow @ 11:00 AM',
      interviewer: 'Marcus Vance'
    }
  ];

  const pendingReview = candidates.filter((c) => c.stage === 'new' || c.stage === 'review').slice(0, 4);
  const stalledCandidates = candidates.filter((c) => c.stalledWarning);
  const activeOffers = candidates.filter((c) => c.stage === 'offer');

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT DISPATCH HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="briefing-ribbon" opacity="opacity-40 dark:opacity-25" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Operational Briefing</span>
                  <span className="opacity-30">•</span>
                  <span>Thursday, August 28, 2026</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Today's Hiring Queue
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                size="xs"
                variant="champagne"
                onClick={() => openAssistant('Provide a 3-bullet executive briefing of today’s critical hiring actions, pending offers, and scheduled interviews.')}
                className="gap-1.5 font-semibold text-xs whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" strokeWidth={2} />
                <span>AI Briefing</span>
              </Button>

              <Button
                size="xs"
                variant="machined"
                onClick={() => navigate('/candidates')}
                className="gap-1.5 font-semibold text-xs whitespace-nowrap shrink-0"
              >
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Candidates ({candidates.length})</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKING CANVAS WITH GENERATED THEMATIC CARDS */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* KPI Strip: Generated Thematic Backgrounds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Today's Interviews (CAD Wireframe Blueprint) */}
          <div
            onClick={() => navigate('/interviews')}
            className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] hover:scale-[1.01] transition-all cursor-pointer space-y-2 group border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[11px] uppercase tracking-wider text-blue-700 dark:text-blue-300">Today's Interviews</span>
              <div className="w-7 h-7 rounded-[6px] bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              3
            </div>
            <div className="text-xs text-slate-600 dark:text-zinc-300 truncate font-medium">
              Next: <strong className="text-slate-900 dark:text-white font-semibold">2:00 PM</strong> (Tariq Al-Mansoor)
            </div>
          </div>

          {/* Card 2: Offers Pending (Topographic Champagne Contour) */}
          <div
            onClick={() => navigate('/candidates?stage=offer')}
            className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] hover:scale-[1.01] transition-all cursor-pointer space-y-2 border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer specimen-chamfer-champagne"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[11px] uppercase tracking-wider text-[#8A6D3B] dark:text-[#d4c5a9]">Offers Pending</span>
              <div className="w-7 h-7 rounded-[6px] bg-[#8A6D3B]/10 dark:bg-[#d4c5a9]/20 border border-[#8A6D3B]/30 dark:border-[#d4c5a9]/40 flex items-center justify-center text-[#8A6D3B] dark:text-[#d4c5a9]">
                <Award className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#8A6D3B] dark:text-[#d4c5a9] tracking-tight">
              {activeOffers.length || 1}
            </div>
            <div className="text-xs text-slate-600 dark:text-zinc-200 truncate font-medium">
              Melissa Chen (<strong className="text-[#8A6D3B] dark:text-[#d4c5a9] font-bold">$138k CAD</strong>)
            </div>
          </div>

          {/* Card 3: Stalled Candidates (Industrial Heavy Facility) */}
          <div
            onClick={() => navigate('/candidates?stalled=true')}
            className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] hover:scale-[1.01] transition-all cursor-pointer space-y-2 border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-300">Stalled Records</span>
              <div className="w-7 h-7 rounded-[6px] bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
            </div>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 tracking-tight">
              {stalledCandidates.length || 3}
            </div>
            <div className="text-xs text-slate-600 dark:text-zinc-300 truncate font-medium">
              &gt; 7 days without movement
            </div>
          </div>

          {/* Card 4: Active Requisitions (Neural Sourcing Mesh) */}
          <div
            onClick={() => navigate('/jobs')}
            className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] hover:scale-[1.01] transition-all cursor-pointer space-y-2 border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Open Requisitions</span>
              <div className="w-7 h-7 rounded-[6px] bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Briefcase className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {jobs.length || 5}
            </div>
            <div className="text-xs text-slate-600 dark:text-zinc-300 truncate font-medium">
              58 active candidates in pipeline
            </div>
          </div>
        </div>

        {/* Visual Analytics & Pipeline Velocity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer">
            <WeeklyVelocityChart />
          </div>

          <div className="lg:col-span-5 p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.08] dark:border-white/[0.08]">
              <span className="font-bold text-[11px] uppercase tracking-wider text-slate-900 dark:text-white">
                Discipline Pipeline Share
              </span>
              <Badge variant="champagne" size="sm">Active Roster</Badge>
            </div>
            <DisciplineRadialDonut />
          </div>
        </div>

        {/* 2-Column Split: Thematic Surfaces */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Scheduled Interviews & Inbound Review */}
          <div className="lg:col-span-8 space-y-6">
            {/* Scheduled Interviews Card */}
            <div className="rounded-[12px] bg-white dark:bg-[#12151D] p-6 space-y-4 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                    Today's Interview Schedule ({todayInterviews.length})
                  </span>
                </div>
                <button
                  onClick={() => navigate('/interviews')}
                  className="text-xs text-[#8A6D3B] dark:text-[#d4c5a9] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View Calendar</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                {todayInterviews.map((intv) => (
                  <div key={intv.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{intv.candidateName}</span>
                        <Badge variant="champagne" size="sm">{intv.type}</Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-zinc-300">
                        {intv.jobTitle} • <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">{intv.timeFormatted}</strong> • Host: {intv.interviewer}
                      </div>
                    </div>

                    <Button
                      size="xs"
                      variant="machined"
                      onClick={() => navigate(`/candidates/${intv.candidateId}`)}
                      className="shrink-0 font-medium"
                    >
                      <span>Dossier →</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidates Awaiting Initial Review */}
            <div className="rounded-[12px] bg-white dark:bg-[#12151D] p-6 space-y-4 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  Awaiting Initial Review ({pendingReview.length})
                </span>
                <button
                  onClick={() => navigate('/candidates?stage=new')}
                  className="text-xs text-[#8A6D3B] dark:text-[#d4c5a9] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Review All</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                {pendingReview.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/candidates/${c.id}`)}
                    className="py-3 flex items-center justify-between gap-3 text-xs cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.04] px-2 rounded-[6px] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {c.avatar ? (
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-9 h-9 rounded-[8px] object-cover border border-black/10 dark:border-white/10 shrink-0"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-[8px] bg-slate-200 dark:bg-gradient-to-br dark:from-[#242834] dark:to-[#12141a] border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-xs text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</div>
                        <div className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5">
                          {c.currentRole} • {c.currentCompany} ({c.experienceYears}y exp)
                        </div>
                      </div>
                    </div>

                    <Button size="xs" variant="machined">Inspect →</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Operational Tasks Queue */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-[12px] bg-white dark:bg-[#12151D] p-6 space-y-4 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  Action Items ({tasks.filter(t => !t.completed).length})
                </span>
                <button
                  onClick={() => navigate('/tasks')}
                  className="text-xs text-[#8A6D3B] dark:text-[#d4c5a9] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>All Tasks</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                {tasks.slice(0, 5).map((t) => (
                  <div key={t.id} className="py-3.5 flex items-start gap-3 text-xs">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => handleToggleTask(t.id)}
                      className="mt-0.5 h-4 w-4 rounded border-black/20 dark:border-white/[0.2] bg-white dark:bg-[#0c0d10] text-[#8A6D3B] dark:text-[#d4c5a9] cursor-pointer"
                    />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className={cn('font-semibold text-xs leading-snug', t.completed ? 'line-through text-slate-400 dark:text-zinc-500' : 'text-slate-900 dark:text-white')}>
                        {t.title}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-zinc-300 leading-relaxed">
                        {t.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
