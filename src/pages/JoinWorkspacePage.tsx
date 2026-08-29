import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { workspaceService } from '../services/workspaceService';
import { Button } from '../components/ui';
import { useToast } from '../context/ToastContext';

export const JoinWorkspacePage: React.FC = () => {
  const [code, setCode] = useState('MAPLE-4821');
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsJoining(true);
    const res = await workspaceService.joinWorkspace(code);
    setIsJoining(false);

    if (res.success) {
      toast('Workspace Connected', `Joined ${res.workspaceName} successfully.`, 'success');
      navigate('/');
    } else {
      toast('Connection Failed', res.error || 'Invalid join code.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6 text-xs animate-in fade-in zoom-in-95">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto">
            <Laptop className="w-6 h-6" />
          </div>
          <h1 className="text-base font-bold text-slate-900 dark:text-slate-100">Join Shared Office Workspace</h1>
          <p className="text-slate-500 text-[11px]">
            Enter the 8-character join code displayed on your office host computer.
          </p>
        </div>

        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="block text-slate-500 mb-1.5 font-medium">Join Code</label>
            <input
              type="text"
              required
              placeholder="e.g. MAPLE-4821"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full px-3.5 py-2 font-mono text-center tracking-widest text-base font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" size="lg" disabled={isJoining} className="w-full gap-2">
            <span>{isJoining ? 'Connecting to host computer...' : 'Connect to Workspace'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Automatic local network broadcast discovery</span>
        </div>
      </div>
    </div>
  );
};
