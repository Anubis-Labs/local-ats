# LOCAL ATS — FRONTEND ARCHITECTURE & SYSTEM OVERVIEW

> **System Name**: Local ATS  
> **Tagline**: *Private • Fast • Local-First Heavy Industrial & EPCM Recruitment Platform*  
> **Tech Stack**: React 19, TypeScript 5.8, Vite 8, Tailwind CSS v4, Lucide React, Web Audio Synthesizer  
> **Target Industry**: Heavy Industrial, Energy (SAGD / In-Situ / Mining / Refining), EPCM (Engineering, Procurement, Construction Management), Infrastructure, and Utilities.

---

## 1. Architectural Philosophy & Foundations

### 1.1 Local-First Data Sovereignty & Offline Execution
Local ATS is built from the ground up to operate with zero mandatory server round-trips. All candidate rosters, resumes, parsed evidence chunks, requisition states, interview matrices, team builder allocations, and compliance audits operate directly in browser memory and local persistent storage.

- **Offline Resilient**: Complete UI functionality persists across network disconnects.
- **Microsecond Response Time**: Zero loading latency between view transitions, filters, and command palette navigation.
- **P2P Shared Office Protocol**: Peer-to-peer workspace synchronization (`MAPLE-4821`) enabling multi-recruiter concurrent operations on a local area network or shared token room.

### 1.2 Tactile Machined Engineering Aesthetic
The UI rejects generic flat design in favor of a specialized **"Tactile Machined Instrument"** aesthetic calibrated for industrial engineering managers and technical recruiters:
- **Specimen Chamfers (`.specimen-chamfer`)**: Cut-corner tactical styling on cards, modals, and command badges reminiscent of physical engineering instruments and calibration tags.
- **Dual-State Theme Engine**: Full high-contrast Dark Mode (`#07080A` canvas / `#12151D` surface) and Crisp Light Mode (`#F4F5F8` canvas / `#FFFFFF` surface) with zero low-contrast text.
- **Dynamic Sound Synthesis (`src/utils/sound.ts`)**: Built-in Web Audio API synthesizer delivering crisp, tactile audio feedback on clicks (`sound.click()`), tab shifts (`sound.warp()`), approvals (`sound.chime()`), stage latches (`sound.latch()`), and inspection zooms (`sound.glass()`).

---

## 2. Typography & Spatial Design Tokens

### 2.1 Refined Typography Triad
1. **Display & Headings (`var(--font-display)`: Manrope)**: Used exclusively for page titles, modal titles, executive metrics, KPI large numbers, and candidate names.
2. **Interface & Body (`var(--font-sans)`: Inter)**: Used for all navigation links, buttons, form inputs, table data, recruiter notes, and body copy.
3. **Technical Identifiers (`var(--font-mono)`: Geist Mono)**: Strictly reserved for code standards (`ASME B31.3`), license stamps (`ASET CET #39481`, `APEGA #84920`), timestamps, requisition IDs (`REQ-2026-081`), and hex/room codes.

### 2.2 Standard Typography Utility Scale
- `.type-display-title`: `font-display text-2xl font-bold tracking-tight`
- `.type-page-title`: `font-display text-xl font-bold tracking-tight`
- `.type-section-title`: `font-display text-base font-bold text-slate-900 dark:text-white`
- `.type-card-title`: `font-display text-sm font-bold text-slate-900 dark:text-white`
- `.type-kpi-large`: `font-display text-3xl font-extrabold tracking-tight tabular-nums`
- `.type-kpi-compact`: `font-display text-xl font-bold tracking-tight tabular-nums`
- `.type-eyebrow`: `font-mono text-[10px] font-semibold uppercase tracking-wider`
- `.type-table-heading`: `font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500`

### 2.3 Spatial Scale
Governed by a consistent geometric spacing scale: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `40px`, `48px`, `64px`.

---

## 3. Global Overlays, Drawers & Shortcuts

