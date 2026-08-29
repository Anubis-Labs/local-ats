export type AIMode = 'off' | 'local' | 'assistant';

export interface AISettings {
  mode: AIMode;
  allowSemanticSearch: boolean;
  allowAutoSummaries: boolean;
  allowDraftingAssistant: boolean;
  allowGraphExtraction: boolean;
  localModelName: string;
  temperature: number;
}

export interface CustomFieldDefinition {
  id: string;
  target: 'candidate' | 'job';
  label: string;
  type: 'text' | 'select' | 'number' | 'date' | 'boolean';
  options?: string[]; // for select
  required: boolean;
}

export interface BackupStatus {
  status: 'protected' | 'warning' | 'in_progress' | 'restoring' | 'error';
  lastBackupTime: string;
  backupLocation: 'Documents' | 'External Drive' | 'OneDrive Folder' | 'Dropbox Folder' | 'Custom Folder';
  customPath?: string;
  totalBackupsCount: number;
  backupSizeMB: number;
  autoBackupDaily: boolean;
}

export interface PerpetualLicenseInfo {
  productName: string;
  edition: 'Local ATS Professional' | 'Local ATS Team Edition' | 'ATS Professional' | 'ATS Team Edition';
  licenseKey: string;
  status: 'active' | 'grace_period' | 'invalid';
  organizationName: string;
  seatCount: number;
  perpetualVersion: string;
  updatesEligibleUntil: string;
  activatedOnThisDevice: boolean;
  deviceId: string;
}

export interface UpdateInfo {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  releaseDate: string;
  releaseNotes: string[];
  isDownloading: boolean;
  isReadyToRestart: boolean;
}

export interface EmailIntegrationConfig {
  provider: 'Outlook 365' | 'Gmail' | 'Default Mail Client' | 'None';
  connected: boolean;
  accountEmail?: string;
  signature?: string;
}

export interface CalendarIntegrationConfig {
  provider: 'Microsoft 365' | 'Google Calendar' | 'Local System Calendar' | 'None';
  connected: boolean;
  accountEmail?: string;
}

export interface WorkspaceSettings {
  workspaceName: string;
  mode: 'standalone' | 'shared_host' | 'shared_client';
  joinCode?: string;
  hostComputerName?: string;
  isHostOnline: boolean;
  connectedClientsCount: number;
  currency: string;
  dateFormat: string;
  ai: AISettings;
  customFields: CustomFieldDefinition[];
  backup: BackupStatus;
  license: PerpetualLicenseInfo;
  update: UpdateInfo;
  email: EmailIntegrationConfig;
  calendar: CalendarIntegrationConfig;
}
