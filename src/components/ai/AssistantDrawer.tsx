import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Trash2,
  ExternalLink,
  ShieldCheck,
  FileText,
  HelpCircle,
  CheckCircle2,
  Zap,
  Bot,
  User
} from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';
import { Button, Badge, cn } from '../ui';
import { useNavigate } from 'react-router-dom';
import { sound } from '../../utils/sound';

export const AssistantDrawer: React.FC = () => {
  const { isOpen, closeAssistant, messages, sendMessage, currentContext, clearHistory } = useAssistant();
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isThinking) return;

    const text = inputText;
    setInputText('');
    setIsThinking(true);
    sound.click();
    await sendMessage(text);
    setIsThinking(false);
    sound.chime();
  };

  const handleAction = async (prompt: string) => {
    setIsThinking(true);
    sound.click();
    await sendMessage(prompt);
    setIsThinking(false);
    sound.chime();
  };

  const quickPrompts = [
    'Find candidates with SAGD & Plant 3D mastery',
    'Summarize hiring velocity & bottlenecks',
    'Draft formal offer letter for Tariq Al-Mansoor',
    'Compare top candidates for REQ-101'
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white dark:bg-[#0C0D12] border-l border-black/[0.08] dark:border-white/15 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="h-14 px-4 border-b border-black/[0.08] dark:border-white/10 flex items-center justify-between shrink-0 bg-slate-50/90 dark:bg-[#07080A]/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[7px] bg-[#8A6D3B]/15 text-[#8A6D3B] dark:bg-[#d4c5a9]/15 dark:text-[#d4c5a9] border border-[#8A6D3B]/25 dark:border-[#d4c5a9]/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
              <span>Local ATS Copilot</span>
              <Badge variant="champagne" size="sm">Local Offline</Badge>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">Grounded in verified project citations</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={clearHistory}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white rounded-[5px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={closeAssistant}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white rounded-[5px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-[#F4F5F8]/50 dark:bg-[#07080A]/40">
        {messages.length === 0 ? (
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-[10px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                <span>Deterministic Sourcing Copilot</span>
              </div>
              <p className="text-slate-600 dark:text-zinc-300 text-xs leading-relaxed">
                I can summarize candidate resumes, verify SAGD credentials, draft offer letters, and search across all local dossiers with zero latency.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8A6D3B] dark:text-[#d4c5a9] font-mono">
                Suggested Copilot Prompts
              </div>
              <div className="space-y-1.5">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleAction(p)}
                    className="w-full text-left p-3 rounded-[8px] bg-white dark:bg-[#12151D] hover:bg-slate-100 dark:hover:bg-white/[0.05] border border-black/[0.08] dark:border-white/10 text-xs text-slate-800 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <span>{p}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9] opacity-40 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                'p-3.5 rounded-[10px] leading-relaxed transition-all',
                m.sender === 'user'
                  ? 'bg-amber-50/80 dark:bg-[#9e8557]/15 text-slate-900 dark:text-zinc-100 border border-amber-200/80 dark:border-[#9e8557]/30 ml-8 shadow-2xs'
                  : 'bg-white dark:bg-[#12151D] text-slate-800 dark:text-zinc-200 border border-black/[0.08] dark:border-white/10 mr-4 shadow-2xs'
              )}
            >
              <div className="font-bold text-[10px] uppercase font-mono tracking-wider text-[#8A6D3B] dark:text-[#d4c5a9] mb-1.5 flex items-center gap-1.5">
                {m.sender === 'user' ? (
                  <>
                    <User className="w-3 h-3 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                    <span>Recruiter</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-3 h-3 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                    <span>AI Copilot</span>
                  </>
                )}
              </div>
              <div className="whitespace-pre-wrap text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-normal">
                {m.content}
              </div>
            </div>
          ))
        )}

        {isThinking && (
          <div className="p-3 rounded-[10px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 text-xs text-slate-600 dark:text-zinc-400 flex items-center gap-2 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#8A6D3B] dark:bg-[#d4c5a9] animate-ping" />
            <span>Scanning local candidate dossiers & evidence citations...</span>
          </div>
        )}
      </div>

      {/* Input Composer */}
      <form onSubmit={handleSend} className="p-3 border-t border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#0c0e14]/95 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Copilot about candidates, jobs, or offers..."
          className="flex-1 bg-slate-50 dark:bg-[#12151D] border border-black/[0.1] dark:border-white/10 rounded-[7px] px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#8A6D3B] dark:focus:ring-[#d4c5a9] transition-all"
        />
        <Button
          type="submit"
          size="sm"
          variant="champagne"
          disabled={!inputText.trim() || isThinking}
          className="px-3 font-semibold"
        >
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>
    </div>
  );
};

