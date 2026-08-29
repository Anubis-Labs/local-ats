import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  Download,
  Trash2,
  Clock,
  Search,
  UserCheck,
  AlertTriangle,
  FileText,
  FileLock2,
  CheckCircle2
} from 'lucide-react';
import { Badge, Button, Input, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  targetCandidate: string;
  details: string;
  category: 'pii_access' | 'export' | 'disposition' | 'consent_update';
}

export const AuditVaultPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: 'log-01',
      timestamp: '2026-08-28 16:32:10 MDT',
      actor: 'Sarah Jenkins (Lead Recruiter)',
      action: 'Generated Formal Offer Letter PDF',
      targetCandidate: 'Melissa Chen, P.Eng. (cand-002)',
      details: 'Exported EPCM compensation packet ($138k base + $7.5k relocation)',
      category: 'export'
    },
    {
      id: 'log-02',
      timestamp: '2026-08-28 14:15:00 MDT',
      actor: 'Elena Rostova, P.Eng.',
      action: 'Technical Scorecard Submitted',
      targetCandidate: 'Tariq Al-Mansoor, CET (cand-001)',
      details: 'Recorded 5/5 rating for AutoCAD Plant 3D and Caesar II stress analysis',
      category: 'disposition'
    },
    {
      id: 'log-03',
      timestamp: '2026-08-27 11:20:45 MDT',
      actor: 'Marcus Vance',
      action: 'Candidate Profile PII Accessed',
      targetCandidate: 'Brendan Gallagher (cand-003)',
      details: 'Viewed compensation history and direct cell phone number',
      category: 'pii_access'
    }
  ]);

  const [retentionDays, setRetentionDays] = useState('730'); // 24 months
  const [anonymizedMode, setAnonymizedMode] = useState(false);
  const { toast } = useToast();

  const handleToggleAnonymization = () => {
    sound.pop();
    setAnonymizedMode(!anonymizedMode);
    toast(
      anonymizedMode ? 'Anonymization Disabled' : 'Anonymization Active',
      anonymizedMode
        ? 'Standard recruiter dossier visibility restored.'
        : 'Candidate names, photos, and age/gender indicators masked for blind screening.',
      'info'
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. AUDIT VAULT HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="radar-compliance" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Governance & Compliance Vault</span>
                <span className="opacity-30">•</span>
                <span>Alberta PIPA & FOIP Statutory Compliance</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Privacy, Audit Logs & Data Retention Vault
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="xs"
              variant={anonymizedMode ? 'champagne' : 'machined'}
              onClick={handleToggleAnonymization}
              className="gap-1.5 font-semibold text-xs"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{anonymizedMode ? 'Blind Mode Active' : 'Enable Blind Review'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. PIPA CONTROLS & AUDIT TRAIL */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Compliance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                <span>Alberta PIPA Data Retention</span>
              </span>
              <Badge variant="champagne" size="sm">24 Months</Badge>
            </div>
            <p className="text-slate-600 dark:text-zinc-300 text-[11px]">
              Inactive candidate records older than 730 days without communication are automatically staged for consent re-verification or anonymization.
            </p>
          </div>

          <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <FileLock2 className="w-4 h-4 text-emerald-500" />
                <span>Candidate Access & Correction</span>
              </span>
              <Badge variant="success" size="sm">Active Hub</Badge>
            </div>
            <p className="text-slate-600 dark:text-zinc-300 text-[11px]">
              Handles formal PIPA Section 24 correction notices, data portability ZIP exports, and verified right-to-erase workflows.
            </p>
          </div>

          <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Encrypted Audit Ledger</span>
              </span>
              <Badge variant="indigo" size="sm">SHA-256 Verified</Badge>
            </div>
            <p className="text-slate-600 dark:text-zinc-300 text-[11px]">
              Every resume download, salary adjustment, and candidate rejection reason is permanently immutably logged with recruiter credentials.
            </p>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 overflow-hidden shadow-sm specimen-chamfer">
          <div className="p-4 bg-slate-50 dark:bg-black/40 border-b border-black/[0.08] dark:border-white/10 flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Immutable System Activity Ledger
            </span>
            <span className="font-mono text-xs text-slate-400">Showing last 30 days</span>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-black/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-black/20 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Recruiter / Actor</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Candidate Dossier</th>
                <th className="p-3.5">Audit Log Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="p-3.5 font-mono text-[11px] text-slate-500 dark:text-zinc-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">
                    {log.actor}
                  </td>
                  <td className="p-3.5 font-medium text-slate-800 dark:text-zinc-200">
                    {log.action}
                  </td>
                  <td className="p-3.5 text-slate-700 dark:text-zinc-300">
                    {log.targetCandidate}
                  </td>
                  <td className="p-3.5 text-[11px] text-slate-500 dark:text-zinc-400">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
