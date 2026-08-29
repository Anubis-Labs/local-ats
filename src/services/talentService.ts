import { Candidate } from '../types/candidate';
import { candidateService } from './candidateService';

export interface TalentPoolFilter {
  query?: string;
  tags?: string[];
  skills?: string[];
  minRating?: number;
  location?: string;
  availability?: string;
}

class TalentService {
  async getTalentPoolCandidates(filter?: TalentPoolFilter): Promise<Candidate[]> {
    const all = await candidateService.getCandidates({ inTalentPool: true });
    let result = [...all];

    if (filter?.query) {
      const q = filter.query.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.currentRole.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.parsedResume.extractedSkills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (filter?.minRating) {
      result = result.filter((c) => c.rating >= filter.minRating!);
    }
    if (filter?.location) {
      result = result.filter((c) => c.location.toLowerCase().includes(filter.location!.toLowerCase()));
    }
    if (filter?.availability) {
      result = result.filter((c) => c.availability === filter.availability);
    }

    return result;
  }

  async attachToJob(candidateId: string, jobId: string, jobTitle: string): Promise<Candidate> {
    const cand = await candidateService.getCandidateById(candidateId);
    if (!cand) throw new Error('Candidate not found');
    await candidateService.updateStage(candidateId, 'review');
    await candidateService.toggleTalentPool(candidateId, false);
    cand.jobId = jobId;
    cand.jobTitle = jobTitle;
    cand.isArchived = false;
    return cand;
  }
}

export const talentService = new TalentService();
