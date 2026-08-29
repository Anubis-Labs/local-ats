import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Bell,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAssistant } from '../../context/AssistantContext';
import { Button, Badge } from '../ui';

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onOpenShortcuts: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenCommandPalette, onOpenShortcuts }) => {
  const { theme, setTheme } = useTheme();
  const { isOffline, setIsOffline, settings } = useWorkspace();
  const { toggleAssistant } = useAssistant();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStatusPopover, setShowStatusPopover] = useState(false);

  const notifications = [
    { id: 1, title: 'Panel Interview Today @ 2:00 PM', desc: 'Tariq Al-Mansoor for Senior Piping Designer', time: '1h' },
    { id: 2, title: 'Offer Awaiting Sign-off', desc: 'Melissa Chen, P.Eng. ($138,000 CAD)', time: '3h' },
    { id: 3, title: 'Daily Backup Completed', desc: 'Automated snapshot saved to local storage', time: '5h' }
  ];

  return (
    <header className="h-13 border-b border-black/[0.06] dark:border-white/[0.06] bg-[var(--bg-canvas)]/80 backdrop-blur-2xl px-6 flex items-center justify-between shrink-0 select-none z-40 relative">
      {/* Global Search Bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-[7px] border border-black/[0.07] dark:border-white/[0.07] bg-white/70 dark:bg-[#121418]/80 hover:bg-white dark:hover:bg-[#16181e] text-slate-500 dark:text-zinc-400 text-xs w-64 md:w-80 text-left transition-all shadow-2xs group"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-zinc-200 shrink-0" strokeWidth={2} />
          <span className="truncate flex-1 text-xs">Search candidates, jobs, notes...</span>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded bg-black/[0.04] dark:bg-white/[0.08] font-mono text-[9px] text-slate-500 dark:text-zinc-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Action Controls & System Status */}
      <div className="flex items-center gap-2.5">
        {/* Sync / Connection Indicator Pill */}
        <div className="relative">
          <button
            onClick={() => setShowStatusPopover(!showStatusPopover)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium transition-all ${
              isOffline
                ? 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20'
                : 'bg-black/[0.03] dark:bg-white/[0.04] text-slate-700 dark:text-zinc-300 border border-black/[0.05] dark:border-white/[0.06] hover:bg-black/[0.05] dark:hover:bg-white/[0.07]'
            }`}
          >
            {isOffline ? (
              <WifiOff className="w-3 h-3 text-amber-500" strokeWidth={2} />
            ) : (
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
            )}
            <span>{isOffline ? 'Offline' : 'Synced'}</span>
            <ChevronDown className="w-3 h-3 opacity-50" strokeWidth={2} />
          </button>

          {/* System Status Popover */}
          {showStatusPopover && (
            <div className="absolute right-0 mt-2 w-72 specimen-glass rounded-[8px] p-3 z-50 text-xs shadow-xl space-y-2.5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-black/[0.05] dark:border-white/[0.06]">
                <span className="font-semibold text-slate-900 dark:text-white">Workspace Status</span>
                <Badge variant="success" size="sm">Local First</Badge>
              </div>

              <div className="space-y-1.5 text-slate-600 dark:text-zinc-400 text-[11px]">
                <div className="flex justify-between">
                  <span>Database:</span>
                  <strong className="text-slate-800 dark:text-zinc-200">Local Encrypted SQLite</strong>
                </div>
                <div className="flex justify-between">
                  <span>Shared Office:</span>
                  <strong className="text-slate-800 dark:text-zinc-200">{settings?.joinCode || 'MAPLE-4821'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Workstations:</span>
                  <strong className="text-slate-800 dark:text-zinc-200">4 connected</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.05] flex justify-between items-center">
                <span className="text-[10px] text-slate-400">Toggle offline test mode</span>
                <button
                  onClick={() => setIsOffline(!isOffline)}
                  className="text-[11px] font-semibold text-[#9e8557] dark:text-[#d4c5a9] hover:underline"
                >
                  {isOffline ? 'Go Online' : 'Simulate Offline'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AI Assistant Trigger */}
        <Button
          variant="champagne"
          size="xs"
          onClick={toggleAssistant}
          className="gap-1.5 text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#9e8557] dark:text-[#d4c5a9]" strokeWidth={2} />
          <span className="hidden sm:inline">AI Assistant</span>
        </Button>

        {/* Theme Switcher */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] rounded-[6px] transition-colors"
          title={`Theme: ${theme}`}
        >
          {theme === 'light' ? (
            <Sun className="w-4 h-4 text-[#9e8557]" strokeWidth={2} />
          ) : (
            <Moon className="w-4 h-4 text-[#d4c5a9]" strokeWidth={2} />
          )}
        </button>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] rounded-[6px] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#9e8557] dark:bg-[#d4c5a9]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 specimen-glass rounded-[8px] p-2 z-50 animate-in fade-in zoom-in-95 shadow-2xl">
              <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-black/[0.05] dark:border-white/[0.06] text-xs font-semibold">
                <span>Notifications</span>
                <span className="text-[10px] text-slate-400 font-normal cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04] max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 text-xs hover:bg-black/[0.03] dark:hover:bg-white/[0.04] rounded transition-colors">
                    <div className="font-semibold text-slate-900 dark:text-zinc-100 flex items-center justify-between text-xs">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                    </div>
                    <div className="text-slate-500 dark:text-zinc-400 text-[11px] mt-0.5">{n.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Identity Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-black/[0.07] dark:border-white/[0.08]">
          <div className="w-7 h-7 rounded-[7px] bg-[#16181e] dark:bg-[#181a20] border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-2xs">
            SJ
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-slate-900 dark:text-zinc-100 leading-tight">Sarah J.</div>
            <div className="text-[10px] text-slate-400 leading-tight">Lead Recruiter</div>
          </div>
        </div>
      </div>
    </header>
  );
};
