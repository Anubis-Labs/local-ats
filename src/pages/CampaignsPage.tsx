import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Users,
  Clock,
  CheckCircle2,
  Mail,
  MessageSquare,
  Plus,
  ArrowRight,
  Sparkles,
  BarChart2,
  Play,
  Pause
} from 'lucide-react';
import { Badge, Button, Card, Input, Modal, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface Campaign {
  id: string;
  name: string;
  discipline: string;
  targetCount: number;
  contactedCount: number;
  repliedCount: number;
  positiveConversions: number;
  status: 'active' | 'paused' | 'completed';
  steps: { stepNum: number; channel: string; delay: string; subject: string }[];
}

export const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'cmp-01',
      name: 'Alberta SAGD Senior Piping Leads (Plant 3D / Caesar II)',
      discipline: 'Piping & Layout',
      targetCount: 45,
      contactedCount: 38,
      repliedCount: 16,
      positiveConversions: 8,
      status: 'active',
      steps: [
        { stepNum: 1, channel: 'LinkedIn InMail', delay: 'Day 1', subject: 'Surmont SAGD Debottlenecking — Senior Piping Designer Requisition' },
        { stepNum: 2, channel: 'Email', delay: 'Day 4', subject: 'Project Overview & EPCM Compensation details for Surmont Phase 2' },
        { stepNum: 3, channel: 'SMS / Direct Outreach', delay: 'Day 8', subject: 'Quick follow-up regarding your availability in Calgary' }
      ]
    },
    {
      id: 'cmp-02',
      name: 'Edmonton Industrial HVAC Stamped Engineers (APEGA P.Eng.)',
      discipline: 'Mechanical',
      targetCount: 25,
      contactedCount: 20,
      repliedCount: 11,
      positiveConversions: 5,
      status: 'active',
      steps: [
        { stepNum: 1, channel: 'LinkedIn InMail', delay: 'Day 1', subject: 'Lead Mechanical HVAC Engineer Opportunity with Alberta Engineering' },
        { stepNum: 2, channel: 'Email', delay: 'Day 3', subject: 'Follow up: Direct discussion with David Tremblay (Engineering Lead)' }
      ]
    }
  ]);

  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('cmp-01');
  const { toast } = useToast();
  const navigate = useNavigate();

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];

  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignDiscipline, setNewCampaignDiscipline] = useState('Piping & Layout');
  const [newCampaignTarget, setNewCampaignTarget] = useState('30');
  const [newCampaignSubject, setNewCampaignSubject] = useState('Major Capital Project Opportunity — Alberta Engineering');

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;
    sound.chime();
    const newCmp: Campaign = {
      id: `cmp-${Date.now()}`,
      name: newCampaignName,
      discipline: newCampaignDiscipline,
      targetCount: Number(newCampaignTarget) || 25,
      contactedCount: 0,
      repliedCount: 0,
      positiveConversions: 0,
      status: 'active',
      steps: [
        { stepNum: 1, channel: 'LinkedIn InMail', delay: 'Day 1', subject: newCampaignSubject },
        { stepNum: 2, channel: 'Email', delay: 'Day 4', subject: `Follow-up: ${newCampaignSubject}` }
      ]
    };
    setCampaigns([newCmp, ...campaigns]);
    setSelectedCampaignId(newCmp.id);
    setShowLaunchModal(false);
    setNewCampaignName('');
    toast('Campaign Launched', `Outreach sequence initiated for "${newCampaignName}".`, 'success');
  };

  const handleToggleCampaign = (id: string) => {
    sound.pop();
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c
      )
    );
    toast('Campaign State Changed', 'Outreach sequence schedule updated.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. CAMPAIGNS HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="pipeline-velocity" opacity="opacity-40 dark:opacity-25" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <Send className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Proactive Sourcing Engine</span>
                <span className="opacity-30">•</span>
                <span>Multi-Touch Outreach Sequences</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Talent Sourcing Campaigns & Sequences
              </h1>
            </div>
          </div>

          <Button
            size="xs"
            variant="champagne"
            onClick={() => {
              sound.glass();
              setShowLaunchModal(true);
            }}
            className="gap-1.5 font-semibold text-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
            <span>Launch Outreach Campaign</span>
          </Button>
        </div>
      </header>

      {/* 2. DUAL COLUMN LAYOUT */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Left Column: Campaigns List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {campaigns.map((cmp) => (
              <div
                key={cmp.id}
                onClick={() => {
                  sound.click();
                  setSelectedCampaignId(cmp.id);
                }}
                className={cn(
                  'p-5 rounded-[12px] bg-white dark:bg-[#12151D] border cursor-pointer transition-all space-y-3 specimen-chamfer shadow-sm',
                  selectedCampaignId === cmp.id
                    ? 'border-[#8A6D3B] dark:border-[#d4c5a9] bg-amber-50/20'
                    : 'border-black/[0.08] dark:border-white/10 hover:border-black/20'
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{cmp.name}</h3>
                    <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                      Discipline: <strong className="text-slate-700 dark:text-zinc-300">{cmp.discipline}</strong>
                    </div>
                  </div>
                  <Badge variant={cmp.status === 'active' ? 'success' : 'neutral'} size="sm">
                    {cmp.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] text-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{cmp.contactedCount} / {cmp.targetCount}</div>
                    <div className="text-[10px] text-slate-400">Contacted</div>
                  </div>
                  <div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {cmp.contactedCount > 0 ? `${Math.round((cmp.repliedCount / cmp.contactedCount) * 100)}%` : '0%'}
                    </div>
                    <div className="text-[10px] text-slate-400">Reply Rate</div>
                  </div>
                  <div>
                    <div className="font-bold text-[#8A6D3B] dark:text-[#d4c5a9]">{cmp.positiveConversions}</div>
                    <div className="text-[10px] text-slate-400">In Pipeline</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sequence Steps Detail (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{selectedCampaign.name}</h3>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">
                    {selectedCampaign.steps.length}-Step Multi-Channel Outbound Sequence
                  </div>
                </div>

                <Button
                  size="xs"
                  variant="machined"
                  onClick={() => handleToggleCampaign(selectedCampaign.id)}
                  className="gap-1 text-xs"
                >
                  {selectedCampaign.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{selectedCampaign.status === 'active' ? 'Pause Sequence' : 'Resume Sequence'}</span>
                </Button>
              </div>

              <div className="space-y-3 text-xs">
                {selectedCampaign.steps.map((st) => (
                  <div
                    key={st.stepNum}
                    className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 dark:text-white">Step {st.stepNum}: {st.channel}</span>
                      <Badge variant="champagne" size="sm">{st.delay}</Badge>
                    </div>
                    <div className="text-slate-700 dark:text-zinc-300 font-medium">Subject: {st.subject}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. LAUNCH CAMPAIGN MODAL */}
      <Modal
        isOpen={showLaunchModal}
        onClose={() => setShowLaunchModal(false)}
        title="Launch Outbound Talent Campaign"
        subtitle="Configure sequence parameters, target discipline benchmarks, and messaging triggers"
        maxWidth="lg"
      >
        <form onSubmit={handleLaunchCampaign} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Campaign Name</label>
            <Input
              placeholder="e.g. Fort McMurray SAGD Lead Piping Designers Q4"
              value={newCampaignName}
              onChange={(e) => setNewCampaignName(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Engineering Discipline</label>
              <select
                value={newCampaignDiscipline}
                onChange={(e) => setNewCampaignDiscipline(e.target.value)}
                className="w-full h-8 px-2 rounded-[6px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              >
                <option>Piping & Layout</option>
                <option>Mechanical HVAC</option>
                <option>Civil & Structural</option>
                <option>Electrical & Instrumentation</option>
                <option>Project Controls</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Target Candidate Count</label>
              <Input
                type="number"
                value={newCampaignTarget}
                onChange={(e) => setNewCampaignTarget(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Initial Sequence Subject Line</label>
            <Input
              value={newCampaignSubject}
              onChange={(e) => setNewCampaignSubject(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowLaunchModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit" className="font-semibold">
              Start Sourcing Sequence
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
