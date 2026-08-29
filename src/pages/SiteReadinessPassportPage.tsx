import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HardHat,
  Car,
  FileCheck,
  Plane,
  Clock,
  Download,
  Share2,
  RefreshCw,
  Search,
  ChevronRight
} from 'lucide-react';
import { Badge, Button, Input, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { fireStampPulse } from '../utils/confetti';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface CandidatePassport {
  id: string;
  name: string;
  discipline: string;
  targetProject: string;
  overallStatus: 'READY' | 'READY_WITH_CONDITIONS' | 'BLOCKED' | 'UNKNOWN';
  stamp: { status: 'verified' | 'expired' | 'missing'; label: string; expiry: string };
  h2sAlive: { status: 'verified' | 'expiring_soon' | 'missing'; expiry: string };
  csts2020: { status: 'verified' | 'missing'; expiry: string };
  drugScreen: { status: 'cleared' | 'pending' | 'failed'; provider: string; date: string };
  backgroundCheck: { status: 'cleared' | 'in_review'; provider: string };
  driverAbstract: { status: 'verified' | 'demerits_flagged'; demerits: number };
  workAuth: { status: 'verified'; type: string };
  siteOrientation: { status: 'completed' | 'required'; site: string };
  rotationAcceptance: { status: 'accepted' | 'declined'; rotation: string };
}

export const SiteReadinessPassportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  const [passports, setPassports] = useState<CandidatePassport[]>([
    {
      id: 'cand-001',
      name: 'Tariq Al-Mansoor, CET',
      discipline: 'Senior Piping Designer',
      targetProject: 'Surmont Phase 2 SAGD Debottlenecking',
      overallStatus: 'READY',
      stamp: { status: 'verified', label: 'ASET CET #39481 (Good Standing)', expiry: 'Dec 31, 2026' },
      h2sAlive: { status: 'verified', expiry: 'May 14, 2028' },
      csts2020: { status: 'verified', expiry: 'Lifetime (Version 2020)' },
      drugScreen: { status: 'cleared', provider: 'SureHire Calgary 12-Panel Screen', date: 'Aug 15, 2026' },
      backgroundCheck: { status: 'cleared', provider: 'Certn Canadian CPIC Clear' },
      driverAbstract: { status: 'verified', demerits: 0 },
      workAuth: { status: 'verified', type: 'Canadian Citizen' },
      siteOrientation: { status: 'completed', site: 'ConocoPhillips Surmont Site Badge #8491' },
      rotationAcceptance: { status: 'accepted', rotation: '14/14 FIFO (YYC → YMM Camp)' }
    },
    {
      id: 'cand-002',
      name: 'Melissa Chen, P.Eng.',
      discipline: 'Lead Mechanical HVAC Engineer',
      targetProject: 'Kearl Lake Extraction Expansion',
      overallStatus: 'READY_WITH_CONDITIONS',
      stamp: { status: 'verified', label: 'APEGA P.Eng. #84920 (Active)', expiry: 'Jan 31, 2027' },
      h2sAlive: { status: 'expiring_soon', expiry: 'Expires in 18 Days (Sept 15, 2026)' },
      csts2020: { status: 'verified', expiry: 'Lifetime' },
      drugScreen: { status: 'cleared', provider: 'CannAmm Edmonton Site Fit-for-Duty', date: 'Aug 20, 2026' },
      backgroundCheck: { status: 'cleared', provider: 'Certn RCMP CPIC Clear' },
      driverAbstract: { status: 'verified', demerits: 0 },
      workAuth: { status: 'verified', type: 'Canadian Citizen' },
      siteOrientation: { status: 'required', site: 'Imperial Oil Kearl Safety Module Required' },
      rotationAcceptance: { status: 'accepted', rotation: '14/14 FIFO (YEG → YMM)' }
    },
    {
      id: 'cand-003',
      name: 'Elena Rostova',
      discipline: 'Senior Piping Stress Specialist',
      targetProject: 'Heartland Petrochemical Complex',
      overallStatus: 'BLOCKED',
      stamp: { status: 'missing', label: 'APEGA P.Eng. Registration In Progress', expiry: 'Pending Board Review' },
      h2sAlive: { status: 'missing', expiry: 'Course Not Taken' },
      csts2020: { status: 'verified', expiry: 'Lifetime' },
      drugScreen: { status: 'pending', provider: 'DriverCheck Lab Screen Pending', date: 'Awaiting Results' },
      backgroundCheck: { status: 'in_review', provider: 'Certn Verification In Review' },
      driverAbstract: { status: 'demerits_flagged', demerits: 4 },
      workAuth: { status: 'verified', type: 'Permanent Resident (PR)' },
      siteOrientation: { status: 'required', site: 'Inter Pipeline Heartland Module Needed' },
      rotationAcceptance: { status: 'declined', rotation: 'Prefers Calgary Office Hybrid' }
    }
  ]);

  const filteredPassports = passports.filter((p) => {
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.discipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.targetProject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'all' || p.overallStatus === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: CandidatePassport['overallStatus']) => {
    switch (status) {
      case 'READY':
        return <Badge variant="success" size="sm" className="font-bold">READY FOR DEPLOYMENT</Badge>;
      case 'READY_WITH_CONDITIONS':
        return <Badge variant="warning" size="sm" className="font-bold">CONDITIONAL CLEARANCE</Badge>;
      case 'BLOCKED':
        return <Badge variant="destructive" size="sm" className="font-bold">DEPLOYMENT BLOCKED</Badge>;
      default:
        return <Badge variant="neutral" size="sm">UNKNOWN</Badge>;
    }
  };

  const handleExportPassport = (name: string) => {
    sound.chime();
    fireStampPulse();
    toast('Passport Exported', `Generated Site Readiness Clearance PDF for ${name}.`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. PASSPORT HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="radar-compliance" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Industrial Site Compliance</span>
                  <span className="opacity-30">•</span>
                  <span>Site Readiness Passport & Deployment Clearance</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Site Readiness Passport & Deployment Matrix
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <Input
                  placeholder="Search candidates or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10"
                />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1">
            {[
              { id: 'all', label: 'All Candidates' },
              { id: 'READY', label: 'Ready for Deployment' },
              { id: 'READY_WITH_CONDITIONS', label: 'Conditional Clearance' },
              { id: 'BLOCKED', label: 'Deployment Blocked' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.click();
                  setSelectedStatusFilter(tab.id);
                }}
                className={cn(
                  'px-3 py-1 rounded-[6px] text-xs font-semibold transition-all',
                  selectedStatusFilter === tab.id
                    ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black shadow-xs font-bold'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08]'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. PASSPORT CARDS LIST */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
        {filteredPassports.map((p) => {
          const statusTheme = p.overallStatus === 'READY'
            ? { borderTop: 'border-t-4 border-t-emerald-500', bg: 'bg-emerald-500/[0.01] dark:bg-emerald-500/[0.03]', badge: <Badge variant="success" size="sm" className="font-bold">READY FOR DEPLOYMENT</Badge> }
            : p.overallStatus === 'READY_WITH_CONDITIONS'
            ? { borderTop: 'border-t-4 border-t-amber-500', bg: 'bg-amber-500/[0.01] dark:bg-amber-500/[0.03]', badge: <Badge variant="warning" size="sm" className="font-bold">CONDITIONAL CLEARANCE</Badge> }
            : { borderTop: 'border-t-4 border-t-rose-500', bg: 'bg-rose-500/[0.01] dark:bg-rose-500/[0.03]', badge: <Badge variant="destructive" size="sm" className="font-bold">DEPLOYMENT BLOCKED</Badge> };

          return (
            <div
              key={p.id}
              className={cn(
                'p-6 rounded-[14px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-6',
                statusTheme.borderTop,
                statusTheme.bg
              )}
            >
              {/* Header / Identity Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-[8px] bg-gradient-to-br from-[#8A6D3B]/20 to-[#8A6D3B]/5 dark:from-[#d4c5a9]/20 dark:to-[#d4c5a9]/5 border border-[#8A6D3B]/30 dark:border-[#d4c5a9]/30 flex items-center justify-center font-bold text-sm text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0">
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white font-display">{p.name}</h3>
                      {statusTheme.badge}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                      Discipline: <strong className="text-slate-800 dark:text-zinc-200">{p.discipline}</strong> • Target Project:{' '}
                      <strong className="text-[#8A6D3B] dark:text-[#d4c5a9]">{p.targetProject}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="xs"
                    variant="champagne"
                    onClick={() => handleExportPassport(p.name)}
                    className="gap-1.5 font-semibold text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Site Passport</span>
                  </Button>
                  <Button
                    size="xs"
                    variant="machined"
                    onClick={() => navigate(`/candidates/${p.id}`)}
                    className="gap-1 text-xs"
                  >
                    <span>View Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Checklist Matrix Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Box 1: Statutory & Safety Tickets */}
                <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08] space-y-3">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between pb-1.5 border-b border-black/5 dark:border-white/5">
                    <span className="flex items-center gap-1.5">
                      <HardHat className="w-4 h-4 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                      <span>Statutory & Safety Tickets</span>
                    </span>
                    <Badge variant={p.stamp.status === 'verified' ? 'champagne' : 'destructive'} size="sm">
                      {p.stamp.status === 'verified' ? 'Verified' : 'Missing'}
                    </Badge>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2 p-2 rounded-[6px] bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200">Professional Stamp</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{p.stamp.label}</div>
                      </div>
                      {p.stamp.status === 'verified' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2 p-2 rounded-[6px] bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200">H2S Alive Ticket</div>
                        <div className={cn(
                          'text-[11px] font-mono mt-0.5',
                          p.h2sAlive.status === 'expiring_soon' ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500'
                        )}>
                          {p.h2sAlive.expiry}
                        </div>
                      </div>
                      {p.h2sAlive.status === 'verified' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : p.h2sAlive.status === 'expiring_soon' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2 p-2 rounded-[6px] bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200">CSTS-2020 Safety Orientation</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{p.csts2020.expiry}</div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Box 2: Background, Drug & Driving */}
                <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08] space-y-3">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between pb-1.5 border-b border-black/5 dark:border-white/5">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Occupational Screening</span>
                    </span>
                    <Badge variant={p.drugScreen.status === 'cleared' ? 'success' : 'warning'} size="sm">
                      {p.drugScreen.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2 p-2 rounded-[6px] bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200">Drug & Alcohol Fit-for-Duty</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{p.drugScreen.provider}</div>
                      </div>
                      {p.drugScreen.status === 'cleared' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2 p-2 rounded-[6px] bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200">Criminal CPIC Background</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{p.backgroundCheck.provider}</div>
                      </div>
                      {p.backgroundCheck.status === 'cleared' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2 p-2 rounded-[6px] bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200">Alberta Driver Abstract</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{p.driverAbstract.demerits} Demerit Points Flagged</div>
                      </div>
                      {p.driverAbstract.status === 'verified' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Box 3: Logistics, Camp & Site Badge */}
                <div className="p-4 rounded-[10px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08] space-y-3">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between pb-1.5 border-b border-black/5 dark:border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Plane className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span>Site Logistics & Rotation</span>
                    </span>
                    <Badge variant={p.siteOrientation.status === 'completed' ? 'success' : 'neutral'} size="sm">
                      {p.siteOrientation.status === 'completed' ? 'Badged' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2 p-2 rounded-[6px] bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200">Work Authorization</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{p.workAuth.type}</div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>

                    <div className="flex items-start justify-between gap-2 p-2 rounded-[6px] bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200">Site Specific Orientation</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{p.siteOrientation.site}</div>
                      </div>
                      {p.siteOrientation.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2 p-2 rounded-[6px] bg-white dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200">FIFO Rotation Acceptance</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{p.rotationAcceptance.rotation}</div>
                      </div>
                      {p.rotationAcceptance.status === 'accepted' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};
