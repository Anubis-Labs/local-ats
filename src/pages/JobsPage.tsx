import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Search,
  Plus,
  ChevronRight
} from 'lucide-react';
import { jobService } from '../services/jobService';
import { mockJobs } from '../mock/jobsData';
import { Job } from '../types/job';
import { Badge, Button, Input, Textarea, Modal, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { fireStampPulse } from '../utils/confetti';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Requisition Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDepartment, setNewDepartment] = useState('Piping & Mechanical');
  const [newLocation, setNewLocation] = useState('Calgary, AB (Hybrid)');
  const [newTargetHires, setNewTargetHires] = useState(1);
  const [newSalaryRange, setNewSalaryRange] = useState('$120,000 - $145,000 CAD');
  const [newPriority, setNewPriority] = useState<Job['priority']>('high');
  const [newHiringManager, setNewHiringManager] = useState('Elena Rostova, P.Eng.');
  const [newDescription, setNewDescription] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  const loadJobs = async () => {
    const data = await jobService.getJobs({
      status: statusFilter !== 'all' ? (statusFilter as any) : undefined
    });
    setJobs(data);
  };

  useEffect(() => {
    loadJobs();
  }, [statusFilter]);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    sound.chime();
    const created = await jobService.createJob({
      title: newTitle,
      department: newDepartment,
      location: newLocation,
      type: 'Full-time',
      status: 'active',
      hiringManager: newHiringManager,
      recruiterOwner: 'Sarah Jenkins',
      targetHires: newTargetHires,
      hiresCount: 0,
      applicantsCount: 1,
      inProcessCount: 0,
      priority: newPriority,
      openedAt: new Date().toISOString(),
      salaryRange: newSalaryRange,
      description: newDescription || `${newTitle} for heavy industrial EPCM brownfield expansions.`,
      requirements: [
        {
          id: `req-${Date.now()}-1`,
          category: 'must_have',
          label: 'EPCM Experience',
          description: 'Minimum 5+ years in heavy industrial engineering projects in Western Canada.',
          keywords: ['EPCM', 'Engineering', 'Canada']
        },
        {
          id: `req-${Date.now()}-2`,
          category: 'must_have',
          label: '3D CAD & Modeling',
          description: 'Proficiency with primary 3D modeling and laser scan tools.',
          keywords: ['3D', 'CAD']
        }
      ],
      hiringTeam: [
        {
          userId: 'usr-1',
          name: newHiringManager,
          role: 'Hiring Manager'
        }
      ]
    });

    setJobs([created, ...jobs]);
    setShowCreateModal(false);
    fireStampPulse();
    setNewTitle('');
    setNewDescription('');
    toast('Requisition Created', `Published "${created.title}" with 2 auto-configured requirements.`, 'success');
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !searchQuery.trim() ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT REQUISITION DIRECTORY HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Open Positions</span>
                  <span className="opacity-30">•</span>
                  <span>{jobs.filter((j) => j.status === 'active').length} Active Requisitions</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Requisitions & Sourcing Matrix
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                size="xs"
                variant="champagne"
                onClick={() => {
                  sound.click();
                  setShowCreateModal(true);
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" strokeWidth={2} />
                <span>New Requisition</span>
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-3 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-2.5" strokeWidth={2} />
              <Input
                placeholder="Filter by title, department, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-8 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                sound.click();
                setStatusFilter(e.target.value);
              }}
              className="h-8 px-3 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none shadow-2xs"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="closed">Filled</option>
            </select>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. REQUISITION CARDS WITH CAD & TRUSS TEXTURES */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => {
            const fillPct = Math.min(100, Math.round((job.hiresCount / (job.targetHires || 1)) * 100));

            return (
              <div
                key={job.id}
                onClick={() => {
                  sound.click();
                  navigate(`/jobs/${job.id}`);
                }}
                className="rounded-[12px] p-6 space-y-4 shadow-sm border border-black/[0.08] dark:border-white/10 cursor-pointer hover:scale-[1.01] transition-all specimen-chamfer bg-white dark:bg-[#12151D] group"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-[#8A6D3B] dark:group-hover:text-[#d4c5a9] transition-colors">
                        {job.title}
                      </h3>
                      <Badge variant={job.priority === 'urgent' ? 'destructive' : 'champagne'} size="sm">
                        {job.priority}
                      </Badge>
                      <Badge variant={job.status === 'active' ? 'success' : 'neutral'} size="sm">
                        {job.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                      <strong className="text-slate-800 dark:text-zinc-200">{job.department}</strong> • {job.location} • <span className="font-mono text-[11px] text-slate-500 dark:text-zinc-400">REQ-{job.id}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-medium text-slate-500 dark:text-zinc-400">Fulfillment Rate</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums font-mono">
                      {job.hiresCount} / {job.targetHires} ({fillPct}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex">
                    <div
                      className="bg-[#8A6D3B] dark:bg-[#d4c5a9] transition-all h-full"
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                </div>

                {/* Metric Row */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/[0.06] dark:border-white/10 text-center">
                  <div className="p-2 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10">
                    <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400">Target</div>
                    <div className="font-bold font-display text-base text-slate-900 dark:text-white mt-0.5">{job.targetHires}</div>
                  </div>
                  <div className="p-2 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10">
                    <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400">In Pipeline</div>
                    <div className="font-bold font-display text-base text-[#8A6D3B] dark:text-[#d4c5a9] mt-0.5">{job.inProcessCount || 8}</div>
                  </div>
                  <div className="p-2 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/10">
                    <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400">Filled</div>
                    <div className="font-bold font-display text-base text-emerald-600 dark:text-emerald-400 mt-0.5">{job.hiresCount}</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                  <span>Manager: <strong className="text-slate-900 dark:text-white">{job.hiringManager}</strong></span>
                  <span className="font-semibold text-[#8A6D3B] dark:text-[#d4c5a9] flex items-center gap-1">
                    <span>Requisition Room</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. CREATE REQUISITION MODAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Open New Requisition"
        subtitle="Configure requisition parameters, headcount target, and engineering rubric"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Position Title</label>
            <Input
              required
              placeholder="e.g. Lead Stress Analysis Engineer (Caesar II / ASME B31.3)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Discipline Department</label>
              <select
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-medium"
              >
                <option value="Piping & Mechanical">Piping & Mechanical</option>
                <option value="Civil & Structural">Civil & Structural</option>
                <option value="Electrical & Instrumentation">Electrical & Instrumentation (E&I)</option>
                <option value="Process & Chemical">Process & Chemical</option>
                <option value="Project Controls & Estimating">Project Controls & Estimating</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Work Location</label>
              <select
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-medium"
              >
                <option value="Calgary, AB (Hybrid)">Calgary, AB (Hybrid / Downtown)</option>
                <option value="Edmonton, AB (On-site)">Edmonton, AB (On-site / Refinery)</option>
                <option value="Fort McMurray, AB (Fly-in Fly-out)">Fort McMurray, AB (FIFO / Site)</option>
                <option value="Remote (Canada)">Remote (Canada-wide)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Target Headcount</label>
              <Input
                type="number"
                min="1"
                max="20"
                value={newTargetHires}
                onChange={(e) => setNewTargetHires(Number(e.target.value))}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Priority Level</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-medium"
              >
                <option value="urgent">Urgent (Hard Gate / Critical Path)</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Standard / Backfill</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Salary Band (CAD)</label>
              <Input
                placeholder="$120,000 - $145,000 CAD"
                value={newSalaryRange}
                onChange={(e) => setNewSalaryRange(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Hiring Manager</label>
            <Input
              value={newHiringManager}
              onChange={(e) => setNewHiringManager(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Requisition Objective & Scope</label>
            <Textarea
              rows={2}
              placeholder="e.g. Lead stress analysis and pipe flexibility calculations for high-pressure steam lines on SAGD tie-in expansions."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit" className="font-semibold">
              Open & Publish Requisition
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
