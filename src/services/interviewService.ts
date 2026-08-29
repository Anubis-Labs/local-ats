import { Interview } from '../types/interview';
import { mockInterviews } from '../mock/interviewsData';

class InterviewService {
  private interviews: Interview[] = [...mockInterviews];

  async getInterviews(filters?: { candidateId?: string; jobId?: string; status?: Interview['status'] }): Promise<Interview[]> {
    await new Promise((res) => setTimeout(res, 80));
    let list = [...this.interviews];
    if (filters?.candidateId) list = list.filter((i) => i.candidateId === filters.candidateId);
    if (filters?.jobId) list = list.filter((i) => i.jobId === filters.jobId);
    if (filters?.status) list = list.filter((i) => i.status === filters.status);
    return list.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }

  async scheduleInterview(interviewDraft: Partial<Interview>): Promise<Interview> {
    await new Promise((res) => setTimeout(res, 150));
    const created: Interview = {
      id: `int-${Date.now()}`,
      candidateId: interviewDraft.candidateId || 'cand-001',
      candidateName: interviewDraft.candidateName || 'Candidate',
      candidateRole: interviewDraft.candidateRole || 'Applicant',
      candidateAvatar: interviewDraft.candidateAvatar,
      jobId: interviewDraft.jobId || 'job-101',
      jobTitle: interviewDraft.jobTitle || 'General Requisition',
      type: interviewDraft.type || 'Technical Round',
      scheduledAt: interviewDraft.scheduledAt || new Date().toISOString(),
      durationMinutes: interviewDraft.durationMinutes || 45,
      interviewers: interviewDraft.interviewers || [
        { name: 'Marcus Vance', email: 'marcus.vance@albertaengineering.ca', role: 'Recruiter', hasSubmittedScorecard: false }
      ],
      location: interviewDraft.location || 'MS Teams Video Call',
      videoUrl: interviewDraft.videoUrl || 'https://teams.microsoft.com/l/meetup-join/mock',
      status: 'scheduled',
      prepNotes: interviewDraft.prepNotes || '',
      scorecardSubmitted: false
    };
    this.interviews.unshift(created);
    return created;
  }
}

export const interviewService = new InterviewService();
