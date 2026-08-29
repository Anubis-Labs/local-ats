import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { candidateService } from '../services/candidateService';
import { Badge, Button, Card, Input, Textarea, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const ImportPage: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [candidateName, setCandidateName] = useState('Dmitri Volkov, P.Eng.');
  const [candidateEmail, setCandidateEmail] = useState('dmitri.volkov@albertaenergy.ca');
  const [candidateRole, setCandidateRole] = useState('Staff Structural Engineer');
  const [candidateCompany, setCandidateCompany] = useState('Worley Cord');
  const [experienceYears, setExperienceYears] = useState(14);
  const [location, setLocation] = useState('Edmonton, AB');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInjectSample = () => {
    sound.chime();
    setCandidateName('Elena Vance, P.Eng.');
    setCandidateEmail('elena.vance@epcm-canada.com');
    setCandidateRole('Lead Instrumentation & Controls Engineer');
    setCandidateCompany('Stantec Energy');
    setExperienceYears(11);
    setLocation('Calgary, AB');
    setResumeText(
      'Senior I&C Engineer with 11+ years leading DCS/PLC automation, safety instrumented systems (SIS IEC 61511), and SAGD brownfield instrumentation upgrades. Verified APEGA P.Eng. with DeltaV and Triconex certifications.'
    );
    toast('Sample Injected', 'Populated I&C Engineering Candidate Profile.', 'info');
  };

  const handleManualImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) return;
    setIsProcessing(true);
    sound.latch();

    const created = await candidateService.createCandidate({
      name: candidateName,
      email: candidateEmail,
      phone: '+1 (780) 555-9123',
      currentRole: candidateRole,
      currentCompany: candidateCompany,
      experienceYears: Number(experienceYears),
      location,
      source: 'Direct Application',
      stage: 'review',
      rating: 4,
      tags: ['Structural', 'Alberta Energy', 'STAAD.Pro', 'Heavy Industrial'],
      inTalentPool: false,
      notes: [],
      scorecards: [],
      relationships: [],
      files: [],
      parsedResume: {
        rawText: resumeText || `${candidateName} - ${candidateRole} at ${candidateCompany}`,
        summary: resumeText || `Senior Structural Engineer with ${experienceYears} years of experience designing heavy industrial modular pipe racks and refinery foundations across Western Canada.`,
        extractedSkills: ['Structural Steel', 'STAAD.Pro', 'Foundation Design', 'APEGA P.Eng.'],
        education: [
          {
            id: 'edu-1',
            institution: 'University of Alberta',
            degree: 'B.Sc.',
            fieldOfStudy: 'Civil Engineering',
            graduationYear: '2012'
          }
        ],
        certifications: [
          {
            id: 'cert-1',
            name: 'APEGA Professional Engineer (P.Eng.)',
            issuer: 'APEGA',
            year: '2016',
            isVerified: true
          }
        ],
        workHistory: [
          {
            id: 'wh-import-1',
            company: candidateCompany,
            role: candidateRole,
            startDate: '2018',
            endDate: 'Present',
            location,
            description: 'Lead structural designer for SAGD plant debottlenecking projects.',
            projects: ['Kearl Phase 2', 'Surmont Expansion']
          }
        ],
        evidenceChunks: [
          {
            id: 'ev-import-1',
            text: 'Lead engineer on heavy industrial foundations and piperacks.',
            section: 'Work History',
            confidence: 0.98,
            source: 'resume'
          }
        ]
      }
    });

    setIsProcessing(false);
    toast('Candidate Ingested', `Created full dossier for ${created.name}.`, 'success');
    navigate(`/candidates/${created.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT RESUME INTAKE HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <UploadCloud className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Intake Pipeline</span>
                <span className="opacity-30">•</span>
                <span>Deterministic Resume Parser Studio</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Resume Intake & Ingestion Engine
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="xs"
              variant="champagne"
              onClick={handleInjectSample}
              className="gap-1.5 font-semibold text-xs"
            >
              <Zap className="w-3.5 h-3.5 text-[#d4c5a9]" />
              <span>Load Sample Resume</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. INTAKE WORKSPACE CANVAS */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-8 max-w-7xl mx-auto w-full">
        {/* Drag and Drop Laser Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleInjectSample(); }}
          className={cn(
            'p-8 rounded-[14px] border-2 border-dashed transition-all flex flex-col items-center justify-center text-center space-y-3 specimen-chamfer cursor-pointer',
            isDragOver
              ? 'border-[#d4c5a9] bg-card-topography'
              : 'border-white/15 bg-card-cad hover:border-white/30'
          )}
          onClick={handleInjectSample}
        >
          <div className="w-12 h-12 rounded-[10px] bg-gradient-to-br from-[#242834] to-[#12141a] border border-white/20 flex items-center justify-center text-[#d4c5a9] shadow-lg">
            <UploadCloud className="w-6 h-6" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Drop candidate PDF resume here</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Deterministic parsing extracts skills, credentials, SAGD citations, and work history
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#d4c5a9] font-bold px-3 py-1 rounded bg-black/40 border border-white/10">
            Click to auto-load sample EPCM resume
          </span>
        </div>

        {/* Ingestion Profile Matrix Form */}
        <div className="p-6 rounded-[12px] bg-card-topography space-y-6 shadow-xl specimen-chamfer specimen-chamfer-champagne">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-bold text-xs uppercase tracking-wider text-white">
              Parsed Candidate Spec Sheet
            </span>
            <Badge variant="champagne" size="sm">Local Parser</Badge>
          </div>

          <form onSubmit={handleManualImport} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 mb-1 font-semibold">Candidate Full Name</label>
                <Input
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="bg-[#12151D] border-white/10 text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-semibold">Email Address</label>
                <Input
                  required
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  className="bg-[#12151D] border-white/10 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-zinc-300 mb-1 font-semibold">Current / Target Role</label>
                <Input
                  required
                  value={candidateRole}
                  onChange={(e) => setCandidateRole(e.target.value)}
                  className="bg-[#12151D] border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-semibold">Current Employer</label>
                <Input
                  required
                  value={candidateCompany}
                  onChange={(e) => setCandidateCompany(e.target.value)}
                  className="bg-[#12151D] border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-semibold">Experience (Years)</label>
                <Input
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="bg-[#12151D] border-white/10 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 mb-1 font-semibold">Executive Summary & Deliverable Citations</label>
              <Textarea
                rows={3}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Parsed resume raw text and project deliverable highlights..."
                className="bg-[#12151D] border-white/10 text-white"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                size="sm"
                variant="champagne"
                loading={isProcessing}
                className="gap-2 font-bold px-6"
              >
                <span>Complete Ingestion & Open Dossier →</span>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
