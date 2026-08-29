import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  HardHat,
  ShieldCheck,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Download,
  Share2,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { Badge, Button, Input, Modal, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface TeamSlot {
  id: string;
  roleTitle: string;
  discipline: string;
  assignedCandidate?: {
    name: string;
    id: string;
    rate: string;
    stamp: string;
    clientExp: string;
    status: 'locked' | 'proposed';
  };
  requiredRateBand: string;
  criticality: 'critical' | 'standard';
}

export const ProjectTeamBuilderPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'scenario_a' | 'scenario_b' | 'scenario_c'>('scenario_a');
  const [selectedProject, setSelectedProject] = useState('Surmont Phase 2 SAGD Debottlenecking');
  const { toast } = useToast();
  const navigate = useNavigate();

  const [teamSlots, setTeamSlots] = useState<TeamSlot[]>([
    {
      id: 'slot-1',
      roleTitle: 'Lead Piping Designer (Plant 3D / Tie-Ins)',
      discipline: 'Piping & Layout',
      requiredRateBand: '$130k - $145k / $95 / hr',
      criticality: 'critical',
      assignedCandidate: {
        name: 'Tariq Al-Mansoor, CET',
        id: 'cand-001',
        rate: '$135,000 / yr',
        stamp: 'ASET CET #39481',
        clientExp: 'ConocoPhillips Surmont (4 yrs)',
        status: 'locked'
      }
    },
    {
      id: 'slot-2',
      roleTitle: 'Lead Mechanical HVAC Engineer',
      discipline: 'Mechanical',
      requiredRateBand: '$135k - $150k / $105 / hr',
      criticality: 'critical',
      assignedCandidate: {
        name: 'Melissa Chen, P.Eng.',
        id: 'cand-002',
        rate: '$138,000 / yr',
        stamp: 'APEGA P.Eng. #84920',
        clientExp: 'Kearl & Surmont Industrial HVAC',
        status: 'proposed'
      }
    },
    {
      id: 'slot-3',
      roleTitle: 'Senior Piping Stress Analyst (Caesar II)',
      discipline: 'Piping & Layout',
      requiredRateBand: '$140k - $160k / $115 / hr',
      criticality: 'critical'
    },
    {
      id: 'slot-4',
      roleTitle: 'Project Controls & Schedule Lead (P6 / SAP)',
      discipline: 'Project Controls',
      requiredRateBand: '$115k - $130k / $85 / hr',
      criticality: 'standard',
      assignedCandidate: {
        name: 'Brendan Gallagher',
        id: 'cand-003',
        rate: '$120,000 / yr',
        stamp: 'AACE Certified Estimator',
        clientExp: 'Suncor Base Plant Turnarounds',
        status: 'proposed'
      }
    }
  ]);

  const assignedCount = teamSlots.filter((s) => s.assignedCandidate).length;
  const totalSlots = teamSlots.length;
  const lockedCount = teamSlots.filter((s) => s.assignedCandidate?.status === 'locked').length;

  const handleToggleLock = (slotId: string) => {
    sound.pop();
    setTeamSlots((prev) =>
      prev.map((s) => {
        if (s.id !== slotId || !s.assignedCandidate) return s;
        return {
          ...s,
          assignedCandidate: {
            ...s.assignedCandidate,
            status: s.assignedCandidate.status === 'locked' ? 'proposed' : 'locked'
          }
        };
      })
    );
    toast('Personnel State Updated', 'Team member lock status toggled.', 'info');
  };

  const handleExportRoster = () => {
    sound.chime();
    toast('Mobilization Roster Exported', 'Generated EPCM Project Mobilization Pack (PDF & CSV).', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. TEAM BUILDER HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="epcm-structural" opacity="opacity-45 dark:opacity-25" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <Users className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>EPCM Workforce Orchestration</span>
                <span className="opacity-30">•</span>
                <span>Project Team Builder & Scenario Modeler</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Project Team Builder & Roster Studio
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Scenario Selector */}
            <div className="flex items-center bg-slate-200/80 dark:bg-white/[0.08] p-0.5 rounded-[7px] border border-black/10 dark:border-white/10 text-xs">
              {[
                { id: 'scenario_a', label: 'Scenario A (Optimal)' },
                { id: 'scenario_b', label: 'Scenario B (Fast-Track)' },
                { id: 'scenario_c', label: 'Scenario C (Low-Cost)' }
              ].map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    sound.warp();
                    setSelectedScenario(sc.id as any);
                  }}
                  className={cn(
                    'px-3 py-1 rounded-[5px] font-semibold text-xs transition-all',
                    selectedScenario === sc.id
                      ? 'bg-white dark:bg-[#1E222D] text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  {sc.label}
                </button>
              ))}
            </div>

            <Button size="xs" variant="champagne" onClick={handleExportRoster} className="gap-1.5 font-semibold text-xs">
              <Download className="w-3.5 h-3.5" />
              <span>Export Mobilization Roster</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. TEAM BUILDER WORKBENCH */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Project KPI Card */}
        <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 type-eyebrow text-slate-500 dark:text-zinc-400">
              <span>Target Project</span>
              <span>•</span>
              <span>Client: ConocoPhillips Canada</span>
            </div>
            <h2 className="type-section-title text-slate-900 dark:text-white mt-1">{selectedProject}</h2>
            <div className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
              Target Mobilization: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">October 1, 2026</strong> • Rotation: 14/14 FIFO (YYC/YEG → YMM)
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div className="text-right">
              <div className="text-slate-500 dark:text-zinc-400 font-medium">Staffing Readiness</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white tabular-nums font-display">{assignedCount} of {totalSlots} filled</div>
            </div>
            <div className="text-right">
              <div className="text-slate-500 dark:text-zinc-400 font-medium">Locked Personnel</div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums font-display">{lockedCount} locked</div>
            </div>
            <div className="text-right">
              <div className="text-slate-500 dark:text-zinc-400 font-medium">Project Budget Burn</div>
              <div className="text-lg font-bold text-[#8A6D3B] dark:text-[#d4c5a9] tabular-nums font-display">$393,000 / year</div>
            </div>
          </div>
        </div>

        {/* Team Discipline Slots Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
            <h3 className="type-eyebrow text-slate-500 dark:text-zinc-400">
              Project Discipline Roster Allocation ({totalSlots} Slots)
            </h3>
            <Badge variant="champagne" size="sm">1 Missing Role Requires Sourcing</Badge>
          </div>

          {teamSlots.map((slot) => (
            <div
              key={slot.id}
              className={cn(
                'p-6 rounded-[12px] bg-white dark:bg-[#12151D] border shadow-sm specimen-chamfer transition-all space-y-4',
                slot.assignedCandidate
                  ? slot.assignedCandidate.status === 'locked'
                    ? 'border-emerald-500/40 bg-emerald-50/10'
                    : 'border-black/[0.08] dark:border-white/10'
                  : 'border-dashed border-rose-500/40 bg-rose-50/10'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="type-card-title text-slate-900 dark:text-white">{slot.roleTitle}</h4>
                    <Badge variant={slot.criticality === 'critical' ? 'destructive' : 'neutral'} size="sm">
                      {slot.criticality.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Discipline: <strong className="text-slate-700 dark:text-zinc-300 font-medium">{slot.discipline}</strong> • Rate Band: <span className="font-semibold tabular-nums text-slate-800 dark:text-zinc-200">{slot.requiredRateBand}</span>
                  </div>
                </div>

                {slot.assignedCandidate ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="xs"
                      variant={slot.assignedCandidate.status === 'locked' ? 'champagne' : 'machined'}
                      onClick={() => handleToggleLock(slot.id)}
                      className="gap-1.5 font-semibold text-xs"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{slot.assignedCandidate.status === 'locked' ? 'Locked' : 'Lock Slot'}</span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="xs"
                    variant="champagne"
                    onClick={() => navigate('/talent')}
                    className="gap-1.5 font-semibold text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Match from Talent Pool</span>
                  </Button>
                )}
              </div>

              {/* Assigned Candidate Card */}
              {slot.assignedCandidate ? (
                <div className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm font-display">{slot.assignedCandidate.name}</span>
                      <Badge variant="champagne" size="sm">{slot.assignedCandidate.stamp}</Badge>
                    </div>
                    <div className="text-slate-600 dark:text-zinc-400">
                      Past Project Experience: <strong className="text-slate-800 dark:text-zinc-200 font-medium">{slot.assignedCandidate.clientExp}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-white text-sm tabular-nums font-display">{slot.assignedCandidate.rate}</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Availability Confirmed Oct 01</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-[8px] border border-dashed border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Unallocated discipline gap. Mobilization milestone blocked.</span>
                  </div>
                  <span className="font-semibold tabular-nums text-xs">Deficit: 1 position</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
