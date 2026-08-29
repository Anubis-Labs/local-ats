import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Award,
  ChevronRight,
  Filter,
  FileText,
  Building,
  MapPin,
  Clock
} from 'lucide-react';
import { mockCandidates } from '../mock/candidatesData';
import { Candidate } from '../types/candidate';
import { Badge, Button, Input, Card, RatingStars, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface MatchResult {
  candidate: Candidate;
  matchScore: number;
  whyMatchedBullets: string[];
  evidenceSnippets: {
    section: string;
    text: string;
    confidence: number;
  }[];
}

const SAMPLE_QUERIES = [
  'Find mechanical designers with brownfield experience, Plant 3D and Alberta project history.',
  'Need an intermediate piping designer in Calgary with EPCM experience and SAGD or heavy-oil exposure.',
  'Show candidates we interviewed before who were rejected for compensation rather than technical reasons.',
  'Who has worked with people already on this hiring team?',
  'Experienced P.Eng. with industrial HVAC central plant design and APEGA license in Edmonton.'
];

export const IntelligencePage: React.FC = () => {
  const [query, setQuery] = useState(SAMPLE_QUERIES[0]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([
    {
      candidate: mockCandidates[0],
      matchScore: 99,
      whyMatchedBullets: [
        'Demonstrated mastery of AutoCAD Plant 3D modeling',
        'Deep brownfield revamps & laser scan tie-in history',
        'Based in Alberta with local EPCM contractor background',
        'Direct heavy oil & SAGD central processing plant exposure'
      ],
      evidenceSnippets: [
        {
          section: 'Experience - Fluor Canada',
          text: 'Lead piping designer for ConocoPhillips Surmont SAGD facility brownfield optimization project. Handled 3D modeling of 40+ tie-ins, point cloud clash resolution in Navisworks, and isometric fabrication checks.',
          confidence: 98
        },
        {
          section: 'Experience - Worley',
          text: 'Designed piping routing, valve accessibility, and equipment arrangements for Fort Hills oil sands extraction plant.',
          confidence: 95
        },
        {
          section: 'Certifications',
          text: 'Certified Engineering Technologist (CET), ASET (2018)',
          confidence: 100
        }
      ]
    },
    {
      candidate: mockCandidates[2],
      matchScore: 93,
      whyMatchedBullets: [
        'Strong CADWorx and Plant 3D design proficiency',
        'Direct experience with Alberta EPCMs (Jacobs)',
        'Brownfield revamp and tie-in fabrication drawing production',
        'Competitive target compensation band ($115k CAD)'
      ],
      evidenceSnippets: [
        {
          section: 'Experience - Jacobs',
          text: 'Piping designer for Suncor Millennium revamp project. Created equipment layout drawings, piping models, and isometrics using CADWorx.',
          confidence: 94
        },
        {
          section: 'Recruiter Assessment',
          text: 'High technical scoring candidate previously archived due to salary delta, now aligned with revised requisition budget.',
          confidence: 90
        }
      ]
    }
  ]);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleExecuteSearch = (customQ?: string) => {
    const activeQ = customQ || query;
    if (!activeQ.trim()) return;

    sound.chime();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast('Search Complete', `Retrieved grounded candidates matching criteria.`, 'success');
    }, 450);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT INTELLIGENCE HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="analytics-harmonics" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Intelligence Workspace</span>
                  <span className="opacity-30">•</span>
                  <span>Deterministic Natural Language Retrieval</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Candidate Retrieval & Match Evidence
                </h1>
              </div>
            </div>
          </div>

          {/* Investigative Query Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleExecuteSearch();
            }}
            className="flex gap-2 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-2.5" strokeWidth={2} />
              <Input
                placeholder="e.g. Find piping designers with brownfield SAGD experience..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500"
              />
            </div>
            <Button type="submit" size="xs" variant="champagne" loading={loading} className="px-4 font-semibold text-xs h-9">
              <Sparkles className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" strokeWidth={2} />
              <span>Search Intelligence</span>
            </Button>
          </form>

          {/* Sample Query Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 relative z-1">
            <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-zinc-500 mr-1">Suggested:</span>
            {SAMPLE_QUERIES.map((sq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sound.click();
                  setQuery(sq);
                  handleExecuteSearch(sq);
                }}
                className="text-[11px] px-2.5 py-1 rounded-[6px] bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-black/[0.08] dark:border-white/[0.08] transition-colors"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MATCH RESULTS WITH EVIDENCE CITATIONS */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
            Found <strong className="text-slate-900 dark:text-white">{results.length * 6} ranked candidates</strong> matching query intent
          </div>
        </div>

        <div className="space-y-6">
          {results.map((match, idx) => {
            const isTopMatch = idx === 0;

            return (
              <div
                key={match.candidate.id}
                className={cn(
                  'rounded-[12px] p-6 space-y-5 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer',
                  isTopMatch ? 'bg-amber-50/40 dark:bg-[#8A6D3B]/10' : 'bg-white dark:bg-[#12151D]'
                )}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/10">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={match.candidate.avatar}
                      alt={match.candidate.name}
                      className="w-12 h-12 rounded-[9px] object-cover border border-black/10 dark:border-white/15 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">{match.candidate.name}</h3>
                        <Badge variant={isTopMatch ? 'champagne' : 'neutral'} size="sm">
                          {match.matchScore}% Match
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5 font-medium">
                        {match.candidate.currentRole} • {match.candidate.currentCompany} ({match.candidate.experienceYears}y exp)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="xs"
                      variant="champagne"
                      onClick={() => {
                        sound.click();
                        navigate(`/candidates/${match.candidate.id}`);
                      }}
                      className="font-semibold text-xs"
                    >
                      <span>Open Dossier →</span>
                    </Button>
                  </div>
                </div>

                {/* Grounded AI Bullets */}
                <div className="space-y-1.5 bg-slate-50 dark:bg-black/40 p-3.5 rounded-[8px] border border-black/[0.06] dark:border-white/10">
                  {match.whyMatchedBullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Evidence Excerpts */}
                <div className="space-y-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Cited Evidence Excerpts ({match.evidenceSnippets.length})</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {match.evidenceSnippets.map((snip, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-[8px] bg-slate-100/60 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08] space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            {snip.section}
                          </span>
                          <span className="text-slate-500 dark:text-zinc-400 text-[10px] tabular-nums">{snip.confidence}% Confidence</span>
                        </div>
                        <p className="text-slate-700 dark:text-zinc-300 italic text-[11px] leading-relaxed">
                          "{snip.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
