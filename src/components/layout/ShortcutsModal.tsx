import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command, Keyboard, X, Sparkles } from 'lucide-react';
import { Badge, Button, cn } from '../ui';
import { sound } from '../../utils/sound';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If pressing '?' when not in an input/textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (e.key === '?' && activeTag !== 'input' && activeTag !== 'textarea') {
        e.preventDefault();
        sound.click();
        if (isOpen) onClose();
        else {
          // Open handled by parent state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcutGroups = [
    {
      group: 'Navigation',
      items: [
        { key: 'G H', desc: 'Jump to Today / Home briefing' },
        { key: 'G C', desc: 'Jump to Candidate Directory' },
        { key: 'G P', desc: 'Jump to Pipeline Kanban' },
        { key: 'G J', desc: 'Jump to Requisitions Matrix' },
        { key: 'G I', desc: 'Jump to Technical Panels' },
        { key: 'G R', desc: 'Jump to Reports & Velocity' },
        { key: 'G K', desc: 'Jump to Knowledge Graph' }
      ]
    },
    {
      group: 'Global Actions',
      items: [
        { key: '⌘ K', desc: 'Open Command Palette' },
        { key: '?', desc: 'Toggle keyboard hotkey cheat sheet' },
        { key: 'T', desc: 'Toggle Smoked Obsidian / Pearl Light Theme' },
        { key: 'ESC', desc: 'Close open modals or inspectors' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div
        className="w-full max-w-xl bg-white dark:bg-[#12151D] rounded-[14px] border border-black/10 dark:border-white/15 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 specimen-chamfer specimen-chamfer-champagne"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[7px] bg-[#9e8557]/15 dark:bg-[#9e8557]/20 border border-[#8A6D3B]/30 dark:border-[#d4c5a9]/30 flex items-center justify-center text-[#8A6D3B] dark:text-[#d4c5a9]">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="type-section-title text-slate-900 dark:text-white">Keyboard Shortcuts & Hotkeys</h3>
              <div className="text-xs text-slate-500 dark:text-zinc-400">Desktop engineering productivity controls</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[6px] text-slate-400 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {shortcutGroups.map((grp) => (
            <div key={grp.group} className="space-y-3">
              <div className="type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9]">
                {grp.group}
              </div>
              <div className="space-y-2">
                {grp.items.map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-2 rounded-[6px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10">
                    <span className="text-slate-800 dark:text-zinc-200 font-medium">{item.desc}</span>
                    <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-black/60 border border-black/10 dark:border-white/15 text-[10px] tabular-nums font-semibold text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-black/[0.08] dark:border-white/10 flex justify-end">
          <Button size="xs" variant="champagne" onClick={onClose} className="font-semibold px-4">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
