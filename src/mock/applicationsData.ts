import { Application } from '../types/application';

export const mockApplications: Application[] = [
  {
    id: 'app-101',
    candidateId: 'cand-001',
    candidateName: 'Tariq Al-Mansoor, CET',
    candidateEmail: 'tariq.almansoor@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-101',
    jobTitle: 'Senior Piping Designer (Brownfield / Plant 3D)',
    department: 'Piping & Layout',
    location: 'Calgary, AB (Hybrid)',
    stage: 'technical_panel',
    status: 'active',
    fitScore: 98,
    source: 'linkedin_rsc',
    sourceDetails: 'InMail reply from Sarah Jenkins',
    appliedAt: '2026-08-14T10:30:00Z',
    assignedRecruiter: 'Sarah Jenkins',
    hiringManager: 'Elena Rostova, P.Eng.',
    screeningAnswers: [
      { question: 'Do you have 8+ years with AutoCAD Plant 3D in Western Canadian SAGD/heavy oil facilities?', answer: 'Yes, 12 years across Surmont, Foster Creek, and Christina Lake.', passed: true },
      { question: 'Are you certified as an ASET CET or eligible for immediate transfer?', answer: 'Active ASET CET #39481 in good standing.', passed: true },
      { question: 'What is your target annual compensation?', answer: '$135,000 CAD base salary.', passed: true }
    ],
    scorecards: [
      {
        id: 'sc-1',
        interviewId: 'int-1',
        interviewer: 'Elena Rostova, P.Eng.',
        submittedAt: '2026-08-20',
        rating: 5,
        recommendation: 'strong_hire',
        competencies: [
          { name: '3D Plant Layout & Routing', score: 5, notes: 'Exceptional mastery of tie-ins and congested rack routing.' },
          { name: 'ASME B31.3 Stress Coordination', score: 5, notes: 'Deep knowledge of thermal growth and Caesar II handoffs.' },
          { name: 'Laser Scan Point Cloud Modeling', score: 5, notes: 'Direct field capture experience in Fort McMurray.' }
        ],
        summary: 'Top tier candidate. Immediate impact on Surmont SAGD expansion deliverables.',
        strengths: ['12y Plant 3D mastery', 'Surmont SAGD familiarity'],
        concerns: []
      }
    ],
    interviews: [],
    tags: ['Plant 3D', 'SAGD', 'ASET CET', 'Top Tier'],
    lastActivityAt: '2026-08-28T14:00:00Z'
  },
  {
    id: 'app-102',
    candidateId: 'cand-001',
    candidateName: 'Tariq Al-Mansoor, CET',
    candidateEmail: 'tariq.almansoor@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-102',
    jobTitle: 'Lead Mechanical HVAC Engineer (Industrial)',
    department: 'Mechanical Engineering',
    location: 'Edmonton, AB (On-Site)',
    stage: 'dispositioned',
    status: 'dispositioned',
    fitScore: 62,
    source: 'direct_portal',
    appliedAt: '2026-07-22T08:15:00Z',
    assignedRecruiter: 'Marcus Vance',
    hiringManager: 'David Tremblay',
    screeningAnswers: [
      { question: 'Do you hold an active APEGA P.Eng. license?', answer: 'No, I hold an ASET CET certification for piping design.', passed: false, notes: 'Role strictly requires P.Eng. stamp authorization.' }
    ],
    scorecards: [],
    interviews: [],
    disposition: {
      reason: 'future_talent_pool',
      comment: 'Discipline mismatch (Piping Designer rather than Mechanical HVAC Lead). Re-routed to Senior Piping Designer requisition.',
      date: '2026-07-24T16:00:00Z',
      dispositionedBy: 'Marcus Vance'
    },
    tags: ['Piping Focus', 'Rerouted'],
    lastActivityAt: '2026-07-24T16:00:00Z'
  },
  {
    id: 'app-103',
    candidateId: 'cand-002',
    candidateName: 'Melissa Chen, P.Eng.',
    candidateEmail: 'melissa.chen@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-102',
    jobTitle: 'Lead Mechanical HVAC Engineer (Industrial)',
    department: 'Mechanical Engineering',
    location: 'Edmonton, AB (On-Site)',
    stage: 'offer_extended',
    status: 'active',
    fitScore: 95,
    source: 'referral',
    sourceDetails: 'Referred by David Tremblay (Former Stantec Colleague)',
    appliedAt: '2026-08-02T11:00:00Z',
    assignedRecruiter: 'Sarah Jenkins',
    hiringManager: 'David Tremblay',
    screeningAnswers: [
      { question: 'Are you licensed as a P.Eng. with APEGA in Alberta?', answer: 'Yes, P.Eng. #84920 with 10 years experience.', passed: true },
      { question: 'Experience with ASHRAE 62.1 and hazardous industrial ventilation?', answer: 'Designed HVAC systems for battery energy storage and compressor buildings.', passed: true }
    ],
    scorecards: [
      {
        id: 'sc-2',
        interviewId: 'int-2',
        interviewer: 'David Tremblay',
        submittedAt: '2026-08-18',
        rating: 5,
        recommendation: 'strong_hire',
        competencies: [
          { name: 'Industrial HVAC Engineering', score: 5, notes: 'Superb technical background in heavy industrial ventilation.' },
          { name: 'APEGA Stamp & Compliance', score: 5, notes: 'Active stamp with 0 disciplinary history.' }
        ],
        summary: 'Excellent candidate. Extending formal offer.',
        strengths: ['10y HVAC leadership', 'APEGA stamp in good standing'],
        concerns: []
      }
    ],
    interviews: [],
    offer: {
      baseSalary: '$138,000 CAD',
      bonus: '10% Annual Performance Target',
      relocationStipend: '$7,500 CAD',
      targetStartDate: '2026-10-01',
      status: 'pending_approval',
      approvedBy: 'David Tremblay'
    },
    tags: ['APEGA P.Eng.', 'HVAC Lead', 'Referral', 'Offer Out'],
    lastActivityAt: '2026-08-28T16:30:00Z'
  },
  {
    id: 'app-104',
    candidateId: 'cand-003',
    candidateName: 'Brendan Gallagher',
    candidateEmail: 'brendan.g@email.com',
    jobId: 'job-103',
    jobTitle: 'Project Controls & Cost Estimator',
    department: 'Project Controls',
    location: 'Calgary, AB (Hybrid)',
    stage: 'screen',
    status: 'active',
    fitScore: 88,
    source: 'indeed_apply',
    appliedAt: '2026-08-26T09:45:00Z',
    assignedRecruiter: 'Marcus Vance',
    hiringManager: 'Robert MacLeod',
    screeningAnswers: [
      { question: 'Experience with Primavera P6 and SAP Cost Control modules?', answer: '6 years managing $50M+ capital expenditure budgets.', passed: true }
    ],
    scorecards: [],
    interviews: [],
    tags: ['P6', 'Estimating', 'Unreviewed'],
    lastActivityAt: '2026-08-27T11:00:00Z'
  },
  {
    id: 'app-105',
    candidateId: 'cand-004',
    candidateName: 'Devon Blackwood',
    candidateEmail: 'devon.blackwood@email.com',
    jobId: 'job-104',
    jobTitle: 'Senior Full-Stack Developer (ATS / CAD Integrations)',
    department: 'Software Engineering',
    location: 'Remote Canada',
    stage: 'inbox',
    status: 'active',
    fitScore: 92,
    source: 'linkedin_rsc',
    appliedAt: '2026-08-28T15:20:00Z',
    assignedRecruiter: 'Sarah Jenkins',
    hiringManager: 'Tech Lead',
    screeningAnswers: [
      { question: 'Experience with React, TypeScript, and local-first SQLite / Web Audio architectures?', answer: '8 years building high-performance SPAs at Clio and Benevity.', passed: true }
    ],
    scorecards: [],
    interviews: [],
    tags: ['React', 'TypeScript', 'New Applicant'],
    lastActivityAt: '2026-08-28T15:20:00Z'
  }
];
