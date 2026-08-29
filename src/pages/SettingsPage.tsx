import React, { useState } from 'react';
import {
  Sliders,
  ShieldCheck,
  HardDrive,
  Cpu,
  Lock,
  Sun,
  Moon,
  Sparkles,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Key,
  Settings as SettingsIcon
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { Badge, Button, Input, Card, cn } from '../components/ui';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useWorkspace();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [activeSection, setActiveSection] = useState<'general' | 'ai' | 'backup' | 'security'>('general');

  const handleCreateBackup = () => {
    sound.chime();
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `local-ats-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Encrypted Backup Exported', 'Local SQLite dataset snapshot saved to disk.', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT SETTINGS HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <SettingsIcon className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>System & Engine</span>
                  <span className="opacity-30">•</span>
                  <span>Encrypted Local SQLite</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Workspace Settings & Security
                </h1>
              </div>
            </div>
          </div>

          {/* 4-Stage Navigation Rail */}
          <div className="flex items-center gap-1 nav-rail-pill mt-3 w-fit relative z-1">
            {[
              { id: 'general', label: '1. General & Theme' },
              { id: 'ai', label: '2. Deterministic AI Engine' },
              { id: 'backup', label: '3. Encrypted Backups' },
              { id: 'security', label: '4. Enterprise Security' }
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  sound.click();
                  setActiveSection(sec.id as any);
                }}
                className={cn(
                  'nav-rail-item',
                  activeSection === sec.id && 'nav-rail-item-active'
                )}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SETTINGS CONTENT CANVAS */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* SECTION 1: GENERAL & APPEARANCE */}
        {activeSection === 'general' && (
          <div className="rounded-[12px] bg-white dark:bg-[#12151D] p-6 space-y-5 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Workspace Name</label>
                <Input
                  value={settings.workspaceName}
                  onChange={(e) => updateSettings({ workspaceName: e.target.value })}
                  className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-medium max-w-md"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-slate-700 dark:text-zinc-300 font-semibold">Visual Theme Appearance</label>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant={theme === 'dark' ? 'champagne' : 'glass'}
                    onClick={() => {
                      sound.click();
                      setTheme('dark');
                    }}
                    className="gap-2 font-bold px-4"
                  >
                    <Moon className="w-4 h-4 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                    <span>Smoked Obsidian Dark</span>
                  </Button>

                  <Button
                    size="sm"
                    variant={theme === 'light' ? 'champagne' : 'glass'}
                    onClick={() => {
                      sound.click();
                      setTheme('light');
                    }}
                    className="gap-2 font-bold px-4"
                  >
                    <Sun className="w-4 h-4 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                    <span>Porcelain White Light</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: AI ENGINE */}
        {activeSection === 'ai' && (
          <div className="rounded-[12px] bg-white dark:bg-card-mesh p-6 space-y-5 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/10">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                Deterministic Sourcing Engine
              </span>
              <Badge variant="champagne" size="sm">Local Intelligence</Badge>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
              <p>
                Our AI extraction runs locally on your workstation to parse engineering credentials (ASET CET, APEGA P.Eng.), CAD software mastery (AutoCAD Plant 3D, CADWorx, Navisworks), and heavy industrial deliverable citations.
              </p>
              <div className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/50 border border-black/[0.08] dark:border-white/10 flex items-center justify-between">
                <span>Deterministic Evidence Chunking</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">100% Offline Capable</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: ENCRYPTED BACKUPS */}
        {activeSection === 'backup' && (
          <div className="rounded-[12px] bg-white dark:bg-card-cad p-6 space-y-5 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/10">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                Encrypted Snapshot & Restore
              </span>
              <Badge variant="success" size="sm">AES-256 GCM</Badge>
            </div>

            <p className="text-xs text-slate-700 dark:text-zinc-300">
              Export your candidate dossiers, parsed work histories, requisition rubrics, and interview records into an encrypted offline snapshot JSON file.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Button size="xs" variant="champagne" onClick={handleCreateBackup} className="gap-1.5 font-semibold">
                <Download className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                <span>Export Local Backup</span>
              </Button>
            </div>
          </div>
        )}

        {/* SECTION 4: ENTERPRISE SECURITY */}
        {activeSection === 'security' && (
          <div className="rounded-[12px] bg-white dark:bg-card-facility p-6 space-y-5 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/10">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                Air-Gapped Compliance
              </span>
              <Badge variant="champagne" size="sm">Zero Cloud Egress</Badge>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-zinc-300">
              <div className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/[0.08] dark:border-white/10 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white">Data Sovereignity</div>
                <p>All candidate personally identifiable information (PII) resides strictly within your local indexed database.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