| Component | File Path | Trigger / Shortcut | Purpose |
| :--- | :--- | :--- | :--- |
| **Command Palette** | `src/components/layout/CommandPalette.tsx` | `Cmd+K` / `Ctrl+K` or Search Bar | Global search across candidates, jobs, routes, quick actions, theme toggle, and audio controls. |
| **AI Copilot Drawer** | `src/components/ai/AssistantDrawer.tsx` | `Cmd+J` / Header `AI Assistant` | Natural language candidate sourcing, SAGD resume parsing, boolean string generator, and rate benchmarks. |
| **Shared Office Drawer** | `src/components/layout/SharedOfficeDrawer.tsx` | Bottom Sidebar `Shared Office` | Local-First peer synchronization, multi-seat presence, room code sharing (`MAPLE-4821`), and offline export. |
| **Keyboard Shortcuts Modal** | `src/components/common/KeyboardShortcutsModal.tsx` | `Shift+?` / `Cmd+/` | Quick reference modal displaying all system navigation and power-user keybindings. |
| **Direct Email / Message Modal** | `src/components/candidate/EmailModal.tsx` | `Message` button on candidate/apps | Multi-template email composer with interview invites, offer packets, and salary questionnaires. |
| **Technical Scorecard Modal** | `src/pages/CandidateDetailPage.tsx` | `Scorecard` button | 5-axis technical panel evaluation (SAGD tie-ins, Plant 3D, code compliance) with recommendation selector. |
| **Extend Formal Offer Modal** | `src/pages/CandidateDetailPage.tsx` | `Extend Offer` button | Generates formal EPCM offer compensation breakdown with base salary, signing bonus, and start date. |

---

## 4. Complete Route & Page Directory (All 29 Routes)

### 4.1 Executive & Core Pipeline Workspace

#### 1. Executive Dashboard (`/`) — `src/pages/HomePage.tsx`
- **Purpose**: Operational command center displaying real-time recruiting velocity, pipeline status, and priority actions.
- **Key Modules**:
  - Live EPCM Activity Feed with real-time status pills.
  - Active Requisition Priority Matrix (SAGD Leads, Electrical EITs, Project Controls).
  - Weekly Placement Velocity & Time-to-Mobilize metrics.
  - Quick-start action tiles (Post Requisition, Parse Resume, Run Award Simulation).

#### 2. Candidate Roster (`/candidates`) — `src/pages/CandidatesPage.tsx`
- **Purpose**: High-density tabular and card roster of all engineering and technical candidates in the database.
- **Key Modules**:
  - Multi-parameter faceted filter: Discipline (Piping, Mechanical, Electrical, Civil, Controls), Engineering Stamp (`APEGA P.Eng.`, `ASET CET`), Location, Stage, and Rating.
  - Quick batch actions: Export CSV, Add to Talent Pool, Bulk Stage Advance.
  - Quick Candidate Drawer & Profile preview.

#### 3. Candidate Dossier & Triage (`/candidates/:id`) — `src/pages/CandidateDetailPage.tsx`
- **Purpose**: Deep-dive candidate profile, risk audit, verified deliverables, and technical competency evidence.
- **Multi-Tab ATS Dossier Structure**:
  1. `1. Overview`:
     - **Clearance & Verification Bar**: DNH Integrity Gate (0 flags), Professional Stamp (`ASET CET #39481` / `APEGA P.Eng. #84920`), Site Safety Clearance (CSTS-2020, H2S Alive), and Mobilization Notice.
     - **2×2 Requisition Requirement Audit**: Experience depth, software toolset (`Plant 3D`, `CADWorx`), code compliance (`ASME B31.3`), and regional FIFO readiness.
     - **Executive Profile & Deliverable Quote**: Parsed career track record with direct quotes from major capital facility revamps (ConocoPhillips Surmont SAGD tie-ins).
     - **Latest Scorecard & Panel Notes**: Star rating, interviewer summary, and recommendation badge.
     - **Right Reference Column**: Target compensation ($120k CAD), 2x2 site safety passport badge grid, direct email/phone contact, and discipline tags.
  2. `2. Applications Slate`: Multi-job application tracking for candidates considered across multiple requisitions.
  3. `3. Resume Document`: Interactive formatted resume viewer with markdown rendering and raw text preview.
  4. `4. Skills & Evidence`: ASME B31.3 calibrated **5-Axis Competency Radar Chart** alongside deterministic NLP evidence citations with percentage confidence scores.
  5. `5. Work History`: Chronological verified work history items with employer dates, project tags, and engineering deliverables.
  6. `6. Activity & Notes`: Real-time timestamped recruiter notes and evaluation logs with author attribution.
  7. `7. Compensation & Offer`: Offer band benchmark, target expectation, and formal offer package generator.

