import { candidateService } from './candidateService';
import { jobService } from './jobService';
import { interviewService } from './interviewService';
import { taskService } from './taskService';

export interface GlobalSearchResultItem {
  id: string;
  type: 'candidate' | 'job' | 'interview' | 'task' | 'action';
  title: string;
  subtitle: string;
  badge?: string;
  route: string;
}

class SearchService {
  async searchAll(query: string): Promise<GlobalSearchResultItem[]> {
    if (!query || query.trim().length === 0) return [];
    const q = query.toLowerCase().trim();
    const results: GlobalSearchResultItem[] = [];

    // Candidates
    const candidates = await candidateService.getCandidates({ query: q });
    candidates.slice(0, 6).forEach(c => {
      results.push({
        id: c.id,
        type: 'candidate',
        title: c.name,
        subtitle: `${c.currentRole} • ${c.currentCompany} (${c.location})`,
        badge: c.stage.replace('_', ' '),
        route: `/candidates/${c.id}`
      });
    });

    // Jobs
    const jobs = await jobService.getJobs({ search: q });
    jobs.slice(0, 4).forEach(j => {
      results.push({
        id: j.id,
        type: 'job',
        title: j.title,
        subtitle: `${j.department} • ${j.location}`,
        badge: j.status,
        route: `/jobs/${j.id}`
      });
    });

    // Tasks
    const tasks = await taskService.getTasks();
    tasks
      .filter(t => t.title.toLowerCase().includes(q) || (t.candidateName && t.candidateName.toLowerCase().includes(q)))
      .slice(0, 3)
      .forEach(t => {
        results.push({
          id: t.id,
          type: 'task',
          title: t.title,
          subtitle: `Assigned to ${t.assignee.name} • Due ${t.dueDate}`,
          badge: t.priority,
          route: '/tasks'
        });
      });

    return results;
  }
}

export const searchService = new SearchService();
