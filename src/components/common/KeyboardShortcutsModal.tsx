import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';
import { Badge, Button } from '../ui';
import { sound } from '../../utils/sound';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '⌘ + K', desc: 'Open Command Palette & Global Search' },
    { key: '⌘ + /', desc: 'Toggle AI Assistant Copilot' },
    { key: 'C', desc: 'Jump to Candidate Directory' },
    { key: 'J', desc: 'Jump to Requisitions Matrix' },
    { key: 'P', desc: 'Jump to Pipeline Kanban Board' },
    { key: 'I', desc: 'Jump to Technical Panel Schedules' },
    { key: 'G', desc: 'Jump to Relational Knowledge Graph' },
    { key: 'T', desc: 'Toggle Visual Theme (Obsidian / Light)' },
    { key: 'ESC', desc: 'Close open dialogs or inspectors' },
    { key: '?', desc: 'Show this keyboard shortcuts cheat sheet' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div
        className="w-full max-w-lg bg-white dark:bg-[#12151D] rounded-[14px] border border-black/10 dark:border-white/15 shadow-2xl p-6 space-y-4 animate-in zoom-in-95 specimen-chamfer specimen-chamfer-champagne"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[7px] bg-[#9e8557]/15 dark:bg-[#9e8557]/20 border border-[#8A6D3B]/30 dark:border-[#d4c5a9]/30 flex items-center justify-center text-[#8A6D3B] dark:text-[#d4c5a9]">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="type-section-title text-slate-900 dark:text-white">Keyboard Shortcuts</h3>
              <div className="text-xs text-slate-500 dark:text-zinc-400">Desktop engineering productivity shortcuts</div>
            </div>
          </div>
          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="p-1 rounded-[6px] text-slate-400 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-black/[0.06] dark:divide-white/10 py-1 text-xs">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between py-2.5">
              <span className="text-slate-800 dark:text-zinc-200 font-medium">{s.desc}</span>
              <kbd className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-black/60 border border-black/10 dark:border-white/15 font-mono text-[11px] font-semibold text-[#8A6D3B] dark:text-[#d4c5a9]">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-black/[0.08] dark:border-white/10 flex justify-between items-center text-[11px] text-slate-500 dark:text-zinc-400">
          <span>Fully keyboard navigable</span>
          <Button
            size="xs"
            variant="champagne"
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="font-semibold px-4"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
