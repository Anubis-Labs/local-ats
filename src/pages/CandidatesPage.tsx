import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Plus,
  Scale,
  Sparkles,
  ChevronRight,
  MapPin,
  Clock,
  ArrowUpDown,
  FileSpreadsheet,
  Layers,
  AlertTriangle,
  Award,
  CheckCircle2,
  Trash2,
  BookmarkCheck,
  Send,
  Star,
  Download,
  Check
} from 'lucide-react';
import { candidateService } from '../services/candidateService';
import { jobService } from '../services/jobService';
import { mockCandidates } from '../mock/candidatesData';
import { mockJobs } from '../mock/jobsData';
import { Candidate, PipelineStageId } from '../types/candidate';
import { Job } from '../types/job';
import { Badge, Button, Input, Card, RatingStars, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [stalledOnly, setStalledOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<'rating' | 'experienceYears' | 'name'>('rating');
  const [sortAsc, setSortAsc] = useState(false);
  const [hoveredCandidate, setHoveredCandidate] = useState<Candidate | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const loadData = async () => {
    const [cList, jList] = await Promise.all([
      candidateService.getCandidates({
        jobId: selectedJob !== 'all' ? selectedJob : undefined,
        stage: selectedStage !== 'all' ? (selectedStage as any) : undefined,
        stalledOnly: stalledOnly || undefined
      }),
      jobService.getJobs({ status: 'active' })
    ]);
    setCandidates(cList);
    setJobs(jList);
  };

  useEffect(() => {
    loadData();
  }, [selectedJob, selectedStage, stalledOnly]);

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.click();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    sound.latch();
    if (selectedIds.size === sortedCandidates.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedCandidates.map((c) => c.id)));
    }
  };

  const handleBulkStageChange = async (newStage: PipelineStageId) => {
    sound.chime();
    for (const id of Array.from(selectedIds)) {
      await candidateService.updateStage(id, newStage);
    }
    toast('Bulk Stage Updated', `Moved ${selectedIds.size} candidates to ${newStage.replace('_', ' ')}.`, 'success');
    setSelectedIds(new Set());
    loadData();
  };

  const handleBulkAddToTalentPool = () => {
    sound.chime();
    toast('Added to Reserves', `${selectedIds.size} candidates added to Talent Pool benchmark.`, 'success');
    setSelectedIds(new Set());
  };

  const handleExportCSV = () => {
    sound.chime();
    const selected = candidates.filter((c) => selectedIds.has(c.id));
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Role,Company,Location,Stage,TargetComp,Rating,Email"]
      .concat(selected.map(c => `"${c.name}","${c.currentRole}","${c.currentCompany}","${c.location}","${c.stage}","${c.compensationExpectation || '$120k'}","${c.rating}","${c.email}"`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `local_ats_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast('CSV Exported', `Exported ${selected.length} dossiers to CSV.`, 'success');
  };

  const handleBulkCompare = () => {
    sound.click();
    if (selectedIds.size < 2) {
      toast('Select More Candidates', 'Please select at least 2 candidates to compare.', 'warning');
      return;
    }
    navigate(`/compare?ids=${Array.from(selectedIds).join(',')}`);
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.currentCompany.toLowerCase().includes(q) ||
        c.currentRole.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [candidates, searchQuery]);

  const sortedCandidates = useMemo(() => {
    return [...filteredCandidates].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
      }
      return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [filteredCandidates, sortField, sortAsc]);

  const handleSort = (field: 'rating' | 'experienceYears' | 'name') => {
    sound.click();
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT CANDIDATES HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <Users className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Candidate Directory</span>
                  <span className="opacity-30">•</span>
                  <span>{candidates.length} Profiles Tracked</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Candidate Dossier Index
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button size="xs" variant="champagne" onClick={() => navigate('/import')} className="gap-1.5 font-semibold text-xs">
                <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" strokeWidth={2} />
                <span>Intake Candidate</span>
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-2.5" strokeWidth={2} />
            <Input
              placeholder="Filter by name, employer, or skill (e.g. SAGD, Plant 3D)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <select
            value={selectedJob}
            onChange={(e) => {
              sound.click();
              setSelectedJob(e.target.value);
            }}
            className="h-8 px-3 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none shadow-2xs"
          >
            <option value="all">All Requisitions</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>

          <select
            value={selectedStage}
            onChange={(e) => {
              sound.click();
              setSelectedStage(e.target.value);
            }}
            className="h-8 px-3 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none shadow-2xs"
          >
            <option value="all">All Stages</option>
            <option value="new">New</option>
            <option value="review">Under Review</option>
            <option value="phone_screen">Phone Screen</option>
            <option value="interview">Technical Panel</option>
            <option value="final_interview">Final Round</option>
            <option value="offer">Offer</option>
            <option value="hired">Hired</option>
          </select>

          <button
            onClick={() => {
              sound.click();
              setStalledOnly(!stalledOnly);
            }}
            className={cn(
              'h-8 px-3 rounded-[6px] text-xs font-semibold flex items-center gap-1.5 transition-colors border',
              stalledOnly
                ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
                : 'bg-white dark:bg-[#12151D] text-slate-600 dark:text-zinc-400 border-black/10 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
            )}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Stalled Records</span>
          </button>
        </div>

        {/* Dynamic Bulk Action Bar */}
        {selectedIds.size > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-[#8A6D3B]/30 dark:border-[#d4c5a9]/30 bg-amber-50/70 dark:bg-[#9e8557]/10 p-2.5 rounded-[8px] animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8A6D3B] dark:text-[#d4c5a9]">
              <Check className="w-4 h-4" />
              <span>{selectedIds.size} Candidates Selected</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedIds.size >= 2 && (
                <Button size="xs" variant="champagne" onClick={handleBulkCompare} className="gap-1 font-semibold text-xs">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare ({selectedIds.size})</span>
                </Button>
              )}

              <select
                onChange={(e) => {
                  if (e.target.value) handleBulkStageChange(e.target.value as PipelineStageId);
                }}
                defaultValue=""
                className="h-7 px-2.5 rounded-[5px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="" disabled>Move Stage...</option>
                <option value="review">Under Review</option>
                <option value="phone_screen">Phone Screen</option>
                <option value="interview">Technical Panel</option>
                <option value="offer">Offer Extended</option>
                <option value="archived">Talent Pool Bench</option>
              </select>

              <Button size="xs" variant="machined" onClick={handleBulkAddToTalentPool} className="gap-1 font-semibold text-xs">
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Add to Talent Pool</span>
              </Button>

              <Button size="xs" variant="machined" onClick={handleExportCSV} className="gap-1 font-semibold text-xs">
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </Button>

              <button
                onClick={() => setSelectedIds(new Set())}
                className="text-xs text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white underline ml-1"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. TABLE CANVAS WITH RICH CAD BACKGROUND & RIGHT INSPECTOR */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* Table Canvas */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          <div className="rounded-[12px] overflow-hidden bg-white dark:bg-[#12151D] shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-black/60 border-b border-black/[0.08] dark:border-white/10 text-[11px] uppercase font-bold text-slate-700 dark:text-zinc-300 tracking-wider select-none">
                  <th className="py-3.5 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === sortedCandidates.length && sortedCandidates.length > 0}
                      onChange={toggleSelectAll}
                      className="h-3.5 w-3.5 rounded border-black/20 dark:border-white/20 bg-white dark:bg-[#12151D] text-[#8A6D3B] dark:text-[#d4c5a9] cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4 cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1.5">
                      <span>Candidate Dossier</span>
                      <ArrowUpDown className="w-3 h-3 opacity-50" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">Active Requisition</th>
                  <th className="py-3.5 px-4 cursor-pointer" onClick={() => handleSort('experienceYears')}>
                    <div className="flex items-center gap-1.5">
                      <span>Exp & Location</span>
                      <ArrowUpDown className="w-3 h-3 opacity-50" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-4 cursor-pointer text-right" onClick={() => handleSort('rating')}>
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Fit Score</span>
                      <ArrowUpDown className="w-3 h-3 opacity-50" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                {sortedCandidates.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => {
                      sound.click();
                      navigate(`/candidates/${c.id}`);
                    }}
                    onMouseEnter={() => setHoveredCandidate(c)}
                    className="hover:bg-amber-50/60 dark:hover:bg-white/[0.04] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4" onClick={(e) => toggleSelect(c.id, e)}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(c.id)}
                        onChange={() => {}}
                        className="h-3.5 w-3.5 rounded border-black/20 dark:border-white/20 bg-white dark:bg-[#12151D] text-[#8A6D3B] dark:text-[#d4c5a9] cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[7px] bg-[#242834] text-[#d4c5a9] border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                          {c.avatar ? (
                            <img
                              src={c.avatar}
                              alt={c.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <span>{c.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white group-hover:text-[#8A6D3B] dark:group-hover:text-[#d4c5a9] transition-colors flex items-center gap-2 font-display text-sm">
                            <span>{c.name}</span>
                            {c.stalledWarning && (
                              <Badge variant="warning" size="sm">Stalled 8d</Badge>
                            )}
                          </div>
                          <div className="text-[12px] text-slate-500 dark:text-zinc-400 mt-0.5">
                            {c.currentRole} • <span className="font-medium text-slate-700 dark:text-zinc-300">{c.currentCompany}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-slate-800 dark:text-zinc-200 font-medium truncate max-w-[200px] text-xs">
                        {c.jobTitle || 'General Sourcing'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-slate-900 dark:text-white font-medium tabular-nums text-xs">{c.experienceYears} years</div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400">{c.location}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          c.stage === 'offer' || c.stage === 'hired'
                            ? 'champagne'
                            : c.stage === 'interview' || c.stage === 'final_interview'
                            ? 'indigo'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {c.stage.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="font-semibold text-sm text-[#8A6D3B] dark:text-[#d4c5a9] tabular-nums font-display">
                        {Math.round(c.rating * 20)}% Match
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400 tabular-nums">
                        {c.compensationExpectation || '$120,000 / year'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
