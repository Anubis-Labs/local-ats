import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Inbox,
  Search,
  Filter,
  CheckSquare,
  ArrowRight,
  User,
  Briefcase,
  Calendar,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ChevronRight,
  Send,
  MoreVertical,
  CheckCircle2,
  XCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import { mockApplications } from '../mock/applicationsData';
import { Application, ApplicationStage } from '../types/application';
import { Badge, Button, Input, Modal, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [showDispositionModal, setShowDispositionModal] = useState(false);
  const [targetAppForDisposition, setTargetAppForDisposition] = useState<Application | null>(null);
  const [dispositionReason, setDispositionReason] = useState<string>('unqualified_technical');
  const [dispositionNotes, setDispositionNotes] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectAll = () => {
    if (selectedIds.length === applications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(applications.map((a) => a.id));
    }
  };

  const handleToggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.pop();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAdvanceStage = (app: Application, nextStage: ApplicationStage, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.latch();
    setApplications((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, stage: nextStage, lastActivityAt: new Date().toISOString() } : a))
    );
    toast('Stage Advanced', `Moved ${app.candidateName} to ${nextStage.replace('_', ' ')}.`, 'success');
  };

  const handleOpenDisposition = (app: Application, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.glass();
    setTargetAppForDisposition(app);
    setShowDispositionModal(true);
  };

  const handleConfirmDisposition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAppForDisposition) return;
    sound.latch();
    setApplications((prev) =>
      prev.map((a) =>
        a.id === targetAppForDisposition.id
          ? {
              ...a,
              stage: 'dispositioned',
              status: 'dispositioned',
              disposition: {
                reason: dispositionReason as any,
                comment: dispositionNotes || 'Structured disposition during triage',
                date: new Date().toISOString(),
                dispositionedBy: 'Sarah Jenkins'
              }
            }
          : a
      )
    );
    setShowDispositionModal(false);
    toast('Application Dispositioned', `${targetAppForDisposition.candidateName} archived for this requisition.`, 'info');
  };

  const filteredApplications = applications.filter((app) => {
    const matchesStage = stageFilter === 'all' || app.stage === stageFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const stageCounts = {
    all: applications.length,
    inbox: applications.filter((a) => a.stage === 'inbox').length,
    screen: applications.filter((a) => a.stage === 'screen').length,
    technical_panel: applications.filter((a) => a.stage === 'technical_panel').length,
    offer_extended: applications.filter((a) => a.stage === 'offer_extended').length,
    dispositioned: applications.filter((a) => a.stage === 'dispositioned').length
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. STICKY APPLICATION INBOX HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="pipeline-velocity" opacity="opacity-40 dark:opacity-25" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <Inbox className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Application Workflow Hub</span>
                  <span className="opacity-30">•</span>
                  <span>Multi-Job slate triage</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Applications & Inbound Triage Inbox
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                size="xs"
                variant="machined"
                onClick={() => {
                  sound.click();
                  navigate('/duplicates');
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Duplicate Resolver</span>
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
                <Briefcase className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                <span>New Requisition</span>
              </Button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-2.5" />
              <Input
                placeholder="Search by candidate name, job title, or discipline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-8 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { id: 'all', label: `All Applications (${stageCounts.all})` },
                { id: 'inbox', label: `Unreviewed Inbox (${stageCounts.inbox})` },
                { id: 'screen', label: `Screening (${stageCounts.screen})` },
                { id: 'technical_panel', label: `Technical Panel (${stageCounts.technical_panel})` },
                { id: 'offer_extended', label: `Offer Stage (${stageCounts.offer_extended})` },
                { id: 'dispositioned', label: `Dispositioned (${stageCounts.dispositioned})` }
              ].map((stg) => (
                <button
                  key={stg.id}
                  onClick={() => {
                    sound.click();
                    setStageFilter(stg.id);
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-all whitespace-nowrap',
                    stageFilter === stg.id
                      ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black shadow-xs'
                      : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08]'
                  )}
                >
                  {stg.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN APPLICATION TABLE */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Bulk Toolbar */}
        {selectedIds.length > 0 && (
          <div className="p-3 rounded-[9px] bg-amber-50 dark:bg-[#1E1B15] border border-amber-300 dark:border-[#d4c5a9]/30 flex items-center justify-between shadow-sm animate-in fade-in">
            <span className="font-bold text-xs text-amber-900 dark:text-[#d4c5a9]">
              {selectedIds.length} Applications Selected
            </span>
            <div className="flex items-center gap-2">
              <Button size="xs" variant="machined" onClick={() => setSelectedIds([])} className="text-xs">
                Clear
              </Button>
              <Button size="xs" variant="champagne" onClick={() => toast('Bulk Triage', `Advanced ${selectedIds.length} applications to Technical Review.`, 'success')} className="text-xs">
                Advance Selected to Review
              </Button>
            </div>
          </div>
        )}

        <div className="rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 overflow-hidden shadow-sm specimen-chamfer">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-black/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-black/40 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === applications.length && applications.length > 0}
                    onChange={handleSelectAll}
                    className="rounded text-[#8A6D3B] focus:ring-0"
                  />
                </th>
                <th className="p-3.5">Candidate / Profile</th>
                <th className="p-3.5">Target Requisition</th>
                <th className="p-3.5">Fit Score</th>
                <th className="p-3.5">Application Stage</th>
                <th className="p-3.5">Source & Details</th>
                <th className="p-3.5">Hiring Manager</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
              {filteredApplications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => {
                    sound.click();
                    navigate(`/applications/${app.id}`);
                  }}
                  className="hover:bg-slate-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="p-3.5 text-center" onClick={(e) => handleToggleSelect(app.id, e)}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(app.id)}
                      onChange={() => {}}
                      className="rounded text-[#8A6D3B] focus:ring-0"
                    />
                  </td>

                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#8A6D3B]/20 text-[#8A6D3B] dark:text-[#d4c5a9] font-bold text-xs flex items-center justify-center border border-[#8A6D3B]/30">
                        {app.candidateName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">{app.candidateName}</div>
                        <div className="text-[10px] text-slate-400 dark:text-zinc-500">{app.candidateEmail}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800 dark:text-zinc-200 text-xs">{app.jobTitle}</div>
                    <div className="text-[10px] text-slate-400 dark:text-zinc-500">{app.department} • {app.location}</div>
                  </td>

                  <td className="p-3.5">
                    <span className={cn(
                      'px-2 py-0.5 rounded-[4px] font-mono text-[11px] font-bold',
                      app.fitScore >= 90
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
                    )}>
                      {app.fitScore}% Fit
                    </span>
                  </td>

                  <td className="p-3.5">
                    <Badge
                      variant={
                        app.stage === 'offer_extended'
                          ? 'champagne'
                          : app.stage === 'dispositioned'
                          ? 'neutral'
                          : app.stage === 'technical_panel'
                          ? 'indigo'
                          : 'outline'
                      }
                      size="sm"
                    >
                      {app.stage.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </td>

                  <td className="p-3.5">
                    <div className="text-xs text-slate-700 dark:text-zinc-300 capitalize font-medium">{app.source.replace('_', ' ')}</div>
                    {app.sourceDetails && (
                      <div className="text-[10px] text-slate-400 dark:text-zinc-500 truncate max-w-[140px]">{app.sourceDetails}</div>
                    )}
                  </td>

                  <td className="p-3.5">
                    <div className="text-xs text-slate-700 dark:text-zinc-300 font-medium">{app.hiringManager}</div>
                    <div className="text-[10px] text-slate-400 dark:text-zinc-500">Owner: {app.assignedRecruiter}</div>
                  </td>

                  <td className="p-3.5 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                    {app.stage === 'inbox' && (
                      <Button
                        size="xs"
                        variant="champagne"
                        onClick={(e) => handleAdvanceStage(app, 'screen', e)}
                        className="text-[10px] h-6 px-2 font-semibold"
                      >
                        Accept & Screen
                      </Button>
                    )}

                    {app.stage !== 'dispositioned' && (
                      <Button
                        size="xs"
                        variant="machined"
                        onClick={(e) => handleOpenDisposition(app, e)}
                        className="text-[10px] h-6 px-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      >
                        Disposition
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* 3. DISPOSITION MODAL */}
      {targetAppForDisposition && (
        <Modal
          isOpen={showDispositionModal}
          onClose={() => setShowDispositionModal(false)}
          title={`Disposition ${targetAppForDisposition.candidateName}`}
          subtitle={`Structured reason code for requisition: ${targetAppForDisposition.jobTitle}`}
          maxWidth="md"
        >
          <form onSubmit={handleConfirmDisposition} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Structured Reason Code</label>
              <select
                value={dispositionReason}
                onChange={(e) => setDispositionReason(e.target.value)}
                className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-semibold"
              >
                <option value="unqualified_technical">Unqualified (Does not meet required CAD / Stamp credentials)</option>
                <option value="compensation_mismatch">Compensation Mismatch (Exceeds salary budget band)</option>
                <option value="declined_offer">Candidate Declined Offer</option>
                <option value="hired_elsewhere">Hired Elsewhere / Accepted Competing Offer</option>
                <option value="withdrawn_by_candidate">Withdrawn by Candidate</option>
                <option value="failed_safety_compliance">Failed Site Safety Ticket / Drug & Alcohol Screen</option>
                <option value="future_talent_pool">Routed to Future Talent Pool Bench</option>
                <option value="duplicate_application">Duplicate Application Record</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Internal Audit Notes</label>
              <Input
                placeholder="Specific context for future EPCM recruiters..."
                value={dispositionNotes}
                onChange={(e) => setDispositionNotes(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
              <Button size="sm" variant="ghost" type="button" onClick={() => setShowDispositionModal(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="destructive" type="submit" className="font-semibold">
                Confirm Disposition & Archive
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
