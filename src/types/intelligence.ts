import { Candidate } from './candidate';

export type MatchFitLevel = 'High Match' | 'Strong Fit' | 'Moderate Fit' | 'Potential Match' | 'Gaps Detected';

export interface EvidenceCitation {
  id: string;
  sourceDoc: 'Resume' | 'Interview Scorecard' | 'Recruiter Notes' | 'Screening Answers' | 'Graph Relationships';
  section: string;
  verbatimSnippet: string;
  confidenceScore: number;
  tags?: string[];
}

export interface CandidateMatchResult {
  candidate: Candidate;
  matchScore: number; // 0 - 100
  fitLevel: MatchFitLevel;
  whyMatchedBullets: string[];
  evidenceCitations: EvidenceCitation[];
  extractedFacts: string[];
  inferredSignals: string[];
  recruiterNotesHighlights: string[];
  missingOrUnknownGaps: string[];
}

export interface NaturalLanguageQueryResult {
  query: string;
  totalFound: number;
  intentSummary: string;
  results: CandidateMatchResult[];
  suggestedFilters: {
    label: string;
    value: string;
    count: number;
  }[];
}

export interface RequirementMatchBreakdown {
  requirementId: string;
  category: 'must_have' | 'nice_to_have' | 'certification';
  requirementText: string;
  status: 'met' | 'partial' | 'unmet' | 'unknown';
  evidenceSnippet?: string;
  sourceSection?: string;
  notes?: string;
}

export interface CandidateJobMatchMatrix {
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  overallScore: number;
  fitLevel: MatchFitLevel;
  breakdown: RequirementMatchBreakdown[];
  summaryAnalysis: string;
  potentialRisks: string[];
}
