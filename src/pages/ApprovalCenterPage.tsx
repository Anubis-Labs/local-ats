import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  DollarSign,
  Briefcase,
  AlertTriangle,
  User,
  ShieldCheck,
  ChevronRight,
  Send,
  Check
} from 'lucide-react';
import { Badge, Button, Input, Modal, Textarea, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface ApprovalItem {
  id: string;
  type: 'offer' | 'requisition' | 'salary_exception';
  title: string;
  requester: string;
  candidateOrJob: string;
  department: string;
  amountOrBand: string;
  details: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const ApprovalCenterPage: React.FC = () => {
  const [approvals, setApprovals] = useState<ApprovalItem[]>([
    {
      id: 'appr-01',
      type: 'offer',
      title: 'Formal Offer Letter Approval',
      requester: 'Sarah Jenkins (Lead Recruiter)',
      candidateOrJob: 'Melissa Chen, P.Eng. (cand-002)',
      department: 'Mechanical Engineering',
      amountOrBand: '$138,000 CAD Base + 10% Performance Target',
      details: 'Target Start: Oct 1, 2026. Approved by David Tremblay. Includes $7,500 CAD relocation stipend.',
      date: 'Aug 28, 2026',
      status: 'pending'
    },
    {
      id: 'appr-02',
      type: 'requisition',
      title: 'New Requisition Headcount Authorization',
      requester: 'Elena Rostova, P.Eng. (Piping Discipline Lead)',
      candidateOrJob: 'Senior Piping Designer (Brownfield / Plant 3D)',
      department: 'Piping & Layout',
      amountOrBand: '$120,000 – $140,000 CAD',
      details: 'Projected project demand for Surmont Phase 2 expansion. Authorized replacement headcount.',
      date: 'Aug 27, 2026',
      status: 'pending'
    },
    {
      id: 'appr-03',
      type: 'salary_exception',
      title: 'Compensation Band Exemption Request (+8%)',
      requester: 'Marcus Vance (Recruiter)',
      candidateOrJob: 'Brendan Gallagher (cand-003)',
      department: 'Project Controls',
      amountOrBand: '$115,000 CAD (Band Cap: $105,000 CAD)',
      details: 'Exemption justified due to dual Primavera P6 and SAP Cost Engineering accreditation.',
      date: 'Aug 25, 2026',
      status: 'pending'
    }
  ]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAction = (id: string, newStatus: 'approved' | 'rejected', title: string) => {
    if (newStatus === 'approved') {
      sound.chime();
      toast('Sign-off Approved', `Executive approval granted for: ${title}.`, 'success');
    } else {
      sound.latch();
      toast('Request Rejected', `Sent modification notice for: ${title}.`, 'info');
    }
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. APPROVAL CENTER HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="radar-compliance" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Executive Sign-off Queue</span>
                <span className="opacity-30">•</span>
                <span>{approvals.filter((a) => a.status === 'pending').length} Pending Decisions</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Approval Center & Hiring Governance
              </h1>
            </div>
          </div>

          <Badge variant="champagne" size="sm">Hiring Manager Tier Authorized</Badge>
        </div>
      </header>

      {/* 2. APPROVAL ITEMS LIST */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-4 max-w-7xl mx-auto w-full">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-10 h-10 rounded-[8px] flex items-center justify-center font-bold text-sm shrink-0 border',
                    item.type === 'offer'
                      ? 'bg-[#8A6D3B]/20 text-[#8A6D3B] dark:text-[#d4c5a9] border-[#8A6D3B]/40'
                      : item.type === 'requisition'
                      ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40'
                      : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40'
                  )}
                >
                  {item.type === 'offer' ? <Award className="w-5 h-5" /> : item.type === 'requisition' ? <Briefcase className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{item.title}</h3>
                    <Badge variant={item.type === 'offer' ? 'champagne' : item.type === 'requisition' ? 'indigo' : 'warning'} size="sm">
                      {item.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Requester: <strong className="text-slate-800 dark:text-zinc-200">{item.requester}</strong> • {item.department} • {item.date}
                  </div>
                </div>
              </div>

              <Badge variant={item.status === 'approved' ? 'success' : item.status === 'rejected' ? 'destructive' : 'warning'} size="sm">
                {item.status.toUpperCase()}
              </Badge>
            </div>

            <div className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/[0.06] dark:border-white/10 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">{item.candidateOrJob}</span>
                <span className="font-semibold text-[#8A6D3B] dark:text-[#d4c5a9] tabular-nums">{item.amountOrBand}</span>
              </div>
              <p className="text-slate-600 dark:text-zinc-300">{item.details}</p>
            </div>

            {item.status === 'pending' && (
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06] dark:border-white/10">
                <Button
                  size="xs"
                  variant="destructive"
                  onClick={() => handleAction(item.id, 'rejected', item.title)}
                  className="font-semibold text-xs"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1" />
                  <span>Request Changes</span>
                </Button>

                <Button
                  size="xs"
                  variant="champagne"
                  onClick={() => handleAction(item.id, 'approved', item.title)}
                  className="font-semibold text-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  <span>Grant Executive Approval</span>
                </Button>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};
