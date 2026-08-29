import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { OfflineBanner } from './OfflineBanner';
import { CommandPalette } from './CommandPalette';
import { AssistantDrawer } from '../ai/AssistantDrawer';
import { KeyboardShortcutsModal } from '../common/KeyboardShortcutsModal';
import { SharedOfficeDrawer } from './SharedOfficeDrawer';

export const AppShell: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [sharedOfficeOpen, setSharedOfficeOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setShortcutsModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased font-sans">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onOpenSharedOffice={() => setSharedOfficeOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <OfflineBanner />
        <Topbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenShortcuts={() => setShortcutsModalOpen(true)}
        />
        <main className="flex-1 overflow-y-auto min-w-0 bg-[var(--bg-canvas)]">
          <Outlet />
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      <AssistantDrawer />
      <KeyboardShortcutsModal isOpen={shortcutsModalOpen} onClose={() => setShortcutsModalOpen(false)} />
      <SharedOfficeDrawer isOpen={sharedOfficeOpen} onClose={() => setSharedOfficeOpen(false)} />
    </div>
  );
};