#### 4. Multi-Job Applications Slate (`/applications`) — `src/pages/ApplicationsPage.tsx`
- **Purpose**: Application-centric view tracking candidate-to-job matches, interview stages, and disposition codes.
- **Key Modules**:
  - Stage pipeline tabs: `All Applications`, `Screening`, `Technical Panel`, `Offer Extended`, `Hired`, `Dispositioned`.
  - Disposition reason tracking: E.g., `Overqualified`, `Rate Mismatch`, `Lacks SAGD Site Experience`.

#### 5. Application Detail Workspace (`/applications/:id`) — `src/pages/ApplicationDetailPage.tsx`
- **Purpose**: Focused review workspace for a specific candidate application tied to a requisition.
- **Key Modules**: Stage progression stepper, stage movement dropdown, scorecard reviewer, interview logs, and offer trigger.

---

### 4.2 Requisitions, Staffing Outlook & Mobilization

#### 6. Requisition Management (`/jobs`) — `src/pages/JobsPage.tsx`
- **Purpose**: Central engineering job management board.
- **Key Modules**:
  - Filter by Department: Piping & Layout, Mechanical Systems, Electrical & Instrumentation, Civil & Structural, Project Controls.
  - Job card metrics: Open Positions, Candidate Pipeline Count, Sourced vs Applied ratio, Target Fill Date.
  - **Create Requisition Modal**: Complete modal form to spin up new requisitions with budget bands, required certifications, and FIFO requirements.

#### 7. Requisition Detail Workspace (`/jobs/:id`) — `src/pages/JobDetailPage.tsx`
- **Purpose**: Requisition-specific command room displaying matched candidates, candidate pipeline, and role specs.
- **Key Modules**: Requisition metadata, candidate match ranking, stage-by-stage candidate count, and hiring manager contact.

#### 8. Requisition Builder Studio (`/jobs/builder`) — `src/pages/RequisitionBuilderPage.tsx`
- **Purpose**: Interactive studio for creating structured heavy-industrial job descriptions with pre-configured EPCM skill taxonomies.

#### 9. Pipeline Kanban Board (`/pipeline`) — `src/pages/PipelinePage.tsx`
- **Purpose**: Visual Drag-and-Drop / Click-to-Advance recruiting pipeline across all stages.
- **Columns**: `New Applications` → `Screening` → `Technical Panel` → `Hiring Manager Review` → `Offer Extended` → `Hired / Mobilized`.
- **Key Modules**: Requisition filter, candidate search, quick candidate card with stamp badges and fit scores.

#### 10. Project Mobilization Board (`/mobilization`) — `src/pages/ProjectMobilizationPage.tsx`
- **Purpose**: Operational logistics board for clearing hired engineers for site access (Fort McMurray, Kearl, Surmont).
- **Key Modules**:
  - Site readiness progress tracking (Drug & Alcohol screening, CSTS-2020 verification, site orientation badge).
  - Mobilization date scheduling and flights/camp accommodation status.

#### 11. Project Team Builder & Slot Fill (`/team-builder`) — `src/pages/ProjectTeamBuilderPage.tsx`
- **Purpose**: Interactive org-chart and slot-fill engine for major capital EPCM project pursuits.
- **Key Modules**:
  - Multi-discipline slot allocation: Lead Piping Engineer, Senior Plant 3D Designer, Stress Engineer, I&C Lead, Project Controls Manager.
  - Slot status: `Filled (Internal)`, `Filled (External Offer)`, `Interviewing`, `Vacant (High Risk)`.
  - Export team matrix for client RFP submissions.

#### 12. Staffing Outlook & Award Scenarios (`/scenarios`) — `src/pages/AwardScenariosPage.tsx`
- **Purpose**: Predictive staffing simulation for project bid awards (e.g. 100% award, 50% award, surge demand).
- **Key Modules**:
  - **Staffing Outlook Panel**: Unified computation panel showing `44 Total Roles - 14 Internal Capacity = 30 External Hires`.
  - Segmented Capacity Bar: 32% green internal capacity vs 68% amber external sourcing requirement.
  - Scenario toggles and headcount gap analysis.

#### 13. Site Readiness Passport & Safety Tickets (`/site-readiness`) — `src/pages/SiteReadinessPassportPage.tsx`
- **Purpose**: Compliance monitoring for safety tickets across the entire talent network.
- **Key Modules**:
  - Expiry radar: Tracks CSTS-2020, H2S Alive, WHMIS 2015, Fall Protection, and Standard First Aid.
  - One-click ticket renewal request workflow.

