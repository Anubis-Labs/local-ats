import { Job } from '../types/job';
import { mockJobs } from '../mock/jobsData';

class JobService {
  private jobs: Job[] = [...mockJobs];

  async getJobs(filters?: { status?: Job['status']; department?: string; search?: string }): Promise<Job[]> {
    let result = [...this.jobs];

    if (filters?.status) {
      result = result.filter((j) => j.status === filters.status);
    }
    if (filters?.department) {
      result = result.filter((j) => j.department.toLowerCase().includes(filters.department!.toLowerCase()));
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.hiringManager.toLowerCase().includes(q)
      );
    }

    return result;
  }

  async getJobById(id: string): Promise<Job | null> {
    const job = this.jobs.find((j) => j.id === id);
    return job ? { ...job } : null;
  }

  async createJob(newJob: Partial<Job>): Promise<Job> {
    const created: Job = {
      id: `job-${Date.now()}`,
      title: newJob.title || 'Untitled Requisition',
      department: newJob.department || 'General Engineering',
      location: newJob.location || 'Calgary, AB (Hybrid)',
      type: newJob.type || 'Full-time',
      status: newJob.status || 'active',
      priority: newJob.priority || 'medium',
      hiringManager: newJob.hiringManager || 'Sarah Jenkins',
      recruiterOwner: newJob.recruiterOwner || 'Sarah Jenkins',
      targetHires: newJob.targetHires || 1,
      hiresCount: 0,
      applicantsCount: 0,
      inProcessCount: 0,
      openedAt: new Date().toISOString().split('T')[0],
      salaryRange: newJob.salaryRange || '$110,000 - $135,000 CAD',
      description: newJob.description || 'Industrial engineering role.',
      requirements: newJob.requirements || [],
      hiringTeam: newJob.hiringTeam || []
    };
    this.jobs.unshift(created);
    return created;
  }

  async updateJob(id: string, partial: Partial<Job>): Promise<Job | null> {
    const idx = this.jobs.findIndex((j) => j.id === id);
    if (idx === -1) return null;
    this.jobs[idx] = { ...this.jobs[idx], ...partial };
    return this.jobs[idx];
  }
}

export const jobService = new JobService();
