import { Task } from '../types/task';

export const mockTasks: Task[] = [
  {
    id: 'task-001',
    title: 'Submit panel interview scorecard for Tariq Al-Mansoor',
    description: 'Provide written notes on Plant 3D modeling skills and ASME B31.3 knowledge.',
    priority: 'urgent',
    category: 'scorecard',
    dueDate: '2026-08-28', // Today
    completed: false,
    assignee: {
      id: 'user-3',
      name: 'Elena Rostova, P.Eng.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    candidateId: 'cand-001',
    candidateName: 'Tariq Al-Mansoor, CET',
    jobId: 'job-101',
    jobTitle: 'Senior Piping Designer (Brownfield / Plant 3D)',
    isOverdue: false
  },
  {
    id: 'task-002',
    title: 'Executive sign-off on offer letter for Melissa Chen',
    description: 'Ensure salary package ($138k + 10% bonus) has approval from Managing Director.',
    priority: 'high',
    category: 'offer',
    dueDate: '2026-08-28', // Today
    completed: false,
    assignee: {
      id: 'user-1',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    candidateId: 'cand-002',
    candidateName: 'Melissa Chen, P.Eng.',
    jobId: 'job-102',
    jobTitle: 'Lead Mechanical Engineer (HVAC / Industrial Systems)',
    isOverdue: false
  },
  {
    id: 'task-003',
    title: 'Follow up on compensation survey for Brendan Gallagher',
    description: 'Check if talent pool candidate Brendan Gallagher can be engaged with the increased salary budget ($115k).',
    priority: 'medium',
    category: 'followup',
    dueDate: '2026-08-27', // Yesterday (Overdue)
    completed: false,
    assignee: {
      id: 'user-2',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    candidateId: 'cand-003',
    candidateName: 'Brendan Gallagher',
    jobId: 'job-101',
    jobTitle: 'Senior Piping Designer (Brownfield / Plant 3D)',
    isOverdue: true
  },
  {
    id: 'task-004',
    title: 'Review 5 new inbound applications for Senior Full-Stack Developer',
    description: 'Initial triage of candidates including Devon Blackwood for offline-first experience.',
    priority: 'high',
    category: 'review',
    dueDate: '2026-08-29',
    completed: false,
    assignee: {
      id: 'user-2',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    jobId: 'job-103',
    jobTitle: 'Senior Full-Stack Developer (React / Node / TypeScript)',
    isOverdue: false
  },
  {
    id: 'task-005',
    title: 'Reference check call for Aiden Tremblay with former Hatch Director',
    description: 'Verify capital cost estimating accuracy and team management on Jansen project.',
    priority: 'medium',
    category: 'reference',
    dueDate: '2026-08-30',
    completed: false,
    assignee: {
      id: 'user-2',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    candidateId: 'cand-005',
    candidateName: 'Aiden Tremblay, PMP',
    jobId: 'job-104',
    jobTitle: 'Project Controls & Cost Estimator',
    isOverdue: false
  },
  {
    id: 'task-006',
    title: 'Send welcome packet to hired Structural Lead',
    description: 'Coordinate initial IT hardware setup, safety boots voucher, and Day 1 schedule.',
    priority: 'low',
    category: 'onboarding',
    dueDate: '2026-08-26',
    completed: true,
    completedAt: '2026-08-26T15:30:00.000Z',
    assignee: {
      id: 'user-1',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    jobId: 'job-106',
    jobTitle: 'Senior Structural Engineer (Bridges & Heavy Civil)'
  }
];
