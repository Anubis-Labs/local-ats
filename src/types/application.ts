import { Scorecard } from './candidate';
import { Interview } from './interview';

export type ApplicationStage =
  | 'inbox'
  | 'screen'
  | 'technical_panel'
  | 'hiring_manager'
  | 'offer_pending'
  | 'offer_extended'
  | 'hired'
  | 'dispositioned';

export type DispositionReason =
  | 'unqualified_technical'
  | 'declined_offer'
  | 'hired_elsewhere'
  | 'withdrawn_by_candidate'
  | 'failed_safety_compliance'
  | 'future_talent_pool'
  | 'duplicate_application'
  | 'compensation_mismatch';

export interface ScreeningAnswer {
  question: string;
  answer: string;
  passed: boolean;
  notes?: string;
}

export interface ApplicationOffer {
  baseSalary: string;
  bonus: string;
  relocationStipend?: string;
  targetStartDate: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'sent_to_candidate' | 'signed' | 'declined';
  approvedBy?: string;
  envelopeId?: string;
}

export interface Application {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar?: string;
  jobId: string;
  jobTitle: string;
  department: string;
  location: string;
  stage: ApplicationStage;
  status: 'active' | 'archived' | 'dispositioned';
  fitScore: number;
  source: 'linkedin_rsc' | 'indeed_apply' | 'referral' | 'direct_portal' | 'agency' | 'internal_mobility';
  sourceDetails?: string;
  appliedAt: string;
  assignedRecruiter: string;
  hiringManager: string;
  screeningAnswers: ScreeningAnswer[];
  scorecards: Scorecard[];
  interviews: Interview[];
  offer?: ApplicationOffer;
  disposition?: {
    reason: DispositionReason;
    comment: string;
    date: string;
    dispositionedBy: string;
  };
  tags: string[];
  unreadNotesCount?: number;
  lastActivityAt: string;
}
