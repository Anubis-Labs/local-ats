import { Interview } from '../types/interview';

export const mockInterviews: Interview[] = [
  {
    id: 'int-201',
    candidateId: 'cand-001',
    candidateName: 'Tariq Al-Mansoor, CET',
    candidateRole: 'Senior Piping Designer',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-101',
    jobTitle: 'Senior Piping Designer (Brownfield / Plant 3D)',
    type: 'Panel / Team',
    scheduledAt: '2026-08-28T14:00:00.000Z', // Today
    durationMinutes: 60,
    interviewers: [
      { name: 'Elena Rostova, P.Eng.', email: 'elena.rostova@albertaengineering.ca', role: 'Hiring Manager', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', hasSubmittedScorecard: false },
      { name: 'Chloe Zhang', email: 'chloe.zhang@albertaengineering.ca', role: 'Technical Lead', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', hasSubmittedScorecard: true }
    ],
    location: 'Meeting Room 3B (Calgary HQ) / MS Teams',
    videoUrl: 'https://teams.microsoft.com/l/meetup-join/ats-mock-call-101',
    status: 'scheduled',
    prepNotes: 'Focus on laser scan clash management in Plant 3D and handling live brownfield tie-in packages.',
    scorecardSubmitted: false
  },
  {
    id: 'int-202',
    candidateId: 'cand-002',
    candidateName: 'Melissa Chen, P.Eng.',
    candidateRole: 'Lead Mechanical Engineer',
    candidateAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-102',
    jobTitle: 'Lead Mechanical Engineer (HVAC / Industrial Systems)',
    type: 'Hiring Manager',
    scheduledAt: '2026-08-20T10:00:00.000Z',
    durationMinutes: 45,
    interviewers: [
      { name: 'David Tremblay', email: 'david.tremblay@albertaengineering.ca', role: 'Hiring Manager', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', hasSubmittedScorecard: true }
    ],
    location: 'Edmonton Office (Boardroom A)',
    status: 'completed',
    prepNotes: 'Evaluate past central utility plant project delivery and client communications.',
    scorecardSubmitted: true
  },
  {
    id: 'int-203',
    candidateId: 'cand-005',
    candidateName: 'Aiden Tremblay, PMP',
    candidateRole: 'Senior Cost Estimator & Controls Lead',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-104',
    jobTitle: 'Project Controls & Cost Estimator',
    type: 'Phone Screen',
    scheduledAt: '2026-08-28T16:30:00.000Z', // Today
    durationMinutes: 30,
    interviewers: [
      { name: 'Marcus Vance', email: 'marcus.vance@albertaengineering.ca', role: 'Recruiter', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', hasSubmittedScorecard: false }
    ],
    location: 'Phone Call (+1 403-555-0322)',
    status: 'scheduled',
    prepNotes: 'Review AACE Class 3 capital estimating benchmark examples and compensation expectations.',
    scorecardSubmitted: false
  },
  {
    id: 'int-204',
    candidateId: 'cand-004',
    candidateName: 'Devon Blackwood',
    candidateRole: 'Senior Full-Stack Engineer',
    candidateAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-103',
    jobTitle: 'Senior Full-Stack Developer (React / Node / TypeScript)',
    type: 'Technical Round',
    scheduledAt: '2026-08-29T11:00:00.000Z', // Tomorrow
    durationMinutes: 75,
    interviewers: [
      { name: 'Sarah Jenkins', email: 'sarah.jenkins@albertaengineering.ca', role: 'Team Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', hasSubmittedScorecard: false }
    ],
    location: 'Google Meet / Live Code',
    videoUrl: 'https://meet.google.com/ats-mock-code-103',
    status: 'scheduled',
    prepNotes: 'Deep-dive into local-first SQLite offline sync state reconciliation and virtualized tables.',
    scorecardSubmitted: false
  },
  {
    id: 'int-205',
    candidateId: 'cand-007',
    candidateName: 'Kiran Patel',
    candidateRole: 'Intermediate Piping Drafter',
    candidateAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-101',
    jobTitle: 'Senior Piping Designer (Brownfield / Plant 3D)',
    type: 'Phone Screen',
    scheduledAt: '2026-08-25T09:30:00.000Z',
    durationMinutes: 30,
    interviewers: [
      { name: 'Marcus Vance', email: 'marcus.vance@albertaengineering.ca', role: 'Recruiter', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', hasSubmittedScorecard: false }
    ],
    location: 'Phone Call',
    status: 'overdue_feedback',
    prepNotes: 'Check availability to transition from drafting into 3D modeling.',
    scorecardSubmitted: false
  }
];
