export type PipelineStageId =
  | 'new'
  | 'review'
  | 'phone_screen'
  | 'interview'
  | 'final_interview'
  | 'reference_check'
  | 'offer'
  | 'hired'
  | 'rejected'
  | 'archived';

export interface EvidenceChunk {
  id: string;
  section: string;
  text: string;
  confidence: number;
  source: 'resume' | 'screening' | 'interview_note' | 'recruiter_note' | 'portfolio';
}

export interface WorkHistoryItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  projects?: string[];
  skillsUsed?: string[];
  evidenceId?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  isVerified: boolean;
}

export interface ParsedResume {
  summary: string;
  extractedSkills: string[];
  workHistory: WorkHistoryItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  rawText: string;
  evidenceChunks: EvidenceChunk[];
}

export interface RecruiterNote {
  id: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  text: string;
  pinned: boolean;
  tags?: string[];
}

export interface CompetencyScore {
  name: string;
  score: number; // 1-5
  notes: string;
}

export interface Scorecard {
  id: string;
  interviewId: string;
  interviewer: string;
  interviewerAvatar?: string;
  submittedAt: string;
  rating: number; // 1-5
  recommendation: 'strong_hire' | 'hire' | 'mixed' | 'no_hire' | 'strong_no_hire';
  competencies: CompetencyScore[];
  summary: string;
  strengths: string[];
  concerns: string[];
}

export interface ScreeningAnswer {
  questionId: string;
  question: string;
  type: 'yes_no' | 'multiple_choice' | 'short_answer' | 'number' | 'date';
  candidateAnswer: string;
  isPassed: boolean;
}

export interface CandidateOffer {
  id: string;
  status: 'draft' | 'awaiting_approval' | 'sent' | 'viewed' | 'accepted' | 'declined';
  salary: string;
  bonus?: string;
  equity?: string;
  startDate: string;
  employmentType: 'Full-time' | 'Contract' | 'Part-time';
  notes: string;
  approvers: string[];
  createdAt: string;
}

export interface CandidateFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  url?: string;
}

export interface CandidateRelationshipSignal {
  id: string;
  type: 'coworker' | 'shared_employer' | 'shared_project' | 'referred_by' | 'shared_skill';
  targetName: string;
  targetType: 'candidate' | 'team_member' | 'employer' | 'project';
  targetId?: string;
  description: string;
  evidence: string;
  dates?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  currentRole: string;
  currentCompany: string;
  experienceYears: number;
  tags: string[];
  rating: number; // 1-5
  source: 'LinkedIn' | 'Referral' | 'Direct Application' | 'Agency' | 'Talent Pool' | 'Job Fair' | 'Cold Outreach';
  stage: PipelineStageId;
  stageUpdatedAt: string;
  daysInStage: number;
  jobId?: string;
  jobTitle?: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  stalledWarning?: boolean;
  duplicateOf?: string;
  isArchived: boolean;
  inTalentPool: boolean;
  talentPoolAddedAt?: string;
  talentPoolNotes?: string;
  availability: 'Immediate' | '2 weeks' | '1 month' | 'Open' | 'Not actively looking';
  compensationExpectation?: string;
  parsedResume: ParsedResume;
  notes: RecruiterNote[];
  scorecards: Scorecard[];
  screeningAnswers: ScreeningAnswer[];
  offer?: CandidateOffer;
  files: CandidateFile[];
  relationships: CandidateRelationshipSignal[];
  customFields?: Record<string, string>;
}
