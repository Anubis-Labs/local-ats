import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Activity,
  Radio,
  ExternalLink,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Send,
  X
} from 'lucide-react';
import { Modal, Badge, Button } from '../ui';
import { sound } from '../../utils/sound';
import { useToast } from '../../context/ToastContext';

interface SharedOfficeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SharedOfficeDrawer: React.FC<SharedOfficeDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const teammates = [
    {
      id: 'usr-1',
      name: 'Sarah Jenkins',
      role: 'Lead Technical Recruiter',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      activeOn: 'Tariq Al-Mansoor, CET',
      activeUrl: '/candidates/cand-001',
      status: 'reviewing_resume',
      statusLabel: 'Reviewing Resume Document',
      isYou: true
    },
    {
      id: 'usr-2',
      name: 'Elena Rostova, P.Eng.',
      role: 'Piping Discipline Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      activeOn: 'Melissa Chen, P.Eng.',
      activeUrl: '/candidates/cand-002',
      status: 'submitting_scorecard',
      statusLabel: 'Submitted 5/5 Technical Scorecard',
      isYou: false
    },
    {
      id: 'usr-3',
      name: 'Marcus Vance',
      role: 'Recruiter (Energy & Infrastructure)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      activeOn: 'Senior Piping Designer (Brownfield)',
      activeUrl: '/jobs/job-101',
      status: 'sourcing',
      statusLabel: 'Sourcing Inbound Requisitions',
      isYou: false
    },
    {
      id: 'usr-4',
      name: 'David Tremblay',
      role: 'Engineering Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      activeOn: 'Pipeline Kanban',
      activeUrl: '/pipeline',
      status: 'managing_pipeline',
      statusLabel: 'Reviewing Final Offer Approvals',
      isYou: false
    }
  ];

  const recentActivity = [
    {
      id: 'act-1',
      author: 'Elena Rostova, P.Eng.',
      action: 'completed Technical Panel evaluation for',
      target: 'Tariq Al-Mansoor, CET',
      targetUrl: '/candidates/cand-001',
      time: '2m ago'
    },
    {
      id: 'act-2',
      author: 'Marcus Vance',
      action: 'moved candidate to Offer Extended stage:',
      target: 'Melissa Chen, P.Eng.',
      targetUrl: '/candidates/cand-002',
      time: '14m ago'
    },
    {
      id: 'act-3',
      author: 'Sarah Jenkins',
      action: 'dispatched Interview Invitation packet to',
      target: 'Devon Blackwood',
      targetUrl: '/candidates/cand-003',
      time: '28m ago'
    }
  ];

  const handlePing = (name: string) => {
    sound.bell();
    toast('Ping Sent', `Broadcasted collaboration notification to ${name}.`, 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Shared Office Collaboration Mesh"
      subtitle="Real-time multi-recruiter presence, synchronized dossiers, and live activity stream (MAPLE-4821)"
      maxWidth="lg"
    >
      <div className="space-y-6 text-xs">
        {/* Active Peer Workstations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[11px] uppercase tracking-wider text-slate-600 dark:text-zinc-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>Active Workstations (4 Online)</span>
            </span>
            <Badge variant="champagne" size="sm">Local Mesh Active</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teammates.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-[9px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-9 h-9 rounded-[7px] object-cover border border-black/10 dark:border-white/10"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#07080A]" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{t.name}</span>
                        {t.isYou && <Badge variant="neutral" size="sm">You</Badge>}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400">{t.role}</div>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-[6px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/10 space-y-1">
                  <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-semibold">{t.statusLabel}</div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        sound.click();
                        onClose();
                        navigate(t.activeUrl);
                      }}
                      className="font-bold text-slate-900 dark:text-white hover:text-[#8A6D3B] dark:hover:text-[#d4c5a9] transition-colors truncate max-w-[170px] text-left"
                    >
                      {t.activeOn}
                    </button>
                    {!t.isYou && (
                      <Button
                        size="xs"
                        variant="machined"
                        onClick={() => handlePing(t.name)}
                        className="h-6 text-[10px] px-2 font-semibold"
                      >
                        Ping
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Workspace Activity Feed */}
        <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
          <div className="font-bold text-[11px] uppercase tracking-wider text-slate-600 dark:text-zinc-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
            <span>Synchronized Activity Stream</span>
          </div>

          <div className="space-y-2">
            {recentActivity.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 flex items-center justify-between text-xs"
              >
                <div className="text-slate-700 dark:text-zinc-300">
                  <strong className="text-slate-900 dark:text-white">{act.author}</strong> {act.action}{' '}
                  <button
                    onClick={() => {
                      sound.click();
                      onClose();
                      navigate(act.targetUrl);
                    }}
                    className="font-bold text-[#8A6D3B] dark:text-[#d4c5a9] hover:underline"
                  >
                    {act.target}
                  </button>
                </div>
                <span className="text-[10px] tabular-nums text-slate-400 dark:text-zinc-500 shrink-0 ml-3">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-black/10 dark:border-white/10">
          <Button size="sm" variant="champagne" onClick={onClose} className="font-semibold">
            Close Collaboration Mesh
          </Button>
        </div>
      </div>
    </Modal>
  );
};
