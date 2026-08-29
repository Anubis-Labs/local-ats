import { Candidate, PipelineStageId, RecruiterNote } from '../types/candidate';
import { mockCandidates } from '../mock/candidatesData';

class CandidateService {
  private candidates: Candidate[] = [...mockCandidates];

  async getCandidates(filters?: {
    jobId?: string;
    stage?: PipelineStageId;
    query?: string;
    inTalentPool?: boolean;
    tag?: string;
    ownerId?: string;
    stalledOnly?: boolean;
  }): Promise<Candidate[]> {
    let result = [...this.candidates];

    if (filters?.jobId) {
      result = result.filter((c) => c.jobId === filters.jobId);
    }
    if (filters?.stage) {
      result = result.filter((c) => c.stage === filters.stage);
    }
    if (filters?.inTalentPool !== undefined) {
      result = result.filter((c) => c.inTalentPool === filters.inTalentPool);
    }
    if (filters?.ownerId) {
      result = result.filter((c) => c.ownerId === filters.ownerId);
    }
    if (filters?.stalledOnly) {
      result = result.filter((c) => c.stalledWarning);
    }
    if (filters?.tag) {
      result = result.filter((c) => c.tags.some((t) => t.toLowerCase() === filters.tag?.toLowerCase()));
    }
    if (filters?.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.currentRole.toLowerCase().includes(q) ||
          c.currentCompany.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.parsedResume.extractedSkills.some((s) => s.toLowerCase().includes(q))
      );
    }

    return result;
  }

  async getCandidateById(id: string): Promise<Candidate | null> {
    await new Promise((res) => setTimeout(res, 80));
    const cand = this.candidates.find((c) => c.id === id);
    return cand ? { ...cand } : null;
  }

  async updateStage(candidateId: string, newStage: PipelineStageId): Promise<Candidate> {
    await new Promise((res) => setTimeout(res, 150));
    const index = this.candidates.findIndex((c) => c.id === candidateId);
    if (index === -1) throw new Error('Candidate not found');

    const updated = {
      ...this.candidates[index],
      stage: newStage,
      stageUpdatedAt: new Date().toISOString().split('T')[0],
      daysInStage: 0,
      stalledWarning: false,
      lastActivity: `Moved to ${newStage.replace('_', ' ')}`
    };
    this.candidates[index] = updated;
    return updated;
  }

  async addNote(candidateId: string, noteText: string, author = 'Current User'): Promise<RecruiterNote> {
    await new Promise((res) => setTimeout(res, 100));
    const index = this.candidates.findIndex((c) => c.id === candidateId);
    if (index === -1) throw new Error('Candidate not found');

    const newNote: RecruiterNote = {
      id: `note-${Date.now()}`,
      author,
      createdAt: new Date().toISOString().split('T')[0],
      text: noteText,
      pinned: false
    };

    this.candidates[index].notes = [newNote, ...this.candidates[index].notes];
    this.candidates[index].lastActivity = `Note added by ${author}`;
    return newNote;
  }

  async toggleTalentPool(candidateId: string, inTalentPool: boolean, note?: string): Promise<Candidate> {
    await new Promise((res) => setTimeout(res, 120));
    const index = this.candidates.findIndex((c) => c.id === candidateId);
    if (index === -1) throw new Error('Candidate not found');

    this.candidates[index].inTalentPool = inTalentPool;
    if (inTalentPool) {
      this.candidates[index].talentPoolAddedAt = new Date().toISOString().split('T')[0];
      if (note) this.candidates[index].talentPoolNotes = note;
    }
    return { ...this.candidates[index] };
  }

  async createCandidate(draft: Partial<Candidate>): Promise<Candidate> {
    await new Promise((res) => setTimeout(res, 200));
    const newCand: Candidate = {
      id: `cand-${Date.now()}`,
      name: draft.name || 'New Candidate',
      email: draft.email || 'candidate@example.com',
      phone: draft.phone || '+1 (403) 555-0000',
      location: draft.location || 'Calgary, AB',
      avatar: draft.avatar,
      currentRole: draft.currentRole || 'Professional',
      currentCompany: draft.currentCompany || 'Independent',
      experienceYears: draft.experienceYears || 5,
      tags: draft.tags || ['New Ingest'],
      rating: draft.rating || 3,
      source: draft.source || 'Direct Application',
      stage: draft.stage || 'new',
      stageUpdatedAt: new Date().toISOString().split('T')[0],
      daysInStage: 0,
      jobId: draft.jobId,
      jobTitle: draft.jobTitle,
      ownerId: draft.ownerId || 'user-2',
      ownerName: draft.ownerName || 'Marcus Vance',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Candidate record created',
      availability: draft.availability || '2 weeks',
      inTalentPool: false,
      isArchived: false,
      parsedResume: draft.parsedResume || {
        summary: 'Newly uploaded candidate profile.',
        extractedSkills: draft.tags || [],
        workHistory: [],
        education: [],
        certifications: [],
        rawText: '',
        evidenceChunks: []
      },
      notes: [],
      scorecards: [],
      screeningAnswers: [],
      files: [],
      relationships: []
    };

    this.candidates.unshift(newCand);
    return newCand;
  }
}

export const candidateService = new CandidateService();
