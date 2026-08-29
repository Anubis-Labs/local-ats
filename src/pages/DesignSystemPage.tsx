import React, { useState } from 'react';
import {
  Sun,
  Moon,
  CheckCircle2,
  AlertTriangle,
  Search,
  Plus,
  ShieldCheck,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Award,
  ArrowRight,
  ChevronRight,
  MoreHorizontal,
  FileText,
  SlidersHorizontal,
  Sparkles,
  Command,
  ArrowUpRight,
  Network,
  Scale,
  Users,
  Compass,
  Cpu,
  Fingerprint,
  Layers,
  Terminal,
  Activity,
  UserCheck,
  BadgePercent,
  FolderLock
} from 'lucide-react';
import {
  Button,
  Badge,
  Input,
  Textarea,
  Switch,
  Checkbox,
  Card,
  SegmentedControl,
  cn
} from '../components/ui';
import { useTheme } from '../context/ThemeContext';

export const DesignSystemPage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const [activeSection, setActiveSection] = useState<'specimens' | 'icons' | 'materials' | 'typography' | 'buttons' | 'controls' | 'comparison'>('specimens');
  const [searchVal, setSearchVal] = useState('Tariq Al-Mansoor');
  const [switchState, setSwitchState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);
  const [selectedRowId, setSelectedRowId] = useState('row-1');

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] ambient-depth-glow transition-colors duration-200 selection:bg-[#9e8557]/30 selection:text-current font-sans pb-16">
      {/* Top Laboratory Bar */}
      <header className="sticky top-0 z-50 h-14 border-b border-black/[0.07] dark:border-white/[0.07] bg-[var(--bg-canvas)]/80 backdrop-blur-2xl px-8 lg:px-12 flex items-center justify-between select-none">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest font-semibold text-slate-500 dark:text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9e8557] dark:bg-[#d4c5a9] shadow-xs" />
            <span className="text-slate-900 dark:text-zinc-100 font-bold">Design System Laboratory</span>
            <span className="opacity-25">/</span>
            <span className="text-slate-400 dark:text-zinc-500 font-normal">Physical Materials & Iconography</span>
          </div>
        </div>

        {/* Laboratory Theme Controller */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 nav-rail-pill">
            <button
              onClick={() => setTheme('light')}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-[6px] font-medium transition-all',
                theme === 'light'
                  ? 'nav-rail-item-active text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              <Sun className="w-3.5 h-3.5 text-[#9e8557]" strokeWidth={2} />
              <span>Warm Pearl</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-[6px] font-medium transition-all',
                theme === 'dark'
                  ? 'nav-rail-item-active text-white font-semibold'
                  : 'text-slate-400 hover:text-zinc-200'
              )}
            >
              <Moon className="w-3.5 h-3.5 text-[#d4c5a9]" strokeWidth={2} />
              <span>Smoked Obsidian</span>
            </button>
          </div>

          <a
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 px-3 py-1.5 rounded-[6px] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors"
          >
            <span>Return to Workspace</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" strokeWidth={2} />
          </a>
        </div>
      </header>

      {/* Main Full-Width Laboratory Container */}
      <main className="max-w-[1440px] mx-auto px-8 lg:px-12 py-10 space-y-12">
        {/* Tactile Machined Navigation Rail */}
        <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-4">
          <div className="flex items-center gap-1.5 nav-rail-pill">
            {[
              { id: 'specimens', label: 'Primary Visual Specimens', icon: Compass },
              { id: 'icons', label: 'Iconography & Stroke Library', icon: Fingerprint },
              { id: 'materials', label: 'Materials & Chamfer Bevels', icon: Layers },
              { id: 'typography', label: 'Typography Scale', icon: Terminal },
              { id: 'buttons', label: 'Machined Buttons', icon: Cpu },
              { id: 'controls', label: 'Inputs & Controls', icon: SlidersHorizontal },
              { id: 'comparison', label: 'Dual-Theme Comparison', icon: Scale }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={cn(
                    'nav-rail-item flex items-center gap-2',
                    activeSection === tab.id && 'nav-rail-item-active'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
            <span className="font-mono">Calibrated Hardware v2.0</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PRIMARY SPECIMENS (SPACIOUS 12-COLUMN BALANCED COMPOSITION) */}
        {/* ========================================================================= */}
        {activeSection === 'specimens' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* 12-Column Grid: Featured Candidate Card + Intelligence Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Flagship Candidate Intelligence Card */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">
                    Specimen 1 — Flagship Candidate Intelligence Card
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Smoked Glass • Chamfered Bevel</span>
                </div>

                <Card chamfer glint="champagne" className="p-7 space-y-6">
                  {/* Identity Header */}
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                        alt="Tariq Al-Mansoor"
                        className="w-14 h-14 rounded-[10px] object-cover border border-black/[0.08] dark:border-white/[0.14] shadow-xs shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
                            Tariq Al-Mansoor, CET
                          </h3>
                          <Badge variant="champagne" size="sm">
                            98% Fit Score
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                          Senior Piping Designer • Fluor Canada (12 yrs) • Calgary, AB
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="machined" className="gap-1.5">
                        <span>Inspect Dossier</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-70" strokeWidth={2} />
                      </Button>
                      <Button size="icon" variant="glass" aria-label="More actions">
                        <MoreHorizontal className="w-4 h-4 text-slate-400 dark:text-zinc-300" strokeWidth={2} />
                      </Button>
                    </div>
                  </div>

                  {/* Verbatim Work History Evidence Block */}
                  <div className="p-4 rounded-[8px] bg-black/[0.025] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-zinc-200 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                        <span>Verified Deliverable • ConocoPhillips Surmont SAGD Tie-ins</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Work History #02</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed italic">
                      "Lead designer on ConocoPhillips Surmont SAGD brownfield optimization project. Modeled 40+ tie-ins, point cloud clash resolution in Navisworks Manage, and isometric fabrication sign-off."
                    </p>
                  </div>

                  {/* Intelligence Signals & Metadata Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-black/[0.04] dark:border-white/[0.05] text-xs">
                    <div className="flex items-center gap-4 text-slate-500 dark:text-zinc-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Network className="w-3.5 h-3.5 text-[#9e8557] dark:text-[#d4c5a9]" strokeWidth={2} />
                        <span>Overlap: Elena Rostova</span>
                      </span>
                      <span className="opacity-30">•</span>
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-400" strokeWidth={2} />
                        <span>Plant 3D / Navisworks Certified</span>
                      </span>
                    </div>

                    <span className="font-mono text-[11px] text-slate-400 dark:text-zinc-500">REQ-101 MATCH</span>
                  </div>
                </Card>
              </div>

              {/* Right 5 Columns: Material Calibration & Detail Panel */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">
                    Intelligence Analysis & Score Breakdown
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Coverage Signals</span>
                </div>

                <Card chamfer className="p-7 space-y-5">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900 dark:text-white">Requirements Coverage</span>
                      <span className="font-mono text-xs text-[#7a643b] dark:text-[#d4c5a9] font-semibold">4 of 4 Met (100%)</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-[7px] bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                          <span className="text-slate-700 dark:text-zinc-300">Heavy Industrial SAGD Experience</span>
                        </div>
                        <Badge variant="success" size="sm">12 Years</Badge>
                      </div>

                      <div className="p-3 rounded-[7px] bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                          <span className="text-slate-700 dark:text-zinc-300">Plant 3D & Navisworks Clash Detection</span>
                        </div>
                        <Badge variant="success" size="sm">Active</Badge>
                      </div>

                      <div className="p-3 rounded-[7px] bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#9e8557] dark:text-[#d4c5a9]" strokeWidth={2} />
                          <span className="text-slate-700 dark:text-zinc-300">APEGA / ASET Certified Technologist</span>
                        </div>
                        <Badge variant="champagne" size="sm">CET Active</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-zinc-400 text-xs">Availability: Immediate (Calgary Local)</span>
                    <Button size="xs" variant="glass">View Full Analysis</Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Specimen 2: High-Density Candidate Records Table (Spacious Full 12 Columns) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-semibold text-slate-800 dark:text-zinc-200">
                  Specimen 2 — High-Density Candidate Records Table
                </span>
                <span className="text-[11px] font-mono text-slate-400">Tabular Numerals • Subtle Row Separation</span>
              </div>

              <Card chamfer className="overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] uppercase font-semibold text-slate-400 dark:text-zinc-500 tracking-wider">
                      <th className="py-3.5 px-5 w-12">
                        <Checkbox checked={true} onChange={() => {}} />
                      </th>
                      <th className="py-3.5 px-5">Candidate & Identity</th>
                      <th className="py-3.5 px-5">Role & Employer</th>
                      <th className="py-3.5 px-5">Requisition</th>
                      <th className="py-3.5 px-5">Fit Score</th>
                      <th className="py-3.5 px-5">Stage</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                    {/* Row 1: Selected State with Champagne Bevel */}
                    <tr
                      onClick={() => setSelectedRowId('row-1')}
                      className={cn(
                        'cursor-pointer transition-colors',
                        selectedRowId === 'row-1'
                          ? 'bg-[#9e8557]/8 dark:bg-[#d4c5a9]/6'
                          : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                      )}
                    >
                      <td className="py-3 px-5" onClick={(e) => e.stopPropagation()}>
                        <Checkbox checked={selectedRowId === 'row-1'} onChange={() => setSelectedRowId('row-1')} />
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-[6px] bg-[#1c1f26] border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                            MC
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white">Melissa Chen, P.Eng.</span>
                            <div className="text-[11px] text-slate-400">Calgary, AB</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-slate-600 dark:text-zinc-400">
                        Lead Mechanical Engineer • Stantec (10 yrs)
                      </td>
                      <td className="py-3 px-5 font-mono text-xs text-slate-800 dark:text-zinc-300">
                        REQ-102: HVAC Lead
                      </td>
                      <td className="py-3 px-5 font-mono font-semibold text-slate-900 dark:text-zinc-100">
                        98% Fit
                      </td>
                      <td className="py-3 px-5">
                        <Badge variant="champagne" size="sm" pulse>Offer Extended</Badge>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <Button size="xs" variant="glass">Inspect →</Button>
                      </td>
                    </tr>

                    {/* Row 2: Standard State */}
                    <tr
                      onClick={() => setSelectedRowId('row-2')}
                      className={cn(
                        'cursor-pointer transition-colors',
                        selectedRowId === 'row-2'
                          ? 'bg-[#9e8557]/8 dark:bg-[#d4c5a9]/6'
                          : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                      )}
                    >
                      <td className="py-3 px-5" onClick={(e) => e.stopPropagation()}>
                        <Checkbox checked={selectedRowId === 'row-2'} onChange={() => setSelectedRowId('row-2')} />
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-[6px] bg-[#1c1f26] border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                            BG
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white">Brendan Gallagher</span>
                            <div className="text-[11px] text-slate-400">Edmonton, AB</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-slate-600 dark:text-zinc-400">
                        Project Controls Analyst • Jacobs (6 yrs)
                      </td>
                      <td className="py-3 px-5 font-mono text-xs text-slate-800 dark:text-zinc-300">
                        REQ-105: Controls
                      </td>
                      <td className="py-3 px-5 font-mono font-semibold text-slate-900 dark:text-zinc-100">
                        84% Fit
                      </td>
                      <td className="py-3 px-5">
                        <Badge variant="warning" size="sm" pulse>Stalled (12d)</Badge>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <Button size="xs" variant="glass">Inspect →</Button>
                      </td>
                    </tr>

                    {/* Row 3: Standard State */}
                    <tr
                      onClick={() => setSelectedRowId('row-3')}
                      className={cn(
                        'cursor-pointer transition-colors',
                        selectedRowId === 'row-3'
                          ? 'bg-[#9e8557]/8 dark:bg-[#d4c5a9]/6'
                          : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                      )}
                    >
                      <td className="py-3 px-5" onClick={(e) => e.stopPropagation()}>
                        <Checkbox checked={selectedRowId === 'row-3'} onChange={() => setSelectedRowId('row-3')} />
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-[6px] bg-[#1c1f26] border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                            DV
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white">Dmitri Volkov, P.Eng.</span>
                            <div className="text-[11px] text-slate-400">Edmonton, AB</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-slate-600 dark:text-zinc-400">
                        Senior Structural Engineer • Worley (14 yrs)
                      </td>
                      <td className="py-3 px-5 font-mono text-xs text-slate-800 dark:text-zinc-300">
                        REQ-104: Structural
                      </td>
                      <td className="py-3 px-5 font-mono font-semibold text-slate-900 dark:text-zinc-100">
                        92% Fit
                      </td>
                      <td className="py-3 px-5">
                        <Badge variant="neutral" size="sm">Technical Panel</Badge>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <Button size="xs" variant="glass">Inspect →</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>

            {/* Specimen 3: Navigation & Control Cluster */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-semibold text-slate-800 dark:text-zinc-200">
                  Specimen 3 — Precision Control Cluster
                </span>
                <span className="text-[11px] font-mono text-slate-400">Machined Buttons • Segmented Capsule</span>
              </div>

              <Card chamfer className="p-5 flex flex-wrap items-center justify-between gap-5">
                {/* Search with Key Pill */}
                <div className="relative w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" strokeWidth={2} />
                  <Input
                    className="pl-9 pr-12 h-8.5 text-xs"
                    placeholder="Search candidate index..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                  />
                  <kbd className="absolute right-2 top-1.5 px-1.5 py-0.5 rounded bg-black/[0.05] dark:bg-white/[0.08] text-[10px] font-mono text-slate-400">
                    ⌘K
                  </kbd>
                </div>

                {/* View Switcher */}
                <SegmentedControl
                  options={[
                    { label: 'Pipeline Kanban', value: 'kanban', icon: <Compass className="w-3.5 h-3.5" strokeWidth={2} /> },
                    { label: 'Records Directory', value: 'directory', icon: <Users className="w-3.5 h-3.5" strokeWidth={2} /> },
                    { label: 'Knowledge Graph', value: 'graph', icon: <Network className="w-3.5 h-3.5" strokeWidth={2} /> }
                  ]}
                  value="directory"
                  onChange={() => {}}
                  size="sm"
                />

                {/* Physical Action Buttons */}
                <div className="flex items-center gap-2.5">
                  <Button size="sm" variant="glass" className="gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-300" strokeWidth={2} />
                    <span>Export Analytics</span>
                  </Button>
                  <Button size="sm" variant="machined" className="gap-1.5">
                    <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>New Candidate</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 1: ICONOGRAPHY & STROKE LIBRARY */}
        {/* ========================================================================= */}
        {activeSection === 'icons' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                Iconography & White/Silver Stroke Matrix
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Precision Lucide icons using a crisp 1.75px / 2.0px stroke profile on smoked glass backdrops.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Shield Check', icon: ShieldCheck, desc: 'Verified Fact' },
                { name: 'Network Graph', icon: Network, desc: 'Linkage' },
                { name: 'Sparkles', icon: Sparkles, desc: 'AI Extraction' },
                { name: 'Compass', icon: Compass, desc: 'Navigation' },
                { name: 'Cpu Processor', icon: Cpu, desc: 'Local Engine' },
                { name: 'User Check', icon: UserCheck, desc: 'Candidate' },
                { name: 'Scale Balance', icon: Scale, desc: 'Compare' },
                { name: 'Terminal', icon: Terminal, desc: 'System' },
                { name: 'Award Badge', icon: Award, desc: 'Certification' },
                { name: 'Briefcase', icon: Briefcase, desc: 'Requisition' },
                { name: 'Folder Lock', icon: FolderLock, desc: 'Encrypted' },
                { name: 'Sliders', icon: SlidersHorizontal, desc: 'Filter Control' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.name} chamfer hover className="p-5 flex flex-col items-center justify-center text-center space-y-2.5">
                    <div className="w-10 h-10 rounded-[8px] bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] flex items-center justify-center text-slate-800 dark:text-white shadow-xs">
                      <Icon className="w-5 h-5" strokeWidth={1.85} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900 dark:text-zinc-100">{item.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: MATERIALS & TAPERED BEVEL STUDY */}
        {/* ========================================================================= */}
        {activeSection === 'materials' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="space-y-1">
              <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                Material System & Physical Chamfers
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Surface elevation, internal gradient diffusion, and precision edge reflections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card chamfer className="p-7 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-800 dark:text-zinc-200">Smoked Glass Panel</span>
                  <Badge variant="neutral">Neutral Glint</Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                  Asymmetric top-left highlight that narrows and fades smoothly across the perimeter.
                </p>
                <div className="p-3 rounded-[6px] bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] text-[11px] text-slate-600 dark:text-zinc-400 font-mono">
                  background: rgba(18, 20, 25, 0.65)
                </div>
              </Card>

              <Card chamfer glint="champagne" className="p-7 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-800 dark:text-zinc-200">Champagne Tapered Bevel</span>
                  <Badge variant="champagne">Selected State</Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                  Metallic warm champagne accent on the highest point of the chamfered edge.
                </p>
                <div className="p-3 rounded-[6px] bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] text-[11px] text-slate-600 dark:text-zinc-400 font-mono">
                  accent: #D4C5A9 / #9E8557
                </div>
              </Card>

              <Card chamfer hover className="p-7 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-800 dark:text-zinc-200">Interactive Glass Surface</span>
                  <span className="text-[10px] text-slate-400">Hover State →</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                  Subtle depth elevation and increased border clarity upon cursor hover interaction.
                </p>
                <div className="p-3 rounded-[6px] bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] text-[11px] text-slate-600 dark:text-zinc-400 font-mono">
                  transition: all 0.15s ease
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: TYPOGRAPHY */}
        {/* ========================================================================= */}
        {activeSection === 'typography' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="space-y-1">
              <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                Typography Scale & Editorial Hierarchy
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                High-contrast grotesk typography with tight tracking and confident weight distribution.
              </p>
            </div>

            <Card chamfer className="p-7 divide-y divide-black/[0.05] dark:divide-white/[0.05]">
              <div className="py-3.5 flex items-baseline justify-between">
                <div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Display Header (20px / Bold)
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Candidate names, page titles, and hero metrics</div>
                </div>
                <span className="font-mono text-[11px] text-slate-400">20px / -0.02em</span>
              </div>

              <div className="py-3.5 flex items-baseline justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Section Subheader (14px / SemiBold)
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Requisitions, competency groupings, scorecards</div>
                </div>
                <span className="font-mono text-[11px] text-slate-400">14px / -0.01em</span>
              </div>

              <div className="py-3.5 flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                    Body Standard (12px / Regular): Evidence quotations, parsed resume summaries, and notes.
                  </div>
                </div>
                <span className="font-mono text-[11px] text-slate-400">12px / 1.5</span>
              </div>

              <div className="py-3.5 flex items-baseline justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] bg-black/[0.05] dark:bg-white/[0.06] px-2 py-0.5 rounded text-slate-700 dark:text-zinc-300">
                    REQ-101-FLUOR
                  </span>
                  <span className="text-xs text-slate-400">Technical Code & ID Monospace</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">11px mono</span>
              </div>
            </Card>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: MACHINED BUTTONS */}
        {/* ========================================================================= */}
        {activeSection === 'buttons' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="space-y-1">
              <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                Machined Tactile Buttons
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Precision hardware-inspired controls with subtle top edge stroke and click compression.
              </p>
            </div>

            <Card chamfer className="p-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3.5">
                <Button variant="machined" size="sm">Machined Dark</Button>
                <Button variant="glass" size="sm">Milled Glass</Button>
                <Button variant="champagne" size="sm">Champagne Action</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
                <Button variant="destructive" size="sm">Deactivate</Button>
              </div>

              <div className="pt-5 border-t border-black/[0.04] dark:border-white/[0.05] flex flex-wrap items-center gap-3.5">
                <Button size="xs" variant="machined">Size XS (26px)</Button>
                <Button size="sm" variant="machined">Size SM (30px)</Button>
                <Button size="md" variant="machined">Size MD (34px)</Button>
                <Button size="lg" variant="machined">Size LG (38px)</Button>
                <Button size="sm" variant="machined" loading>Calibrating</Button>
              </div>
            </Card>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 5: INPUTS & CONTROLS */}
        {/* ========================================================================= */}
        {activeSection === 'controls' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="space-y-1">
              <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                Hairline Form Controls & Selectors
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Compact, hairline-bordered inputs designed for high-throughput desktop recruiting data entry.
              </p>
            </div>

            <Card chamfer className="p-7 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Candidate Name
                  </label>
                  <Input defaultValue="Melissa Chen, P.Eng." />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Target Requisition
                  </label>
                  <select className="flex h-7.5 w-full rounded-[6px] border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0d10]/90 px-2.5 py-1 text-xs text-slate-900 dark:text-zinc-100 focus:outline-none">
                    <option>REQ-101: Senior Piping Designer</option>
                    <option>REQ-102: Lead Mechanical HVAC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Quick Search Filter
                  </label>
                  <Input placeholder="Filter by skills, employer..." />
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.05] flex items-center gap-8">
                <div className="flex items-center gap-2.5">
                  <Switch checked={switchState} onCheckedChange={setSwitchState} />
                  <span className="text-xs text-slate-700 dark:text-zinc-300 font-medium">Automatic Snapshot Protection</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox checked={checkboxState} onChange={(e) => setCheckboxState(e.target.checked)} />
                  <span className="text-xs text-slate-700 dark:text-zinc-300 font-medium">APEGA Registered License</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 6: DUAL-THEME COMPARISON PROOF */}
        {/* ========================================================================= */}
        {activeSection === 'comparison' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="space-y-1">
              <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                Dual-Theme Coherence Proof
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Evaluating the candidate specimen under Smoked Obsidian and Warm Pearl foundations side-by-side.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Obsidian Dark Container */}
              <div className="dark bg-[#090A0C] text-[#EDEDF0] p-7 rounded-[14px] border border-white/[0.08] space-y-5 shadow-2xl">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-white/[0.06]">
                  <span className="font-bold text-white flex items-center gap-2">
                    <Moon className="w-4 h-4 text-[#d4c5a9]" strokeWidth={2} />
                    <span>Smoked Obsidian Foundation (Dark)</span>
                  </span>
                  <Badge variant="champagne" size="sm">98% Fit Score</Badge>
                </div>

                <div className="specimen-glass specimen-chamfer specimen-chamfer-champagne p-6 rounded-[10px] space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-[8px] bg-[#1a1c22] border border-white/10 flex items-center justify-center font-bold text-sm text-white shadow-xs">
                      TA
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">Tariq Al-Mansoor, CET</div>
                      <div className="text-xs text-zinc-400">Senior Piping Designer • Fluor Canada</div>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 italic bg-white/[0.03] p-3 rounded-[6px] border border-white/[0.06] leading-relaxed">
                    "Lead designer on ConocoPhillips Surmont SAGD brownfield optimization project. Modeled 40+ tie-ins and clash resolution."
                  </p>
                </div>
              </div>

              {/* Warm Pearl Light Container */}
              <div className="bg-[#F5F4EF] text-[#15171B] p-7 rounded-[14px] border border-black/[0.08] space-y-5 shadow-2xl">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-black/[0.06]">
                  <span className="font-bold text-slate-900 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-[#9e8557]" strokeWidth={2} />
                    <span>Warm Pearl Foundation (Light)</span>
                  </span>
                  <Badge variant="champagne" size="sm">98% Fit Score</Badge>
                </div>

                <div className="specimen-glass specimen-chamfer specimen-chamfer-champagne p-6 rounded-[10px] space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-[8px] bg-white border border-black/10 flex items-center justify-center font-bold text-sm text-slate-800 shadow-xs">
                      TA
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">Tariq Al-Mansoor, CET</div>
                      <div className="text-xs text-slate-500">Senior Piping Designer • Fluor Canada</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 italic bg-black/[0.025] p-3 rounded-[6px] border border-black/[0.06] leading-relaxed">
                    "Lead designer on ConocoPhillips Surmont SAGD brownfield optimization project. Modeled 40+ tie-ins and clash resolution."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
