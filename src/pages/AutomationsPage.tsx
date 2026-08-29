import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Plus,
  Play,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Settings,
  Bell,
  Mail,
  UserCheck,
  Filter,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Badge, Button, Card, Input, Modal, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  active: boolean;
  executionsCount: number;
  lastExecuted: string;
}

export const AutomationsPage: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: 'rule-01',
      name: 'Onboarding & CAD License Provisioning',
      trigger: 'Application Stage changed to "Offer Signed"',
      condition: 'Target job is in Piping & Layout or Mechanical HVAC',
      action: 'Create Autodesk Navisworks license ticket & Notify IT and Payroll',
      active: true,
      executionsCount: 28,
      lastExecuted: 'Yesterday at 3:15 PM'
    },
    {
      id: 'rule-02',
      name: 'Fast-Track High-Fit APEGA Licensed Leads',
      trigger: 'New Application Received with Fit Score ≥ 95%',
      condition: 'APEGA P.Eng. status verified active',
      action: 'Fast-track to Technical Review & ping Elena Rostova on Teams',
      active: true,
      executionsCount: 42,
      lastExecuted: 'Aug 26, 2026'
    },
    {
      id: 'rule-03',
      name: 'Automated H2S / Safety Ticket Expiry Renewal',
      trigger: 'Safety Ticket Expiry < 30 days',
      condition: 'Candidate is allocated to Active Site Project (Surmont/Kearl)',
      action: 'Dispatch automated ticket renewal upload form to candidate',
      active: true,
      executionsCount: 15,
      lastExecuted: 'Aug 22, 2026'
    }
  ]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleTrigger, setNewRuleTrigger] = useState('Application Stage changed to "Offer Signed"');
  const [newRuleCondition, setNewRuleCondition] = useState('Discipline is Piping & Layout');
  const [newRuleAction, setNewRuleAction] = useState('Create Autodesk Navisworks CAD license ticket');

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;
    sound.chime();
    const newRule: AutomationRule = {
      id: `rule-${Date.now()}`,
      name: newRuleName,
      trigger: newRuleTrigger,
      condition: newRuleCondition,
      action: newRuleAction,
      active: true,
      executionsCount: 0,
      lastExecuted: 'Just now'
    };
    setRules([newRule, ...rules]);
    setShowCreateModal(false);
    setNewRuleName('');
    toast('Automation Created', `Activated rule: "${newRuleName}".`, 'success');
  };

  const handleToggleRule = (id: string) => {
    sound.pop();
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
    toast('Rule Status Updated', 'Automation rule state updated.', 'info');
  };

  const handleTestRule = (ruleName: string) => {
    sound.chime();
    toast('Test Run Succeeded', `Triggered dry-run execution for "${ruleName}".`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. AUTOMATION HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="pipeline-velocity" opacity="opacity-40 dark:opacity-25" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <Zap className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Workflow Engine</span>
                <span className="opacity-30">•</span>
                <span>Event-Driven Trigger Execution</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Visual Automation Rules Studio
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="xs"
              variant="champagne"
              onClick={() => {
                sound.glass();
                setShowCreateModal(true);
              }}
              className="gap-1.5 font-semibold text-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
              <span>Create New Rule</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. AUTOMATION RULES STREAM */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-4 max-w-7xl mx-auto w-full">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#8A6D3B]/20 text-[#8A6D3B] dark:text-[#d4c5a9] flex items-center justify-center font-bold border border-[#8A6D3B]/40 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{rule.name}</h3>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">
                    Executed {rule.executionsCount} times • Last fired: {rule.lastExecuted}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleRule(rule.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-300"
                >
                  <span className={rule.active ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                    {rule.active ? 'Active' : 'Paused'}
                  </span>
                </button>
              </div>
            </div>

            {/* Visual Trigger -> Condition -> Action Visual Chain */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8A6D3B] dark:text-[#d4c5a9]">
                  1. Trigger Event
                </div>
                <div className="font-semibold text-slate-900 dark:text-white">{rule.trigger}</div>
              </div>

              <div className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                  2. Criteria Condition
                </div>
                <div className="text-slate-700 dark:text-zinc-300">{rule.condition}</div>
              </div>

              <div className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  3. Automated Action
                </div>
                <div className="font-semibold text-slate-900 dark:text-white">{rule.action}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06] dark:border-white/10">
              <Button
                size="xs"
                variant="machined"
                onClick={() => handleTestRule(rule.name)}
                className="gap-1 font-semibold text-xs"
              >
                <Play className="w-3 h-3" />
                <span>Test Dry Run</span>
              </Button>
            </div>
          </div>
        ))}
      </main>

      {/* 3. CREATE RULE MODAL */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Configure Automation Workflow Rule"
        subtitle="Define trigger events, EPCM criteria filters, and automated dispatch actions"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateRule} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Rule Title</label>
            <Input
              placeholder="e.g. Notify Discipline Lead on SAGD Experience Match"
              value={newRuleName}
              onChange={(e) => setNewRuleName(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-bold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">1. Trigger Event</label>
              <select
                value={newRuleTrigger}
                onChange={(e) => setNewRuleTrigger(e.target.value)}
                className="w-full h-8 px-2 rounded-[6px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              >
                <option value='Application Stage changed to "Offer Signed"'>Stage → Offer Signed</option>
                <option value="New Application Received with Fit Score ≥ 95%">Inbound Fit ≥ 95%</option>
                <option value="Safety Ticket Expiry < 30 days">Safety Ticket &lt; 30 Days</option>
                <option value="Technical Scorecard Submitted with Strong Hire">Scorecard → Strong Hire</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">2. Criteria Condition</label>
              <Input
                value={newRuleCondition}
                onChange={(e) => setNewRuleCondition(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">3. Action to Execute</label>
              <Input
                value={newRuleAction}
                onChange={(e) => setNewRuleAction(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit" className="font-semibold">
              Activate Automation Rule
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
