import { WorkspaceSettings } from '../types/settings';

export const initialSettings: WorkspaceSettings = {
  workspaceName: 'Alberta Engineering & Projects Inc.',
  mode: 'shared_host',
  joinCode: 'MAPLE-4821',
  hostComputerName: 'Sarahs-MacStudio (Primary Host)',
  isHostOnline: true,
  connectedClientsCount: 4,
  currency: 'CAD ($)',
  dateFormat: 'YYYY-MM-DD',
  ai: {
    mode: 'local',
    allowSemanticSearch: true,
    allowAutoSummaries: true,
    allowDraftingAssistant: true,
    allowGraphExtraction: true,
    localModelName: 'Qwen-2.5-7B (Local Metal / GGUF)',
    temperature: 0.2
  },
  customFields: [
    { id: 'cf-1', target: 'candidate', label: 'Safety Ticket Expiry', type: 'date', required: false },
    { id: 'cf-2', target: 'candidate', label: 'Security Clearance Level', type: 'select', options: ['None', 'Reliability', 'Secret', 'Top Secret'], required: false },
    { id: 'cf-3', target: 'job', label: 'Client Cost Center', type: 'text', required: true }
  ],
  backup: {
    status: 'protected',
    lastBackupTime: 'Today at 04:00 AM',
    backupLocation: 'Documents',
    totalBackupsCount: 28,
    backupSizeMB: 142.5,
    autoBackupDaily: true
  },
  license: {
    productName: 'Local ATS Professional',
    edition: 'Local ATS Team Edition',
    licenseKey: 'ATS-PRO-2026-CALG-8821-X99B',
    status: 'active',
    organizationName: 'Alberta Engineering & Projects Inc.',
    seatCount: 8,
    perpetualVersion: 'v1.4.2 (Perpetual)',
    updatesEligibleUntil: 'August 2027',
    activatedOnThisDevice: true,
    deviceId: 'DEV-MAC-8492-AB'
  },
  update: {
    hasUpdate: true,
    currentVersion: 'v1.4.2',
    latestVersion: 'v1.5.0',
    releaseDate: '2026-08-25',
    releaseNotes: [
      'Added high-density split view for resume evidence inspection',
      'Enhanced local knowledge graph relationship filter options',
      'Optimized TanStack table horizontal scrolling with frozen columns'
    ],
    isDownloading: false,
    isReadyToRestart: false
  },
  email: {
    provider: 'Outlook 365',
    connected: true,
    accountEmail: 'sarah.jenkins@albertaengineering.ca',
    signature: 'Best regards,\nSarah Jenkins | Talent Acquisition'
  },
  calendar: {
    provider: 'Microsoft 365',
    connected: true,
    accountEmail: 'sarah.jenkins@albertaengineering.ca'
  }
};

class SettingsService {
  private settings: WorkspaceSettings = { ...initialSettings };

  async getSettings(): Promise<WorkspaceSettings> {
    await new Promise((res) => setTimeout(res, 60));
    return { ...this.settings };
  }

  async updateSettings(partial: Partial<WorkspaceSettings>): Promise<WorkspaceSettings> {
    await new Promise((res) => setTimeout(res, 100));
    this.settings = { ...this.settings, ...partial };
    return { ...this.settings };
  }

  async addCustomField(field: Omit<WorkspaceSettings['customFields'][0], 'id'>) {
    await new Promise((res) => setTimeout(res, 80));
    const newField = { ...field, id: `cf-${Date.now()}` };
    this.settings.customFields.push(newField);
    return newField;
  }
}

export const settingsService = new SettingsService();

class WorkspaceService {
  async getStatus() {
    await new Promise((res) => setTimeout(res, 50));
    return {
      workspaceName: initialSettings.workspaceName,
      mode: initialSettings.mode,
      joinCode: initialSettings.joinCode,
      isHostOnline: true,
      connectedClients: initialSettings.connectedClientsCount
    };
  }

  async joinWorkspace(code: string): Promise<{ success: boolean; workspaceName?: string; error?: string }> {
    await new Promise((res) => setTimeout(res, 400));
    if (code.toUpperCase().trim() === 'MAPLE-4821') {
      return { success: true, workspaceName: 'Alberta Engineering & Projects Inc.' };
    }
    return { success: false, error: 'Workspace join code not found on local network or invalid code.' };
  }
}

export const workspaceService = new WorkspaceService();

class BackupService {
  async triggerBackup(): Promise<{ timestamp: string; sizeMB: number }> {
    await new Promise((res) => setTimeout(res, 600));
    return {
      timestamp: 'Just now',
      sizeMB: 143.2
    };
  }

  async restoreBackup(backupId: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 800));
    return true;
  }
}

export const backupService = new BackupService();

class LicenseService {
  async getLicense() {
    return initialSettings.license;
  }

  async deactivateDevice(): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 300));
    return true;
  }
}

export const licenseService = new LicenseService();

class UpdateService {
  async checkForUpdates() {
    await new Promise((res) => setTimeout(res, 400));
    return initialSettings.update;
  }

  async installUpdate() {
    await new Promise((res) => setTimeout(res, 900));
    return true;
  }
}

export const updateService = new UpdateService();

class ReportService {
  async getHealthReport() {
    const { mockReportsData } = await import('../mock/reportsData');
    return mockReportsData;
  }
}

export const reportService = new ReportService();

class IntegrationService {
  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 300));
    return true;
  }
}

export const integrationService = new IntegrationService();