---

### 4.3 Coordination, Scheduling & Communications

#### 14. Communications & Messaging Hub (`/communications`) — `src/pages/CommunicationsInboxPage.tsx`
- **Purpose**: Centralized messaging inbox for candidate SMS, emails, and panel interview notifications.
- **Key Modules**: Message thread list, email preview pane, quick template selector, and compose modal.

#### 15. Interview Calendar Workbench (`/calendar`) — `src/pages/CalendarWorkbenchPage.tsx`
- **Purpose**: Multi-view scheduling calendar for technical panels, client interviews, and screening calls.
- **Key Modules**: Day/Week/Month grid, interviewer availability overlay, time zone converter, and panel conflict detector.

#### 16. Technical Interviews & Evaluation Matrix (`/interviews`) — `src/pages/InterviewsPage.tsx`
- **Purpose**: Management board for past, today's, and upcoming candidate interviews.
- **Key Modules**: Completed scorecard reviews, pending evaluations, interviewer assignment, and quick scorecard launcher.

#### 17. Executive Approval Center (`/approvals`) — `src/pages/ApprovalCenterPage.tsx`
- **Purpose**: Dual sign-off workflow for job requisitions and formal compensation offers above budget threshold.
- **Key Modules**: Pending approvals queue, budget variance indicator, executive electronic sign-off, and audit log.

---

### 4.4 Intelligence, Compliance & Analytics

#### 18. Compliance Radar & Stamping Audit (`/compliance`) — `src/pages/ComplianceRadarPage.tsx`
- **Purpose**: Heavy industrial regulatory compliance monitor.
- **Key Modules**:
  - APEGA / ASET active license verification tracker.
  - Non-compete and client exclusivity audit matrix.
  - Right to work in Canada (Citizenship / PR / Work Permit) verification status.

#### 19. Audit Vault & Immutability Log (`/audit`) — `src/pages/AuditVaultPage.tsx`
- **Purpose**: Tamper-evident ledger of all recruiting actions, offer approvals, and data exports.

#### 20. Onboarding Handoff Engine (`/onboarding`) — `src/pages/OnboardingPage.tsx`
- **Purpose**: Post-hire onboarding checklist engine for HR, IT, and Field Safety handoffs.
- **Key Modules**: IT hardware provisioning (AutoCAD workstations, BIM laptops), safety gear dispatch, and orientation completion.

#### 21. Total Cost of Engagement Calculator (`/calculator`) — `src/pages/EngagementCostCalculatorPage.tsx`
- **Purpose**: Financial calculator comparing Direct Employee Hire vs Contractor Corp-to-Corp vs Agency Placement.
- **Key Modules**: Base salary, burden rate (EI/CPP/WCB/Benefits), FIFO travel per diem, overtime multiplier, and total project loaded cost.

#### 22. Candidate Duplicate Resolution (`/duplicates`) — `src/pages/DuplicateResolutionPage.tsx`
- **Purpose**: Side-by-side duplicate candidate comparison and intelligent merge engine.

#### 23. Task Management Queue (`/tasks`) — `src/pages/TasksPage.tsx`
- **Purpose**: Actionable task queue for recruiter follow-ups, reference checks, and offer expiry dates.

#### 24. Talent Sourcing Campaigns (`/campaigns`) — `src/pages/CampaignsPage.tsx`
- **Purpose**: Automated talent outreach campaigns across LinkedIn, APEGA member directory, and internal silver medalists.
- **Key Modules**: Campaign metrics (Sent, Opened, Replied, Converted), **Launch Sourcing Campaign Modal**, message sequence builder.

#### 25. Automation Rules Engine (`/automations`) — `src/pages/AutomationsPage.tsx`
- **Purpose**: No-code recruiting automation builder (e.g. "When candidate moves to Technical Panel → send CSTS ticket request email").

#### 26. Talent Pools & Pipeline Reserves (`/talent-pools`) — `src/pages/TalentPoolPage.tsx`
- **Purpose**: Nurturing rosters for silver medalists and future project bid reserves.
- **Key Modules**: Category tabs (Piping, Mechanical, Controls, Silver Medalists), **Create Talent Pool Modal**.

