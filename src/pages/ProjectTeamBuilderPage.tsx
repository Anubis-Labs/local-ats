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
import { fireFireworks, fireStampPulse } from '../utils/confetti';
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
    const target = teamSlots.find((s) => s.id === slotId);
    const willBeLocked = target?.assignedCandidate?.status !== 'locked';
    if (willBeLocked) {
      fireStampPulse();
    }
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
    fireFireworks();
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
        {/* Project KPI Command Panel */}
        <div className="p-6 rounded-[14px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer specimen-chamfer-champagne space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9]">
                <span className="font-bold">Active Capital Pursuit</span>
                <span>•</span>
                <span>Client: ConocoPhillips Canada</span>
                <span>•</span>
                <Badge variant="champagne" size="sm">Phase 2 Execution</Badge>
              </div>
              <h2 className="type-display-title text-slate-900 dark:text-white mt-1">{selectedProject}</h2>
              <div className="text-xs text-slate-600 dark:text-zinc-400 mt-1 flex items-center gap-2 flex-wrap">
                <span>Target Mobilization: <strong className="text-emerald-700 dark:text-emerald-400 font-bold">October 1, 2026</strong></span>
                <span>•</span>
                <span>Rotation: <strong className="text-slate-800 dark:text-zinc-200">14/14 FIFO (YYC/YEG → YMM)</strong></span>
                <span>•</span>
                <span>Site: <strong className="text-slate-800 dark:text-zinc-200">Surmont SAGD Central Processing Plant</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="xs" variant="machined" onClick={handleExportRoster} className="gap-1.5 font-semibold text-xs">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Export RFP Matrix</span>
              </Button>
            </div>
          </div>

          {/* 4 Colored Metric Strips */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-[10px] bg-emerald-500/[0.05] dark:bg-emerald-500/[0.08] border border-emerald-500/25 space-y-1">
              <div className="type-eyebrow text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <span>Staffing Coverage</span>
                <span className="font-bold">75%</span>
              </div>
              <div className="text-2xl font-bold font-display text-emerald-700 dark:text-emerald-400 tabular-nums">
                {assignedCount} of {totalSlots} Slots
              </div>
              <div className="w-full bg-emerald-500/20 rounded-full h-1.5 mt-1 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(assignedCount / totalSlots) * 100}%` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#8A6D3B]/[0.06] dark:bg-[#d4c5a9]/[0.08] border border-[#8A6D3B]/30 space-y-1">
              <div className="type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] flex items-center justify-between">
                <span>Committed Roster</span>
                <Lock className="w-3 h-3" />
              </div>
              <div className="text-2xl font-bold font-display text-[#8A6D3B] dark:text-[#d4c5a9] tabular-nums">
                {lockedCount} Locked
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                {totalSlots - lockedCount} slots awaiting client sign-off
              </div>
            </div>

            <div className="p-3.5 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08] space-y-1">
              <div className="type-eyebrow text-slate-500 dark:text-zinc-400">Project Annual Burn</div>
              <div className="text-2xl font-bold font-display text-slate-900 dark:text-white tabular-nums">
                $393,000 <span className="text-xs font-normal text-slate-500">CAD</span>
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                -$27k below $420k RFP budget
              </div>
            </div>

            <div className="p-3.5 rounded-[10px] bg-amber-500/[0.05] dark:bg-amber-500/[0.08] border border-amber-500/25 space-y-1">
              <div className="type-eyebrow text-amber-800 dark:text-amber-300 flex items-center justify-between">
                <span>Dispatch Window</span>
                <Clock className="w-3 h-3" />
              </div>
              <div className="text-2xl font-bold font-display text-amber-600 dark:text-amber-400 tabular-nums">
                34 Days
              </div>
              <div className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                1 critical gap requires sourcing
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Team Slot Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
            <h3 className="type-section-title text-slate-900 dark:text-white">
              Project Discipline Roster Allocation ({totalSlots} Positions)
            </h3>
            <Badge variant="champagne" size="sm">Scenario A • Optimal Cost & Experience</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamSlots.map((slot) => {
              const isPiping = slot.discipline.toLowerCase().includes('piping');
              const isMech = slot.discipline.toLowerCase().includes('mechanical');
              const isControls = slot.discipline.toLowerCase().includes('controls');

              const deptTheme = isPiping
                ? { topBorder: 'border-t-4 border-t-amber-500', bg: 'bg-amber-500/[0.02] dark:bg-amber-500/[0.03]', tagBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20' }
                : isMech
                ? { topBorder: 'border-t-4 border-t-teal-500', bg: 'bg-teal-500/[0.02] dark:bg-teal-500/[0.03]', tagBg: 'bg-teal-500/10 text-teal-800 dark:text-teal-300 border-teal-500/20' }
                : isControls
                ? { topBorder: 'border-t-4 border-t-indigo-500', bg: 'bg-indigo-500/[0.02] dark:bg-indigo-500/[0.03]', tagBg: 'bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/20' }
                : { topBorder: 'border-t-4 border-t-[#8A6D3B]', bg: 'bg-[#8A6D3B]/[0.02]', tagBg: 'bg-[#8A6D3B]/10 text-[#8A6D3B] border-[#8A6D3B]/20' };

              return (
                <div
                  key={slot.id}
                  className={cn(
                    'p-5 rounded-[12px] bg-white dark:bg-[#12151D] border shadow-sm specimen-chamfer transition-all space-y-4 flex flex-col justify-between',
                    deptTheme.topBorder,
                    deptTheme.bg,
                    slot.assignedCandidate
                      ? slot.assignedCandidate.status === 'locked'
                        ? 'border-black/[0.08] dark:border-white/10'
                        : 'border-black/[0.08] dark:border-white/10'
                      : 'border-dashed border-rose-500/40 bg-rose-500/[0.02] dark:bg-rose-500/[0.04]'
                  )}
                >
                  {/* Slot Title & Status */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="type-card-title text-slate-900 dark:text-white">{slot.roleTitle}</h4>
                          <Badge variant={slot.criticality === 'critical' ? 'destructive' : 'neutral'} size="sm">
                            {slot.criticality.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1 flex items-center gap-2">
                          <span className={cn('px-2 py-0.5 rounded text-[11px] font-semibold border', deptTheme.tagBg)}>
                            {slot.discipline}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-[11px] font-medium text-slate-700 dark:text-zinc-300">{slot.requiredRateBand}</span>
                        </div>
                      </div>

                      {slot.assignedCandidate && (
                        <Button
                          size="xs"
                          variant={slot.assignedCandidate.status === 'locked' ? 'champagne' : 'machined'}
                          onClick={() => handleToggleLock(slot.id)}
                          className="gap-1.5 font-semibold text-xs shrink-0"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>{slot.assignedCandidate.status === 'locked' ? 'Locked' : 'Lock Slot'}</span>
                        </Button>
                      )}
                    </div>

                    {/* Assigned Candidate Details or Gap Warning */}
                    {slot.assignedCandidate ? (
                      <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08] space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-[8px] bg-gradient-to-br from-[#8A6D3B]/20 to-[#8A6D3B]/5 dark:from-[#d4c5a9]/20 dark:to-[#d4c5a9]/5 border border-[#8A6D3B]/30 dark:border-[#d4c5a9]/30 flex items-center justify-center font-bold text-xs text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0">
                              {slot.assignedCandidate.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div
                                onClick={() => navigate(`/candidates/${slot.assignedCandidate!.id}`)}
                                className="font-bold text-slate-900 dark:text-white text-sm hover:text-[#8A6D3B] dark:hover:text-[#d4c5a9] cursor-pointer transition-colors"
                              >
                                {slot.assignedCandidate.name}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-zinc-400">
                                {slot.assignedCandidate.clientExp}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="font-bold font-display text-base text-[#8A6D3B] dark:text-[#d4c5a9]">
                              {slot.assignedCandidate.rate}
                            </div>
                            <Badge variant="champagne" size="sm">{slot.assignedCandidate.stamp}</Badge>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px]">
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Availability Confirmed (Oct 01)</span>
                          </span>
                          <span className="text-slate-400 dark:text-zinc-500">CSTS-2020 Valid</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-[10px] bg-rose-500/[0.04] dark:bg-rose-500/[0.08] border border-rose-500/25 space-y-3">
                        <div className="flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-400">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">Unallocated Discipline Deficit</div>
                            <div className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5">
                              Required for Caesar II pipe stress calculations and Alberta stamped review.
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-rose-500/15 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400">
                            2 Candidates in Talent Pool Match Spec
                          </span>
                          <Button
                            size="xs"
                            variant="champagne"
                            onClick={() => navigate('/talent')}
                            className="gap-1 font-semibold text-xs"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Match from Pool</span>
                          </Button>
                        </div>
                      </div>
                    )}
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
