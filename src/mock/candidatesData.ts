import { Candidate } from '../types/candidate';

export const mockCandidates: Candidate[] = [
  {
    id: 'cand-001',
    name: 'Tariq Al-Mansoor, CET',
    email: 'tariq.almansoor@email.com',
    phone: '+1 (403) 555-0142',
    location: 'Calgary, AB',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    currentRole: 'Senior Piping Designer',
    currentCompany: 'Fluor Canada',
    experienceYears: 12,
    tags: ['Plant 3D', 'Brownfield', 'SAGD', 'CET', 'Heavy Oil', 'Debottlenecking'],
    rating: 5,
    source: 'LinkedIn',
    stage: 'interview',
    stageUpdatedAt: '2026-08-20',
    daysInStage: 8,
    jobId: 'job-101',
    jobTitle: 'Senior Piping Designer (Brownfield / Plant 3D)',
    ownerId: 'user-2',
    ownerName: 'Marcus Vance',
    createdAt: '2026-07-14',
    updatedAt: '2026-08-24',
    lastActivity: 'Interview scheduled with Elena Rostova for tomorrow',
    availability: '2 weeks',
    compensationExpectation: '$120,000 CAD',
    inTalentPool: false,
    isArchived: false,
    parsedResume: {
      summary: 'Senior Piping Designer with 12+ years specializing in brownfield facility modifications, EPCM multi-discipline coordination, and 3D modeling using AutoCAD Plant 3D and CADWorx across Western Canada energy projects.',
      extractedSkills: ['AutoCAD Plant 3D', 'CADWorx Plant', 'Navisworks Manage', 'Brownfield Revamps', 'Isometrics Verification', 'Laser Scan Integration', 'LFM Server', 'ASME B31.3', 'SAGD Central Plants'],
      workHistory: [
        {
          id: 'wh-101',
          company: 'Fluor Canada',
          role: 'Senior Piping Designer',
          location: 'Calgary, AB',
          startDate: '2020-03',
          endDate: 'Present',
          description: 'Lead piping designer for ConocoPhillips Surmont SAGD facility brownfield optimization project. Handled 3D modeling of 40+ tie-ins, point cloud clash resolution in Navisworks, and isometric fabrication checks.',
          projects: ['Surmont SAGD Brownfield Optimization', 'Kearl Debottlenecking Tie-ins'],
          skillsUsed: ['Plant 3D', 'Navisworks', 'Brownfield', 'SAGD', 'Laser Scan']
        },
        {
          id: 'wh-102',
          company: 'Worley',
          role: 'Intermediate Piping Designer',
          location: 'Calgary, AB',
          startDate: '2016-05',
          endDate: '2020-02',
          description: 'Designed piping routing, valve accessibility, and equipment arrangements for Fort Hills oil sands extraction plant. Coordinated directly with structural and electrical leads.',
          projects: ['Fort Hills Primary Extraction', 'Scotford Refinery Revamp'],
          skillsUsed: ['CADWorx', 'ASME B31.3', 'P&ID Walkdown']
        },
        {
          id: 'wh-103',
          company: 'Stantec',
          role: 'Junior Piping Drafter',
          location: 'Edmonton, AB',
          startDate: '2014-06',
          endDate: '2016-04',
          description: 'Produced 2D orthographics, isometrics, and bill of materials for natural gas compression stations.',
          projects: ['TC Energy Station 43 Revamp'],
          skillsUsed: ['AutoCAD', 'Isometrics', 'BOM']
        }
      ],
      education: [
        {
          id: 'edu-101',
          institution: 'Southern Alberta Institute of Technology (SAIT)',
          degree: 'Diploma',
          fieldOfStudy: 'Mechanical Engineering Technology',
          graduationYear: '2014'
        }
      ],
      certifications: [
        {
          id: 'cert-101',
          name: 'Certified Engineering Technologist (CET)',
          issuer: 'ASET (Alberta Society of Engineering Technologists)',
          year: '2018',
          isVerified: true
        }
      ],
      rawText: `TARIQ AL-MANSOOR, CET
Calgary, AB • (403) 555-0142 • tariq.almansoor@email.com

PROFESSIONAL SUMMARY:
Senior Piping Designer with 12+ years specializing in brownfield facility modifications, EPCM multi-discipline coordination, and 3D modeling using AutoCAD Plant 3D and CADWorx across Western Canada energy projects.

EXPERIENCE:
Fluor Canada — Senior Piping Designer (2020 - Present) | Calgary, AB
- Lead piping designer for ConocoPhillips Surmont SAGD facility brownfield optimization project.
- Handled 3D modeling of 40+ tie-ins, point cloud clash resolution in Navisworks Manage, and isometric fabrication checks.
- Performed field walkdowns with client operations team and integrated 3D laser scans (LFM / Leica Cyclone).

Worley — Intermediate Piping Designer (2016 - 2020) | Calgary, AB
- Designed piping routing, valve accessibility, and equipment arrangements for Fort Hills oil sands extraction plant.
- Prepared ASME B31.3 compliant line lists, tie-in packages, and demolition drawings.

Stantec — Junior Piping Drafter (2014 - 2016) | Edmonton, AB
- Produced 2D orthographics, isometrics, and bill of materials for TC Energy compression stations.

EDUCATION & CERTIFICATION:
- Diploma in Mechanical Engineering Technology, SAIT (2014)
- Certified Engineering Technologist (CET), ASET (2018)`,
      evidenceChunks: [
        {
          id: 'ev-001',
          section: 'Experience - Fluor Canada',
          text: 'Lead piping designer for ConocoPhillips Surmont SAGD facility brownfield optimization project. Handled 3D modeling of 40+ tie-ins, point cloud clash resolution in Navisworks, and isometric fabrication checks.',
          confidence: 0.98,
          source: 'resume'
        },
        {
          id: 'ev-002',
          section: 'Experience - Worley',
          text: 'Designed piping routing, valve accessibility, and equipment arrangements for Fort Hills oil sands extraction plant.',
          confidence: 0.95,
          source: 'resume'
        },
        {
          id: 'ev-003',
          section: 'Certifications',
          text: 'Certified Engineering Technologist (CET), ASET (2018)',
          confidence: 1.0,
          source: 'resume'
        }
      ]
    },
    notes: [
      {
        id: 'note-01',
        author: 'Marcus Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-07-28',
        text: 'Spoke with Tariq on phone screen. Exceptional brownfield tie-in instincts. He worked under Elena Rostova when both were at Worley on the Fort Hills project in 2018. Strongly recommended for technical round.',
        pinned: true,
        tags: ['Screening', 'Strong Fit', 'Referral Link']
      }
    ],
    scorecards: [
      {
        id: 'sc-101',
        interviewId: 'int-201',
        interviewer: 'Chloe Zhang',
        interviewerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        submittedAt: '2026-08-15',
        rating: 5,
        recommendation: 'strong_hire',
        summary: 'Tariq demonstrated deep mastery of AutoCAD Plant 3D spec generation and laser scan tie-ins. He walked us through resolving complex thermal expansion routing in existing pipe racks.',
        strengths: ['Laser scan point cloud alignment', 'Deep knowledge of SAGD steam and emulsion line specs', 'Very clear communicator'],
        concerns: ['None from a technical perspective'],
        competencies: [
          { name: 'Plant 3D / CADWorx Modeling', score: 5, notes: 'Hands on expert level' },
          { name: 'Brownfield Tie-ins & Walkdowns', score: 5, notes: 'Has managed 40+ simultaneous live tie-ins' },
          { name: 'ASME Code Knowledge', score: 4, notes: 'Solid B31.3 familiarity' }
        ]
      }
    ],
    screeningAnswers: [
      {
        questionId: 'sq-1',
        question: 'Do you have direct experience with AutoCAD Plant 3D or CADWorx on Alberta oil & gas facilities?',
        type: 'yes_no',
        candidateAnswer: 'Yes, 12 years combined across SAGD and refinery projects in Alberta.',
        isPassed: true
      },
      {
        questionId: 'sq-2',
        question: 'Are you legally entitled to work in Canada without sponsorship?',
        type: 'yes_no',
        candidateAnswer: 'Yes, Canadian Citizen.',
        isPassed: true
      },
      {
        questionId: 'sq-3',
        question: 'What is your notice period with your current employer?',
        type: 'short_answer',
        candidateAnswer: 'Standard 2 weeks notice.',
        isPassed: true
      }
    ],
    files: [
      { id: 'f-1', name: 'Tariq_AlMansoor_Resume_2026.pdf', size: '240 KB', type: 'application/pdf', uploadedAt: '2026-07-14' },
      { id: 'f-2', name: 'ASET_CET_Certificate.pdf', size: '512 KB', type: 'application/pdf', uploadedAt: '2026-07-15' }
    ],
    relationships: [
      {
        id: 'rel-1',
        type: 'coworker',
        targetName: 'Elena Rostova, P.Eng.',
        targetType: 'team_member',
        targetId: 'user-3',
        description: 'Worked together at Worley on Fort Hills Primary Extraction project (2017-2019)',
        evidence: 'Resume cross-referenced with Elena Rostova employment history at Worley Calgary office.',
        dates: '2017 - 2019'
      },
      {
        id: 'rel-2',
        type: 'shared_employer',
        targetName: 'Fluor Canada',
        targetType: 'employer',
        description: 'Current employer with 4 other candidates in local database.',
        evidence: 'Fluor Calgary EPCM division.',
        dates: '2020 - Present'
      }
    ]
  },
  {
    id: 'cand-002',
    name: 'Melissa Chen, P.Eng.',
    email: 'm.chen.eng@gmail.com',
    phone: '+1 (780) 555-0819',
    location: 'Edmonton, AB',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    currentRole: 'Lead Mechanical Engineer',
    currentCompany: 'Stantec',
    experienceYears: 10,
    tags: ['HVAC', 'APEGA', 'P.Eng.', 'LEED AP', 'Central Plant', 'eQUEST'],
    rating: 5,
    source: 'Referral',
    stage: 'offer',
    stageUpdatedAt: '2026-08-25',
    daysInStage: 3,
    jobId: 'job-102',
    jobTitle: 'Lead Mechanical Engineer (HVAC / Industrial Systems)',
    ownerId: 'user-1',
    ownerName: 'Sarah Jenkins',
    createdAt: '2026-07-25',
    updatedAt: '2026-08-27',
    lastActivity: 'Offer package sent for executive sign-off',
    availability: '1 month',
    compensationExpectation: '$140,000 CAD',
    inTalentPool: false,
    isArchived: false,
    parsedResume: {
      summary: 'APEGA registered Professional Mechanical Engineer with 10 years of experience delivering commercial, institutional, and industrial building HVAC, hydronic heating/cooling, and commissioning projects across Alberta.',
      extractedSkills: ['Industrial HVAC', 'Revit MEP', 'Hydronic Systems', 'eQUEST Energy Modeling', 'ASHRAE 90.1 & 62.1', 'LEED AP BD+C', 'Project Management', 'APEGA Stamping'],
      workHistory: [
        {
          id: 'wh-201',
          company: 'Stantec',
          role: 'Senior Mechanical Engineer',
          location: 'Edmonton, AB',
          startDate: '2019-01',
          endDate: 'Present',
          description: 'Lead engineer for Edmonton ICE District Phase 2 commercial tower central plant and ventilation retrofit projects. Signed and sealed mechanical drawing sets.',
          projects: ['ICE District Central Utility Plant', 'U of A Health Sciences Lab Ventilation'],
          skillsUsed: ['HVAC', 'Hydronics', 'Revit MEP', 'P.Eng. Stamping']
        },
        {
          id: 'wh-202',
          company: 'WSP Canada',
          role: 'Intermediate Mechanical Engineer',
          location: 'Edmonton, AB',
          startDate: '2015-06',
          endDate: '2018-12',
          description: 'HVAC load calculations, duct sizing, hydronic piping schematics, and LEED energy modeling.',
          projects: ['Edmonton Transit Fleet Facility', 'Michener Park Redevelopment'],
          skillsUsed: ['eQUEST', 'ASHRAE 90.1', 'AutoCAD']
        }
      ],
      education: [
        {
          id: 'edu-201',
          institution: 'University of Alberta',
          degree: 'B.Sc.',
          fieldOfStudy: 'Mechanical Engineering (Co-op)',
          graduationYear: '2015'
        }
      ],
      certifications: [
        {
          id: 'cert-201',
          name: 'Professional Engineer (P.Eng.)',
          issuer: 'APEGA',
          year: '2019',
          isVerified: true
        },
        {
          id: 'cert-202',
          name: 'LEED AP BD+C',
          issuer: 'CaGBC / USGBC',
          year: '2020',
          isVerified: true
        }
      ],
      rawText: `MELISSA CHEN, P.Eng., LEED AP
Edmonton, AB • (780) 555-0819 • m.chen.eng@gmail.com

SUMMARY:
APEGA registered Professional Mechanical Engineer with 10 years of experience delivering commercial, institutional, and industrial building HVAC, hydronic heating/cooling, and commissioning projects across Alberta.

EXPERIENCE:
Stantec — Senior Mechanical Engineer (2019 - Present) | Edmonton, AB
- Lead mechanical engineer for major institutional and commercial projects in Northern Alberta.
- Direct mechanical discipline design, load calculation, equipment specifications, and APEGA professional stamping.

WSP Canada — Intermediate Mechanical Engineer (2015 - 2018) | Edmonton, AB
- Energy modeling using eQUEST, ASHRAE compliance checks, and HVAC design.

EDUCATION & LICENSING:
- B.Sc. Mechanical Engineering, University of Alberta (2015)
- Registered Professional Engineer (P.Eng.), APEGA License #98214`,
      evidenceChunks: [
        {
          id: 'ev-201',
          section: 'Licensing',
          text: 'Registered Professional Engineer (P.Eng.), APEGA License #98214',
          confidence: 1.0,
          source: 'resume'
        },
        {
          id: 'ev-202',
          section: 'Experience',
          text: 'Lead mechanical engineer for major institutional and commercial projects in Northern Alberta. Direct mechanical discipline design, load calculation, equipment specifications, and APEGA professional stamping.',
          confidence: 0.96,
          source: 'resume'
        }
      ]
    },
    notes: [
      {
        id: 'note-201',
        author: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-08-22',
        text: 'David Tremblay finished the final interview round with Melissa. Full unanimous approval. She is exactly what the Edmonton office needs for the upcoming hospital utility plant bid.',
        pinned: true,
        tags: ['Offer Ready', 'High Priority']
      }
    ],
    scorecards: [
      {
        id: 'sc-201',
        interviewId: 'int-202',
        interviewer: 'David Tremblay',
        interviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        submittedAt: '2026-08-20',
        rating: 5,
        recommendation: 'strong_hire',
        summary: 'Melissa has outstanding leadership presence and deep technical knowledge in central plant hydronics and industrial air handling.',
        strengths: ['APEGA stamping experience', 'Deep ASHRAE standard fluency', 'Proven mentoring of junior EITs'],
        concerns: ['None'],
        competencies: [
          { name: 'HVAC & Central Plant Design', score: 5, notes: 'Mastery across boilers, chillers, AHUs' },
          { name: 'APEGA / Alberta Code Compliance', score: 5, notes: 'Active stamp holder with clean track record' },
          { name: 'Team Leadership', score: 4, notes: 'Managed team of 4 designers and EITs' }
        ]
      }
    ],
    screeningAnswers: [
      {
        questionId: 'sq-201',
        question: 'Are you currently registered as a P.Eng. with APEGA?',
        type: 'yes_no',
        candidateAnswer: 'Yes, License #98214 in good standing.',
        isPassed: true
      }
    ],
    offer: {
      id: 'off-001',
      status: 'awaiting_approval',
      salary: '$138,000 CAD',
      bonus: '10% Annual Performance Bonus',
      equity: 'Firm Profit Sharing Pool eligibility',
      startDate: '2026-10-01',
      employmentType: 'Full-time',
      notes: 'Standard 4 weeks vacation + comprehensive health benefits.',
      approvers: ['David Tremblay', 'Sarah Jenkins'],
      createdAt: '2026-08-25'
    },
    files: [
      { id: 'f-201', name: 'Melissa_Chen_Resume_2026.pdf', size: '310 KB', type: 'application/pdf', uploadedAt: '2026-07-25' },
      { id: 'f-202', name: 'Draft_Offer_Letter_MelissaChen.pdf', size: '180 KB', type: 'application/pdf', uploadedAt: '2026-08-25' }
    ],
    relationships: [
      {
        id: 'rel-201',
        type: 'coworker',
        targetName: 'David Tremblay',
        targetType: 'team_member',
        targetId: 'user-4',
        description: 'Both worked at Stantec Edmonton office between 2019 and 2021 on joint infrastructure proposals.',
        evidence: 'Stantec project team listings.',
        dates: '2019 - 2021'
      }
    ]
  },
  {
    id: 'cand-003',
    name: 'Brendan Gallagher',
    email: 'bgallagher.piping@shaw.ca',
    phone: '+1 (403) 555-0931',
    location: 'Calgary, AB',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    currentRole: 'Intermediate Piping Designer',
    currentCompany: 'Jacobs',
    experienceYears: 7,
    tags: ['Plant 3D', 'Alberta', 'EPCM', 'Brownfield', 'Compensation Rejected Prior'],
    rating: 4,
    source: 'Talent Pool',
    stage: 'archived',
    stageUpdatedAt: '2026-04-12',
    daysInStage: 138,
    ownerId: 'user-2',
    ownerName: 'Marcus Vance',
    createdAt: '2026-03-01',
    updatedAt: '2026-08-10',
    lastActivity: 'Added note regarding potential re-contact for new budget increase',
    availability: 'Open',
    compensationExpectation: '$115,000 CAD',
    inTalentPool: true,
    talentPoolAddedAt: '2026-04-15',
    talentPoolNotes: 'Prior interview passed all technical gates with flying colors. We had a hard cap at $98k at the time and he wanted $115k. Excellent candidate to reconsider for Job #101.',
    isArchived: true,
    parsedResume: {
      summary: 'Piping Designer with 7 years specializing in heavy oil battery revamps, Plant 3D modeling, and field tie-in isometric generation in Calgary EPCM offices.',
      extractedSkills: ['AutoCAD Plant 3D', 'CADWorx', 'Brownfield Modifications', 'SAGD Wellpads', 'Tie-in Schedules', 'Laser Scan Modeling'],
      workHistory: [
        {
          id: 'wh-301',
          company: 'Jacobs',
          role: 'Intermediate Piping Designer',
          location: 'Calgary, AB',
          startDate: '2021-02',
          endDate: 'Present',
          description: 'Modeled SAGD wellpad expansion headers, steam distribution skids, and field separator tie-ins.',
          projects: ['Christina Lake SAGD Phase G', 'Foster Creek Wellpad Revamp'],
          skillsUsed: ['Plant 3D', 'Brownfield', 'Isometrics']
        },
        {
          id: 'wh-302',
          company: 'Wood PLC',
          role: 'Junior Piping Drafter',
          location: 'Calgary, AB',
          startDate: '2019-04',
          endDate: '2021-01',
          description: '2D drafting, piping spec checks, and clash resolutions in Navisworks.',
          projects: ['Strathcona Refinery Expansion'],
          skillsUsed: ['CADWorx', 'Navisworks']
        }
      ],
      education: [
        {
          id: 'edu-301',
          institution: 'SAIT',
          degree: 'Certificate',
          fieldOfStudy: 'Piping Drafting and Design',
          graduationYear: '2019'
        }
      ],
      certifications: [],
      rawText: `BRENDAN GALLAGHER
Calgary, AB • (403) 555-0931 • bgallagher.piping@shaw.ca

Piping Designer with 7 years specializing in heavy oil battery revamps, Plant 3D modeling, and field tie-in isometric generation in Calgary EPCM offices.

EXPERIENCE:
Jacobs (2021 - Present) - Intermediate Piping Designer | Calgary, AB
- Modeled SAGD wellpad expansion headers, steam distribution skids, and field separator tie-ins using Plant 3D.

Wood PLC (2019 - 2021) - Junior Piping Drafter | Calgary, AB`,
      evidenceChunks: [
        {
          id: 'ev-301',
          section: 'Interview Outcome (April 2026)',
          text: 'Candidate scored 4.5/5 on technical evaluation. Rejected strictly for compensation mismatch (budget capped at $98k, candidate firm at $115k).',
          confidence: 1.0,
          source: 'interview_note'
        }
      ]
    },
    notes: [
      {
        id: 'note-301',
        author: 'Marcus Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-04-12',
        text: 'Outcome from Spring Req: Technical score 4.5/5. Elena Rostova loved his Plant 3D test. We lost him due to compensation budget constraints. Now that Job #101 is funded up to $130k, he is our top talent pool re-engagement candidate.',
        pinned: true,
        tags: ['Compensation Rejection Prior', 'High Re-engagement Value']
      }
    ],
    scorecards: [],
    screeningAnswers: [],
    files: [
      { id: 'f-301', name: 'Brendan_Gallagher_Resume.pdf', size: '190 KB', type: 'application/pdf', uploadedAt: '2026-03-01' }
    ],
    relationships: [
      {
        id: 'rel-301',
        type: 'shared_employer',
        targetName: 'Jacobs',
        targetType: 'employer',
        description: 'Current employer with 3 candidates in database.',
        evidence: 'Jacobs Calgary Energy Group.',
        dates: '2021 - Present'
      }
    ]
  },
  {
    id: 'cand-004',
    name: 'Devon Blackwood',
    email: 'devon.blackwood.dev@gmail.com',
    phone: '+1 (604) 555-0188',
    location: 'Vancouver, BC (Remote)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    currentRole: 'Senior Frontend / Full-Stack Engineer',
    currentCompany: 'Clio',
    experienceYears: 8,
    tags: ['React', 'TypeScript', 'Tailwind', 'Local-First', 'SQLite', 'Vite', 'Node.js'],
    rating: 5,
    source: 'LinkedIn',
    stage: 'review',
    stageUpdatedAt: '2026-08-26',
    daysInStage: 2,
    jobId: 'job-103',
    jobTitle: 'Senior Full-Stack Developer (React / Node / TypeScript)',
    ownerId: 'user-2',
    ownerName: 'Marcus Vance',
    createdAt: '2026-08-26',
    updatedAt: '2026-08-27',
    lastActivity: 'New applicant triaged by Marcus',
    availability: '1 month',
    compensationExpectation: '$135,000 CAD',
    inTalentPool: false,
    isArchived: false,
    parsedResume: {
      summary: 'Senior Software Engineer specializing in dense, high-performance desktop-style React and TypeScript web apps, local-first offline synchronization, SQLite/IndexedDB client caches, and Node.js REST/GraphQL APIs.',
      extractedSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'SQLite', 'PostgreSQL', 'TanStack Table', 'GraphQL', 'Local-First Sync', 'Tauri / Webview'],
      workHistory: [
        {
          id: 'wh-401',
          company: 'Clio',
          role: 'Senior Full-Stack Engineer',
          location: 'Vancouver, BC (Remote)',
          startDate: '2022-01',
          endDate: 'Present',
          description: 'Architected offline-capable desktop client for legal document management with local SQLite cache and WebSocket sync. Reduced time-to-render by 65%.',
          projects: ['Clio Desktop Offline Engine', 'Document Review Master-Detail View'],
          skillsUsed: ['React', 'TypeScript', 'Node.js', 'SQLite', 'Tailwind']
        },
        {
          id: 'wh-402',
          company: 'Shopify',
          role: 'Frontend Developer',
          location: 'Remote',
          startDate: '2018-09',
          endDate: '2021-12',
          description: 'Built high-throughput merchant dashboard tables, customizable filters, and command palette navigation.',
          projects: ['Merchant POS Inventory Grid'],
          skillsUsed: ['React', 'TypeScript', 'GraphQL', 'TanStack']
        }
      ],
      education: [
        {
          id: 'edu-401',
          institution: 'University of British Columbia (UBC)',
          degree: 'B.Sc.',
          fieldOfStudy: 'Computer Science',
          graduationYear: '2018'
        }
      ],
      certifications: [],
      rawText: `DEVON BLACKWOOD
Vancouver, BC • devon.blackwood.dev@gmail.com • github.com/devonblackwood

Senior Software Engineer specializing in dense, high-performance desktop-style React and TypeScript web apps, local-first offline synchronization, SQLite/IndexedDB client caches, and Node.js REST/GraphQL APIs.`,
      evidenceChunks: [
        {
          id: 'ev-401',
          section: 'Experience - Clio',
          text: 'Architected offline-capable desktop client for legal document management with local SQLite cache and WebSocket sync. Reduced time-to-render by 65%.',
          confidence: 0.99,
          source: 'resume'
        }
      ]
    },
    notes: [
      {
        id: 'note-401',
        author: 'Marcus Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-08-26',
        text: 'Applied today. His background in offline-first SQLite synchronization and desktop-dense React UI is a 100% textbook match for Job #103. Pushing directly to Phone Screen.',
        pinned: true,
        tags: ['Top Tier Candidate']
      }
    ],
    scorecards: [],
    screeningAnswers: [],
    files: [
      { id: 'f-401', name: 'Devon_Blackwood_Resume.pdf', size: '142 KB', type: 'application/pdf', uploadedAt: '2026-08-26' }
    ],
    relationships: []
  },
  {
    id: 'cand-005',
    name: 'Aiden Tremblay, PMP',
    email: 'aiden.tremblay@outlook.com',
    phone: '+1 (403) 555-0322',
    location: 'Calgary, AB',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    currentRole: 'Senior Cost Estimator & Controls Lead',
    currentCompany: 'Hatch',
    experienceYears: 14,
    tags: ['AACE', 'Capital Cost', 'Primavera P6', 'PMP', 'HeavyBid', 'Class 3/4'],
    rating: 4,
    source: 'Direct Application',
    stage: 'phone_screen',
    stageUpdatedAt: '2026-08-24',
    daysInStage: 4,
    jobId: 'job-104',
    jobTitle: 'Project Controls & Cost Estimator',
    ownerId: 'user-2',
    ownerName: 'Marcus Vance',
    createdAt: '2026-08-18',
    updatedAt: '2026-08-25',
    lastActivity: 'Phone screen booked for Thursday 2:00 PM',
    availability: '2 weeks',
    compensationExpectation: '$110,000 CAD',
    inTalentPool: false,
    isArchived: false,
    parsedResume: {
      summary: 'Senior Project Controls Specialist & Capital Cost Estimator with 14 years preparing AACE International Class 3 and Class 4 estimates for mining, oil & gas, and infrastructure EPCM projects across Canada.',
      extractedSkills: ['AACE International Standards', 'Class 3 & 4 Estimates', 'Primavera P6', 'HeavyBid', 'Earned Value Management (EVM)', 'Risk Analysis @RISK', 'PMP Certified'],
      workHistory: [
        {
          id: 'wh-501',
          company: 'Hatch',
          role: 'Senior Project Controls Estimator',
          location: 'Calgary, AB',
          startDate: '2018-04',
          endDate: 'Present',
          description: 'Managed \$450M portfolio of infrastructure capital estimates. Developed risk-contingency models using @RISK and Monte Carlo simulations.',
          projects: ['BHP Jansen Potash Mine Infrastructure', 'Greenline LRT Utility Relocation'],
          skillsUsed: ['AACE', 'Estimating', 'Primavera P6']
        }
      ],
      education: [
        {
          id: 'edu-501',
          institution: 'University of Calgary',
          degree: 'B.Comm',
          fieldOfStudy: 'Operations Management',
          graduationYear: '2012'
        }
      ],
      certifications: [
        {
          id: 'cert-501',
          name: 'Project Management Professional (PMP)',
          issuer: 'PMI',
          year: '2017',
          isVerified: true
        }
      ],
      rawText: `AIDEN TREMBLAY, PMP
Calgary, AB • aiden.tremblay@outlook.com

Senior Project Controls Specialist & Capital Cost Estimator with 14 years preparing AACE International Class 3 and Class 4 estimates for mining, oil & gas, and infrastructure EPCM projects across Canada.`,
      evidenceChunks: [
        {
          id: 'ev-501',
          section: 'Estimating Skills',
          text: 'Managed \$450M portfolio of infrastructure capital estimates. Developed risk-contingency models using @RISK and Monte Carlo simulations.',
          confidence: 0.94,
          source: 'resume'
        }
      ]
    },
    notes: [],
    scorecards: [],
    screeningAnswers: [],
    files: [
      { id: 'f-501', name: 'Aiden_Tremblay_Estimator_Resume.pdf', size: '215 KB', type: 'application/pdf', uploadedAt: '2026-08-18' }
    ],
    relationships: [
      {
        id: 'rel-501',
        type: 'referred_by',
        targetName: 'David Tremblay',
        targetType: 'team_member',
        targetId: 'user-4',
        description: 'First cousin of David Tremblay (Hiring Manager). Recused from initial screening evaluation.',
        evidence: 'Recruiter intake note and family disclosure.',
        dates: '2026'
      }
    ]
  }
];

