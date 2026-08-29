import { Task } from '../types/task';
import { mockTasks } from '../mock/tasksData';

class TaskService {
  private tasks: Task[] = [...mockTasks];

  async getTasks(filters?: { completed?: boolean; assigneeId?: string; candidateId?: string }): Promise<Task[]> {
    await new Promise((res) => setTimeout(res, 70));
    let list = [...this.tasks];
    if (filters?.completed !== undefined) {
      list = list.filter((t) => t.completed === filters.completed);
    }
    if (filters?.assigneeId) {
      list = list.filter((t) => t.assignee.id === filters.assigneeId);
    }
    if (filters?.candidateId) {
      list = list.filter((t) => t.candidateId === filters.candidateId);
    }
    return list;
  }

  async toggleTaskCompletion(taskId: string): Promise<Task> {
    await new Promise((res) => setTimeout(res, 90));
    const index = this.tasks.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error('Task not found');
    const curr = this.tasks[index];
    const updated: Task = {
      ...curr,
      completed: !curr.completed,
      completedAt: !curr.completed ? new Date().toISOString() : undefined,
      isOverdue: false
    };
    this.tasks[index] = updated;
    return updated;
  }

  async createTask(draft: Partial<Task>): Promise<Task> {
    await new Promise((res) => setTimeout(res, 120));
    const created: Task = {
      id: `task-${Date.now()}`,
      title: draft.title || 'New Action Item',
      description: draft.description,
      priority: draft.priority || 'medium',
      category: draft.category || 'followup',
      dueDate: draft.dueDate || new Date().toISOString().split('T')[0],
      completed: false,
      assignee: draft.assignee || {
        id: 'user-2',
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      candidateId: draft.candidateId,
      candidateName: draft.candidateName,
      jobId: draft.jobId,
      jobTitle: draft.jobTitle,
      isOverdue: false
    };
    this.tasks.unshift(created);
    return created;
  }
}

export const taskService = new TaskService();
