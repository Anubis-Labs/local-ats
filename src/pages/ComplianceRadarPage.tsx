import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  FileCheck,
  Search,
  User,
  Download,
  RefreshCw,
  Mail,
  Award,
  ChevronRight,
  Radio
} from 'lucide-react';
import { Badge, Button, Input, Modal, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface CredentialItem {
  id: string;
  candidateName: string;
  candidateId: string;
  discipline: string;
  ticketName: string;
  issuer: string;
  ticketNumber: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'valid' | 'expiring_soon' | 'expired';
}

export const ComplianceRadarPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [credentials, setCredentials] = useState<CredentialItem[]>([
    {
      id: 'cred-01',
      candidateName: 'Tariq Al-Mansoor, CET',
      candidateId: 'cand-001',
      discipline: 'Piping & Layout',
      ticketName: 'Energy Safety Canada H2S Alive',
      issuer: 'Energy Safety Canada',
      ticketNumber: 'ESC-H2S-88492',
      expiryDate: '2026-09-14',
      daysRemaining: 17,
      status: 'expiring_soon'
    },
    {
      id: 'cred-02',
      candidateName: 'Tariq Al-Mansoor, CET',
      candidateId: 'cand-001',
      discipline: 'Piping & Layout',
      ticketName: 'ASET Certified Engineering Technologist (CET)',
      issuer: 'ASET Alberta',
      ticketNumber: 'CET #39481',
      expiryDate: '2027-12-31',
      daysRemaining: 490,
      status: 'valid'
    },
    {
      id: 'cred-03',
      candidateName: 'Melissa Chen, P.Eng.',
      candidateId: 'cand-002',
      discipline: 'Mechanical Engineering',
      ticketName: 'APEGA Professional Engineer (P.Eng.)',
      issuer: 'APEGA Alberta',
      ticketNumber: 'P.Eng. #84920',
      expiryDate: '2027-06-30',
      daysRemaining: 305,
      status: 'valid'
    },
    {
      id: 'cred-04',
      candidateName: 'Brendan Gallagher',
      candidateId: 'cand-003',
      discipline: 'Project Controls',
      ticketName: 'CSTS-2020 Construction Safety Training System',
      issuer: 'Alberta Construction Safety Association (ACSA)',
      ticketNumber: 'ACSA-CSTS-55912',
      expiryDate: '2026-08-10',
      daysRemaining: -18,
      status: 'expired'
    }
  ]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendRenewalPing = (candidateName: string, ticketName: string) => {
    sound.chime();
    toast('Renewal Request Dispatched', `Automated renewal upload link emailed to ${candidateName} for ${ticketName}.`, 'success');
  };

  const filtered = credentials.filter(
    (c) =>
      !searchQuery.trim() ||
      c.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ticketName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.discipline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. COMPLIANCE RADAR HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="radar-compliance" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <Radio className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Site Safety & Accreditations</span>
                  <span className="opacity-30">•</span>
                  <span>APEGA, ASET & ACSA Verification</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Safety Ticket & Credential Expiry Radar
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                size="xs"
                variant="machined"
                onClick={() => {
                  sound.click();
                  toast('Export Generated', 'Exporting CSV compliance sheet for site access clearance.', 'info');
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Site Clearance Roster</span>
              </Button>
            </div>
          </div>

          {/* Filter Input */}
          <div className="pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-4 relative z-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-2.5" />
              <Input
                placeholder="Filter by candidate, ticket, or discipline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-8 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold">
                <XCircle className="w-3.5 h-3.5" />
                <span>1 Expired</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>1 Expiring &lt;30 Days</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>2 Verified Active</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CREDENTIAL RADAR TABLE */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 overflow-hidden shadow-sm specimen-chamfer">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-black/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-black/40 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                <th className="p-3.5">Candidate</th>
                <th className="p-3.5">Ticket / Accreditation</th>
                <th className="p-3.5">Licensing Body</th>
                <th className="p-3.5">Credential #</th>
                <th className="p-3.5">Expiry Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
              {filtered.map((cred) => (
                <tr key={cred.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="p-3.5">
                    <div
                      onClick={() => navigate(`/candidates/${cred.candidateId}`)}
                      className="font-bold text-slate-900 dark:text-white cursor-pointer hover:underline"
                    >
                      {cred.candidateName}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-zinc-500">{cred.discipline}</div>
                  </td>

                  <td className="p-3.5 font-semibold text-slate-800 dark:text-zinc-200">
                    {cred.ticketName}
                  </td>

                  <td className="p-3.5 text-slate-600 dark:text-zinc-400">
                    {cred.issuer}
                  </td>

                  <td className="p-3.5 font-mono text-[11px] text-slate-700 dark:text-zinc-300">
                    {cred.ticketNumber}
                  </td>

                  <td className="p-3.5">
                    <div className="font-semibold text-slate-900 dark:text-white tabular-nums">{cred.expiryDate}</div>
                    <div className="text-[10px] text-slate-400 dark:text-zinc-500">
                      {cred.daysRemaining < 0 ? `${Math.abs(cred.daysRemaining)} days overdue` : `${cred.daysRemaining} days remaining`}
                    </div>
                  </td>

                  <td className="p-3.5">
                    <Badge
                      variant={
                        cred.status === 'valid'
                          ? 'success'
                          : cred.status === 'expiring_soon'
                          ? 'warning'
                          : 'destructive'
                      }
                      size="sm"
                    >
                      {cred.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </td>

                  <td className="p-3.5 text-right">
                    {cred.status !== 'valid' && (
                      <Button
                        size="xs"
                        variant="champagne"
                        onClick={() => handleSendRenewalPing(cred.candidateName, cred.ticketName)}
                        className="gap-1 text-[10px] font-semibold h-6"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Request Renewal</span>
                      </Button>
                    )}
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