// Helper to generate 70+ additional realistic candidate records to exceed the 75+ PRD requirement
const FIRST_NAMES = [
  'Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Charlotte', 'James', 'Amelia',
  'Mateo', 'Sophia', 'Lucas', 'Mia', 'Henry', 'Evelyn', 'Alexander', 'Harper',
  'Sebastian', 'Camila', 'Jack', 'Gianna', 'Owen', 'Abigail', 'Theodore', 'Luna',
  'Julian', 'Ella', 'Wyatt', 'Elizabeth', 'Kiran', 'Priya', 'Farhan', 'Zahra',
  'Dmitri', 'Svetlana', 'Guillaume', 'Brigitte', 'Wei', 'Jing', 'Sunita', 'Rajesh'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Patel', 'Singh', 'Dubois',
  'Bouchard', 'Gagnon', 'Wong', 'Chen', 'Kowalski', 'Morrison', 'MacDonald', 'MacKenzie'
];

const ENGINEERING_ROLES = [
  { role: 'Piping Designer', company: 'Worley', exp: 6, tags: ['Plant 3D', 'CADWorx', 'Alberta', 'Brownfield'], job: 'job-101' },
  { role: 'Senior Mechanical Engineer', company: 'Jacobs', exp: 11, tags: ['P.Eng.', 'APEGA', 'HVAC', 'Industrial'], job: 'job-102' },
  { role: 'Full Stack Engineer', company: 'Benevity', exp: 5, tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'], job: 'job-103' },
  { role: 'Project Controls Specialist', company: 'Fluor', exp: 8, tags: ['Primavera P6', 'AACE', 'EVM', 'Estimating'], job: 'job-104' },
  { role: 'Office Administrator', company: 'Norton Rose', exp: 4, tags: ['Office Management', 'QuickBooks', 'Billing'], job: 'job-105' },
  { role: 'Piping Drafter', company: 'Stantec', exp: 3, tags: ['AutoCAD', 'Isometrics', 'BOM'], job: 'job-101' },
  { role: 'Structural Engineer', company: 'Hatch', exp: 9, tags: ['P.Eng.', 'Bridges', 'Seismic', 'Revit'], job: 'job-106' },
  { role: 'Frontend Developer', company: 'Neo Financial', exp: 4, tags: ['React', 'TypeScript', 'Tailwind', 'CSS'], job: 'job-103' }
];

const STAGES = ['new', 'review', 'phone_screen', 'interview', 'final_interview', 'reference_check', 'offer', 'hired', 'rejected', 'archived'] as const;

for (let i = 6; i <= 85; i++) {
  const fName = FIRST_NAMES[i % FIRST_NAMES.length];
  const lName = LAST_NAMES[(i * 3) % LAST_NAMES.length];
  const roleTemplate = ENGINEERING_ROLES[i % ENGINEERING_ROLES.length];
  const stage = STAGES[i % STAGES.length];
  const rating = (i % 5) + 1;
  const isArchived = stage === 'archived' || stage === 'rejected';
  const inTalentPool = isArchived && (rating >= 3);
  const years = roleTemplate.exp + (i % 5);
  const candId = `cand-${String(i).padStart(3, '0')}`;

  mockCandidates.push({
    id: candId,
    name: `${fName} ${lName}${rating === 5 && roleTemplate.tags.includes('P.Eng.') ? ', P.Eng.' : ''}`,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}@example.ca`,
    phone: `+1 (403) 555-${String(1000 + i * 7).slice(-4)}`,
    location: i % 4 === 0 ? 'Edmonton, AB' : i % 3 === 0 ? 'Vancouver, BC' : 'Calgary, AB',
    avatar: `https://images.unsplash.com/photo-${1500000000000 + (i * 12345678) % 90000000}?w=150&auto=format&fit=crop&q=80`,
    currentRole: roleTemplate.role,
    currentCompany: roleTemplate.company,
    experienceYears: years,
    tags: [...roleTemplate.tags, i % 2 === 0 ? 'Calgary' : 'Edmonton'],
    rating,
    source: i % 3 === 0 ? 'LinkedIn' : i % 4 === 0 ? 'Referral' : 'Direct Application',
    stage,
    stageUpdatedAt: `2026-08-${String(Math.max(1, 28 - (i % 20))).padStart(2, '0')}`,
    daysInStage: (i % 18) + 1,
    jobId: roleTemplate.job,
    jobTitle: roleTemplate.job === 'job-101' ? 'Senior Piping Designer (Brownfield / Plant 3D)'
      : roleTemplate.job === 'job-102' ? 'Lead Mechanical Engineer (HVAC / Industrial Systems)'
      : roleTemplate.job === 'job-103' ? 'Senior Full-Stack Developer (React / Node / TypeScript)'
      : roleTemplate.job === 'job-104' ? 'Project Controls & Cost Estimator'
      : roleTemplate.job === 'job-105' ? 'Operations & Office Generalist'
      : 'Senior Structural Engineer (Bridges & Heavy Civil)',
    ownerId: i % 2 === 0 ? 'user-2' : 'user-1',
    ownerName: i % 2 === 0 ? 'Marcus Vance' : 'Sarah Jenkins',
    createdAt: `2026-0${Math.max(1, (i % 8) + 1)}-15`,
    updatedAt: '2026-08-27',
    lastActivity: `Stage updated to ${stage.replace('_', ' ')} ${i % 7} days ago`,
    stalledWarning: (i % 6 === 0) && (stage === 'review' || stage === 'phone_screen'),
    duplicateOf: i === 42 ? 'cand-001' : undefined,
    isArchived,
    inTalentPool,
    talentPoolAddedAt: inTalentPool ? '2026-05-10' : undefined,
    talentPoolNotes: inTalentPool ? 'Strong potential candidate for upcoming Q4 pipeline needs.' : undefined,
    availability: i % 3 === 0 ? 'Immediate' : '2 weeks',
    compensationExpectation: `$${85 + (years * 3)},000 CAD`,
    parsedResume: {
      summary: `${roleTemplate.role} with ${years}+ years of specialized industry experience across ${roleTemplate.company} and Western Canada industrial projects.`,
      extractedSkills: [...roleTemplate.tags, 'Project Coordination', 'Quality Assurance', 'Technical Documentation'],
      workHistory: [
        {
          id: `wh-${candId}-1`,
          company: roleTemplate.company,
          role: roleTemplate.role,
          location: 'Calgary, AB',
          startDate: '2021-03',
          endDate: 'Present',
          description: `Key technical contributor on major regional facilities. Executed 3D deliverables, modeling, and client reviews.`,
          projects: ['Alberta Energy Infrastructure Revamp'],
          skillsUsed: roleTemplate.tags
        }
      ],
      education: [
        {
          id: `edu-${candId}-1`,
          institution: 'University of Alberta / SAIT',
          degree: 'Bachelor / Diploma',
          fieldOfStudy: 'Engineering / Applied Science',
          graduationYear: `${2026 - years}`
        }
      ],
      certifications: roleTemplate.tags.includes('P.Eng.') ? [
        { id: `cert-${candId}-1`, name: 'Professional Engineer (P.Eng.)', issuer: 'APEGA', year: '2020', isVerified: true }
      ] : [],
      rawText: `${fName} ${lName} - Resume Summary\n${roleTemplate.role} at ${roleTemplate.company} (${years} years experience).\nSkills: ${roleTemplate.tags.join(', ')}`,
      evidenceChunks: [
        {
          id: `ev-${candId}-1`,
          section: 'Summary',
          text: `Extensive hands-on background in ${roleTemplate.tags.join(', ')} on industrial projects in Alberta.`,
          confidence: 0.92,
          source: 'resume'
        }
      ]
    },
    notes: [
      {
        id: `note-${candId}-1`,
        author: 'Marcus Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-08-10',
        text: `Candidate profile reviewed. Background aligns well with ${roleTemplate.role} scope.`,
        pinned: false,
        tags: ['Review Note']
      }
    ],
    scorecards: [],
    screeningAnswers: [],
    files: [
      { id: `f-${candId}-1`, name: `${fName}_${lName}_Resume.pdf`, size: '210 KB', type: 'application/pdf', uploadedAt: '2026-07-20' }
    ],
    relationships: [
      {
        id: `rel-${candId}-1`,
        type: 'shared_employer',
        targetName: roleTemplate.company,
        targetType: 'employer',
        description: `Worked at ${roleTemplate.company}`,
        evidence: 'Employment timeline match',
        dates: '2021 - Present'
      }
    ]
  });
}
