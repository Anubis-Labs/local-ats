import { Candidate } from './candidate';

export type ImportItemStatus =
  | 'queued'
  | 'uploading'
  | 'reading'
  | 'parsing'
  | 'matched'
  | 'possible_duplicate'
  | 'needs_review'
  | 'complete'
  | 'failed';

export interface ImportQueueItem {
  id: string;
  fileName: string;
  fileSize: number; // in bytes
  fileType: 'pdf' | 'docx' | 'csv' | 'zip';
  status: ImportItemStatus;
  progress: number; // 0 to 100
  uploadedAt: string;
  candidateDraft?: Partial<Candidate>;
  matchedCandidateId?: string;
  duplicateConfidence?: number;
  duplicateReasons?: string[];
  errorMessage?: string;
  targetJobId?: string;
}

export interface DuplicateResolutionChoice {
  action: 'merge' | 'keep_both' | 'skip';
  preferredFields?: Record<string, 'incoming' | 'existing'>;
}
