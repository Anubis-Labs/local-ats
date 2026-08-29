import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Radio,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  Settings,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Search,
  Code,
  Key,
  Layers,
  Send,
  Lock,
  Zap,
  Check,
  Clock,
  ArrowRight,
  Database,
  Briefcase,
  Layers3,
  Compass,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { Badge, Button, Input, Modal, Textarea, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';
import {
  LinkedInLogo,
  IndeedLogo,
  ZipRecruiterLogo,
  JobBankLogo,
  WordPressLogo,
  OpenAssetLogo,
  EntraLogo,
  SharePointLogo,
  GoogleWorkspaceLogo,
  BoxLogo,
  DropboxLogo,
  DeltekLogo,
  PrimaveraLogo,
  SalesforceLogo,
  DynamicsLogo,
  SmartsheetLogo,
  DayforceLogo,
  WorkdayLogo,
  UkgLogo,
  SuccessFactorsLogo,
  OracleHcmLogo,
  FieldglassLogo,
  DocuSignLogo,
  CertnLogo,
  CheckrLogo,
  XrefLogo,
  MyCredsLogo,
  ApegaLogo,
  AcsaLogo,
  EscLogo,
  LmsLogo,
  SlackLogo,
  TeamsLogo,
  PowerAutomateLogo,
  VidCruiterLogo,
  CalendlyLogo,
  TwilioLogo,
  PowerBiLogo,
  AutodeskLogo,
  BullhornLogo,
  GreenhouseLogo,
  LeverLogo,
  IcimsLogo,
  ApiLogo
} from '../components/common/BrandLogos';

interface IntegrationItem {
  id: string;
  name: string;
  category: 'sourcing' | 'identity_storage' | 'project_demand' | 'contingent_hris' | 'background_screening' | 'comms_analytics' | 'migrations';
  description: string;
  badge: string;
  status: 'connected' | 'syncing' | 'disconnected' | 'available';
  lastSync: string;
  syncStats?: string;
  usedIn: string;
  logo: React.FC<{ className?: string }>;
  authFields: { label: string; placeholder: string; isSecret?: boolean }[];
  features: string[];
}

export const IntegrationsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationItem | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestToolName, setRequestToolName] = useState('');
  const [requestCategory, setRequestCategory] = useState('ERP & Project Accounting');
  const [requestUseCase, setRequestUseCase] = useState('');
  const [requestPriority, setRequestPriority] = useState('Standard - Q4 Requirement');
  const [requestDocUrl, setRequestDocUrl] = useState('');

  const handleRequestIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestToolName.trim()) return;
    sound.chime();
    setShowRequestModal(false);
    toast(
      'Integration Request Dispatched',
      `Submitted request for "${requestToolName}" to EPCM Platform Engineering queue.`,
      'success'
    );
    setRequestToolName('');
    setRequestUseCase('');
    setRequestDocUrl('');
  };

  const { toast } = useToast();
  const navigate = useNavigate();

  const [integrationsList, setIntegrationsList] = useState<IntegrationItem[]>([
    // 1. PRIMARY EPCM CORE STACK
    {
      id: 'entra_id',
      name: 'Microsoft Entra ID / SSO & SCIM',
      category: 'identity_storage',
      description: 'Secure workspace access through Microsoft Entra ID with automatic user provisioning, deactivation and role assignment.',
      badge: 'Live Directory Sync',
      status: 'connected',
      lastSync: 'Synced 5m ago',
      syncStats: '32 users governed • 4 access groups synchronized',
      usedIn: 'Workspace Access, User Governance & Role Assignment',
      logo: EntraLogo,
      authFields: [
        { label: 'Tenant ID', placeholder: '9a8b7c6d-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
        { label: 'Application (Client) ID', placeholder: '1e2f3a4b-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
        { label: 'SCIM Bearer Token', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Single Sign-On', 'SCIM User Provisioning', 'Group-to-Role Mapping', 'Conditional Access']
    },
    {
      id: 'sharepoint',
      name: 'SharePoint / OneDrive Document Intelligence',
      category: 'identity_storage',
      description: 'Automatically ingest resumes, certificates, portfolios and signed documents from controlled SharePoint and OneDrive locations.',
      badge: 'Watching 4 Libraries',
      status: 'connected',
      lastSync: 'Synced 18m ago',
      syncStats: '286 recruiting documents synchronized',
      usedIn: 'Candidate Dossiers, Certificate Ingestion & Offer Archival',
      logo: SharePointLogo,
      authFields: [
        { label: 'SharePoint Site URL', placeholder: 'https://albertaeng.sharepoint.com/sites/talent' },
        { label: 'Document Library ID', placeholder: 'lib_epcm_resumes_2026' }
      ],
      features: ['Resume Folder Monitoring', 'Versioned Document Ingestion', 'Evidence Source Linking', 'Signed Offer Archival']
    },
    {
      id: 'deltek',
      name: 'Deltek Vantagepoint Project & Resource Sync',
      category: 'project_demand',
      description: 'Connect project opportunities, employee profiles, resource plans and project codes to recruitment demand.',
      badge: 'Project Intelligence Live',
      status: 'connected',
      lastSync: 'Synced 30m ago',
      syncStats: '12 upcoming staffing gaps detected across 5 projects',
      usedIn: 'Requisition Builder & Mobilization Demand Planning',
      logo: DeltekLogo,
      authFields: [
        { label: 'Deltek Server URL', placeholder: 'https://vantagepoint.albertaeng.com/api' },
        { label: 'Integration Client Secret', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Opportunity-to-Requisition', 'Project Code Synchronization', 'Employee Profile Import', 'Resource Availability Signals']
    },
    {
      id: 'primavera',
      name: 'Oracle Primavera P6 / Primavera Cloud',
      category: 'project_demand',
      description: 'Translate project milestones, resource assignments and planned mobilization dates into forward-looking recruitment requirements.',
      badge: 'Mobilization Demand Sync',
      status: 'connected',
      lastSync: 'Synced 1h ago',
      syncStats: '8 critical roles required within the next 90 days',
      usedIn: 'Project Mobilization Board & Hiring Deficit Alerts',
      logo: PrimaveraLogo,
      authFields: [
        { label: 'Primavera Cloud Endpoint', placeholder: 'https://primavera.oraclecloud.com/epcm' },
        { label: 'Database Instance Name', placeholder: 'P6_ALBERTA_PROD' }
      ],
      features: ['Schedule Milestone Monitoring', 'Role Demand Forecasting', 'Project Start Alerts', 'Resource Gap Detection']
    },
    {
      id: 'fieldglass',
      name: 'SAP Fieldglass / Beeline Contingent Workforce',
      category: 'contingent_hris',
      description: 'Coordinate contract requisitions, staffing agencies, candidate submissions, rate cards and worker assignments.',
      badge: 'Vendor Network Connected',
      status: 'connected',
      lastSync: 'Synced 2h ago',
      syncStats: '7 contract roles open across 3 approved vendors',
      usedIn: 'Contractor Requisitions & Agency Submissions',
      logo: FieldglassLogo,
      authFields: [
        { label: 'Fieldglass API Gateway', placeholder: 'https://api.fieldglass.net/v1/alberta' },
        { label: 'API Security Token', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Agency Submission Intake', 'Rate Card Validation', 'Contractor Assignment Handoff', 'Supplier Status Tracking']
    },
    {
      id: 'dayforce',
      name: 'Dayforce HCM & Payroll',
      category: 'contingent_hris',
      description: 'Create employee records, synchronize position information and track onboarding completion after a candidate is hired.',
      badge: 'Ready for Employee Handoff',
      status: 'connected',
      lastSync: 'Synced 22m ago',
      syncStats: '3 new hires awaiting Dayforce provisioning',
      usedIn: 'Post-Offer Onboarding & Payroll Provisioning',
      logo: DayforceLogo,
      authFields: [
        { label: 'Dayforce Company Namespace', placeholder: 'albertaengineering_ca' },
        { label: 'Web Services User', placeholder: 'svc_ats_integration' },
        { label: 'Web Services Password', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Employee Profile Creation', 'Position & Department Sync', 'Onboarding Status', 'Payroll Handoff']
    },
    {
      id: 'certn',
      name: 'Certn / Sterling Canadian Background Screening',
      category: 'background_screening',
      description: 'Initiate Canadian criminal record, identity, employment and education checks without leaving the candidate application.',
      badge: 'Live Screening Workflow',
      status: 'connected',
      lastSync: 'Synced 14m ago',
      syncStats: '2 screenings in progress • 1 requires review',
      usedIn: 'Candidate Application Screening & Compliance Radar',
      logo: CertnLogo,
      authFields: [
        { label: 'Certn API Key', placeholder: 'certn_live_sec_84920481' }
      ],
      features: ['Canadian Criminal Record Checks', 'Identity Verification', 'Employment Verification', 'Driver Abstract Status']
    },
    {
      id: 'xref',
      name: 'Xref Automated Reference Checking',
      category: 'background_screening',
      description: 'Send structured reference requests, monitor referee completion and return results directly to the candidate dossier.',
      badge: '4 References Pending',
      status: 'connected',
      lastSync: 'Synced 35m ago',
      syncStats: '11 references completed this month',
      usedIn: 'Candidate Dossier & Reference Gate',
      logo: XrefLogo,
      authFields: [
        { label: 'Xref Client Token', placeholder: 'xref_ca_live_948102' }
      ],
      features: ['Automated Reference Requests', 'Referee Reminders', 'Structured Reports', 'Completion Tracking']
    },
    {
      id: 'mycreds',
      name: 'MyCreds Canadian Academic Verification',
      category: 'background_screening',
      description: 'Accept candidate-shared, digitally certified transcripts, diplomas and academic credentials from participating Canadian institutions.',
      badge: 'Credential Wallet Connected',
      status: 'connected',
      lastSync: 'Synced 2h ago',
      syncStats: '6 academic credentials verified',
      usedIn: 'Candidate Credentials & Education Review',
      logo: MyCredsLogo,
      authFields: [
        { label: 'Organization API Key', placeholder: 'mycreds_org_ab_eng_849' }
      ],
      features: ['Graduation Verification', 'Certified Transcript Intake', 'Tamper-Evident Credentials', 'Candidate-Authorized Sharing']
    },
    {
      id: 'twilio_phone',
      name: 'Twilio / RingCentral Candidate Communications',
      category: 'comms_analytics',
      description: 'Send interview reminders and candidate updates by SMS while preserving replies and delivery status in the activity timeline.',
      badge: 'Two-Way Messaging Active',
      status: 'connected',
      lastSync: 'Synced 8m ago',
      syncStats: '24 candidate conversations active',
      usedIn: 'Communications Inbox & Interview Reminders',
      logo: TwilioLogo,
      authFields: [
        { label: 'Account SID', placeholder: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
        { label: 'Auth Token', placeholder: '••••••••••••••••', isSecret: true },
        { label: 'Dedicated Outbound Number', placeholder: '+1 (403) 555-0199' }
      ],
      features: ['Two-Way SMS', 'Delivery & Failure Status', 'Click-to-Call', 'Communication Opt-Outs']
    },
    {
      id: 'power_bi',
      name: 'Power BI / Microsoft Fabric Analytics',
      category: 'comms_analytics',
      description: 'Publish governed recruiting data to operational dashboards and executive hiring reports.',
      badge: 'Dataset Refreshed 18m Ago',
      status: 'connected',
      lastSync: 'Synced 18m ago',
      syncStats: '6 dashboards consuming recruiting data',
      usedIn: 'Reports & Executive Dashboards',
      logo: PowerBiLogo,
      authFields: [
        { label: 'Power BI Workspace ID', placeholder: 'ws_epcm_talent_analytics_prod' },
        { label: 'Dataset Refresh Service Principal', placeholder: 'sp_powerbi_ats_reader' }
      ],
      features: ['Scheduled Dataset Refresh', 'Executive Hiring Dashboards', 'Row-Level Security', 'Excel Analysis Export']
    },
    {
      id: 'openasset',
      name: 'OpenAsset AEC Asset Hub',
      category: 'sourcing',
      description: 'Connect AEC employee resumes, project experience, photography and project credentials directly into candidate dossiers.',
      badge: 'AEC Digital Asset',
      status: 'connected',
      lastSync: 'Synced 45m ago',
      syncStats: '124 Historical EPCM Project Portfolios Synced',
      usedIn: 'Candidate Dossiers & Project Experience Matching',
      logo: OpenAssetLogo,
      authFields: [
        { label: 'OpenAsset Domain Instance', placeholder: 'albertaeng.openasset.com' },
        { label: 'REST API Key', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Project Portfolio Image Extraction', 'Past Project Credit Linking', 'AEC Standard Resume Export', 'Credentials Linking']
    },

    // 2. CLEANED STATUTORY & SAFETY REGISTRIES
    {
      id: 'apega',
      name: 'APEGA & ASET Accreditation Registry',
      category: 'background_screening',
      description: 'Verification connector for Association of Professional Engineers and Geoscientists of Alberta (APEGA P.Eng.) and ASET CET licensing status.',
      badge: 'Statutory Registry Status',
      status: 'connected',
      lastSync: 'Synced 5m ago',
      syncStats: '34 Active P.Eng. and 51 CET licenses verified in good standing',
      usedIn: 'Candidate Dossier & Compliance Radar',
      logo: ApegaLogo,
      authFields: [
        { label: 'Registry API Gateway', placeholder: 'https://registry.apega.ca/api/v2/verify' },
        { label: 'Client Certificate Passphrase', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Public Registry Status', 'Designation & Membership Type', 'Published Conditions or Restrictions', 'Last Verification Timestamp']
    },
    {
      id: 'acsa_esc',
      name: 'Safety & Site Readiness Credentials (ACSA & ESC)',
      category: 'background_screening',
      description: 'Direct verification for CSTS-2020, H2S Alive, Confined Space Entry, Fall Protection, and Oil Sands site safety orientations.',
      badge: 'Official Safety Registry',
      status: 'connected',
      lastSync: 'Synced 8m ago',
      syncStats: '85 Safety Tickets Verified & Tracked for Expiry',
      usedIn: 'Compliance Radar & Project Mobilization',
      logo: EscLogo,
      authFields: [
        { label: 'ACSA / ESC Corporate Portal ID', placeholder: 'ESC-CORP-48201' },
        { label: 'Verification API Key', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['H2S Alive & CSTS-2020 Validation', 'Automated 30-Day Expiry Alerts', 'Site Orientation Compliance Badging']
    },
    {
      id: 'lms_training',
      name: 'PowerSchool & Enterprise Safety LMS',
      category: 'background_screening',
      description: 'Connect internal learning management systems to verify pre-site safety course completions, WHMIS-2015, and compliance modules.',
      badge: 'LMS SCORM / xAPI',
      status: 'connected',
      lastSync: 'Synced 1h ago',
      syncStats: 'Course Completion Certificates Synced',
      usedIn: 'Onboarding Handoff & Safety Clearance',
      logo: LmsLogo,
      authFields: [
        { label: 'LMS Gateway URL', placeholder: 'https://learning.albertaeng.com/api/v2' },
        { label: 'Service Principal Secret', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['WHMIS-2015 Training Status', 'Pre-Site Safety Quiz Results', 'Automated Certificate Attachments']
    },

    // 3. CLEANED DEVELOPER & EXTENSIBILITY TOOLS
    {
      id: 'webhooks',
      name: 'Custom REST API & Outbound Webhooks',
      category: 'comms_analytics',
      description: 'Deploy webhooks for candidate stage changes, offer extensions, and automated JSON payloads to external data lakes and proprietary tools.',
      badge: 'Developer SDK',
      status: 'connected',
      lastSync: 'Synced 1m ago',
      syncStats: '3 Active Webhook Subscriptions (100% 200 OK)',
      usedIn: 'External Webhooks & System Integrations',
      logo: ApiLogo,
      authFields: [
        { label: 'Outbound Webhook URL', placeholder: 'https://api.albertaengineering.ca/ats/events' },
        { label: 'HMAC Signature Secret', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Read-Only Reporting API', 'HMAC-Signed Webhooks', 'Service Account Access', 'OpenAPI 3.1 Documentation', 'Event Delivery Logs']
    },

    // 4. SECONDARY RECRUITING & NOTIFICATION BOT CONNECTORS
    {
      id: 'slack_notifications',
      name: 'Slack Recruiting Channel Bot',
      category: 'comms_analytics',
      description: 'Dedicated Slack app posting candidate stage movements, new 95%+ match alerts, and hiring manager scorecard completion pings.',
      badge: 'Slack Webhook Bot',
      status: 'connected',
      lastSync: 'Synced 1m ago',
      syncStats: '#recruiting-alerts & #piping-hires channels active',
      usedIn: 'Slack Channels (#recruiting-alerts)',
      logo: SlackLogo,
      authFields: [
        { label: 'Slack Bot User OAuth Token', placeholder: 'xoxb-948102948-xxxx-xxxx' },
        { label: 'Target Alert Channel', placeholder: '#recruiting-epcm-live' }
      ],
      features: ['Instant Stage Move Pings', 'Candidate Fit Digest Cards', 'Interactive Quick-Approve Buttons']
    },
    {
      id: 'teams_notifications',
      name: 'Microsoft Teams Workflow Bot',
      category: 'comms_analytics',
      description: 'Dedicated Microsoft 365 Teams bot for enterprise executive offer approvals, interview reminders, and hiring manager briefing packs.',
      badge: 'Teams Enterprise Bot',
      status: 'connected',
      lastSync: 'Synced 2m ago',
      syncStats: 'Integrated into Calgary & Edmonton Teams Workspaces',
      usedIn: 'Microsoft Teams & Approval Center',
      logo: TeamsLogo,
      authFields: [
        { label: 'Teams Incoming Webhook URL', placeholder: 'https://albertaeng.webhook.office.com/webhookb2/...' },
        { label: 'Tenant ID', placeholder: '9a8b7c6d-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }
      ],
      features: ['Executive Sign-Off Adaptive Cards', 'Video Panel Room Auto-Creation', 'Direct Hiring Manager Briefing Pack Delivery']
    },
    {
      id: 'google_workspace',
      name: 'Google Workspace: Gmail, Calendar & Meet',
      category: 'comms_analytics',
      description: 'Full suite integration for non-Microsoft teams: Gmail candidate threads, Google Calendar interview scheduling, and Google Meet rooms.',
      badge: 'Google Workspace API',
      status: 'connected',
      lastSync: 'Synced 6m ago',
      syncStats: 'Google Meet Video Rooms & Calendar Free/Busy Active',
      usedIn: 'Communications Inbox & Calendar Workbench',
      logo: GoogleWorkspaceLogo,
      authFields: [
        { label: 'Google OAuth Client ID', placeholder: '984019284-xxxx.apps.googleusercontent.com' },
        { label: 'Client Secret', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Gmail Bidirectional Threading', 'Google Meet Room Creation', 'Calendar Conflict Resolution']
    },
    {
      id: 'power_automate',
      name: 'Microsoft Power Automate',
      category: 'comms_analytics',
      description: 'Build custom multi-step executive approval flows, automated SharePoint folder creation, and Teams message distribution.',
      badge: 'Power Platform Flow',
      status: 'connected',
      lastSync: 'Synced 14m ago',
      syncStats: '4 Active Automated Approval Flows',
      usedIn: 'Approval Center & Automation Rules',
      logo: PowerAutomateLogo,
      authFields: [
        { label: 'Power Automate Webhook URL', placeholder: 'https://prod-12.canadacentral.logic.azure.com/...' },
        { label: 'API Key Secret', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Custom Multi-Level Sign-Off Flows', 'Automated SharePoint Library Creation', 'Triggered Teams Adaptive Cards']
    },
    {
      id: 'vidcruiter',
      name: 'VidCruiter Structured Video Interviewing',
      category: 'comms_analytics',
      description: 'Structured on-demand asynchronous candidate video prescreening, custom rubric evaluations, and live panel recording.',
      badge: 'Asynchronous Video',
      status: 'connected',
      lastSync: 'Synced 45m ago',
      syncStats: '18 Video Prescreens Completed this Month',
      usedIn: 'Candidate Dossier & Interview Workbench',
      logo: VidCruiterLogo,
      authFields: [
        { label: 'VidCruiter API Key', placeholder: 'vc_live_9482019481' }
      ],
      features: ['On-Demand Video Submissions', 'Time-Stamped Interviewer Notes', 'Structured Rubric Scoring']
    },
    {
      id: 'calendly_bookings',
      name: 'Calendly & Microsoft Bookings',
      category: 'comms_analytics',
      description: 'Candidate self-scheduling links embedded directly in email/SMS sequences with real-time recruiter availability sync.',
      badge: 'Self-Scheduling Links',
      status: 'connected',
      lastSync: 'Synced 10m ago',
      syncStats: 'Real-Time Free/Busy Calendar Sync',
      usedIn: 'Campaigns Sequences & Email Composer',
      logo: CalendlyLogo,
      authFields: [
        { label: 'Personal Access Token', placeholder: '••••••••••••••••', isSecret: true },
        { label: 'Scheduling Event Link', placeholder: 'https://calendly.com/albertaeng/screen' }
      ],
      features: ['Instant Self-Booking Links', 'Automatic Rescheduling & Buffer Times', 'Timezone Conversion']
    },
    {
      id: 'crm_demand',
      name: 'Salesforce & Microsoft Dynamics 365',
      category: 'project_demand',
      description: 'Convert won engineering bids and commercial stage-gate opportunities into anticipated staffing demand and bench reservations.',
      badge: 'CRM Revenue to Staffing',
      status: 'connected',
      lastSync: 'Synced 25m ago',
      syncStats: '$42M EPCM Pipeline Forecasted for Q4 Hiring',
      usedIn: 'Mobilization Board & Requisition Builder',
      logo: SalesforceLogo,
      authFields: [
        { label: 'CRM Instance URL', placeholder: 'https://albertaeng.my.salesforce.com' },
        { label: 'OAuth Consumer Secret', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Won Project Triggered Requisitions', 'Client Billing Rate Sync', 'Staffing Forecast Lead Time']
    },
    {
      id: 'smartsheet',
      name: 'Smartsheet Project Staffing & Approvals',
      category: 'project_demand',
      description: 'Lightweight project staffing matrices, discipline allocations, and custom multi-stakeholder sign-off workflows.',
      badge: 'Smartsheet Live Sync',
      status: 'connected',
      lastSync: 'Synced 12m ago',
      syncStats: 'Surmont & Kearl Staffing Sheets Connected',
      usedIn: 'Project Mobilization Board',
      logo: SmartsheetLogo,
      authFields: [
        { label: 'Smartsheet Access Token', placeholder: '••••••••••••••••', isSecret: true },
        { label: 'Staffing Sheet ID', placeholder: '8492019481029481' }
      ],
      features: ['Two-Way Cell Synchronization', 'Discipline Allocation Grid', 'Automated Row Status Triggers']
    },
    {
      id: 'ukg_successfactors',
      name: 'UKG Pro, SAP SuccessFactors & Oracle HCM',
      category: 'contingent_hris',
      description: 'Universal enterprise HRIS handoffs for multi-subsidiary workforce management, payroll export, and organizational chart alignment.',
      badge: 'Enterprise HRIS Trio',
      status: 'connected',
      lastSync: 'Synced 1h ago',
      syncStats: 'Enterprise Position & Payroll Connectors Active',
      usedIn: 'Onboarding Handoff & Employee Sync',
      logo: UkgLogo,
      authFields: [
        { label: 'HRIS System Provider', placeholder: 'UKG Pro / SAP SuccessFactors / Oracle HCM' },
        { label: 'API Gateway Endpoint', placeholder: 'https://api.ukg.com/alberta_epcm' },
        { label: 'Client Secret', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['New Hire Position Export', 'Compensation Approval Handshake', 'Benefits & Union Band Sync']
    },
    {
      id: 'workday',
      name: 'Workday Human Capital Management',
      category: 'contingent_hris',
      description: 'Enterprise bi-directional sync for worker creation, job requisitions, organizational hierarchy, and executive compensation bands.',
      badge: 'Workday Core HR',
      status: 'connected',
      lastSync: 'Synced 10m ago',
      syncStats: 'Position Management synced across Calgary & Edmonton',
      usedIn: 'Approval Center & Onboarding Handoff',
      logo: WorkdayLogo,
      authFields: [
        { label: 'Tenant Endpoint URL', placeholder: 'https://wd2-impl.workday.com/alberta_eng' },
        { label: 'Integration User Name', placeholder: 'ISU_ATS_Core' }
      ],
      features: ['Pre-Hire Record Creation', 'Cost Center Alignment', 'Salary Band Verification']
    },
    {
      id: 'docusign',
      name: 'DocuSign eSignature & Offer Envelopes',
      category: 'contingent_hris',
      description: 'Automate binding EPCM employment contracts, non-disclosure agreements, and site safety declarations with tamper-evident audit trails.',
      badge: 'eSignature Certified',
      status: 'connected',
      lastSync: 'Synced 15m ago',
      syncStats: '9 Envelopes sent, 7 signed this month',
      usedIn: 'Candidate Dossier & Offer Dispatch',
      logo: DocuSignLogo,
      authFields: [
        { label: 'Integration Key', placeholder: '3b9f4a10-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
        { label: 'Account ID', placeholder: '9847120' }
      ],
      features: ['Automated Offer Envelope Generation', 'Real-time Signing Webhooks', 'Legal Audit Trail Ingestion']
    },
    {
      id: 'autodesk',
      name: 'Autodesk Construction Cloud (ACC)',
      category: 'comms_analytics',
      description: 'Sync project portfolios, Navisworks 3D coordinate models, and CAD designer competency certifications directly from Autodesk licenses.',
      badge: 'BIM 360 / ACC API',
      status: 'connected',
      lastSync: 'Synced 40m ago',
      syncStats: 'Navisworks & Plant 3D verified on 12 recent candidates',
      usedIn: 'Candidate Dossiers & Onboarding CAD License Provisioning',
      logo: AutodeskLogo,
      authFields: [
        { label: 'Autodesk Forge Client ID', placeholder: 'forge_live_948102840' },
        { label: 'Client Secret', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['CAD Skill Badge Verification', 'Portfolio 3D Drawing Previews', 'Model Coordination Assessment']
    },
    {
      id: 'jobbank',
      name: 'Government of Canada Job Bank',
      category: 'sourcing',
      description: 'Direct LMIA-compliant posting and publication status tracking for federal and provincial Canadian Job Bank requirements.',
      badge: 'Federal Job Bank API',
      status: 'connected',
      lastSync: 'Synced 1h ago',
      syncStats: '4 Active LMIA-Compliant Requisitions Live',
      usedIn: 'Multi-Post Sourcing Studio & Requisition Builder',
      logo: JobBankLogo,
      authFields: [
        { label: 'Job Bank Employer Account #', placeholder: 'JB-EMP-8492019' },
        { label: 'API Access Token', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Assisted Federal Job Bank Posting', 'LMIA Advertising Audit Evidence', 'Publication Status Monitoring']
    },
    {
      id: 'wordpress',
      name: 'Company Career Site / WordPress API',
      category: 'sourcing',
      description: 'Publish active requisitions directly to corporate career pages with branded application forms and instant ATS ingestion.',
      badge: 'REST / GraphQL',
      status: 'connected',
      lastSync: 'Synced 15m ago',
      syncStats: 'Direct Career Portal Ingest Active',
      usedIn: 'Multi-Post Sourcing Studio & Career Site',
      logo: WordPressLogo,
      authFields: [
        { label: 'Career Site Webhook URL', placeholder: 'https://albertaengineering.ca/api/careers' },
        { label: 'Application Secret Key', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Embeddable Job Widgets', 'Direct Resume Upload Webhooks', 'Custom Branded Screening Forms']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Recruiter & Apply Connect',
      category: 'sourcing',
      description: 'Bidirectional sync with LinkedIn Recruiter System Connect (RSC), InMail message threading, and automated 1-click applicant ingestion.',
      badge: 'RSC Partner API',
      status: 'connected',
      lastSync: 'Synced 3m ago',
      syncStats: '42 InMails & 19 Inbound Candidates synced this week',
      usedIn: 'Multi-Post Studio & Campaigns Outreach',
      logo: LinkedInLogo,
      authFields: [
        { label: 'LinkedIn Client ID', placeholder: '78xxxxxx-epcm-rsc' },
        { label: 'Client Secret', placeholder: '••••••••••••••••', isSecret: true },
        { label: 'Company Page ID', placeholder: 'urn:li:organization:9847120' }
      ],
      features: ['Real-time 1-Click Apply Ingestion', 'InMail Thread History', 'Recruiter Seat Synchronization', 'Job Slot Multi-Posting']
    },
    {
      id: 'indeed',
      name: 'Indeed Sponsored Postings & Apply API',
      category: 'sourcing',
      description: 'Automated XML/JSON job distribution feed and direct Indeed Apply webhook integration with instant PDF resume parsing.',
      badge: 'Indeed Apply Ready',
      status: 'connected',
      lastSync: 'Synced 12m ago',
      syncStats: '18 Applicants synced today across 4 active requisitions',
      usedIn: 'Multi-Post Sourcing Studio & Inbound Pipeline',
      logo: IndeedLogo,
      authFields: [
        { label: 'Indeed Publisher ID', placeholder: 'pub-948102948102' },
        { label: 'Webhook Secret', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Sponsored Feed Syndication', 'Direct Resume File Passthrough', 'Screening Question Synchronization']
    },
    {
      id: 'ziprecruiter',
      name: 'ZipRecruiter Traffic Booster',
      category: 'sourcing',
      description: 'Syndicate active engineering requisitions across the ZipRecruiter job distribution network with deterministic location mapping.',
      badge: 'Job Distribution',
      status: 'connected',
      lastSync: 'Synced 1h ago',
      syncStats: '6 Active job slots broadcasting',
      usedIn: 'Multi-Post Sourcing Studio',
      logo: ZipRecruiterLogo,
      authFields: [
        { label: 'ZipRecruiter API Token', placeholder: 'zr_live_9384910294' }
      ],
      features: ['1-Click Feed Distribution', 'Daily Candidate Ingestion', 'Location Radius Targeting']
    },
    {
      id: 'google_drive',
      name: 'Google Drive Enterprise Repository',
      category: 'identity_storage',
      description: 'Alternate document intake folders, dossier archiving, and candidate portfolio storage for Google Workspace organizations.',
      badge: 'Google Drive API v3',
      status: 'connected',
      lastSync: 'Synced 40m ago',
      syncStats: 'Shared Drive Talent-Archives Connected',
      usedIn: 'Candidate Dossier Document Attachments',
      logo: GoogleWorkspaceLogo,
      authFields: [
        { label: 'Google Service Account JSON', placeholder: '{"type": "service_account", ...}', isSecret: true },
        { label: 'Shared Drive ID', placeholder: '0Axxxxxxxxxxxxxxx' }
      ],
      features: ['Drive Folder Sync', 'Instant PDF Previews', 'Team Drive Sharing Governance']
    },
    {
      id: 'box_dropbox',
      name: 'Box & Dropbox Business Storage',
      category: 'identity_storage',
      description: 'Secure enterprise cloud storage for high-resolution engineering drawings, laser scans, and candidate portfolio evidence.',
      badge: 'Enterprise Storage',
      status: 'connected',
      lastSync: 'Synced 2h ago',
      syncStats: 'Encrypted Dossier Backup Active',
      usedIn: 'Candidate Dossier Drawings Vault',
      logo: BoxLogo,
      authFields: [
        { label: 'Enterprise Storage API Key', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Document Version History', 'Watermarking & DLP Policies', 'Audit Trail Retention']
    },
    {
      id: 'bullhorn_migration',
      name: 'Bullhorn ATS Migration Connector',
      category: 'migrations',
      description: 'Import candidates, notes, submissions, placements, and historical contractor rates directly from Bullhorn REST API.',
      badge: 'Legacy Migration',
      status: 'connected',
      lastSync: 'Synced 3h ago',
      syncStats: 'Historical Candidate & Placement Archives Ready',
      usedIn: 'Data Import & Candidate Roster',
      logo: BullhornLogo,
      authFields: [
        { label: 'Bullhorn Corp Token', placeholder: 'corp_token_84920' },
        { label: 'REST API URL', placeholder: 'https://rest.bullhornstaffing.com/rest-services/...' }
      ],
      features: ['Resume & Attachment Extraction', 'Historical Rate Card Ingestion', 'Placement Archive Mapping']
    },
    {
      id: 'greenhouse_migration',
      name: 'Greenhouse Harvesting API',
      category: 'migrations',
      description: 'Sync job templates, scorecards, custom question pools, and candidate interview history from Greenhouse Harvest API.',
      badge: 'Harvest API v2',
      status: 'connected',
      lastSync: 'Synced 4h ago',
      syncStats: 'Scorecards & Requisition Templates Synced',
      usedIn: 'Template Studio & Scorecard Library',
      logo: GreenhouseLogo,
      authFields: [
        { label: 'Greenhouse Harvest API Key', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Candidate History Ingestion', 'Interview Scorecard Migration', 'Requisition Template Alignment']
    },
    {
      id: 'lever_icims_smartrecruiters',
      name: 'Lever, iCIMS & SmartRecruiters Importer',
      category: 'migrations',
      description: 'One-click full dataset extraction for candidates, requisitions, pipelines, and compliance audit notes from legacy ATS platforms.',
      badge: 'Multi-ATS Importer',
      status: 'connected',
      lastSync: 'Synced 5h ago',
      syncStats: 'Universal ATS Data Mapper Active',
      usedIn: 'Data Import Studio',
      logo: LeverLogo,
      authFields: [
        { label: 'Source ATS Platform', placeholder: 'Lever / iCIMS / SmartRecruiters' },
        { label: 'OAuth Access Token', placeholder: '••••••••••••••••', isSecret: true }
      ],
      features: ['Automated Field Mapping', 'Resume File Bulk Extraction', 'Consent & PIPA Date Retention Preservation']
    }
  ]);

  const handleSyncAll = () => {
    sound.warp();
    setIsSyncing('all');
    toast('Enterprise Ecosystem Synchronization', 'Syncing 30+ connectors across all Canadian & EPCM integrations...', 'info');
    setTimeout(() => {
      setIsSyncing(null);
      sound.chime();
      toast('Sync Complete', 'All enterprise integrations refreshed with 0 errors.', 'success');
    }, 1200);
  };

  const handleOpenConfig = (integration: IntegrationItem) => {
    sound.glass();
    setSelectedIntegration(integration);
    setShowConfigModal(true);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIntegration) return;
    sound.chime();
    setShowConfigModal(false);
    toast('Integration Configured', `Saved enterprise credentials for ${selectedIntegration.name}.`, 'success');
  };

  const filteredIntegrations = integrationsList.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.usedIn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = [
    { id: 'all', label: `All Connectors (${integrationsList.length})` },
    { id: 'identity_storage', label: 'Identity & Storage' },
    { id: 'project_demand', label: 'Project Demand & ERP' },
    { id: 'contingent_hris', label: 'Contingent & HRIS' },
    { id: 'background_screening', label: 'Screening & Safety' },
    { id: 'sourcing', label: 'Sourcing & Portals' },
    { id: 'comms_analytics', label: 'Comms, Phone & BI' },
    { id: 'migrations', label: 'Migrations & Imports' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. STICKY INTEGRATIONS HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span className="whitespace-nowrap">EPCM Enterprise Stack</span>
                  <span className="opacity-30">•</span>
                  <span className="whitespace-nowrap">Project Demand, ERP, Identity & Accreditations</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Integrations & Enterprise Sourcing Hub
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                size="xs"
                variant="machined"
                loading={isSyncing === 'all'}
                onClick={handleSyncAll}
                className="gap-1.5 font-semibold text-xs"
              >
                <RefreshCw className={cn('w-3.5 h-3.5', isSyncing === 'all' && 'animate-spin')} />
                <span>Sync All Connectors</span>
              </Button>

              <Button
                size="xs"
                variant="machined"
                onClick={() => {
                  sound.glass();
                  setShowRequestModal(true);
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                <span>Request Integration</span>
              </Button>

              <Button
                size="xs"
                variant="champagne"
                onClick={() => {
                  sound.glass();
                  setShowBroadcastModal(true);
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <Radio className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                <span>Multi-Post Sourcing Studio</span>
              </Button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-2.5" />
              <Input
                placeholder="Search connectors (Deltek, Primavera, Fieldglass, Entra, Certn...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-8 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.click();
                    setActiveCategory(cat.id);
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-all whitespace-nowrap',
                    activeCategory === cat.id
                      ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black shadow-xs'
                      : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08]'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONNECTOR CARDS GRID */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredIntegrations.map((item) => {
            const LogoComponent = item.logo;
            return (
              <div
                key={item.id}
                className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer flex flex-col justify-between space-y-4 hover:border-[#8A6D3B]/40 dark:hover:border-[#d4c5a9]/40 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0 border border-black/[0.08] dark:border-white/10 bg-slate-50 dark:bg-black/40 shadow-xs">
                        <LogoComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#8A6D3B] dark:group-hover:text-[#d4c5a9] transition-colors">
                          {item.name}
                        </h3>
                        <Badge variant="champagne" size="sm" className="mt-0.5 font-bold">
                          {item.badge}
                        </Badge>
                      </div>
                    </div>

                    <span className="flex items-center gap-1.5 text-[10px] tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>CONNECTED</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Contextual Subsequence UI indicator */}
                  <div className="flex items-center gap-1.5 p-2 rounded-[6px] bg-slate-50 dark:bg-black/40 border border-black/[0.06] dark:border-white/[0.08] text-[11px] text-[#8A6D3B] dark:text-[#d4c5a9] font-medium">
                    <Compass className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">
                      <strong>Used in:</strong> {item.usedIn}
                    </span>
                  </div>

                  {item.syncStats && (
                    <div className="p-2.5 rounded-[6px] bg-slate-50 dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] text-[11px] text-slate-700 dark:text-zinc-300 font-mono">
                      {item.syncStats}
                    </div>
                  )}

                  {/* Feature Bullets */}
                  <div className="space-y-1 pt-1">
                    {item.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400">
                        <Check className="w-3 h-3 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
                  <span className="text-[10px] tabular-nums text-slate-400 dark:text-zinc-500">
                    {item.lastSync}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="xs"
                      variant="machined"
                      onClick={() => handleOpenConfig(item)}
                      className="gap-1 text-xs font-semibold"
                    >
                      <Settings className="w-3 h-3" />
                      <span>Config</span>
                    </Button>
                    <Button
                      size="xs"
                      variant="champagne"
                      onClick={() => {
                        sound.click();
                        navigate(`/integrations/${item.id}`);
                      }}
                      className="gap-1 text-xs font-semibold"
                    >
                      <span>Control Centre</span>
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 3. MULTI-POST SOURCING STUDIO MODAL */}
      <Modal
        isOpen={showBroadcastModal}
        onClose={() => setShowBroadcastModal(false)}
        title="1-Click Multi-Post Sourcing Studio"
        subtitle="Broadcast engineering requisitions to LinkedIn, Indeed, Job Bank, ZipRecruiter & Career Site simultaneously"
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Select Requisition to Distribute</label>
            <select className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-bold">
              <option>Senior Piping Designer (Brownfield / Plant 3D) • Calgary, AB</option>
              <option>Lead Mechanical HVAC Engineer (Industrial) • Edmonton, AB</option>
              <option>Project Controls & Cost Estimator • Calgary, AB</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-slate-700 dark:text-zinc-300">Target Distribution Channels</div>
            <div className="grid grid-cols-2 gap-2">
              <label className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#8A6D3B]" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">LinkedIn Recruiter Slot</div>
                  <div className="text-[10px] text-slate-400">RSC Partner API direct publish</div>
                </div>
              </label>

              <label className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#8A6D3B]" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Indeed Sponsored Feed</div>
                  <div className="text-[10px] text-slate-400">Direct Indeed Apply webhook</div>
                </div>
              </label>

              <label className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#8A6D3B]" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Gov of Canada Job Bank</div>
                  <div className="text-[10px] text-slate-400">LMIA-compliant assisted posting</div>
                </div>
              </label>

              <label className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#8A6D3B]" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Company Career Site</div>
                  <div className="text-[10px] text-slate-400">Direct WordPress API publish</div>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" onClick={() => setShowBroadcastModal(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="champagne"
              onClick={() => {
                sound.chime();
                toast('Multi-Post Broadcast Dispatched', 'Requisition syndicated across channels with active tracking pixels.', 'success');
                setShowBroadcastModal(false);
              }}
              className="font-semibold"
            >
              Launch Multi-Channel Broadcast
            </Button>
          </div>
        </div>
      </Modal>

      {/* 4. CONNECTOR CONFIGURATION MODAL */}
      {selectedIntegration && (
        <Modal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          title={`Configure ${selectedIntegration.name}`}
          subtitle="Manage enterprise credentials, API tokens, and webhook sync preferences"
          maxWidth="md"
        >
          <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
            {selectedIntegration.authFields.map((f, idx) => (
              <div key={idx}>
                <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">{f.label}</label>
                <Input
                  type={f.isSecret ? 'password' : 'text'}
                  placeholder={f.placeholder}
                  defaultValue={f.placeholder.startsWith('••••') ? 'supersecretkey123' : f.placeholder}
                  className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-mono"
                />
              </div>
            ))}

            <div className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Encrypted Vault Security</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Credentials are encrypted using AES-256 in your tenant vault. Webhooks verify HMAC SHA-256 signatures before processing payloads.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
              <Button size="sm" variant="ghost" type="button" onClick={() => setShowConfigModal(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="champagne" type="submit" className="font-semibold">
                Save & Test Connection
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* 5. REQUEST INTEGRATION MODAL */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title="Request Custom Integration Connector"
        subtitle="Submit vendor API specifications, EPCM workflow requirements, or proprietary software endpoints"
        maxWidth="lg"
      >
        <form onSubmit={handleRequestIntegration} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">
                Platform / Vendor Name <span className="text-rose-500">*</span>
              </label>
              <Input
                placeholder="e.g. Procore, Bentley ProjectWise, Avetta"
                value={requestToolName}
                onChange={(e) => setRequestToolName(e.target.value)}
                required
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Category</label>
              <select
                value={requestCategory}
                onChange={(e) => setRequestCategory(e.target.value)}
                className="w-full h-8 px-2 rounded-[6px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-medium"
              >
                <option>ERP & Project Accounting</option>
                <option>AEC, BIM & 3D Model Review</option>
                <option>Site Access, Turnstiles & Badging</option>
                <option>VMS & Agency Vendor Management</option>
                <option>Background Screening & Drug Testing</option>
                <option>Custom Internal Database / REST API</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">
              Primary Business Use Case & Workflow <span className="text-rose-500">*</span>
            </label>
            <Textarea
              rows={3}
              placeholder="Describe the recruiting workflow (e.g. Automatically synchronize verified trade certificates and site orientation status with on-site turnstiles at Kearl Lake)..."
              value={requestUseCase}
              onChange={(e) => setRequestUseCase(e.target.value)}
              required
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Project Priority / Timeline</label>
              <select
                value={requestPriority}
                onChange={(e) => setRequestPriority(e.target.value)}
                className="w-full h-8 px-2 rounded-[6px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              >
                <option>Urgent - Active Major Project Blocked</option>
                <option>Standard - Q4 Requirement</option>
                <option>Upcoming RFP Evaluation</option>
                <option>Nice to Have Exploration</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">API Documentation / Portal URL (Optional)</label>
              <Input
                placeholder="https://developer.vendor.com/api"
                value={requestDocUrl}
                onChange={(e) => setRequestDocUrl(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowRequestModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit" className="font-semibold">
              Submit Integration Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
