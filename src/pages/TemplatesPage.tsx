import React, { useState, useMemo } from 'react';
import {
  Copy,
  Plus,
  Send,
  Check,
  Sparkles,
  Search,
  Eye,
  Edit3,
  ShieldCheck,
  Paperclip,
  User,
  Zap,
  FileText
} from 'lucide-react';
import { mockTemplates, TemplateItem } from '../mock/templatesData';
import { mockCandidates } from '../mock/candidatesData';
import { Badge, Button, Input, Textarea, Modal, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateItem[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>(mockTemplates[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'preview' | 'editor'>('preview');

  // Sample candidate for real-time live preview interpolation
  const [sampleCandidateId, setSampleCandidateId] = useState(mockCandidates[0].id);

  // Editable state
  const [editedSubject, setEditedSubject] = useState(selectedTemplate.subject || '');
  const [editedContent, setEditedContent] = useState(selectedTemplate.content || '');

  // Create Template Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TemplateItem['category']>('email');
  const [newSubject, setNewSubject] = useState('');
  const [newContent, setNewContent] = useState('');

  const { toast } = useToast();

  const sampleCandidate = useMemo(() => {
    return mockCandidates.find((c) => c.id === sampleCandidateId) || mockCandidates[0];
  }, [sampleCandidateId]);

  const selectTemplate = (t: TemplateItem) => {
    sound.click();
    setSelectedTemplate(t);
    setEditedSubject(t.subject || '');
    setEditedContent(t.content || '');
  };

  // Live Variable Interpolation Engine
  const interpolatedSubject = useMemo(() => {
    let s = editedSubject;
    s = s.replace(/{{candidate_first_name}}/g, sampleCandidate.name.split(' ')[0]);
    s = s.replace(/{{candidate_full_name}}/g, sampleCandidate.name);
    s = s.replace(/{{candidate_name}}/g, sampleCandidate.name);
    s = s.replace(/{{job_title}}/g, sampleCandidate.jobTitle || 'Senior Piping Designer');
    s = s.replace(/{{company_name}}/g, 'Alberta Engineering & Projects');
    s = s.replace(/{{interviewer_name}}/g, 'Elena Rostova, P.Eng.');
    return s;
  }, [editedSubject, sampleCandidate]);

  const interpolatedContent = useMemo(() => {
    let c = editedContent;
    c = c.replace(/{{candidate_first_name}}/g, sampleCandidate.name.split(' ')[0]);
    c = c.replace(/{{candidate_full_name}}/g, sampleCandidate.name);
    c = c.replace(/{{candidate_name}}/g, sampleCandidate.name);
    c = c.replace(/{{job_title}}/g, sampleCandidate.jobTitle || 'Senior Piping Designer');
    c = c.replace(/{{company_name}}/g, 'Alberta Engineering & Projects Inc.');
    c = c.replace(/{{primary_skill}}/g, sampleCandidate.tags[0] || 'AutoCAD Plant 3D');
    c = c.replace(/{{duration}}/g, '45 minutes');
    c = c.replace(/{{interviewer_name}}/g, 'Elena Rostova, P.Eng.');
    c = c.replace(/{{interviewer_role}}/g, 'Piping Discipline Lead');
    c = c.replace(/{{recruiter_name}}/g, 'Sarah Jenkins');
    c = c.replace(/{{candidate_experience_highlight}}/g, `${sampleCandidate.experienceYears} years of brownfield tie-in modeling`);
    c = c.replace(/{{specific_requirement}}/g, 'hands-on Caesar II stress analysis');
    c = c.replace(/{{offer_date}}/g, 'August 28, 2026');
    c = c.replace(/{{base_salary}}/g, sampleCandidate.compensationExpectation || '$135,000 CAD');
    c = c.replace(/{{start_date}}/g, 'September 15, 2026');
    return c;
  }, [editedContent, sampleCandidate]);

  const handleCopyInterpolated = () => {
    sound.click();
    navigator.clipboard.writeText(`Subject: ${interpolatedSubject}\n\n${interpolatedContent}`);
    toast('Copied Interpolated Email', 'Ready to paste into Outlook or Teams.', 'success');
  };

  const handleSendTest = () => {
    sound.bell();
    toast('Test Email Dispatched', `Sent sample rendering to sarah.jenkins@albertaengineering.ca.`, 'success');
  };

  const handleInsertVariable = (varName: string) => {
    sound.pop();
    setEditedContent((prev) => prev + ` {{${varName}}}`);
    toast('Variable Inserted', `Added {{${varName}}} to template body.`, 'info');
  };

  const handleSaveTemplate = () => {
    sound.latch();
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === selectedTemplate.id
          ? { ...t, subject: editedSubject, content: editedContent, lastModified: new Date().toISOString().split('T')[0] }
          : t
      )
    );
    toast('Template Saved', `Updated "${selectedTemplate.title}" library preset.`, 'success');
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    sound.chime();
    const created: TemplateItem = {
      id: `tpl-user-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      subject: newSubject,
      description: `Custom ${newCategory} template created by Sarah Jenkins.`,
      content: newContent || `Dear {{candidate_first_name}},\n\n...`,
      variables: ['candidate_first_name', 'job_title', 'company_name', 'recruiter_name'],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setTemplates([created, ...templates]);
    setSelectedTemplate(created);
    setEditedSubject(created.subject || '');
    setEditedContent(created.content || '');
    setShowCreateModal(false);
    setNewTitle('');
    setNewSubject('');
    setNewContent('');
    toast('Template Created', `Added "${created.title}" to Communications Library.`, 'success');
  };

  const handleAIPolish = () => {
    sound.sparkle();
    setEditedContent((prev) =>
      prev + `\n\n[P.S. We look forward to exploring how your technical mastery in heavy industrial plant layouts can accelerate our SAGD tie-in deliverables.]`
    );
    toast('AI Polish Applied', 'Enhanced tone for Western Canada EPCM executive alignment.', 'success');
  };

  const filteredTemplates = templates.filter((t) => {
    const matchesCat = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. STICKY COMMUNICATIONS STUDIO HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <FileText className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Communications Library & Studio</span>
                  <span className="opacity-30">•</span>
                  <span>{templates.length} EPCM Email & Offer Presets</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Template Studio & Live Email Preview
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                size="xs"
                variant="champagne"
                onClick={() => {
                  sound.click();
                  setShowCreateModal(true);
                }}
                className="gap-1.5 font-semibold text-xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" strokeWidth={2} />
                <span>Create Template</span>
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-2.5" />
              <Input
                placeholder="Search templates (Interview, Offer, Rejection)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-8 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { id: 'all', label: `All (${templates.length})` },
                { id: 'email', label: 'Interview Panels' },
                { id: 'offer', label: 'Offer Letters' },
                { id: 'rejection', label: 'Feedback & Rejections' },
                { id: 'screening', label: 'Screening' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.click();
                    setActiveCategory(cat.id);
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-all whitespace-nowrap',
                    activeCategory === cat.id
                      ? 'bg-[#8A6D3B] text-white dark:bg-[#d4c5a9] dark:text-black shadow-xs'
                      : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08]'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SPLIT STUDIO: MASTER TEMPLATE LIST (LEFT) + LIVE PREVIEW EDITOR (RIGHT) */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Master Template List (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 px-1">
              Template Presets ({filteredTemplates.length})
            </div>

            <div className="rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 divide-y divide-black/[0.06] dark:divide-white/[0.06] overflow-hidden shadow-sm specimen-chamfer">
              {filteredTemplates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => selectTemplate(t)}
                  className={cn(
                    'p-4 cursor-pointer text-xs transition-colors space-y-1.5',
                    selectedTemplate.id === t.id
                      ? 'bg-amber-50/70 dark:bg-[#201C14] border-l-4 border-[#8A6D3B] dark:border-[#d4c5a9]'
                      : 'hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{t.title}</span>
                    <Badge variant={t.category === 'offer' ? 'champagne' : t.category === 'rejection' ? 'neutral' : 'indigo'} size="sm">
                      {t.category}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">{t.subject}</div>
                  <div className="text-[10px] text-slate-400 dark:text-zinc-500 flex items-center gap-2 pt-0.5">
                    <span>Modified: {t.lastModified}</span>
                    <span>•</span>
                    <span>{t.variables.length} variables</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Studio & Preview Pane (Right 8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Studio Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-[10px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-xs">
              {/* Mode Switcher */}
              <div className="flex items-center gap-1 nav-rail-pill">
                <button
                  onClick={() => {
                    sound.warp();
                    setViewMode('preview');
                  }}
                  className={cn('nav-rail-item flex items-center gap-1.5', viewMode === 'preview' && 'nav-rail-item-active')}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Render Preview</span>
                </button>

                <button
                  onClick={() => {
                    sound.warp();
                    setViewMode('editor');
                  }}
                  className={cn('nav-rail-item flex items-center gap-1.5', viewMode === 'editor' && 'nav-rail-item-active')}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Template & Variables</span>
                </button>
              </div>

              {/* Sample Candidate Interpolation Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 dark:text-zinc-400 font-semibold flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>Test Dossier:</span>
                </span>
                <select
                  value={sampleCandidateId}
                  onChange={(e) => {
                    sound.click();
                    setSampleCandidateId(e.target.value);
                  }}
                  className="h-7 px-2.5 rounded-[5px] border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/40 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                >
                  {mockCandidates.slice(0, 4).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.currentRole})
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button size="xs" variant="machined" onClick={handleAIPolish} className="gap-1 font-semibold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                  <span>AI Polish</span>
                </Button>

                <Button size="xs" variant="machined" onClick={handleCopyInterpolated} className="gap-1 font-semibold text-xs">
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Render</span>
                </Button>

                <Button size="xs" variant="champagne" onClick={handleSendTest} className="gap-1 font-semibold text-xs">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Test</span>
                </Button>
              </div>
            </div>

            {/* PREVIEW MODE: REALISTIC EMAIL ENVELOPE */}
            {viewMode === 'preview' && (
              <div className="rounded-[12px] bg-white dark:bg-[#0D0F15] border border-black/[0.08] dark:border-white/10 shadow-lg overflow-hidden specimen-chamfer animate-in fade-in duration-150">
                {/* Email Header Envelope */}
                <div className="p-6 bg-slate-50 dark:bg-black/50 border-b border-black/[0.08] dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#8A6D3B]/20 text-[#8A6D3B] dark:text-[#d4c5a9] font-bold text-xs flex items-center justify-center border border-[#8A6D3B]/30">
                        SJ
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 dark:text-white">
                          Sarah Jenkins &lt;sarah.jenkins@albertaengineering.ca&gt;
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                          To: <strong className="text-slate-800 dark:text-zinc-200">{sampleCandidate.name}</strong> &lt;{sampleCandidate.email}&gt;
                        </div>
                      </div>
                    </div>

                    <Badge variant="success" size="sm" className="gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>DKIM Verified</span>
                    </Badge>
                  </div>

                  <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <div className="text-[11px] uppercase font-bold text-slate-500 dark:text-zinc-400">Subject</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {interpolatedSubject}
                    </div>
                  </div>
                </div>

                {/* Email Rendered Body */}
                <div className="p-8 space-y-6">
                  <div className="text-xs text-slate-800 dark:text-zinc-200 font-sans leading-relaxed whitespace-pre-wrap">
                    {interpolatedContent}
                  </div>

                  {/* Attachment Card if Offer */}
                  {selectedTemplate.category === 'offer' && (
                    <div className="p-4 rounded-[8px] bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Enclosed Executable Offer Document</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-900 dark:text-white font-semibold tabular-nums">
                          Formal_Offer_Contract_{sampleCandidate.name.replace(/\s+/g, '_')}_2026.pdf
                        </span>
                        <Badge variant="champagne" size="sm">DocuSign Ready</Badge>
                      </div>
                    </div>
                  )}

                  {/* Corporate EPCM Footer */}
                  <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] text-[11px] text-slate-500 dark:text-zinc-400 space-y-1">
                    <div className="font-bold text-slate-800 dark:text-zinc-300">Alberta Engineering & Projects Inc.</div>
                    <div>Suite 1800, 421 7th Ave SW • Calgary, AB T2P 4K9 Canada</div>
                    <div className="text-[10px] text-slate-400 dark:text-zinc-500">Confidential Engineering Recruitment Transmission</div>
                  </div>
                </div>
              </div>
            )}

            {/* EDITOR & VARIABLE SYNTAX MODE */}
            {viewMode === 'editor' && (
              <div className="rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 p-6 space-y-4 shadow-sm specimen-chamfer animate-in fade-in duration-150">
                {/* Available Variables Pills */}
                <div className="space-y-2 pb-3 border-b border-black/[0.08] dark:border-white/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#8A6D3B] dark:text-[#d4c5a9]" />
                    <span>Click to Insert Dynamic Variable Pill</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'candidate_first_name',
                      'candidate_full_name',
                      'job_title',
                      'company_name',
                      'base_salary',
                      'start_date',
                      'interviewer_name',
                      'interviewer_role',
                      'duration',
                      'recruiter_name'
                    ].map((v) => (
                      <button
                        key={v}
                        onClick={() => handleInsertVariable(v)}
                        className="px-2 py-1 rounded-[5px] bg-amber-50 hover:bg-amber-100 dark:bg-[#9e8557]/10 dark:hover:bg-[#9e8557]/20 border border-amber-200 dark:border-[#d4c5a9]/30 text-[10px] font-mono font-semibold text-[#8A6D3B] dark:text-[#d4c5a9] transition-colors"
                      >
                        + &#123;&#123;{v}&#125;&#125;
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold text-xs">Subject Template</label>
                  <Input
                    value={editedSubject}
                    onChange={(e) => setEditedSubject(e.target.value)}
                    className="bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold text-xs">Body Template Content</label>
                  <Textarea
                    rows={12}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="bg-slate-50 dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-xs tabular-nums leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-black/[0.08] dark:border-white/10">
                  <Button size="sm" variant="champagne" onClick={handleSaveTemplate} className="gap-1.5 font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Template Changes</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. CREATE NEW TEMPLATE MODAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Email & Offer Template"
        subtitle="Author standardized recruitment messaging for candidate touchpoints"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateTemplate} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Template Title</label>
              <Input
                required
                placeholder="e.g. SAGD Piping Assessment Follow-up"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Template Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full h-8 px-2.5 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-slate-900 dark:text-white font-medium"
              >
                <option value="email">Technical Interview Invitation</option>
                <option value="offer">Formal Offer Letter</option>
                <option value="rejection">Feedback / Rejection</option>
                <option value="screening">Initial Phone Screen</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Default Subject Line</label>
            <Input
              required
              placeholder="e.g. Next Steps with {{company_name}} for {{job_title}}"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Template Body</label>
            <Textarea
              rows={8}
              required
              placeholder={`Hi {{candidate_first_name}},\n\nWe would like to invite you to...`}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-sans leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/10">
            <Button size="sm" variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="champagne" type="submit" className="font-semibold">
              Save New Template
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