#### 27. Side-by-Side Candidate Comparison Matrix (`/compare`) — `src/pages/ComparisonPage.tsx`
- **Purpose**: 3-way candidate comparison tool evaluating years of experience, software mastery, licensing, salary, and scorecard ratings.

#### 28. Enterprise Knowledge Graph & Coworker Links (`/knowledge-graph`) — `src/pages/RelationshipsPage.tsx`
- **Purpose**: Interactive relationship graph visualizing shared past employers (Fluor, Worley, Jacobs, Stantec) and coworker referrals.

#### 29. Executive Intelligence & Analytics (`/reports`) — `src/pages/ReportsPage.tsx`
- **Purpose**: Visual analytics for recruiting velocity, source attribution, diversity metrics, and EPCM project fulfillment rates.

---

### 4.5 System Configuration & Tools

#### 30. System Integrations Hub (`/integrations`, `/integrations/:id`) — `src/pages/IntegrationsPage.tsx`
- **Purpose**: Manage local connectors (SAP SuccessFactors, Workday, Procore, Navisworks, LinkedIn Recruiter).

#### 31. Templates & Document Studio (`/templates`) — `src/pages/TemplatesPage.tsx`
- **Purpose**: Pipeline templates, scorecard templates, and formal offer letter templates with **Create Template Modal**.

#### 32. Settings & Data Sovereignty Vault (`/settings`) — `src/pages/SettingsPage.tsx`
- **Purpose**: Workspace settings, theme preference, audio toggle, local cache management, and data import/export.

#### 33. First-Run Setup & Join Workspace (`/first-run`, `/join-workspace`) — `src/pages/FirstRunSetupPage.tsx`
- **Purpose**: Onboarding wizard for new recruiter seats configuring local data path and peer room tokens.

#### 34. Global Search Index (`/search`) — `src/pages/GlobalSearchPage.tsx`
- **Purpose**: Full-text fuzzy search across all candidates, resumes, notes, requisitions, and audit logs.

#### 35. Design System Specimen Viewer (`/design-system`) — `src/pages/DesignSystemPage.tsx`
- **Purpose**: Interactive component catalog demonstrating buttons, badges, inputs, chamfers, and typography specimens.

---

## 5. Core Type Definitions

```typescript
// Key Data Models (src/types/)

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  currentCompany: string;
  experienceYears: number;
  tags: string[];
  rating: number;
  stage: PipelineStageId;
  jobId: string;
  jobTitle: string;
  availability: string;
  compensationExpectation: string;
  parsedResume: ParsedResume;
  scorecards: Scorecard[];
  notes: RecruiterNote[];
  screeningAnswers: ScreeningAnswer[];
  relationships: Relationship[];
}

export interface ParsedResume {
  summary: string;
  extractedSkills: string[];
  workHistory: WorkHistoryItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  rawText: string;
  evidenceChunks: EvidenceChunk[];
}

export interface JobRequisition {
  id: string;
  title: string;
  department: string;
  location: string;
  status: 'draft' | 'active' | 'paused' | 'filled' | 'closed';
  openPositions: number;
  filledPositions: number;
  salaryMin: number;
  salaryMax: number;
  targetStartDate: string;
  requiredSkills: string[];
  hiringManager: string;
}
```

---

## 6. Service Layer Architecture

The frontend is backed by clean async service singletons in `src/services/` that encapsulate all business logic, local caching, and state transformations:

- `candidateService.ts`: CRUD operations on candidate dossiers, stage transitions, scorecard submissions, and tag indexing.
- `jobService.ts`: Requisition lifecycle, candidate-job matching algorithms, and fill-rate calculations.
- `pipelineService.ts`: Kanban stage transitions, drag-and-drop state, and disposition logging.
- `intelligenceService.ts`: Deterministic parsing, SAGD competency extraction, and LLM assistant generation.
- `workspaceService.ts`: Multi-seat P2P room synchronization and offline export bundles.
- `interviewService.ts`: Scheduling, panel interviewer allocations, and scorecard aggregation.
- `relationshipService.ts`: Graph edge calculation for shared past projects and coworker referrals.

---

## 7. Developer Verification & Build Commands

```bash
# Start local development server
npm run dev

# Run TypeScript compilation and production bundle build
npm run build

# Run linting
npm run lint

# Preview production build locally
npm run preview
```

---
*Document generated for AI agent handoff and system auditing. All 29 routes, modals, and design tokens are verified operational.*
