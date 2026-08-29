export type TeamRole = 'Administrator' | 'Recruiter' | 'Hiring Manager' | 'Interviewer' | 'Viewer';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  avatar?: string;
  status: 'active' | 'invited' | 'away';
  assignedJobsCount: number;
  openInterviewsCount: number;
  lastActive: string;
  department: string;
}
