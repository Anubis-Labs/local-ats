import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Briefcase,
  Columns3,
  Sparkles,
  Scale,
  BookmarkCheck,
  Calendar,
  CheckSquare,
  BarChart3,
  Network,
  UploadCloud,
  Users2,
  FileCode2,
  Layers,
  Settings,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Database,
  Laptop,
  Globe,
  Inbox,
  Mail,
  AlertTriangle,
  HardHat,
  Zap,
  Send,
  Lock,
  UserCheck
} from 'lucide-react';
import { cn, LocalAtsMark } from '../ui';
import { useWorkspace } from '../../context/WorkspaceContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
  onOpenSharedOffice?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, onOpenSharedOffice }) => {
  const location = useLocation();
  const { settings } = useWorkspace();

  // Section 1: Core Recruiting (Work)
  const workSection = [
    { to: '/', label: 'Today / Home', icon: Home },
    { to: '/applications', label: 'Applications', icon: Inbox, count: '5' },
    { to: '/candidates', label: 'Candidate Roster', icon: Users, count: '85' },
    { to: '/jobs', label: 'Requisitions', icon: Briefcase, count: '5' },
    { to: '/pipeline', label: 'Pipeline Kanban', icon: Columns3 },
    { to: '/mobilization', label: 'Mobilization Board', icon: HardHat, count: '3' },
    { to: '/team-builder', label: 'Project Team Builder', icon: Users2 },
    { to: '/scenarios', label: 'Award Scenarios', icon: Sparkles },
    { to: '/readiness', label: 'Site Readiness Passport', icon: ShieldCheck },
  ];

  // Section 2: Coordination & Operations
  const coordinateSection = [
    { to: '/communications', label: 'Communications', icon: Mail, count: '1' },
    { to: '/calendar', label: 'Interview Calendar', icon: Calendar, count: '3' },
    { to: '/approvals', label: 'Approval Center', icon: ShieldCheck, count: '3' },
    { to: '/compliance', label: 'Compliance Radar', icon: UserCheck, count: '2' },
    { to: '/onboarding', label: 'Onboarding Handoff', icon: Laptop, count: '1' },
    { to: '/cost-calculator', label: 'Total Cost Calculator', icon: Scale },
    { to: '/duplicates', label: 'Duplicate Resolver', icon: AlertTriangle },
    { to: '/tasks', label: 'Tasks Queue', icon: CheckSquare, count: '4' },
  ];

  // Section 3: Intelligence & System Tools
  const intelligenceSection = [
    { to: '/campaigns', label: 'Sourcing Campaigns', icon: Send, count: '2' },
    { to: '/automations', label: 'Automation Rules', icon: Zap, count: '3' },
    { to: '/talent', label: 'Talent Pools', icon: BookmarkCheck },
    { to: '/compare', label: 'Candidate Compare', icon: Scale },
    { to: '/relationships', label: 'Knowledge Graph', icon: Network },
    { to: '/reports', label: 'Reports & Funnel', icon: BarChart3 },
    { to: '/integrations', label: 'Integrations Hub', icon: Globe },
    { to: '/templates', label: 'Template Studio', icon: FileCode2 },
    { to: '/audit', label: 'Audit & Privacy Vault', icon: Lock },
    { to: '/settings', label: 'Settings & Vault', icon: Settings },
  ];

  const renderNavGroup = (title: string, items: typeof workSection) => (
    <div className="space-y-0.5">
      {!collapsed && (
        <div className="px-2.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-[#8A6D3B] dark:text-[#d4c5a9]">
          {title}
        </div>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          location.pathname === item.to ||
          (item.to !== '/' && location.pathname.startsWith(item.to));

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              'flex items-center gap-2.5 px-2.5 py-1.5 rounded-[7px] text-xs font-medium transition-all group relative outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4c5a9]/40',
              isActive
                ? 'bg-black/[0.06] text-slate-900 dark:bg-white/[0.08] dark:text-white font-semibold specimen-chamfer specimen-chamfer-champagne shadow-2xs nav-active-glow pl-3'
                : 'text-slate-600 hover:text-slate-900 hover:bg-black/[0.03] dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-white/[0.04]'
            )}
            title={collapsed ? item.label : undefined}
          >
            <Icon
              className={cn(
                'w-4 h-4 shrink-0 transition-colors',
                isActive
                  ? 'text-[#8A6D3B] dark:text-[#d4c5a9]'
                  : 'text-slate-400 group-hover:text-slate-700 dark:text-zinc-500 dark:group-hover:text-zinc-300'
              )}
              strokeWidth={1.75}
            />

            {!collapsed && (
              <div className="flex items-center justify-between flex-1 min-w-0">
                <span className="truncate">{item.label}</span>
                {item.count && (
                  <span
                    className={cn(
                      'text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] font-bold',
                      isActive
                        ? 'bg-[#8A6D3B]/15 text-[#8A6D3B] dark:bg-[#d4c5a9]/15 dark:text-[#d4c5a9] border border-[#8A6D3B]/20 dark:border-[#d4c5a9]/20'
                        : 'bg-black/[0.04] text-slate-500 dark:bg-white/[0.06] dark:text-zinc-400'
                    )}
                  >
                    {item.count}
                  </span>
                )}
              </div>
            )}
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <aside
      className={cn(
        'sidebar-hover-parent group/sidebar h-screen flex flex-col border-r border-black/[0.07] dark:border-white/[0.07] bg-[#f7f6f2] dark:bg-[#0c0d10] select-none transition-all duration-200 shrink-0 z-30',
        collapsed ? 'w-16' : 'w-56'
      )}
    >
      {/* Workspace Header */}
      <div className="h-14 flex items-center justify-between px-3.5 border-b border-black/[0.05] dark:border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="shrink-0 transition-transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer p-0 bg-transparent border-0"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <LocalAtsMark size={32} />
          </button>
          {!collapsed && (
            <div className="truncate select-none">
              <div className="font-bold text-xs text-slate-900 dark:text-zinc-100 tracking-tight flex items-center gap-1.5 font-display">
                <span>Local ATS</span>
              </div>
              <div className="text-[9px] tracking-wide text-[#8A6D3B] dark:text-[#d4c5a9] font-medium mt-0.5">
                Private • Fast • Local-First
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 p-1 rounded-[5px] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors focus:outline-none cursor-pointer"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} /> : <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 py-3 px-2 space-y-4 sidebar-scroll-container">
        {renderNavGroup('Work', workSection)}
        {renderNavGroup('Coordinate', coordinateSection)}
        {renderNavGroup('Intelligence & Vault', intelligenceSection)}
      </div>

      {/* Shared Office Status Footer */}
      {!collapsed ? (
        <div
          onClick={onOpenSharedOffice}
          className="p-3 border-t border-black/[0.05] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors cursor-pointer text-xs shrink-0 select-none group"
        >
          <div className="flex items-center justify-between text-slate-700 dark:text-zinc-300 mb-0.5">
            <span className="flex items-center gap-1.5 font-semibold text-xs group-hover:text-[#9e8557] dark:group-hover:text-[#d4c5a9] transition-colors">
              <Laptop className="w-3.5 h-3.5 text-[#9e8557] dark:text-[#d4c5a9]" strokeWidth={2} />
              <span>Shared Office</span>
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/[0.05] dark:bg-white/[0.08] text-slate-800 dark:text-zinc-200 font-semibold">
              {settings?.joinCode || 'MAPLE-4821'}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-zinc-500">
            {settings?.connectedClientsCount || 4} workstations active
          </div>
        </div>
      ) : (
        <div
          onClick={onOpenSharedOffice}
          className="p-3 border-t border-black/[0.05] dark:border-white/[0.06] flex justify-center shrink-0 cursor-pointer hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
        >
          <span title={`Shared Office (${settings?.joinCode || 'MAPLE-4821'})`}>
            <Laptop className="w-4 h-4 text-[#9e8557] dark:text-[#d4c5a9]" strokeWidth={2} />
          </span>
        </div>
      )}
    </aside>
  );
};
