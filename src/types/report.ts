export interface FunnelStageMetric {
  stage: string;
  count: number;
  conversionRate: number; // percentage
  avgDaysInStage: number;
}

export interface TimeToHireMetric {
  jobTitle: string;
  department: string;
  avgDays: number;
  benchmarkDays: number;
  hiresCount: number;
}

export interface SourceEffectivenessMetric {
  source: string;
  applicants: number;
  interviews: number;
  offers: number;
  hires: number;
  hireRate: number; // percentage
}

export interface RecruiterActivityMetric {
  recruiterName: string;
  activeCandidates: number;
  interviewsConducted: number;
  offersExtended: number;
  hiresMade: number;
  avgResponseTimeHours: number;
}

export interface PipelineHealthReport {
  totalActiveCandidates: number;
  totalOpenJobs: number;
  stalledCandidatesCount: number;
  interviewsThisWeek: number;
  offersPendingCount: number;
  funnel: FunnelStageMetric[];
  timeToHire: TimeToHireMetric[];
  sourceEffectiveness: SourceEffectivenessMetric[];
  recruiterActivity: RecruiterActivityMetric[];
}
