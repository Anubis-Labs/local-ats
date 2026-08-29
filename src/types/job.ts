export interface JobRequirement {
  id: string;
  category: 'must_have' | 'nice_to_have' | 'certification';
  label: string;
  description: string;
  keywords: string[];
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid';
  status: 'active' | 'draft' | 'paused' | 'closed' | 'archived';
  hiringManager: string;
  hiringManagerAvatar?: string;
  recruiterOwner: string;
  recruiterAvatar?: string;
  targetHires: number;
  hiresCount: number;
  applicantsCount: number;
  inProcessCount: number;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  openedAt: string;
  closedAt?: string;
  salaryRange: string;
  description: string;
  requirements: JobRequirement[];
  hiringTeam: {
    userId: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  customFields?: Record<string, string>;
}
