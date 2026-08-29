import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  Users2,
  User,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  UploadCloud
} from 'lucide-react';
import { Button, LocalAtsMark } from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';

export const FirstRunSetupPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [usageMode, setUsageMode] = useState<'solo' | 'team'>('team');
  const [workspaceName, setWorkspaceName] = useState('Alberta Engineering & Projects Inc.');
  const navigate = useNavigate();
  const { updateSettings } = useWorkspace();

  const handleFinish = async () => {
    await updateSettings({
      workspaceName,
      mode: usageMode === 'team' ? 'shared_host' : 'standalone'
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-8 space-y-6 animate-in fade-in zoom-in-95">
        {/* Top Brand Logo */}
        <div className="flex items-center gap-3">
          <LocalAtsMark size={40} />
          <div>
            <h1 className="font-bold text-base text-slate-900 dark:text-slate-100">Local ATS</h1>
            <p className="text-xs text-slate-500">Your ATS. Your data. Your computer. No monthly fees.</p>
          </div>
        </div>

        {/* Step 1: Mode Choice */}
        {step === 1 && (
          <div className="space-y-5 text-xs">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">How will you use the ATS?</h2>
              <p className="text-slate-500 mt-0.5">Select your primary workflow to initialize your workspace.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setUsageMode('team')}
                className={`p-4 rounded-xl border cursor-pointer space-y-2 transition-all ${
                  usageMode === 'team'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Users2 className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">With my team</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  This computer will keep your team's shared hiring data accessible across your office network.
                </p>
              </div>

              <div
                onClick={() => setUsageMode('solo')}
                className={`p-4 rounded-xl border cursor-pointer space-y-2 transition-all ${
                  usageMode === 'solo'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">Just me</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Standalone workstation setup. All data stored strictly on this local hard drive.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="md" onClick={() => setStep(2)} className="gap-1.5">
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Name Workspace */}
        {step === 2 && (
          <div className="space-y-5 text-xs">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Name your hiring workspace</h2>
              <p className="text-slate-500 mt-0.5">Your organization or practice name.</p>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1.5 font-medium">Workspace Name</label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button size="md" onClick={() => setStep(3)} className="gap-1.5">
                <span>Next: Setup Initial Data</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <div className="space-y-5 text-xs text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Workspace Ready</h2>
              <p className="text-slate-500 mt-1 max-w-sm mx-auto text-[11px]">
                Your local ATS database is initialized with 85 sample candidate records, active requisitions, and full recruiting intelligence features.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <Button size="lg" onClick={handleFinish} className="gap-2 px-6">
                <span>Launch Operational Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
