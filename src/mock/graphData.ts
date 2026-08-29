import { KnowledgeGraphData } from '../types/graph';

export const mockKnowledgeGraph: KnowledgeGraphData = {
  nodes: [
    // Core Candidates
    { id: 'cand-001', label: 'Tariq Al-Mansoor, CET', type: 'candidate', subType: 'Senior Piping Designer', metadata: { company: 'Fluor Canada', exp: '12 yrs', rating: '5/5', stage: 'interview' } },
    { id: 'cand-002', label: 'Melissa Chen, P.Eng.', type: 'candidate', subType: 'Lead Mechanical Engineer', metadata: { company: 'Stantec', exp: '10 yrs', rating: '5/5', stage: 'offer' } },
    { id: 'cand-003', label: 'Brendan Gallagher', type: 'candidate', subType: 'Intermediate Piping Designer', metadata: { company: 'Jacobs', exp: '7 yrs', rating: '4/5', stage: 'talent_pool' } },
    { id: 'cand-004', label: 'Devon Blackwood', type: 'candidate', subType: 'Senior Full-Stack Engineer', metadata: { company: 'Clio', exp: '8 yrs', rating: '5/5', stage: 'review' } },
    { id: 'cand-005', label: 'Aiden Tremblay, PMP', type: 'candidate', subType: 'Cost Estimator', metadata: { company: 'Hatch', exp: '14 yrs', rating: '4/5', stage: 'phone_screen' } },
    { id: 'cand-006', label: 'Elena Dubois', type: 'candidate', subType: 'Piping Designer', metadata: { company: 'Worley', exp: '8 yrs', rating: '4/5', stage: 'review' } },

    // Employers
    { id: 'emp-fluor', label: 'Fluor Canada', type: 'employer', metadata: { location: 'Calgary, AB', sector: 'EPCM Heavy Industrial' } },
    { id: 'emp-worley', label: 'Worley', type: 'employer', metadata: { location: 'Calgary, AB', sector: 'Energy & Chemicals' } },
    { id: 'emp-stantec', label: 'Stantec', type: 'employer', metadata: { location: 'Edmonton / Calgary', sector: 'Consulting & Infrastructure' } },
    { id: 'emp-jacobs', label: 'Jacobs', type: 'employer', metadata: { location: 'Calgary, AB', sector: 'Industrial Solutions' } },
    { id: 'emp-hatch', label: 'Hatch', type: 'employer', metadata: { location: 'Calgary, AB', sector: 'Mining & Energy' } },

    // Hiring Team Members
    { id: 'tm-elena', label: 'Elena Rostova, P.Eng.', type: 'team_member', subType: 'Hiring Manager (Mechanical & Piping)', metadata: { email: 'elena.rostova@albertaengineering.ca' } },
    { id: 'tm-david', label: 'David Tremblay', type: 'team_member', subType: 'Hiring Manager (Controls)', metadata: { email: 'david.tremblay@albertaengineering.ca' } },
    { id: 'tm-marcus', label: 'Marcus Vance', type: 'team_member', subType: 'Lead Recruiter', metadata: { email: 'marcus.vance@albertaengineering.ca' } },

    // Major Projects
    { id: 'proj-forthills', label: 'Fort Hills Oil Sands Primary Extraction', type: 'project', metadata: { client: 'Suncor', location: 'Wood Buffalo, AB' } },
    { id: 'proj-surmont', label: 'Surmont SAGD Brownfield Optimization', type: 'project', metadata: { client: 'ConocoPhillips', location: 'Athabasca, AB' } },
    { id: 'proj-icedistrict', label: 'Edmonton ICE District Phase 2 Central Plant', type: 'project', metadata: { client: 'OEG', location: 'Edmonton, AB' } },
    { id: 'proj-jansen', label: 'Jansen Potash Mine Infrastructure', type: 'project', metadata: { client: 'BHP', location: 'Jansen, SK' } },

    // Key Skills & Certifications
    { id: 'skill-plant3d', label: 'AutoCAD Plant 3D', type: 'skill' },
    { id: 'skill-brownfield', label: 'Brownfield Tie-ins', type: 'skill' },
    { id: 'skill-hvac', label: 'Industrial HVAC & Central Plants', type: 'skill' },
    { id: 'skill-react', label: 'React & Local-First Architectures', type: 'skill' },
    { id: 'cert-peng', label: 'APEGA P.Eng. License', type: 'certification' },
    { id: 'cert-cet', label: 'ASET CET Designation', type: 'certification' },

    // Active Jobs
    { id: 'job-101', label: 'Req #101: Senior Piping Designer', type: 'job', metadata: { status: 'Active', department: 'Piping' } },
    { id: 'job-102', label: 'Req #102: Lead Mechanical Engineer', type: 'job', metadata: { status: 'Active', department: 'Mechanical' } },
    { id: 'job-104', label: 'Req #104: Project Controls Estimator', type: 'job', metadata: { status: 'Active', department: 'Project Controls' } }
  ],
  edges: [
    // Tariq Relationships
    { id: 'e-1', source: 'cand-001', target: 'emp-fluor', relationship: 'worked_at', label: 'Senior Designer (2020 - Present)', confidence: 1.0 },
    { id: 'e-2', source: 'cand-001', target: 'emp-worley', relationship: 'worked_at', label: 'Intermediate Designer (2016 - 2020)', confidence: 1.0 },
    { id: 'e-3', source: 'cand-001', target: 'proj-surmont', relationship: 'worked_on', label: 'Tie-in & Laser Scan Lead', confidence: 0.98 },
    { id: 'e-4', source: 'cand-001', target: 'proj-forthills', relationship: 'worked_on', label: 'Primary Extraction Piping', confidence: 0.95 },
    { id: 'e-5', source: 'cand-001', target: 'tm-elena', relationship: 'worked_with', label: 'Reported to Elena at Worley (2017-2019)', confidence: 0.95 },
    { id: 'e-6', source: 'cand-001', target: 'skill-plant3d', relationship: 'has_skill', label: '12 years expertise', confidence: 1.0 },
    { id: 'e-7', source: 'cand-001', target: 'skill-brownfield', relationship: 'has_skill', label: '40+ tie-ins executed', confidence: 1.0 },
    { id: 'e-8', source: 'cand-001', target: 'cert-cet', relationship: 'has_skill', label: 'ASET Registered CET', confidence: 1.0 },
    { id: 'e-9', source: 'cand-001', target: 'job-101', relationship: 'applied_to', label: 'Interview Stage', confidence: 1.0 },

    // Elena Rostova connections
    { id: 'e-10', source: 'tm-elena', target: 'emp-worley', relationship: 'worked_at', label: 'Former Piping Lead (2015 - 2020)', confidence: 1.0 },
    { id: 'e-11', source: 'tm-elena', target: 'proj-forthills', relationship: 'worked_on', label: 'Lead Piping Engineer', confidence: 1.0 },
    { id: 'e-12', source: 'tm-elena', target: 'job-101', relationship: 'held_role', label: 'Hiring Manager for Req', confidence: 1.0 },

    // Melissa Chen connections
    { id: 'e-20', source: 'cand-002', target: 'emp-stantec', relationship: 'worked_at', label: 'Senior Mechanical Eng (2019 - Present)', confidence: 1.0 },
    { id: 'e-21', source: 'cand-002', target: 'proj-icedistrict', relationship: 'worked_on', label: 'Central Plant Engineer', confidence: 0.98 },
    { id: 'e-22', source: 'cand-002', target: 'tm-david', relationship: 'worked_with', label: 'Collaborated at Stantec Edmonton', confidence: 0.92 },
    { id: 'e-23', source: 'cand-002', target: 'cert-peng', relationship: 'has_skill', label: 'APEGA License #98214', confidence: 1.0 },
    { id: 'e-24', source: 'cand-002', target: 'skill-hvac', relationship: 'has_skill', label: '10 years experience', confidence: 1.0 },
    { id: 'e-25', source: 'cand-002', target: 'job-102', relationship: 'applied_to', label: 'Offer Extended Stage', confidence: 1.0 },

    // Brendan Gallagher connections
    { id: 'e-30', source: 'cand-003', target: 'emp-jacobs', relationship: 'worked_at', label: 'Intermediate Designer (2021 - Present)', confidence: 1.0 },
    { id: 'e-31', source: 'cand-003', target: 'skill-plant3d', relationship: 'has_skill', label: '7 years Plant 3D', confidence: 0.95 },
    { id: 'e-32', source: 'cand-003', target: 'job-101', relationship: 'applied_to', label: 'Talent Pool / Re-engagement', confidence: 0.9 },

    // Aiden Tremblay connections
    { id: 'e-40', source: 'cand-005', target: 'emp-hatch', relationship: 'worked_at', label: 'Senior Estimator (2018 - Present)', confidence: 1.0 },
    { id: 'e-41', source: 'cand-005', target: 'proj-jansen', relationship: 'worked_on', label: 'Class 3 Estimator', confidence: 0.95 },
    { id: 'e-42', source: 'cand-005', target: 'tm-david', relationship: 'referred_by', label: 'First Cousin (Family Disclosure)', confidence: 1.0 },
    { id: 'e-43', source: 'cand-005', target: 'job-104', relationship: 'applied_to', label: 'Phone Screen Stage', confidence: 1.0 },

    // Devon Blackwood connections
    { id: 'e-50', source: 'cand-004', target: 'skill-react', relationship: 'has_skill', label: 'Local-first SQLite & React', confidence: 1.0 }
  ]
};
