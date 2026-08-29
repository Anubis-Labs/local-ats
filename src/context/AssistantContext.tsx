import React, { createContext, useContext, useState } from 'react';
import { Candidate } from '../types/candidate';
import { Job } from '../types/job';

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  evidenceLinks?: {
    label: string;
    section: string;
    snippet: string;
  }[];
  suggestedActions?: {
    label: string;
    actionKey: string;
  }[];
}

interface AssistantContextType {
  isOpen: boolean;
  openAssistant: (initialPrompt?: string, contextData?: { candidate?: Candidate; job?: Job }) => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
  messages: AssistantMessage[];
  sendMessage: (text: string) => Promise<void>;
  currentContext: { candidate?: Candidate; job?: Job } | null;
  clearHistory: () => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentContext, setCurrentContext] = useState<{ candidate?: Candidate; job?: Job } | null>(null);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      content: 'Local AI Assistant ready. I can summarize candidates, check requirement coverage with citations, draft interview questions, and identify talent pool matches.',
      timestamp: 'Ready',
      suggestedActions: [
        { label: 'Summarize top candidates for Req #101', actionKey: 'summarize_101' },
        { label: 'Find previous interviewees rejected for compensation', actionKey: 'find_comp_rejections' },
        { label: 'Check candidate-to-hiring team connections', actionKey: 'check_team_graph' }
      ]
    }
  ]);

  const openAssistant = (initialPrompt?: string, contextData?: { candidate?: Candidate; job?: Job }) => {
    if (contextData) setCurrentContext(contextData);
    setIsOpen(true);
    if (initialPrompt) {
      sendMessage(initialPrompt, contextData);
    }
  };

  const closeAssistant = () => setIsOpen(false);
  const toggleAssistant = () => setIsOpen((prev) => !prev);

  const sendMessage = async (text: string, overrideContext?: { candidate?: Candidate; job?: Job }) => {
    const activeCtx = overrideContext || currentContext;
    const userMsg: AssistantMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulated local intelligence response with evidence
    setTimeout(() => {
      let reply = '';
      let evidenceLinks: AssistantMessage['evidenceLinks'] = undefined;

      const q = text.toLowerCase();

      if (activeCtx?.candidate) {
        const c = activeCtx.candidate;
        if (q.includes('gap') || q.includes('risk') || q.includes('missing')) {
          reply = `Analysis of gaps for **${c.name}**:\n\n• **Direct Plant 3D vs 2D Drafting**: Verified 12 years background, but mostly in heavy industrial piping. No major critical gaps detected for Senior Piping Designer role.\n• **Certifications**: Verified ASET CET in good standing.\n• **Notice Period**: 2 weeks.`;
        } else {
          reply = `Summary for **${c.name}** (${c.currentRole} at ${c.currentCompany}):\n\n• **Experience**: ${c.experienceYears} years in industrial piping and facility revamp projects in Alberta.\n• **Key Strengths**: Brownfield tie-ins, Plant 3D 3D modeling, Navisworks clash coordination.\n• **Connection**: Worked with Elena Rostova at Worley (2017-2019).`;
          evidenceLinks = [
            { label: 'Fluor Work History', section: 'Experience', snippet: 'Lead piping designer for ConocoPhillips Surmont SAGD facility brownfield optimization project.' },
            { label: 'ASET CET Certificate', section: 'Licensing', snippet: 'Certified Engineering Technologist (CET), ASET 2018' }
          ];
        }
      } else if (q.includes('comp') || q.includes('rejected') || q.includes('find_comp_rejections')) {
        reply = `Found **Brendan Gallagher** in the Talent Pool:\n\n• Interviewed in April 2026 for Piping Designer.\n• Technical rating was **4.5 / 5**.\n• Reason for archive: Compensation requirement was $115k CAD while previous budget was hard capped at $98k.\n• Current requisition #101 budget now accommodates up to $130k CAD.`;
        evidenceLinks = [
          { label: 'Recruiter Note (April 2026)', section: 'Notes', snippet: 'Elena Rostova loved his Plant 3D test. Lost him due to compensation budget constraints.' }
        ];
      } else {
        reply = `Based on our local database of 85+ candidate records, 5 active requisitions, and historical interview notes:\n\n• **Req #101 (Senior Piping Designer)** has 2 high-match candidates in pipeline (**Tariq Al-Mansoor**, **Brendan Gallagher**).\n• **Req #102 (Lead Mechanical)** has an active offer awaiting executive approval for **Melissa Chen, P.Eng.**`;
      }

      const assistantMsg: AssistantMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        evidenceLinks
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  const clearHistory = () => {
    setMessages([
      {
        id: 'msg-init',
        sender: 'assistant',
        content: 'Assistant conversation cleared. How can I assist with your candidate or job pipeline?',
        timestamp: 'Ready'
      }
    ]);
  };

  return (
    <AssistantContext.Provider
      value={{
        isOpen,
        openAssistant,
        closeAssistant,
        toggleAssistant,
        messages,
        sendMessage,
        currentContext,
        clearHistory
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) throw new Error('useAssistant must be used within AssistantProvider');
  return context;
};
