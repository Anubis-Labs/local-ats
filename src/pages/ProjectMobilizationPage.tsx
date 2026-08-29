import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HardHat,
  Calendar,
  AlertTriangle,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Plus,
  Compass,
  MapPin,
  Briefcase,
  Plane
} from 'lucide-react';
import { Badge, Button, Card, Modal, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface ProjectDemand {
  id: string;
  projectName: string;
  client: string;
  location: string;
  targetStartDate: string;
  requiredHeadcount: number;
  assignedCount: number;
  riskLevel: 'high' | 'medium' | 'low';
  rotation: string;
  roles: {
    title: string;
    discipline: string;
    slotsNeeded: number;
    slotsFilled: number;
    assignedCandidates: string[];
    risk: 'critical' | 'moderate' | 'filled';
  }[];
}

export const ProjectMobilizationPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectDemand[]>([
    {
      id: 'proj-01',
      projectName: 'Surmont SAGD Phase 2 Debottlenecking',
      client: 'ConocoPhillips Canada',
      location: 'Fort McMurray, AB (Site / Calgary HQ)',
      targetStartDate: 'Oct 01, 2026',
      requiredHeadcount: 12,
      assignedCount: 8,
      riskLevel: 'high',
      rotation: '14/14 FIFO (YYC/YEG Fly-in)',
      roles: [
        {
          title: 'Senior Piping Designer (Plant 3D)',
          discipline: 'Piping & Layout',
          slotsNeeded: 2,
          slotsFilled: 1,
          assignedCandidates: ['Tariq Al-Mansoor, CET (In Final Review)'],
          risk: 'critical'
        },
        {
          title: 'Lead Mechanical HVAC Engineer',
          discipline: 'Mechanical',
          slotsNeeded: 1,
          slotsFilled: 1,
          assignedCandidates: ['Melissa Chen, P.Eng. (Offer Out)'],
          risk: 'filled'
        },
        {
          title: 'Senior Piping Stress Engineer (Caesar II)',
          discipline: 'Piping & Layout',
          slotsNeeded: 1,
          slotsFilled: 0,
          assignedCandidates: [],
          risk: 'critical'
        },
        {
          title: 'Project Controls Lead (P6 / SAP)',
          discipline: 'Project Controls',
          slotsNeeded: 1,
          slotsFilled: 1,
          assignedCandidates: ['Brendan Gallagher (Interviewing)'],
          risk: 'moderate'
        }
      ]
    },
    {
      id: 'proj-02',
      projectName: 'Kearl Lake Oil Sands Extraction Expansion',
      client: 'Imperial Oil',
      location: 'Kearl Site, AB',
      targetStartDate: 'Nov 15, 2026',
      requiredHeadcount: 18,
      assignedCount: 15,
      riskLevel: 'low',
      rotation: '10/10 Camp Rotation',
      roles: [
        {
          title: 'Civil/Structural Field Engineer',
          discipline: 'Civil & Structural',
          slotsNeeded: 2,
          slotsFilled: 2,
          assignedCandidates: ['David Vance, P.Eng.', 'Kavita Patel, EIT'],
          risk: 'filled'
        },
        {
          title: 'Electrical & Instrumentation Lead',
          discipline: 'E&I',
          slotsNeeded: 1,
          slotsFilled: 1,
          assignedCandidates: ['Jonathan Miller, CET'],
          risk: 'filled'
        }
      ]
    },
    {
      id: 'proj-03',
      projectName: 'Heartland Petrochemical Complex Phase 3',
      client: 'Inter Pipeline / Brookfield',
      location: 'Strathcona County, AB',
      targetStartDate: 'Jan 10, 2027',
      requiredHeadcount: 24,
      assignedCount: 14,
      riskLevel: 'medium',
      rotation: 'Local Commute / 5x2 Office',
      roles: [
        {
          title: 'Process Simulation Specialist (HYSYS)',
          discipline: 'Chemical / Process',
          slotsNeeded: 3,
          slotsFilled: 1,
          assignedCandidates: ['Dr. Aris Thorne, P.Eng.'],
          risk: 'moderate'
        }
      ]
    }
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-01');
  const { toast } = useToast();
  const navigate = useNavigate();

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleFastTrackMobilization = (roleTitle: string) => {
    sound.chime();
    toast('Talent Shortlist Launched', `Sourcing talent bench for ${roleTitle} (${activeProject.projectName}).`, 'success');
    navigate('/talent');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. MOBILIZATION HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="epcm-structural" opacity="opacity-45 dark:opacity-25" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <HardHat className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Workforce Demand Planning</span>
                  <span className="opacity-30">•</span>
                  <span>Western Canadian Major Capital Projects</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Project Mobilization & Staffing Demand Board
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                size="xs"
                variant="machined"
                onClick={() => {
                  sound.click();
                  navigate('/compliance');
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Safety Ticket Expiry Radar</span>
              </Button>

              <Button
                size="xs"
                variant="champagne"
                onClick={() => {
                  sound.click();
                  navigate('/jobs/new');
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                <span>Open Staffing Slot</span>
              </Button>
            </div>
          </div>

          {/* Project Selector Pills */}
          <div className="flex items-center gap-2 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] overflow-x-auto relative z-1">
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => {
                  sound.warp();
                  setSelectedProjectId(proj.id);
                }}
                className={cn(
                  'px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2',
                  selectedProjectId === proj.id
                    ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black shadow-xs font-bold'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 border border-black/[0.06] dark:border-white/[0.08]'
                )}
              >
                <span>{proj.projectName}</span>
                <span className={cn(
                  'w-2 h-2 rounded-full',
                  proj.riskLevel === 'high' ? 'bg-rose-400 animate-pulse' : proj.riskLevel === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'
                )} />
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. PROJECT MOBILIZATION OVERVIEW */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Project Metrics Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-[10px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-1">
            <div className="type-eyebrow text-slate-500 dark:text-zinc-400">Client / Operator</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-display">{activeProject.client}</div>
            <div className="text-[10px] text-slate-400 dark:text-zinc-500">{activeProject.location}</div>
          </div>

          <div className="p-4 rounded-[10px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-1">
            <div className="type-eyebrow text-slate-500 dark:text-zinc-400">Mobilization Date</div>
            <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{activeProject.targetStartDate}</div>
            <div className="text-[10px] text-slate-400 dark:text-zinc-500">Rotation: {activeProject.rotation}</div>
          </div>

          <div className="p-4 rounded-[10px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-1">
            <div className="type-eyebrow text-slate-500 dark:text-zinc-400">Headcount Staffed</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums font-display">
              {activeProject.assignedCount} of {activeProject.requiredHeadcount} filled
            </div>
            <div className="text-[10px] text-slate-400 dark:text-zinc-500 tabular-nums">
              {Math.round((activeProject.assignedCount / activeProject.requiredHeadcount) * 100)}% staffed
            </div>
          </div>

          <div className="p-4 rounded-[10px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-1">
            <div className="type-eyebrow text-slate-500 dark:text-zinc-400">Mobilization Risk</div>
            <div className="flex items-center gap-1.5 pt-0.5">
              <Badge variant={activeProject.riskLevel === 'high' ? 'destructive' : activeProject.riskLevel === 'medium' ? 'warning' : 'success'} size="sm">
                {activeProject.riskLevel.toUpperCase()} RISK
              </Badge>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-zinc-500">2 critical discipline deficits</div>
          </div>
        </div>

        {/* Roles & Staffing Gaps Table */}
        <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Required Discipline Headcount Slots ({activeProject.roles.length} Roles)
            </span>
            <Badge variant="champagne" size="sm">Active EPCM Allocation</Badge>
          </div>

          <div className="space-y-3 text-xs">
            {activeProject.roles.map((r, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{r.title}</span>
                    <Badge variant={r.risk === 'critical' ? 'destructive' : r.risk === 'moderate' ? 'warning' : 'success'} size="sm">
                      {r.risk.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                    Discipline: <strong className="text-slate-800 dark:text-zinc-200">{r.discipline}</strong> • Filled: {r.slotsFilled} of {r.slotsNeeded} Slots
                  </div>
                  {r.assignedCandidates.length > 0 && (
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 pt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Rostered: {r.assignedCandidates.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {r.slotsFilled < r.slotsNeeded && (
                    <Button
                      size="xs"
                      variant="champagne"
                      onClick={() => handleFastTrackMobilization(r.title)}
                      className="gap-1.5 font-semibold text-xs"
                    >
                      <span>Match From Talent Pool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
