export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';
export type TaskCategory = 'review' | 'interview_prep' | 'scorecard' | 'offer' | 'followup' | 'reference' | 'onboarding';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  assignee: {
    id: string;
    name: string;
    avatar?: string;
  };
  candidateId?: string;
  candidateName?: string;
  jobId?: string;
  jobTitle?: string;
  isOverdue?: boolean;
}
