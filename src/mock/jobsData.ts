import { Job } from '../types/job';

export const mockJobs: Job[] = [
  {
    id: 'job-101',
    title: 'Senior Piping Designer (Brownfield / Plant 3D)',
    department: 'Piping & Mechanical',
    location: 'Calgary, AB (Hybrid)',
    type: 'Full-time',
    status: 'active',
    hiringManager: 'Elena Rostova, P.Eng.',
    hiringManagerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    recruiterOwner: 'Marcus Vance',
    recruiterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    targetHires: 2,
    hiresCount: 1,
    applicantsCount: 28,
    inProcessCount: 9,
    priority: 'urgent',
    openedAt: '2026-07-10',
    salaryRange: '$105,000 - $130,000 CAD',
    description: 'We are seeking an experienced Intermediate-to-Senior Piping Designer with strong brownfield project exposure, AutoCAD Plant 3D proficiency, and Alberta energy/SAGD facility experience. The candidate will lead 3D modeling, isometrics verification, and laser scan tie-in checks for facility revamps.',
    requirements: [
      {
        id: 'req-1',
        category: 'must_have',
        label: 'AutoCAD Plant 3D or CADWorx',
        description: 'Minimum 5+ years working in AutoCAD Plant 3D or CADWorx for heavy industrial piping.',
        keywords: ['Plant 3D', 'CADWorx', '3D Modeling', 'Isometrics', 'LFM Scan']
      },
      {
        id: 'req-2',
        category: 'must_have',
        label: 'Brownfield & Facility Tie-ins',
        description: 'Demonstrated experience executing brownfield revamps, laser scan integrations, and tie-in schedules.',
        keywords: ['Brownfield', 'Tie-in', 'Laser Scanning', 'Revamp', 'Debottlenecking']
      },
      {
        id: 'req-3',
        category: 'must_have',
        label: 'Alberta Energy / EPCM Exposure',
        description: 'Experience working on Alberta oil sands, SAGD facilities, or natural gas processing plants in an EPCM environment.',
        keywords: ['Alberta', 'SAGD', 'Oil Sands', 'EPCM', 'Gas Processing', 'Calgary']
      },
      {
        id: 'req-4',
        category: 'nice_to_have',
        label: 'Navisworks Clash Management',
        description: 'Proficiency in Navisworks Manage for multi-discipline model reviews and clash detection.',
        keywords: ['Navisworks', 'Clash Detection', 'Model Review']
      },
      {
        id: 'req-5',
        category: 'certification',
        label: 'ASET / CET Certification',
        description: 'Certified Engineering Technologist (CET) designation through ASET or equivalent provincial body.',
        keywords: ['CET', 'ASET', 'Technologist']
      }
    ],
    hiringTeam: [
      { userId: 'user-3', name: 'Elena Rostova, P.Eng.', role: 'Hiring Manager', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
      { userId: 'user-2', name: 'Marcus Vance', role: 'Lead Recruiter', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { userId: 'user-5', name: 'Chloe Zhang', role: 'Technical Interviewer', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'job-102',
    title: 'Lead Mechanical Engineer (HVAC / Industrial Systems)',
    department: 'Mechanical Engineering',
    location: 'Edmonton, AB (On-site)',
    type: 'Full-time',
    status: 'active',
    hiringManager: 'David Tremblay',
    hiringManagerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    recruiterOwner: 'Sarah Jenkins',
    recruiterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    targetHires: 1,
    hiresCount: 0,
    applicantsCount: 19,
    inProcessCount: 5,
    priority: 'high',
    openedAt: '2026-07-22',
    salaryRange: '$125,000 - $155,000 CAD',
    description: 'Looking for a Professional Engineer (P.Eng.) to lead mechanical building systems design, industrial HVAC ventilation, heating plants, and commissioning for commercial and municipal infrastructure projects.',
    requirements: [
      {
        id: 'req-201',
        category: 'certification',
        label: 'APEGA Registered P.Eng.',
        description: 'Must be licensed as a Professional Engineer in Alberta (APEGA).',
        keywords: ['P.Eng.', 'APEGA', 'Professional Engineer', 'Stamping']
      },
      {
        id: 'req-202',
        category: 'must_have',
        label: 'Industrial HVAC & Central Plant Design',
        description: '8+ years designing industrial HVAC, hydronics, boiler systems, and ASHRAE compliance.',
        keywords: ['HVAC', 'Hydronics', 'Boilers', 'ASHRAE 90.1', 'Ventilation', 'Revit MEP']
      },
      {
        id: 'req-203',
        category: 'nice_to_have',
        label: 'Energy Modeling (eQUEST / IES VE)',
        description: 'Familiarity with whole-building energy simulation tools and LEED standards.',
        keywords: ['Energy Modeling', 'eQUEST', 'IES VE', 'LEED AP']
      }
    ],
    hiringTeam: [
      { userId: 'user-4', name: 'David Tremblay', role: 'Hiring Manager', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { userId: 'user-1', name: 'Sarah Jenkins', role: 'Recruiter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'job-103',
    title: 'Senior Full-Stack Developer (React / Node / TypeScript)',
    department: 'Internal Product Engineering',
    location: 'Remote (Canada)',
    type: 'Full-time',
    status: 'active',
    hiringManager: 'Sarah Jenkins',
    hiringManagerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    recruiterOwner: 'Marcus Vance',
    recruiterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    targetHires: 1,
    hiresCount: 0,
    applicantsCount: 42,
    inProcessCount: 8,
    priority: 'medium',
    openedAt: '2026-08-01',
    salaryRange: '$120,000 - $145,000 CAD',
    description: 'We are expanding our internal tools team building custom engineering workflow software, BIM data pipelines, and client asset portals. Needs strong React, TypeScript, GraphQL/REST, and SQLite/Postgres experience.',
    requirements: [
      {
        id: 'req-301',
        category: 'must_have',
        label: 'React & TypeScript Mastery',
        description: '5+ years building desktop-dense web interfaces with modern React, hooks, and clean TypeScript state management.',
        keywords: ['React', 'TypeScript', 'Tailwind', 'State Management', 'Vite']
      },
      {
        id: 'req-302',
        category: 'must_have',
        label: 'Node.js & Local-First Architectures',
        description: 'Hands-on experience with Node.js backend services, local caching, or offline-first data synchronization.',
        keywords: ['Node.js', 'PostgreSQL', 'SQLite', 'Local-First', 'REST APIs']
      },
      {
        id: 'req-303',
        category: 'nice_to_have',
        label: 'Tauri / Rust / Desktop Integration',
        description: 'Bonus experience building cross-platform desktop apps with Tauri or Electron.',
        keywords: ['Tauri', 'Rust', 'Electron', 'Desktop App']
      }
    ],
    hiringTeam: [
      { userId: 'user-1', name: 'Sarah Jenkins', role: 'Hiring Manager', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
      { userId: 'user-2', name: 'Marcus Vance', role: 'Recruiter', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'job-104',
    title: 'Project Controls & Cost Estimator',
    department: 'Project Management & Controls',
    location: 'Calgary, AB (Hybrid)',
    type: 'Full-time',
    status: 'active',
    hiringManager: 'David Tremblay',
    hiringManagerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    recruiterOwner: 'Marcus Vance',
    recruiterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    targetHires: 1,
    hiresCount: 0,
    applicantsCount: 14,
    inProcessCount: 4,
    priority: 'medium',
    openedAt: '2026-08-05',
    salaryRange: '$95,000 - $118,000 CAD',
    description: 'Responsible for preparing Class 3 and Class 4 EPCM capital cost estimates, EVM progress tracking, change order evaluation, and Primavera P6 schedule integration.',
    requirements: [
      {
        id: 'req-401',
        category: 'must_have',
        label: 'AACE Estimating Standards',
        description: '5+ years preparing industrial capital estimates following AACE International recommended practices.',
        keywords: ['AACE', 'Capital Cost', 'Estimating', 'Class 3', 'Class 4', 'EVM']
      },
      {
        id: 'req-402',
        category: 'must_have',
        label: 'Primavera P6 & HeavyBid',
        description: 'Proficient in Primavera P6 schedule integration and Hard Dollar / HeavyBid estimating tools.',
        keywords: ['Primavera P6', 'HeavyBid', 'Hard Dollar', 'Cost Control']
      }
    ],
    hiringTeam: [
      { userId: 'user-4', name: 'David Tremblay', role: 'Hiring Manager', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { userId: 'user-2', name: 'Marcus Vance', role: 'Recruiter', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'job-105',
    title: 'Operations & Office Generalist',
    department: 'Administration & HR',
    location: 'Calgary, AB (On-site)',
    type: 'Full-time',
    status: 'paused',
    hiringManager: 'Sarah Jenkins',
    hiringManagerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    recruiterOwner: 'Sarah Jenkins',
    recruiterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    targetHires: 1,
    hiresCount: 0,
    applicantsCount: 35,
    inProcessCount: 2,
    priority: 'low',
    openedAt: '2026-06-15',
    salaryRange: '$58,000 - $68,000 CAD',
    description: 'Looking for a proactive Office & Operations Coordinator to manage front-of-house, facility bookings, invoice routing, executive scheduling, and onboarding coordination.',
    requirements: [
      {
        id: 'req-501',
        category: 'must_have',
        label: 'Office & Facilities Management',
        description: '3+ years running professional office administration in an engineering, legal, or accounting firm.',
        keywords: ['Office Management', 'QuickBooks', 'Onboarding', 'Coordination']
      }
    ],
    hiringTeam: [
      { userId: 'user-1', name: 'Sarah Jenkins', role: 'Hiring Manager & Recruiter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'job-106',
    title: 'Senior Structural Engineer (Bridges & Heavy Civil)',
    department: 'Civil & Structural',
    location: 'Vancouver, BC (Hybrid)',
    type: 'Full-time',
    status: 'closed',
    hiringManager: 'Chloe Zhang',
    hiringManagerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    recruiterOwner: 'Marcus Vance',
    recruiterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    targetHires: 1,
    hiresCount: 1,
    applicantsCount: 22,
    inProcessCount: 0,
    priority: 'medium',
    openedAt: '2026-05-01',
    closedAt: '2026-07-02',
    salaryRange: '$120,000 - $148,000 CAD',
    description: 'Lead structural analysis for heavy civil transportation interchanges, seismic retrofit designs, and precast concrete bridge structures across BC.',
    requirements: [
      {
        id: 'req-601',
        category: 'certification',
        label: 'EGBC Registered P.Eng.',
        description: 'Licensed professional engineer in British Columbia.',
        keywords: ['EGBC', 'P.Eng.', 'Seismic', 'Bridges']
      }
    ],
    hiringTeam: [
      { userId: 'user-5', name: 'Chloe Zhang', role: 'Hiring Manager', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' }
    ]
  }
];
