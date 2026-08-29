import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users,
  ShieldCheck,
  Send,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import { Badge, Button, Input, Textarea, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const RequisitionBuilderPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form State
  const [title, setTitle] = useState('Senior Piping Designer (Brownfield / Plant 3D)');
  const [department, setDepartment] = useState('Piping & Layout');
  const [location, setLocation] = useState('Calgary, AB (Hybrid)');
  const [headcount, setHeadcount] = useState('2');
  const [type, setType] = useState('Replacement Headcount');
  const [salaryMin, setSalaryMin] = useState('120,000');
  const [salaryMax, setSalaryMax] = useState('140,000');
  const [hiringManager, setHiringManager] = useState('Elena Rostova, P.Eng.');
  const [assignedRecruiter, setAssignedRecruiter] = useState('Sarah Jenkins');

  const [mustHaves, setMustHaves] = useState<string[]>([
    '8+ years brownfield piping layout in Western Canadian SAGD facilities',
    'High proficiency in AutoCAD Plant 3D and Navisworks Manage clash detection',
    'ASME B31.3 piping stress coordination experience'
  ]);
  const [newMustHave, setNewMustHave] = useState('');

  const handleAddMustHave = () => {
    if (!newMustHave.trim()) return;
    sound.pop();
    setMustHaves([...mustHaves, newMustHave]);
    setNewMustHave('');
  };

  const handleRemoveMustHave = (index: number) => {
    sound.click();
    setMustHaves(mustHaves.filter((_, i) => i !== index));
  };

  const handleNextStep = () => {
    sound.warp();
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    sound.warp();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePublishRequisition = (e: React.FormEvent) => {
    e.preventDefault();
    sound.chime();
    toast('Requisition Created & Published', `"${title}" is now active in your recruiting pipeline.`, 'success');
    navigate('/jobs');
  };

  const steps = [
    { num: 1, label: '1. Basics & Staffing Need' },
    { num: 2, label: '2. Requirements & Rubric' },
    { num: 3, label: '3. Interview Plan & Panel' },
    { num: 4, label: '4. Approvals & Posting' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. STEPPED REQUISITION HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.click();
                  navigate('/jobs');
                }}
                className="p-1.5 rounded-[6px] text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                    <span>Requisition Studio</span>
                    <span className="opacity-30">•</span>
                    <span>Stepped Authoring & Rubric Engine</span>
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                    Create New Engineering Requisition
                  </h1>
                </div>
              </div>
            </div>

            <Badge variant="champagne" size="sm">Draft Autosaved Locally</Badge>
          </div>

          {/* Step Progression Bar */}
          <div className="flex items-center gap-2 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] overflow-x-auto relative z-1">
            {steps.map((st) => (
              <button
                key={st.num}
                onClick={() => {
                  sound.warp();
                  setCurrentStep(st.num);
                }}
                className={cn(
                  'px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all whitespace-nowrap',
                  currentStep === st.num
                    ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black shadow-xs font-bold'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 border border-black/[0.06] dark:border-white/[0.08]'
                )}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. STEPPED WORKSPACE BODY */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          {/* STEP 1: BASICS */}
          {currentStep === 1 && (
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4 animate-in fade-in">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Step 1: Requisition Basics & Staffing Classification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Job Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Discipline Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/30 text-slate-900 dark:text-white font-medium"
                  >
                    <option>Piping & Layout</option>
                    <option>Mechanical Engineering</option>
                    <option>Civil & Structural</option>
                    <option>Electrical & Instrumentation</option>
                    <option>Project Controls & Cost</option>
                    <option>Software & Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Deployment Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/30 text-slate-900 dark:text-white font-medium"
                  >
                    <option>Calgary, AB (Hybrid HQ)</option>
                    <option>Edmonton, AB (Fabrication On-Site)</option>
                    <option>Fort McMurray, AB (14/14 FIFO Site)</option>
                    <option>Remote Canada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Target Headcount Slots</label>
                  <Input
                    type="number"
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    className="bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Annual Salary Band (CAD)</label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      placeholder="Min ($)"
                      className="bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-mono"
                    />
                    <span className="text-slate-400">—</span>
                    <Input
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      placeholder="Max ($)"
                      className="bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: REQUIREMENTS */}
          {currentStep === 2 && (
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4 animate-in fade-in">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Step 2: EPCM Hard Gates & Evaluative Rubric
              </h3>

              <div className="space-y-3 text-xs">
                <label className="block text-slate-700 dark:text-zinc-300 font-semibold">Must-Have Deliverables & Hard Gates</label>
                <div className="space-y-2">
                  {mustHaves.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-[7px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 text-xs">
                      <span className="text-slate-800 dark:text-zinc-200">{item}</span>
                      <button onClick={() => handleRemoveMustHave(idx)} className="text-rose-500 hover:text-rose-700">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Input
                    placeholder="Add mandatory CAD skill or certification (e.g. ASET CET license)..."
                    value={newMustHave}
                    onChange={(e) => setNewMustHave(e.target.value)}
                    className="bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                  <Button size="xs" variant="machined" onClick={handleAddMustHave} className="font-semibold text-xs shrink-0">
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Add Gate</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: INTERVIEW PLAN */}
          {currentStep === 3 && (
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4 animate-in fade-in">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Step 3: Multi-Stage Interview Plan & Panel Assignments
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  { round: 'Round 1: Recruiter Phone Screen (30 min)', owner: 'Sarah Jenkins', rubric: 'Compensation, rotation availability, and CAD tool overview' },
                  { round: 'Round 2: Technical Discipline Panel (60 min)', owner: 'Elena Rostova, P.Eng.', rubric: 'Plant 3D modeling, ASME B31.3 stress coordination, laser scan clash resolution' },
                  { round: 'Round 3: Engineering Leadership & Offer Sign-off (45 min)', owner: 'David Tremblay', rubric: 'Project delivery governance, client alignment, and formal offer discussion' }
                ].map((r, i) => (
                  <div key={i} className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span>{r.round}</span>
                      <Badge variant="indigo" size="sm">{r.owner}</Badge>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-zinc-400">Rubric focus: {r.rubric}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: APPROVAL & POSTING */}
          {currentStep === 4 && (
            <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4 animate-in fade-in">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Step 4: Target Sourcing Channels & Final Sign-off
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-[8px] bg-slate-50 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white">Broadcast Channels</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-[#8A6D3B]" />
                      <span>LinkedIn Recruiter Job Slot</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-[#8A6D3B]" />
                      <span>Indeed Sponsored XML Feed</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-[#8A6D3B]" />
                      <span>ZipRecruiter Network</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-[#8A6D3B]" />
                      <span>Internal EPCM Talent Pool Bench</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4">
            <Button
              size="sm"
              variant="machined"
              disabled={currentStep === 1}
              onClick={handlePrevStep}
              className="gap-1.5 font-semibold text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </Button>

            {currentStep < 4 ? (
              <Button
                size="sm"
                variant="champagne"
                onClick={handleNextStep}
                className="gap-1.5 font-semibold text-xs"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="champagne"
                onClick={handlePublishRequisition}
                className="gap-1.5 font-semibold text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Requisition & Launch Sourcing</span>
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
