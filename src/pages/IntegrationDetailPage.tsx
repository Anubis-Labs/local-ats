import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  RefreshCw,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Key,
  Database,
  Lock,
  Download,
  Terminal,
  Activity,
  Layers,
  Settings,
  Clock,
  Radio,
  FileCode2,
  UserCheck,
  Sparkles,
  Zap,
  XCircle,
  ExternalLink,
  ChevronRight,
  Sliders,
  Check,
  Cpu
} from 'lucide-react';
import { Badge, Button, Input, Modal, Textarea, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const IntegrationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'mapping' | 'webhooks' | 'logs' | 'quarantine' | 'settings'>('overview');
  const [isManualSyncing, setIsManualSyncing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);

  // Field Mapping State
  const [fieldMappings, setFieldMappings] = useState([
    { sourceField: 'userPrincipalName', atsField: 'recruiterEmail', transform: 'Direct Match', syncDirection: 'Bi-directional' },
    { sourceField: 'jobTitle', atsField: 'requisitionTitle', transform: 'String Clean', syncDirection: 'Inbound' },
    { sourceField: 'department', atsField: 'engineeringDiscipline', transform: 'Discipline Enum Map', syncDirection: 'Inbound' },
    { sourceField: 'employeeId', atsField: 'candidateExternalRef', transform: 'Prefix (E-)', syncDirection: 'Bi-directional' },
    { sourceField: 'accountEnabled', atsField: 'isActiveRecruiter', transform: 'Boolean Cast', syncDirection: 'Inbound' }
  ]);

  // Webhook Events Log
  const [webhookLogs, setWebhookLogs] = useState([
    { id: 'evt-901', event: 'user.provisioned.scim', status: 200, time: '2 mins ago', payload: '{"id": "usr-849", "role": "HiringManager", "discipline": "Piping"}' },
    { id: 'evt-902', event: 'group.membership.updated', status: 200, time: '14 mins ago', payload: '{"group": "EPCM-LeadEngineers", "membersAdded": 2}' },
    { id: 'evt-903', event: 'credential.revoked', status: 200, time: '1 hour ago', payload: '{"user": "contractor.temp@albertaeng.ca", "status": "Inactive"}' },
    { id: 'evt-904', event: 'directory.delta.sync', status: 422, time: '3 hours ago', payload: '{"error": "Invalid department code [PIPE-DES-3D]"}' }
  ]);

  // Quarantined Items
  const [quarantinedItems, setQuarantinedItems] = useState([
    { id: 'q-1', recordType: 'Requisition Sync', error: 'Missing Mandatory Cost Center Code in Deltek WBS', timestamp: '2026-08-28 14:22 MDT', payload: 'Requisition: Senior Piping Designer (Surmont SAGD)' },
    { id: 'q-2', recordType: 'Employee SCIM Profile', error: 'Duplicate Email Address Conflict with legacy ATS record', timestamp: '2026-08-28 11:05 MDT', payload: 'User: Tariq Al-Mansoor (t.mansoor@albertaeng.ca)' }
  ]);

  const handleManualSync = () => {
    sound.warp();
    setIsManualSyncing(true);
    toast('Sync Initiated', `Running delta synchronization for ${id?.toUpperCase()} connector...`, 'info');
    setTimeout(() => {
      setIsManualSyncing(false);
      sound.chime();
      toast('Sync Completed', 'All objects synchronized with zero new errors.', 'success');
    }, 1500);
  };

  const handleTogglePause = () => {
    sound.pop();
    setIsPaused(!isPaused);
    toast(
      isPaused ? 'Sync Resumed' : 'Sync Paused',
      isPaused ? 'Inbound and outbound data stream resumed.' : 'Connector data pipeline paused. Webhooks queued in buffer.',
      'info'
    );
  };

  const handleRetryQuarantine = () => {
    sound.chime();
    setQuarantinedItems([]);
    setShowRetryModal(false);
    toast('Quarantine Reprocessed', '2 quarantined records successfully resolved and committed to ATS database.', 'success');
  };

  const handleDisconnect = () => {
    sound.glass();
    setShowDisconnectModal(false);
    toast('Connector Revoked', 'Integration tokens revoked and background synchronization halted.', 'warning');
    navigate('/integrations');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. CONTROL CENTRE HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/integrations')}
                className="p-1.5 rounded-[6px] hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-zinc-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2.5">
                <Cpu className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                    <span>Enterprise Integration Control Centre</span>
                    <span className="opacity-30">•</span>
                    <span>Connector ID: {id}</span>
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight flex items-center gap-2">
                    <span>Microsoft Entra ID / SSO & SCIM Directory Hub</span>
                    <Badge variant={isPaused ? 'warning' : 'success'} size="sm">
                      {isPaused ? 'PAUSED' : 'HEALTHY • LIVE SYNC'}
                    </Badge>
                    {isSandbox && (
                      <Badge variant="indigo" size="sm">SANDBOX ENVIRONMENT</Badge>
                    )}
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="xs"
                variant="machined"
                loading={isManualSyncing}
                onClick={handleManualSync}
                className="gap-1.5 font-semibold text-xs"
              >
                <RefreshCw className={cn('w-3.5 h-3.5', isManualSyncing && 'animate-spin')} />
                <span>Sync Now</span>
              </Button>

              <Button
                size="xs"
                variant="machined"
                onClick={handleTogglePause}
                className="gap-1.5 font-semibold text-xs"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-500" /> : <Pause className="w-3.5 h-3.5 text-amber-500" />}
                <span>{isPaused ? 'Resume Sync' : 'Pause Sync'}</span>
              </Button>

              <Button
                size="xs"
                variant="destructive"
                onClick={() => setShowDisconnectModal(true)}
                className="gap-1.5 font-semibold text-xs"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1">
            {[
              { id: 'overview', label: 'Connection Health & Telemetry' },
              { id: 'mapping', label: 'Field Mapping & Schemas' },
              { id: 'webhooks', label: 'Webhook Event Inspector' },
              { id: 'quarantine', label: `Quarantine & Conflicts (${quarantinedItems.length})` },
              { id: 'logs', label: 'Sync Execution Logs' },
              { id: 'settings', label: 'Authentication & Policies' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.click();
                  setActiveTab(tab.id as any);
                }}
                className={cn(
                  'px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black shadow-xs font-bold'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08]'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. TAB WORKBENCH CONTENT */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
        {/* TAB 1: OVERVIEW & TELEMETRY */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top KPI Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Connection Health</div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>99.98%</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">mTLS 1.3 Verified • Latency: 24ms</div>
              </div>

              <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Objects Synchronized</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">1,482</div>
                <div className="text-[11px] text-slate-500">Users, Roles, Cost Centers & Permissions</div>
              </div>

              <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">API Rate Limit Quota</div>
                <div className="text-2xl font-bold text-[#8A6D3B] dark:text-[#d4c5a9] tabular-nums">28.4%</div>
                <div className="text-[11px] text-slate-500 font-mono">14,200 / 50,000 reqs today (Resets in 6h)</div>
              </div>

              <div className="p-5 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Connection Owner</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">Sarah Jenkins</div>
                <div className="text-[11px] text-slate-500">Lead Recruiter & Systems Administrator</div>
              </div>
            </div>

            {/* Inbound vs Outbound Flow Diagram */}
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Data Movement & Synchronization Pipeline</h3>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">Bi-directional event-driven sync with automatic dead-letter buffering</div>
                </div>
                <Badge variant="champagne" size="sm">Schedule: Real-time Webhook + Hourly Delta Poll</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Inbound Stream (Entra ID → ATS)</span>
                    </span>
                    <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">128 ops / hr</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-zinc-400">
                    <li>• User account creation, name changes and email provisioning</li>
                    <li>• Security group membership updates for EPCM hiring managers</li>
                    <li>• Instant account deactivation and session revocation triggers</li>
                  </ul>
                </div>

                <div className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Outbound Stream (ATS → Entra ID)</span>
                    </span>
                    <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-bold">42 ops / hr</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-zinc-400">
                    <li>• Pre-hire staging accounts generated upon DocuSign offer execution</li>
                    <li>• Assigned discipline role attributes (Piping, HVAC, Structural)</li>
                    <li>• Security clearance and audit badge metadata binding</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Granted OAuth & SCIM Permissions */}
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                Active OAuth 2.0 Scopes & SCIM Directory Permissions
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                {['User.ReadWrite.All', 'Directory.Read.All', 'GroupMember.Read.All', 'Application.Read.All'].map((p) => (
                  <div key={p} className="p-2.5 rounded-[6px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 flex items-center justify-between">
                    <span className="font-mono text-slate-800 dark:text-zinc-200">{p}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FIELD MAPPING */}
        {activeTab === 'mapping' && (
          <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Field Mapping & Data Transformation Schema</h3>
                <div className="text-xs text-slate-500 dark:text-zinc-400">Configure how source directory attributes translate into internal ATS candidate and recruiter schemas</div>
              </div>
              <Button size="xs" variant="champagne" onClick={() => toast('Schema Updated', 'Saved field mappings.', 'success')} className="font-semibold text-xs">
                Save Mappings
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-black/[0.08] dark:border-white/[0.08] text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                    <th className="py-2.5 px-3">External Source Field</th>
                    <th className="py-2.5 px-3">Internal ATS Target Field</th>
                    <th className="py-2.5 px-3">Transformation Rule</th>
                    <th className="py-2.5 px-3">Direction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04] font-mono">
                  {fieldMappings.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{m.sourceField}</td>
                      <td className="py-3 px-3 text-[#8A6D3B] dark:text-[#d4c5a9] font-bold">{m.atsField}</td>
                      <td className="py-3 px-3 text-slate-600 dark:text-zinc-400 font-sans">{m.transform}</td>
                      <td className="py-3 px-3">
                        <Badge variant="neutral" size="sm">{m.syncDirection}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: WEBHOOKS INSPECTOR */}
        {activeTab === 'webhooks' && (
          <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Live Webhook Event Inspector</h3>
                <div className="text-xs text-slate-500 dark:text-zinc-400">Real-time inspection of inbound and outbound HMAC-signed HTTP event payloads</div>
              </div>
              <Badge variant="success" size="sm">Endpoint Active (HTTPS 200 OK)</Badge>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {webhookLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={log.status === 200 ? 'success' : 'destructive'} size="sm">
                        {log.status} {log.status === 200 ? 'OK' : 'REJECTED'}
                      </Badge>
                      <span className="font-bold text-slate-900 dark:text-white">{log.event}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-sans">{log.time}</span>
                  </div>
                  <div className="p-2.5 rounded-[6px] bg-slate-900 text-emerald-400 text-[11px] overflow-x-auto">
                    <code>{log.payload}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QUARANTINE & CONFLICT RESOLUTION */}
        {activeTab === 'quarantine' && (
          <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Quarantined Records & Conflict Resolution</h3>
                <div className="text-xs text-slate-500 dark:text-zinc-400">Records blocked due to validation failures, duplicate identity keys, or conflicting ERP state</div>
              </div>

              {quarantinedItems.length > 0 && (
                <Button size="xs" variant="champagne" onClick={() => setShowRetryModal(true)} className="gap-1.5 font-semibold text-xs">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry All Quarantined</span>
                </Button>
              )}
            </div>

            {quarantinedItems.length > 0 ? (
              <div className="space-y-3 text-xs">
                {quarantinedItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-[8px] bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/30 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-rose-700 dark:text-rose-400">{item.recordType}</span>
                          <Badge variant="destructive" size="sm">BLOCKED</Badge>
                        </div>
                        <p className="text-slate-700 dark:text-zinc-300 font-medium mt-1">{item.error}</p>
                        <div className="font-mono text-[11px] text-slate-500 dark:text-zinc-400 mt-1">{item.payload}</div>
                      </div>
                      <span className="text-[10px] tabular-nums text-slate-400 shrink-0">{item.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 dark:text-zinc-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <div className="font-bold text-slate-900 dark:text-white">Quarantine Queue Empty</div>
                <p>All inbound and outbound records are committing cleanly with zero conflicts.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: LOGS & AUDIT EXPORTS */}
        {activeTab === 'logs' && (
          <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Synchronization Execution History & Audit Logs</h3>
                <div className="text-xs text-slate-500 dark:text-zinc-400">Complete audit trail of all background polling cycles and payload transactions</div>
              </div>
              <Button
                size="xs"
                variant="machined"
                onClick={() => {
                  sound.pop();
                  toast('Export Ready', 'Downloaded full sync audit ledger (JSON).', 'info');
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit Logs</span>
              </Button>
            </div>

            <div className="p-4 rounded-[8px] bg-slate-900 text-zinc-300 font-mono text-xs space-y-1.5 max-h-80 overflow-y-auto">
              <div>[2026-08-28 21:32:00 MDT] [INFO] Delta sync cycle started. Polling Microsoft Graph /users/delta...</div>
              <div>[2026-08-28 21:32:01 MDT] [INFO] Received 0 user deletions, 2 metadata updates. Commit succeeded.</div>
              <div>[2026-08-28 21:17:00 MDT] [INFO] SCIM Provisioning Token validated. Handshake 200 OK.</div>
              <div>[2026-08-28 21:02:00 MDT] [INFO] Scheduled delta cycle completed. 0 quarantined rows.</div>
              <div>[2026-08-28 20:47:00 MDT] [WARN] Rate limit threshold at 28.4%. Backoff delay 0ms.</div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS & POLICIES */}
        {activeTab === 'settings' && (
          <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-6">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Connector Configuration & Governance Policies</h3>
              <div className="text-xs text-slate-500 dark:text-zinc-400">Manage tenant credentials, conflict-resolution priority, and sandbox simulation</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Conflict-Resolution Rule</label>
                <select className="w-full h-8 px-2.5 rounded-[6px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-medium">
                  <option>ATS Database Wins (Preserve Recruiter Overrides)</option>
                  <option>External Integration Wins (Authoritative Source)</option>
                  <option>Flag for Manual Recruiter Review in Quarantine</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Environment Mode</label>
                <button
                  type="button"
                  onClick={() => setIsSandbox(!isSandbox)}
                  className="w-full h-8 px-3 rounded-[6px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 flex items-center justify-between text-slate-900 dark:text-white"
                >
                  <span>{isSandbox ? 'Sandbox / Test Mode (No Live Mutations)' : 'Production Tenant Live'}</span>
                  <Badge variant={isSandbox ? 'indigo' : 'success'} size="sm">
                    {isSandbox ? 'SANDBOX' : 'PRODUCTION'}
                  </Badge>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. DISCONNECT IMPACT WARNING MODAL */}
      <Modal
        isOpen={showDisconnectModal}
        onClose={() => setShowDisconnectModal(false)}
        title="Disconnect & Revoke Integration Access?"
        subtitle="Review operational impact before revoking integration access"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-[8px] bg-rose-50 dark:bg-rose-950/30 border border-rose-500/30 space-y-2">
            <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>What happens if this integration is disconnected?</span>
            </div>
            <ul className="space-y-1 text-slate-700 dark:text-zinc-300">
              <li>• Single Sign-On (SSO) logins via Microsoft Entra will be disabled.</li>
              <li>• Automatic SCIM user provisioning for hiring managers will halt.</li>
              <li>• Existing ATS candidate and application records will <strong>NOT</strong> be deleted.</li>
              <li>• API keys and webhook secrets will be securely purged from the vault.</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" onClick={() => setShowDisconnectModal(false)}>
              Keep Connected
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDisconnect} className="font-semibold">
              Confirm Disconnect & Revoke Access
            </Button>
          </div>
        </div>
      </Modal>

      {/* 4. RETRY QUARANTINE MODAL */}
      <Modal
        isOpen={showRetryModal}
        onClose={() => setShowRetryModal(false)}
        title="Reprocess Quarantined Records"
        subtitle="Execute immediate retry with relaxed validation rules"
        maxWidth="sm"
      >
        <div className="space-y-3 text-xs">
          <p className="text-slate-600 dark:text-zinc-300">
            This will replay 2 quarantined payloads against the active ATS schema and attempt automatic field resolution.
          </p>
          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" onClick={() => setShowRetryModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" onClick={handleRetryQuarantine} className="font-semibold">
              Execute Retry
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
