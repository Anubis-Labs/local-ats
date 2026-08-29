import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  Laptop,
  HardHat,
  FileCheck,
  Send,
  Building,
  Key,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { Badge, Button, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface OnboardingHire {
  id: string;
  candidateName: string;
  candidateId: string;
  jobTitle: string;
  department: string;
  startDate: string;
  status: 'in_progress' | 'ready_for_day1' | 'pending_docs';
  tasks: { name: string; completed: boolean; category: 'hr' | 'safety' | 'cad' }[];
}

export const OnboardingPage: React.FC = () => {
  const [hires, setHires] = useState<OnboardingHire[]>([
    {
      id: 'onb-01',
      candidateName: 'Melissa Chen, P.Eng.',
      candidateId: 'cand-002',
      jobTitle: 'Lead Mechanical HVAC Engineer',
      department: 'Mechanical Engineering',
      startDate: '2026-10-01',
      status: 'in_progress',
      tasks: [
        { name: 'Signed EPCM Offer Contract (DocuSign)', completed: true, category: 'hr' },
        { name: 'TD1 Federal & Alberta TD1-AB Tax Credits Form', completed: true, category: 'hr' },
        { name: 'Workday HRIS Employee Profile & Direct Deposit', completed: false, category: 'hr' },
        { name: 'Autodesk Plant 3D & AutoCAD Engineering License', completed: true, category: 'cad' },
        { name: 'Fort McMurray Surmont Site Access Badge & Orientation', completed: false, category: 'safety' }
      ]
    }
  ]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleToggleTask = (hireId: string, taskIndex: number) => {
    sound.pop();
    setHires((prev) =>
      prev.map((h) => {
        if (h.id !== hireId) return h;
        const updatedTasks = [...h.tasks];
        updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
        const allCompleted = updatedTasks.every((t) => t.completed);
        return {
          ...h,
          tasks: updatedTasks,
          status: allCompleted ? 'ready_for_day1' : 'in_progress'
        };
      })
    );
    toast('Checklist Updated', 'Onboarding readiness status updated.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. ONBOARDING HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Post-Hire Handoff Hub</span>
                <span className="opacity-30">•</span>
                <span>Site Badging, CAD Provisioning & Payroll Sync</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Engineering Onboarding & Mobilization Handoff
              </h1>
            </div>
          </div>

          <Badge variant="champagne" size="sm">1 Active Onboarding Roster</Badge>
        </div>
      </header>

      {/* 2. ONBOARDING WORKBENCH */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        {hires.map((hire) => {
          const completedCount = hire.tasks.filter((t) => t.completed).length;
          const totalCount = hire.tasks.length;
          const progressPercent = Math.round((completedCount / totalCount) * 100);

          return (
            <div
              key={hire.id}
              className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{hire.candidateName}</h3>
                    <Badge variant={hire.status === 'ready_for_day1' ? 'success' : 'champagne'} size="sm">
                      {hire.status === 'ready_for_day1' ? 'DAY 1 READY' : 'ONBOARDING IN PROGRESS'}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-zinc-300 font-semibold mt-0.5">
                    {hire.jobTitle} • {hire.department}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    Target Start Date: <strong className="text-emerald-600 dark:text-emerald-400">{hire.startDate}</strong>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{completedCount} / {totalCount} Items Ready</div>
                  <div className="w-28 h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                    <div className="h-full bg-[#8A6D3B] dark:bg-[#d4c5a9]" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </div>

              {/* Task Matrix */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 pb-1 border-b border-black/[0.06] dark:border-white/[0.06]">
                  Readiness Checklist
                </div>

                {hire.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleToggleTask(hire.id, idx)}
                    className="p-3 rounded-[7px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}}
                        className="rounded text-[#8A6D3B] focus:ring-0"
                      />
                      <span className={cn('font-medium', task.completed ? 'line-through text-slate-400 dark:text-zinc-500' : 'text-slate-900 dark:text-white')}>
                        {task.name}
                      </span>
                    </div>

                    <Badge variant={task.category === 'hr' ? 'champagne' : task.category === 'cad' ? 'indigo' : 'warning'} size="sm">
                      {task.category.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};
