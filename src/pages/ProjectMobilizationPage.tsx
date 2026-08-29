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
        {/* Project Metrics Strip with Clean Subdued Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-[12px] bg-slate-50 dark:bg-black/30 border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-1.5 flex flex-col justify-between">
            <div className="type-eyebrow text-slate-500 dark:text-zinc-400">Client / Operator</div>
            <div>
              <div className="text-base font-bold text-slate-900 dark:text-white font-display">{activeProject.client}</div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{activeProject.location}</div>
            </div>
            <div className="text-[11px] text-slate-400 dark:text-zinc-500 pt-1 border-t border-black/[0.04] dark:border-white/[0.06]">
              Prime EPCM Master Service Agreement
            </div>
          </div>

          <div className="p-4 rounded-[12px] bg-slate-50 dark:bg-black/30 border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-1.5 flex flex-col justify-between">
            <div className="type-eyebrow text-slate-500 dark:text-zinc-400 flex items-center justify-between">
              <span>Mobilization Date</span>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div>
              <div className="text-xl font-bold font-display text-slate-900 dark:text-white tabular-nums">{activeProject.targetStartDate}</div>
              <div className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5">Rotation: <strong className="text-slate-900 dark:text-white">{activeProject.rotation}</strong></div>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 pt-1 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Flights & Camp Pre-Approved</span>
            </div>
          </div>

          <div className="p-4 rounded-[12px] bg-slate-50 dark:bg-black/30 border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-1.5 flex flex-col justify-between">
            <div className="type-eyebrow text-slate-500 dark:text-zinc-400 flex items-center justify-between">
              <span>Headcount Fulfillment</span>
              <span className="font-semibold text-slate-700 dark:text-zinc-300">{Math.round((activeProject.assignedCount / activeProject.requiredHeadcount) * 100)}%</span>
            </div>
            <div>
              <div className="text-xl font-bold font-display text-slate-900 dark:text-white tabular-nums">
                {activeProject.assignedCount} of {activeProject.requiredHeadcount} Filled
              </div>
              <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 mt-1.5 overflow-hidden">
                <div
                  className="bg-[#8A6D3B] dark:bg-[#d4c5a9] h-full rounded-full"
                  style={{ width: `${(activeProject.assignedCount / activeProject.requiredHeadcount) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 pt-1 border-t border-black/[0.04] dark:border-white/[0.06]">
              {activeProject.requiredHeadcount - activeProject.assignedCount} open headcount slots remaining
            </div>
          </div>

          <div className="p-4 rounded-[12px] bg-slate-50 dark:bg-black/30 border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-1.5 flex flex-col justify-between">
            <div className="type-eyebrow text-slate-500 dark:text-zinc-400 flex items-center justify-between">
              <span>Mobilization Risk</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant={activeProject.riskLevel === 'high' ? 'destructive' : activeProject.riskLevel === 'medium' ? 'warning' : 'success'} size="sm">
                  {activeProject.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
              <div className="text-xs text-slate-600 dark:text-zinc-300 mt-1 font-medium">
                {activeProject.riskLevel === 'high' ? 'Critical pipe stress gap' : 'Standard onboarding track'}
              </div>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 pt-1 border-t border-black/[0.04] dark:border-white/[0.06]">
              Direct review required
            </div>
          </div>
        </div>

        {/* Roles & Staffing Gaps in 2-Column Responsive Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
            <h3 className="type-section-title text-slate-900 dark:text-white">
              Required Discipline Headcount Slots ({activeProject.roles.length} Roles)
            </h3>
            <Badge variant="champagne" size="sm">Active EPCM Allocation</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProject.roles.map((r, idx) => {
              return (
                <div
                  key={idx}
                  className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="type-card-title text-slate-900 dark:text-white">{r.title}</h4>
                          <Badge variant={r.risk === 'critical' ? 'destructive' : r.risk === 'moderate' ? 'warning' : 'success'} size="sm">
                            {r.risk.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1 flex items-center gap-2">
                          <span className="font-semibold text-slate-700 dark:text-zinc-300">
                            {r.discipline}
                          </span>
                          <span>•</span>
                          <span className="font-medium text-slate-600 dark:text-zinc-400">Filled: {r.slotsFilled} of {r.slotsNeeded} Slots</span>
                        </div>
                      </div>

                      {r.slotsFilled < r.slotsNeeded && (
                        <Button
                          size="xs"
                          variant="champagne"
                          onClick={() => handleFastTrackMobilization(r.title)}
                          className="gap-1 font-semibold text-xs shrink-0"
                        >
                          <span>Match Pool</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      )}
                    </div>

                    {r.assignedCandidates.length > 0 ? (
                      <div className="p-3.5 rounded-[9px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08] space-y-1.5">
                        <div className="type-eyebrow text-slate-500 dark:text-zinc-400">Assigned Personnel</div>
                        {r.assignedCandidates.map((cand, cIdx) => (
                          <div key={cIdx} className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>{cand}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-[9px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08] text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>Slot vacant. Sourcing required before mobilization.</span>
                        </div>
                        <span className="font-bold font-mono text-[11px] text-slate-600 dark:text-zinc-400">GAP: 1</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                    <span>Rotation: 14/14 FIFO</span>
                    <span className="text-slate-600 dark:text-zinc-400 font-medium font-mono text-[10px]">CSTS-2020 Required</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
