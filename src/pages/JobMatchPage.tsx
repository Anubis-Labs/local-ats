import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { jobService } from '../services/jobService';
import { candidateService } from '../services/candidateService';
import { intelligenceService } from '../services/intelligenceService';
import { Job } from '../types/job';
import { Candidate } from '../types/candidate';
import { CandidateJobMatchMatrix } from '../types/intelligence';
import { Badge, Button, Card, RatingStars } from '../components/ui';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const JobMatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandId, setSelectedCandId] = useState<string | null>(null);
  const [matchMatrix, setMatchMatrix] = useState<CandidateJobMatchMatrix | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const [j, cList] = await Promise.all([
        jobService.getJobById(id),
        candidateService.getCandidates()
      ]);
      if (j) setJob(j);
      setCandidates(cList);
      if (cList.length > 0) {
        setSelectedCandId(cList[0].id);
        const matrix = await intelligenceService.getCandidateJobMatch(id, cList[0].id);
        setMatchMatrix(matrix);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleSelectCandidate = async (candId: string) => {
    if (!job) return;
    setSelectedCandId(candId);
    setLoading(true);
    const matrix = await intelligenceService.getCandidateJobMatch(job.id, candId);
    setMatchMatrix(matrix);
    setLoading(false);
  };

  if (!job) return <div className="p-8 text-center text-slate-400 text-xs">Loading match matrix...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="analytics-harmonics" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="p-1.5 rounded-[6px] text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Requirement Coverage Matrix</span>
                  <span className="opacity-30">•</span>
                  <span>{job.title}</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Candidate Match Matrix
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6 w-full">

      {/* Split: Candidate Selector on Left, Match Coverage on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card chamfer className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          <div className="p-3 font-semibold text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-[10px]">
            Candidate Pool ({candidates.length})
          </div>
          <div className="max-h-[500px] overflow-y-auto divide-y divide-black/[0.03] dark:divide-white/[0.04]">
            {candidates.map((c) => {
              const isSelected = selectedCandId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCandidate(c.id)}
                  className={`p-3 cursor-pointer transition-colors text-xs flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#9e8557]/10 dark:bg-[#d4c5a9]/10 font-semibold'
                      : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <div>
                    <div className="text-slate-900 dark:text-white">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.currentCompany}</div>
                  </div>
                  <RatingStars rating={c.rating} />
                </div>
              );
            })}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {matchMatrix && (
            <Card chamfer glint="champagne" className="p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.05]">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {matchMatrix.candidateName} vs {matchMatrix.jobTitle}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    {matchMatrix.summaryAnalysis}
                  </div>
                </div>
                <Badge variant="champagne" size="md">
                  {matchMatrix.overallScore}% Coverage
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="font-semibold text-xs uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  Requirement Evaluations ({matchMatrix.breakdown.length})
                </div>

                <div className="space-y-2">
                  {matchMatrix.breakdown.map((ev) => (
                    <div
                      key={ev.requirementId}
                      className="p-3 rounded-[6px] bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white">{ev.requirementText}</span>
                        <Badge
                          variant={ev.status === 'met' ? 'success' : ev.status === 'partial' ? 'warning' : 'destructive'}
                          size="sm"
                        >
                          {ev.status}
                        </Badge>
                      </div>
                      <p className="text-slate-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                        {ev.notes || ev.status}
                      </p>
                      {ev.evidenceSnippet && (
                        <div className="text-[10px] text-slate-500 dark:text-zinc-400 italic pt-1 border-t border-black/[0.03] dark:border-white/[0.04]">
                          "{ev.evidenceSnippet}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};
