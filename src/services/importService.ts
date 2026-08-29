import { DuplicateResolutionChoice, ImportQueueItem } from '../types/import';
import { candidateService } from './candidateService';

class ImportService {
  private queue: ImportQueueItem[] = [
    {
      id: 'imp-001',
      fileName: 'Sarah_Connor_Resume_LeadStructural.pdf',
      fileSize: 342000,
      fileType: 'pdf',
      status: 'complete',
      progress: 100,
      uploadedAt: '2026-08-27 16:42',
      candidateDraft: {
        name: 'Sarah Connor',
        currentRole: 'Lead Structural Engineer',
        currentCompany: 'Fluor Canada',
        experienceYears: 9,
        tags: ['Structural', 'Bridges', 'Revit'],
        location: 'Calgary, AB'
      }
    },
    {
      id: 'imp-002',
      fileName: 'Tariq_Al_Mansoor_Updated_2026.docx',
      fileSize: 489000,
      fileType: 'docx',
      status: 'possible_duplicate',
      progress: 100,
      uploadedAt: '2026-08-28 08:15',
      matchedCandidateId: 'cand-001',
      duplicateConfidence: 0.96,
      duplicateReasons: ['Same email (tariq.almansoor@email.com)', 'Matching work history timeline at Fluor & Worley'],
      candidateDraft: {
        name: 'Tariq Al-Mansoor',
        email: 'tariq.almansoor@email.com',
        currentRole: 'Senior Piping Designer',
        currentCompany: 'Fluor Canada',
        location: 'Calgary, AB'
      }
    },
    {
      id: 'imp-003',
      fileName: 'Western_Canada_Designers_Batch.csv',
      fileSize: 1200000,
      fileType: 'csv',
      status: 'parsing',
      progress: 68,
      uploadedAt: '2026-08-28 09:30'
    }
  ];

  async getQueue(): Promise<ImportQueueItem[]> {
    await new Promise((res) => setTimeout(res, 60));
    return [...this.queue];
  }

  async addFilesToQueue(files: { name: string; size: number; type: 'pdf' | 'docx' | 'csv' | 'zip' }[]): Promise<ImportQueueItem[]> {
    await new Promise((res) => setTimeout(res, 120));
    const newItems: ImportQueueItem[] = files.map((f, idx) => ({
      id: `imp-${Date.now()}-${idx}`,
      fileName: f.name,
      fileSize: f.size,
      fileType: f.type,
      status: 'reading',
      progress: 25,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    this.queue = [...newItems, ...this.queue];
    return newItems;
  }

  async resolveDuplicate(importId: string, choice: DuplicateResolutionChoice): Promise<void> {
    await new Promise((res) => setTimeout(res, 150));
    const item = this.queue.find(i => i.id === importId);
    if (!item) return;

    if (choice.action === 'merge' && item.matchedCandidateId) {
      await candidateService.addNote(
        item.matchedCandidateId,
        `Merged updated resume document "${item.fileName}" into existing profile.`,
        'System Import Engine'
      );
      item.status = 'complete';
    } else if (choice.action === 'keep_both' && item.candidateDraft) {
      await candidateService.createCandidate(item.candidateDraft);
      item.status = 'complete';
    } else {
      item.status = 'complete';
    }
  }
}

export const importService = new ImportService();
