import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { AssistantProvider } from './context/AssistantContext';
import { ToastProvider } from './context/ToastContext';

import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateDetailPage } from './pages/CandidateDetailPage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { PipelinePage } from './pages/PipelinePage';
import { IntelligencePage } from './pages/IntelligencePage';
import { JobMatchPage } from './pages/JobMatchPage';
import { RelationshipsPage } from './pages/RelationshipsPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { InterviewsPage } from './pages/InterviewsPage';
import { TasksPage } from './pages/TasksPage';
import { TalentPoolPage } from './pages/TalentPoolPage';
import { ImportPage } from './pages/ImportPage';
import { ReportsPage } from './pages/ReportsPage';
import { TeamPage } from './pages/TeamPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { SettingsPage } from './pages/SettingsPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { IntegrationDetailPage } from './pages/IntegrationDetailPage';
import { ProjectTeamBuilderPage } from './pages/ProjectTeamBuilderPage';
import { AwardScenariosPage } from './pages/AwardScenariosPage';
import { SiteReadinessPassportPage } from './pages/SiteReadinessPassportPage';
import { EngagementCostCalculatorPage } from './pages/EngagementCostCalculatorPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import { CommunicationsInboxPage } from './pages/CommunicationsInboxPage';
import { ApprovalCenterPage } from './pages/ApprovalCenterPage';
import { DuplicateResolutionPage } from './pages/DuplicateResolutionPage';
import { RequisitionBuilderPage } from './pages/RequisitionBuilderPage';
import { CalendarWorkbenchPage } from './pages/CalendarWorkbenchPage';
import { ProjectMobilizationPage } from './pages/ProjectMobilizationPage';
import { ComplianceRadarPage } from './pages/ComplianceRadarPage';
import { AutomationsPage } from './pages/AutomationsPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { AuditVaultPage } from './pages/AuditVaultPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { FirstRunSetupPage } from './pages/FirstRunSetupPage';
import { JoinWorkspacePage } from './pages/JoinWorkspacePage';
import { GlobalSearchPage } from './pages/GlobalSearchPage';
import { DesignSystemPage } from './pages/DesignSystemPage';

export function App() {
  return (
    <ThemeProvider>
      <WorkspaceProvider>
        <AssistantProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* Onboarding, Join & Standalone Design System Laboratory */}
                <Route path="/setup" element={<FirstRunSetupPage />} />
                <Route path="/workspace/join" element={<JoinWorkspacePage />} />
                <Route path="/design-system" element={<DesignSystemPage />} />
                <Route path="/primitives" element={<DesignSystemPage />} />

                {/* Primary App Shell Layout */}
                <Route element={<AppShell />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/applications" element={<ApplicationsPage />} />
                  <Route path="/applications/:id" element={<ApplicationDetailPage />} />
                  <Route path="/candidates" element={<CandidatesPage />} />
                  <Route path="/candidates/:id" element={<CandidateDetailPage />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/jobs/new" element={<RequisitionBuilderPage />} />
                  <Route path="/jobs/:id" element={<JobDetailPage />} />
                  <Route path="/pipeline" element={<PipelinePage />} />
                  <Route path="/mobilization" element={<ProjectMobilizationPage />} />
                  <Route path="/compliance" element={<ComplianceRadarPage />} />
                  <Route path="/communications" element={<CommunicationsInboxPage />} />
                  <Route path="/calendar" element={<CalendarWorkbenchPage />} />
                  <Route path="/approvals" element={<ApprovalCenterPage />} />
                  <Route path="/duplicates" element={<DuplicateResolutionPage />} />
                  <Route path="/campaigns" element={<CampaignsPage />} />
                  <Route path="/automations" element={<AutomationsPage />} />
                  <Route path="/onboarding" element={<OnboardingPage />} />
                  <Route path="/audit" element={<AuditVaultPage />} />
                  <Route path="/search" element={<GlobalSearchPage />} />
                  <Route path="/intelligence" element={<IntelligencePage />} />
                  <Route path="/intelligence/job/:id" element={<JobMatchPage />} />
                  <Route path="/relationships" element={<RelationshipsPage />} />
                  <Route path="/compare" element={<ComparisonPage />} />
                  <Route path="/interviews" element={<InterviewsPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/talent" element={<TalentPoolPage />} />
                  <Route path="/import" element={<ImportPage />} />
                  <Route path="/team-builder" element={<ProjectTeamBuilderPage />} />
                  <Route path="/scenarios" element={<AwardScenariosPage />} />
                  <Route path="/readiness" element={<SiteReadinessPassportPage />} />
                  <Route path="/cost-calculator" element={<EngagementCostCalculatorPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/templates" element={<TemplatesPage />} />
                  <Route path="/integrations" element={<IntegrationsPage />} />
                  <Route path="/integrations/:id" element={<IntegrationDetailPage />} />
                  <Route path="/settings/*" element={<SettingsPage />} />
                </Route>

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </AssistantProvider>
      </WorkspaceProvider>
    </ThemeProvider>
  );
}

export default App;
