export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateRole: string;
  candidateAvatar?: string;
  jobId: string;
  jobTitle: string;
  type: 'Phone Screen' | 'Technical Round' | 'Panel / Team' | 'Hiring Manager' | 'Culture & Fit' | 'Final Executive';
  scheduledAt: string; // ISO string
  durationMinutes: number;
  interviewers: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
    hasSubmittedScorecard: boolean;
  }[];
  location: string;
  videoUrl?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'overdue_feedback';
  prepNotes: string;
  scorecardSubmitted: boolean;
}
