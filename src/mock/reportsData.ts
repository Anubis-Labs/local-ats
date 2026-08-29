import { PipelineHealthReport } from '../types/report';

export const mockReportsData: PipelineHealthReport = {
  totalActiveCandidates: 58,
  totalOpenJobs: 5,
  stalledCandidatesCount: 7,
  interviewsThisWeek: 12,
  offersPendingCount: 2,
  funnel: [
    { stage: 'Applied / Ingested', count: 148, conversionRate: 100, avgDaysInStage: 2.1 },
    { stage: 'Under Review', count: 94, conversionRate: 63.5, avgDaysInStage: 3.4 },
    { stage: 'Phone Screen', count: 48, conversionRate: 51.0, avgDaysInStage: 4.8 },
    { stage: 'Technical / Panel', count: 26, conversionRate: 54.1, avgDaysInStage: 7.2 },
    { stage: 'Final Round', count: 14, conversionRate: 53.8, avgDaysInStage: 5.1 },
    { stage: 'Offer Extended', count: 6, conversionRate: 42.8, avgDaysInStage: 3.0 },
    { stage: 'Hired', count: 4, conversionRate: 66.6, avgDaysInStage: 0 }
  ],
  timeToHire: [
    { jobTitle: 'Senior Piping Designer', department: 'Piping', avgDays: 24, benchmarkDays: 32, hiresCount: 1 },
    { jobTitle: 'Lead Mechanical Engineer', department: 'Mechanical', avgDays: 31, benchmarkDays: 45, hiresCount: 1 },
    { jobTitle: 'Senior Structural Engineer', department: 'Civil/Struct', avgDays: 28, benchmarkDays: 35, hiresCount: 1 },
    { jobTitle: 'Full-Stack Developer', department: 'Product Eng', avgDays: 19, benchmarkDays: 28, hiresCount: 1 }
  ],
  sourceEffectiveness: [
    { source: 'LinkedIn Direct', applicants: 64, interviews: 18, offers: 3, hires: 2, hireRate: 3.1 },
    { source: 'Employee Referral', applicants: 18, interviews: 12, offers: 2, hires: 2, hireRate: 11.1 },
    { source: 'Direct Careers Page', applicants: 42, interviews: 8, offers: 1, hires: 0, hireRate: 0.0 },
    { source: 'Talent Pool Sourcing', applicants: 15, interviews: 7, offers: 2, hires: 1, hireRate: 6.6 },
    { source: 'Agency / Network', applicants: 9, interviews: 3, offers: 0, hires: 0, hireRate: 0.0 }
  ],
  recruiterActivity: [
    { recruiterName: 'Marcus Vance', activeCandidates: 36, interviewsConducted: 22, offersExtended: 3, hiresMade: 2, avgResponseTimeHours: 14.5 },
    { recruiterName: 'Sarah Jenkins', activeCandidates: 22, interviewsConducted: 14, offersExtended: 2, hiresMade: 2, avgResponseTimeHours: 8.2 }
  ]
};
