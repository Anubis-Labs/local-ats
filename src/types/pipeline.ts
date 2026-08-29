import { PipelineStageId } from './candidate';

export interface PipelineStageConfig {
  id: PipelineStageId;
  name: string;
  color: string;
  order: number;
  description: string;
  isTerminal?: boolean;
}

export const DEFAULT_STAGES: PipelineStageConfig[] = [
  { id: 'new', name: 'New Applied', color: 'slate', order: 1, description: 'Newly received applications needing triage' },
  { id: 'review', name: 'Under Review', color: 'blue', order: 2, description: 'Reviewed by recruiter / hiring manager' },
  { id: 'phone_screen', name: 'Phone Screen', color: 'cyan', order: 3, description: 'Initial 20-30m screening call' },
  { id: 'interview', name: 'Technical / Panel', color: 'indigo', order: 4, description: 'Core assessment or technical round' },
  { id: 'final_interview', name: 'Final Round', color: 'purple', order: 5, description: 'Leadership / executive alignment' },
  { id: 'reference_check', name: 'References & Checks', color: 'amber', order: 6, description: 'Background and professional checks' },
  { id: 'offer', name: 'Offer Extended', color: 'emerald', order: 7, description: 'Formal offer out for signature' },
  { id: 'hired', name: 'Hired', color: 'green', order: 8, description: 'Offer accepted and onboarding scheduled', isTerminal: true },
  { id: 'rejected', name: 'Rejected', color: 'rose', order: 9, description: 'Declined or unsuitable for current role', isTerminal: true },
  { id: 'archived', name: 'Archived', color: 'zinc', order: 10, description: 'Future consideration / talent pool', isTerminal: true },
];
