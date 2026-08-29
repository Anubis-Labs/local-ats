import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  User,
  Briefcase,
  CheckSquare,
  Sparkles,
  Plus,
  FileText,
  X,
  ArrowRight,
  Sun,
  Moon,
  Columns3,
  Calendar,
  BarChart3,
  Network,
  Settings,
  Inbox,
  HardHat,
  ShieldCheck,
  UserCheck,
  Send,
  Zap,
  Globe,
  Lock
} from 'lucide-react';
import { searchService, GlobalSearchResultItem } from '../../services/searchService';
import { useAssistant } from '../../context/AssistantContext';
import { useTheme } from '../../context/ThemeContext';
import { Badge, cn } from '../ui';
import { sound } from '../../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GlobalSearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { openAssistant } = useAssistant();
  const { theme, setTheme } = useTheme();

  const quickNavActions = [
    { label: 'Go to Applications Inbox & Triage', shortcut: 'G A', icon: Inbox, action: () => navigate('/applications') },
    { label: 'Go to Candidate Roster', shortcut: 'G C', icon: User, action: () => navigate('/candidates') },
    { label: 'Go to Pipeline Kanban', shortcut: 'G P', icon: Columns3, action: () => navigate('/pipeline') },
    { label: 'Go to Requisitions Matrix', shortcut: 'G J', icon: Briefcase, action: () => navigate('/jobs') },
    { label: 'Go to Project Mobilization Board', shortcut: 'G M', icon: HardHat, action: () => navigate('/mobilization') },
    { label: 'Go to Interview Calendar Workbench', shortcut: 'G I', icon: Calendar, action: () => navigate('/calendar') },
    { label: 'Go to Executive Approval Center', shortcut: 'G V', icon: ShieldCheck, action: () => navigate('/approvals') },
    { label: 'Go to Compliance & Safety Radar', shortcut: 'G L', icon: UserCheck, action: () => navigate('/compliance') },
    { label: 'Go to Sourcing Campaigns', shortcut: 'G O', icon: Send, action: () => navigate('/campaigns') },
    { label: 'Go to Automation Rules Studio', shortcut: 'G U', icon: Zap, action: () => navigate('/automations') },
    { label: 'Go to Integrations Hub (38 Connectors)', shortcut: 'G H', icon: Globe, action: () => navigate('/integrations') },
    { label: 'Go to Alberta PIPA Audit Vault', shortcut: 'G X', icon: Lock, action: () => navigate('/audit') },
    { label: 'Go to Reports & Analytics', shortcut: 'G R', icon: BarChart3, action: () => navigate('/reports') },
    { label: 'Go to Knowledge Graph', shortcut: 'G K', icon: Network, action: () => navigate('/relationships') },
    { label: 'Go to Workspace Settings', shortcut: 'G S', icon: Settings, action: () => navigate('/settings') },
    {
      label: `Switch Theme to ${theme === 'dark' ? 'Porcelain Light' : 'Smoked Obsidian Dark'}`,
      shortcut: 'T',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const res = await searchService.searchAll(query);
      setResults(res);
      setSelectedIndex(0);
    }, 50);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (route: string) => {
    sound.click();
    navigate(route);
    onClose();
  };

  const handleRunAction = (action: () => void) => {
    sound.click();
    action();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#12151D] rounded-[14px] border border-black/10 dark:border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150 specimen-chamfer specimen-chamfer-champagne"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.08] dark:border-white/10 bg-slate-50 dark:bg-[#0c0e14]/90">
          <Search className="w-4 h-4 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search candidates, requisitions, SAGD skills, or jump to view..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none font-medium"
          />
          <kbd className="px-2 py-0.5 rounded bg-black/[0.05] dark:bg-black/40 border border-black/10 dark:border-white/10 text-[10px] font-mono text-slate-500 dark:text-zinc-400">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-3 space-y-4 text-xs">
          {query.trim() && results.length > 0 && (
            <div className="space-y-1">
              <div className="type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] px-2 pb-1">
                Matching Entities ({results.length})
              </div>
              {results.map((r) => (
                <div
                  key={r.id}
                  onClick={() => handleSelect(r.route)}
                  className="flex items-center justify-between p-2.5 rounded-[8px] hover:bg-slate-100 dark:hover:bg-white/[0.08] cursor-pointer text-slate-900 dark:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 rounded bg-black/[0.04] dark:bg-black/40 border border-black/10 dark:border-white/10 text-[#8A6D3B] dark:text-[#d4c5a9]">
                      {r.type === 'candidate' ? <User className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{r.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400">{r.subtitle}</div>
                    </div>
                  </div>
                  <Badge variant="champagne" size="sm">{r.type}</Badge>
                </div>
              ))}
            </div>
          )}

          {/* Quick Navigation Commands */}
          <div className="space-y-1">
            <div className="type-eyebrow text-slate-500 dark:text-zinc-400 px-2 pb-1">
              Quick Navigation & Commands ({quickNavActions.length})
            </div>
            {quickNavActions.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.label}
                  onClick={() => handleRunAction(cmd.action)}
                  className="flex items-center justify-between p-2 rounded-[8px] hover:bg-slate-100 dark:hover:bg-white/[0.08] cursor-pointer text-slate-900 dark:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-400 group-hover:text-[#8A6D3B] dark:group-hover:text-[#d4c5a9] transition-colors" />
                    <span className="font-medium text-slate-700 dark:text-zinc-200 group-hover:text-slate-900 dark:group-hover:text-white">{cmd.label}</span>
                  </div>
                  <kbd className="kbd-shortcut text-[#8A6D3B] dark:text-[#d4c5a9]">
                    {cmd.shortcut}
                  </kbd>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
