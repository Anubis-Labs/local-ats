import React from 'react';
import {
  Laptop,
  Users,
  ShieldCheck,
  Plus,
  Wifi,
  Copy,
  UserPlus
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Badge, Button, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface WorkstationNode {
  id: string;
  userName: string;
  role: string;
  deviceInfo: string;
  status: 'online' | 'idle' | 'offline';
  lastActive: string;
  avatar: string;
}

const mockWorkstationNodes: WorkstationNode[] = [
  {
    id: 'ws-1',
    userName: 'Sarah Jenkins (Host)',
    role: 'Lead Technical Recruiter',
    deviceInfo: 'MacBook Pro M3 Max • 192.168.1.104',
    status: 'online',
    lastActive: 'Just now',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'ws-2',
    userName: 'Marcus Vance',
    role: 'Senior Recruiter',
    deviceInfo: 'MacBook Air M2 • 192.168.1.112',
    status: 'online',
    lastActive: '2m ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'ws-3',
    userName: 'Elena Rostova',
    role: 'Hiring Manager (Piping)',
    deviceInfo: 'Dell XPS 15 • 192.168.1.145',
    status: 'online',
    lastActive: '12m ago',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'ws-4',
    userName: 'David Hughes',
    role: 'Talent Operations',
    deviceInfo: 'ThinkPad X1 • 192.168.1.158',
    status: 'idle',
    lastActive: '45m ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  }
];

export const TeamPage: React.FC = () => {
  const { settings } = useWorkspace();
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(settings?.joinCode || 'MAPLE-4821');
    toast('Copied Office Code', 'Shared office pairing code copied to clipboard.', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT TEAM WORKSTATIONS HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="briefing-ribbon" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <Users className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Local-First Network</span>
                <span className="opacity-30">•</span>
                <span>4 Connected Workstations</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Team Workstations & Shared Office
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button size="xs" variant="champagne" onClick={handleCopyCode} className="gap-1.5 font-semibold text-xs">
              <Copy className="w-3.5 h-3.5 text-[#d4c5a9]" strokeWidth={2} />
              <span>Copy Code: {settings?.joinCode || 'MAPLE-4821'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. WORKSTATIONS GRID WITH NEURAL MESH & CAD SURFACES */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockWorkstationNodes.map((node) => (
            <div
              key={node.id}
              className="rounded-[12px] p-6 bg-card-mesh space-y-4 shadow-xl specimen-chamfer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={node.avatar}
                    alt={node.userName}
                    className="w-12 h-12 rounded-[9px] object-cover border border-white/15 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-white">{node.userName}</h3>
                      <Badge variant={node.status === 'online' ? 'success' : 'neutral'} size="sm">
                        {node.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-zinc-300 mt-0.5 font-medium">{node.role}</div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-[8px] bg-black/50 border border-white/10 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Device Node:</span>
                  <span className="font-mono text-white">{node.deviceInfo}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Activity:</span>
                  <span className="text-emerald-400 font-semibold">{node.lastActive}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
