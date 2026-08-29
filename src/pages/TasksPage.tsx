import React, { useEffect, useState } from 'react';
import {
  CheckSquare,
  Plus,
  Calendar,
  AlertTriangle,
  Clock,
  Trash2,
  Sparkles,
  CheckCircle2,
  User,
  Filter
} from 'lucide-react';
import { taskService } from '../services/taskService';
import { mockTasks } from '../mock/tasksData';
import { Task } from '../types/task';
import { Badge, Button, Card, Input, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'urgent'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDue, setNewTaskDue] = useState('Today at 5:00 PM');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');

  const { toast } = useToast();

  const loadTasks = async () => {
    const list = await taskService.getTasks();
    setTasks(list);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleToggleComplete = async (taskId: string) => {
    sound.latch();
    const updated = await taskService.toggleTaskCompletion(taskId);
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    toast(updated.completed ? 'Task Completed' : 'Task Reopened', updated.title, 'info');
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    sound.click();
    const created = await taskService.createTask({
      title: newTaskTitle,
      description: newTaskDue,
      priority: newTaskPriority,
      assignee: {
        id: 'usr-1',
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
      },
      category: 'followup'
    });

    setTasks([created, ...tasks]);
    setNewTaskTitle('');
    toast('Task Created', created.title, 'success');
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    if (filter === 'urgent') return t.priority === 'urgent';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT TASKS HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="pipeline-velocity" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <CheckSquare className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Operational Action Items</span>
                  <span className="opacity-30">•</span>
                  <span>{tasks.filter((t) => !t.completed).length} Pending</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Tasks & Follow-up Queue
                </h1>
              </div>
            </div>
          </div>

          {/* Task Creator Form */}
          <form onSubmit={handleAddTask} className="flex flex-wrap gap-2 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1">
            <Input
              placeholder="Add new follow-up task or interview action..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 min-w-[240px] h-9 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as any)}
              className="h-9 px-3 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none shadow-2xs"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent Hard Gate</option>
            </select>
            <Button size="xs" variant="champagne" type="submit" className="gap-1.5 font-semibold h-9 px-4">
              <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
              <span>Create Action</span>
            </Button>
          </form>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 pt-3 relative z-1">
            {[
              { id: 'all', label: `All Tasks (${tasks.length})` },
              { id: 'pending', label: `Pending (${tasks.filter((t) => !t.completed).length})` },
              { id: 'completed', label: `Completed (${tasks.filter((t) => t.completed).length})` },
              { id: 'urgent', label: `Urgent (${tasks.filter((t) => t.priority === 'urgent').length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.click();
                  setFilter(tab.id as any);
                }}
                className={cn(
                  'px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-all',
                  filter === tab.id
                    ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black shadow-xs'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08]'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. TASK ITEMS LIST WITH THEMATIC SURFACES */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-4 max-w-7xl mx-auto w-full">
        <div className="rounded-[12px] bg-white dark:bg-[#12151D] p-6 space-y-4 shadow-sm border border-black/[0.08] dark:border-white/10 specimen-chamfer">
          <div className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
            {filteredTasks.length === 0 ? (
              <div className="py-12 text-center text-slate-400 dark:text-zinc-500 text-xs italic">
                No action items in this filter view.
              </div>
            ) : (
              filteredTasks.map((t) => (
                <div key={t.id} className="py-4 flex items-start justify-between gap-4 text-xs">
                  <div className="flex items-start gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => handleToggleComplete(t.id)}
                      className="mt-0.5 h-4 w-4 rounded border-black/20 dark:border-white/20 bg-white dark:bg-[#12151D] text-[#8A6D3B] dark:text-[#d4c5a9] cursor-pointer"
                    />
                    <div className="space-y-1">
                      <div className={cn('font-semibold text-sm leading-snug', t.completed ? 'line-through text-slate-400 dark:text-zinc-500' : 'text-slate-900 dark:text-white')}>
                        {t.title}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-zinc-300">
                        {t.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant={t.priority === 'urgent' ? 'destructive' : t.priority === 'high' ? 'warning' : 'neutral'}
                      size="sm"
                    >
                      {t.priority}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
