import React, { useState } from 'react';
import {
  Mail,
  Send,
  Paperclip,
  Sparkles,
  FileText,
  X,
  CheckCircle2
} from 'lucide-react';
import { Candidate } from '../../types/candidate';
import { Button, Input, Textarea, Modal, Badge } from '../ui';
import { sound } from '../../utils/sound';
import { useToast } from '../../context/ToastContext';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, candidate }) => {
  const [template, setTemplate] = useState('interview_invite');
  const [subject, setSubject] = useState(`Interview Invitation: ${candidate.jobTitle || 'Senior Piping Designer'} — Alberta Engineering`);
  const [body, setBody] = useState(
`Hi ${candidate.name.split(' ')[0]},

Thank you for your interest in our ${candidate.jobTitle || 'Senior Piping Designer'} requisition at Alberta Engineering.

Our technical lead, Elena Rostova, P.Eng., was very impressed by your extensive brownfield SAGD experience and AutoCAD Plant 3D track record at ${candidate.currentCompany}.

We would like to invite you to a 45-minute technical panel discussion to walk through past tie-in deliverables and 3D modeling workflows.

Please let us know your availability over the coming days.

Best regards,
Sarah Jenkins
Lead Technical Recruiter • Alberta Engineering & Projects Inc.`
  );
  const [attachments, setAttachments] = useState<string[]>(['Requisition_Scope_Overview.pdf']);
  const [isSending, setIsSending] = useState(false);

  const { toast } = useToast();

  const handleTemplateChange = (val: string) => {
    sound.click();
    setTemplate(val);
    if (val === 'interview_invite') {
      setSubject(`Interview Invitation: ${candidate.jobTitle || 'Senior Piping Designer'} — Alberta Engineering`);
      setBody(
`Hi ${candidate.name.split(' ')[0]},

Thank you for your interest in our ${candidate.jobTitle || 'Senior Piping Designer'} requisition at Alberta Engineering.

Our technical lead, Elena Rostova, P.Eng., was very impressed by your extensive brownfield SAGD experience and AutoCAD Plant 3D track record at ${candidate.currentCompany}.

We would like to invite you to a 45-minute technical panel discussion to walk through past tie-in deliverables and 3D modeling workflows.

Please let us know your availability over the coming days.

Best regards,
Sarah Jenkins
Lead Technical Recruiter • Alberta Engineering & Projects Inc.`
      );
    } else if (val === 'offer_packet') {
      setSubject(`Formal Employment Offer: ${candidate.jobTitle || 'Senior Piping Designer'} — Alberta Engineering`);
      setBody(
`Dear ${candidate.name},

On behalf of Alberta Engineering & Projects Inc., I am delighted to extend this formal offer of employment for the position of ${candidate.jobTitle || 'Senior Piping Designer'}.

Summary of Terms:
* Base Annual Salary: ${candidate.compensationExpectation || '$135,000 CAD'}
* Performance Bonus: Up to 10% annual discretionary bonus
* Standard Benefits: Comprehensive EPCM health, dental, and APEGA/ASET dues reimbursement
* Start Date: September 15, 2026

Please find the detailed offer contract attached. We look forward to welcoming you to the team!

Warm regards,
Sarah Jenkins
Lead Technical Recruiter • Alberta Engineering & Projects Inc.`
      );
      setAttachments(['Formal_Offer_Contract_2026.pdf', 'EPCM_Benefits_Guide.pdf']);
    } else if (val === 'status_update') {
      setSubject(`Application Update: ${candidate.jobTitle || 'Senior Piping Designer'}`);
      setBody(
`Hi ${candidate.name.split(' ')[0]},

We wanted to provide a quick update regarding your application for the ${candidate.jobTitle || 'Senior Piping Designer'} position.

Our hiring panel is currently reviewing notes from your recent technical assessment and we expect to share feedback before the end of the week.

Thank you for your continued patience.

Best,
Sarah Jenkins`
      );
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sound.chime();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onClose();
      toast('Email Dispatched', `Message sent directly to ${candidate.email}.`, 'success');
    }, 450);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Direct Candidate Communications"
      subtitle={`Compose outbound email to ${candidate.name} (${candidate.email})`}
      maxWidth="lg"
    >
      <form onSubmit={handleSend} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Message Template</label>
            <select
              value={template}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-medium"
            >
              <option value="interview_invite">Interview Panel Invitation</option>
              <option value="offer_packet">Formal Offer & Compensation Packet</option>
              <option value="status_update">Application Status Update</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Recipient Email</label>
            <Input
              readOnly
              value={candidate.email}
              className="bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-600 dark:text-zinc-400 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Subject Line</label>
          <Input
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-semibold"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Message Body</label>
          <Textarea
            rows={8}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-sans leading-relaxed"
          />
        </div>

        {/* Attachments */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400 flex items-center gap-1.5">
            <Paperclip className="w-3.5 h-3.5" />
            <span>Enclosed Attachments ({attachments.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {attachments.map((att, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-[6px] bg-slate-100 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-xs font-mono flex items-center gap-1.5 text-slate-800 dark:text-zinc-200"
              >
                <FileText className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                <span>{att}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
          <Button size="sm" variant="ghost" type="button" onClick={onClose}>
            Discard
          </Button>
          <Button size="sm" variant="champagne" type="submit" loading={isSending} className="gap-1.5 font-semibold">
            <Send className="w-3.5 h-3.5" />
            <span>Send Email Message</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
};
