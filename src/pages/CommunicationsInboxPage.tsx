import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Send,
  Inbox,
  AlertCircle,
  Clock,
  Search,
  CheckCircle2,
  Paperclip,
  User,
  ArrowRight,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  MessageSquare
} from 'lucide-react';
import { Badge, Button, Input, Textarea, Card, Modal, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

interface Thread {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  subject: string;
  lastMessage: string;
  time: string;
  status: 'delivered' | 'read' | 'replied' | 'bounced' | 'scheduled';
  unread: boolean;
  messages: { sender: string; isCandidate: boolean; text: string; time: string; attachments?: string[] }[];
}

export const CommunicationsInboxPage: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 'thr-1',
      candidateName: 'Tariq Al-Mansoor, CET',
      candidateEmail: 'tariq.almansoor@email.com',
      jobTitle: 'Senior Piping Designer',
      subject: 'Re: Interview with Alberta Engineering for Senior Piping Designer',
      lastMessage: 'Next Tuesday at 2:00 PM works perfectly for the Microsoft Teams technical panel.',
      time: '14m ago',
      status: 'replied',
      unread: true,
      messages: [
        {
          sender: 'Sarah Jenkins',
          isCandidate: false,
          text: 'Hi Tariq, thank you for speaking with us earlier. We would love to invite you to our next technical interview stage with Elena Rostova, P.Eng. Please let us know your availability.',
          time: 'Aug 26, 2:30 PM',
          attachments: ['Requisition_Scope_Overview.pdf']
        },
        {
          sender: 'Tariq Al-Mansoor, CET',
          isCandidate: true,
          text: 'Next Tuesday at 2:00 PM works perfectly for the Microsoft Teams technical panel.',
          time: 'Aug 26, 3:15 PM'
        }
      ]
    },
    {
      id: 'thr-2',
      candidateName: 'Melissa Chen, P.Eng.',
      candidateEmail: 'melissa.chen@email.com',
      jobTitle: 'Lead Mechanical HVAC Engineer',
      subject: 'Offer of Employment: Lead Mechanical HVAC Engineer',
      lastMessage: 'I have received the formal offer packet and am currently reviewing the benefits schedule.',
      time: '2h ago',
      status: 'read',
      unread: false,
      messages: [
        {
          sender: 'Sarah Jenkins',
          isCandidate: false,
          text: 'Dear Melissa, we are thrilled to extend a formal offer of employment for the Lead Mechanical HVAC Engineer position. Attached is your comprehensive compensation breakdown ($138k base + 10% bonus).',
          time: 'Aug 25, 10:00 AM',
          attachments: ['Formal_Offer_Contract_2026.pdf', 'EPCM_Benefits_Guide.pdf']
        },
        {
          sender: 'Melissa Chen, P.Eng.',
          isCandidate: true,
          text: 'I have received the formal offer packet and am currently reviewing the benefits schedule.',
          time: 'Aug 25, 11:45 AM'
        }
      ]
    },
    {
      id: 'thr-3',
      candidateName: 'Devon Blackwood',
      candidateEmail: 'devon.blackwood@email.com',
      jobTitle: 'Senior Full-Stack Developer',
      subject: 'Application Status: Senior Full-Stack Developer',
      lastMessage: 'Dispatched technical screening questionnaire.',
      time: '1d ago',
      status: 'delivered',
      unread: false,
      messages: [
        {
          sender: 'Sarah Jenkins',
          isCandidate: false,
          text: 'Hi Devon, thank you for applying to Alberta Engineering. We reviewed your background with local-first React apps and would like you to complete our 15-minute architectural survey.',
          time: 'Aug 24, 4:00 PM'
        }
      ]
    }
  ]);

  const [selectedThreadId, setSelectedThreadId] = useState<string>('thr-1');
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const selectedThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    sound.chime();
    const updatedMessages = [
      ...selectedThread.messages,
      {
        sender: 'Sarah Jenkins (You)',
        isCandidate: false,
        text: replyText,
        time: 'Just now'
      }
    ];

    setThreads((prev) =>
      prev.map((t) => (t.id === selectedThread.id ? { ...t, messages: updatedMessages, lastMessage: replyText, time: 'Just now', unread: false } : t))
    );
    setReplyText('');
    toast('Message Dispatched', `Sent email reply to ${selectedThread.candidateName}.`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. COMMUNICATIONS HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="briefing-ribbon" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Candidate Messaging Engine</span>
                <span className="opacity-30">•</span>
                <span>Unified Email & InMail Feed</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Communications & Conversation Inbox
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="xs"
              variant="champagne"
              onClick={() => {
                sound.click();
                navigate('/templates');
              }}
              className="gap-1.5 font-semibold text-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
              <span>Template Studio</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. DUAL PANE INBOX LAYOUT */}
      <main className="flex-1 overflow-hidden px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto h-[calc(100vh-180px)]">
          {/* Thread List (Left 4 cols) */}
          <div className="lg:col-span-4 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 overflow-y-auto shadow-sm specimen-chamfer divide-y divide-black/[0.06] dark:divide-white/[0.06]">
            {threads.map((thr) => (
              <div
                key={thr.id}
                onClick={() => {
                  sound.click();
                  setSelectedThreadId(thr.id);
                }}
                className={cn(
                  'p-4 cursor-pointer text-xs transition-colors space-y-1.5',
                  selectedThreadId === thr.id
                    ? 'bg-amber-50/70 dark:bg-[#201C14] border-l-4 border-[#8A6D3B] dark:border-[#d4c5a9]'
                    : 'hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {thr.unread && <span className="w-2 h-2 rounded-full bg-[#8A6D3B] dark:bg-[#d4c5a9]" />}
                    <span className="font-bold text-slate-900 dark:text-white text-xs">{thr.candidateName}</span>
                  </div>
                  <span className="text-[10px] tabular-nums text-slate-400 dark:text-zinc-500">{thr.time}</span>
                </div>
                <div className="font-semibold text-slate-700 dark:text-zinc-300 truncate">{thr.subject}</div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">{thr.lastMessage}</div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500">{thr.jobTitle}</span>
                  <Badge variant={thr.status === 'replied' ? 'success' : 'neutral'} size="sm">
                    {thr.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Conversation Detail (Right 8 cols) */}
          <div className="lg:col-span-8 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer flex flex-col justify-between overflow-hidden">
            {/* Thread Header */}
            <div className="p-4 bg-slate-50 dark:bg-black/40 border-b border-black/[0.08] dark:border-white/10 flex items-center justify-between text-xs shrink-0">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">{selectedThread.subject}</div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                  Candidate: <strong className="text-slate-800 dark:text-zinc-200">{selectedThread.candidateName}</strong> ({selectedThread.candidateEmail}) • Requisition: {selectedThread.jobTitle}
                </div>
              </div>
              <Badge variant="champagne" size="sm">Active Thread</Badge>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              {selectedThread.messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'p-4 rounded-[10px] max-w-[85%] space-y-2 text-xs',
                    msg.isCandidate
                      ? 'bg-slate-100 dark:bg-black/50 text-slate-900 dark:text-white mr-auto border border-black/[0.06] dark:border-white/10'
                      : 'bg-amber-50 dark:bg-[#201C14] text-slate-900 dark:text-white ml-auto border border-amber-200 dark:border-[#d4c5a9]/30'
                  )}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold pb-1 border-b border-black/[0.05] dark:border-white/[0.05]">
                    <span>{msg.sender}</span>
                    <span className="text-[10px] tabular-nums text-slate-400 dark:text-zinc-500 font-normal">{msg.time}</span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {msg.attachments && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {msg.attachments.map((att, attIdx) => (
                        <div
                          key={attIdx}
                          className="px-2.5 py-1 rounded-[5px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/10 text-[10px] font-mono flex items-center gap-1.5 font-semibold"
                        >
                          <Paperclip className="w-3 h-3 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                          <span>{att}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Reply Composer */}
            <form onSubmit={handleSendReply} className="p-4 bg-slate-50 dark:bg-black/40 border-t border-black/[0.08] dark:border-white/10 space-y-3 shrink-0">
              <Textarea
                rows={3}
                placeholder={`Type a direct response to ${selectedThread.candidateName}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Outbound DKIM transmission secured</span>
                </div>
                <Button size="xs" variant="champagne" type="submit" className="gap-1.5 font-semibold text-xs">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
