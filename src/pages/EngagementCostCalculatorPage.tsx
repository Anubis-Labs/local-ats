import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Calculator,
  Percent,
  Download,
  Building,
  Briefcase,
  Plane,
  Home,
  CheckCircle2,
  Sparkles,
  ArrowRightLeft,
  Scale
} from 'lucide-react';
import { Badge, Button, Input, Card, cn } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { sound } from '../utils/sound';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const EngagementCostCalculatorPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Employee inputs
  const [empBaseSalary, setEmpBaseSalary] = useState<number>(140000);
  const [empBonusPct, setEmpBonusPct] = useState<number>(10);
  const [empBenefitsBurdenPct, setEmpBenefitsBurdenPct] = useState<number>(22); // CPP, EI, WCB, Health
  const [empLoaPerDay, setEmpLoaPerDay] = useState<number>(0); // Camp provided

  // Contractor inputs
  const [contractorHourlyRate, setContractorHourlyRate] = useState<number>(105);
  const [contractorAgencyMarkupPct, setContractorAgencyMarkupPct] = useState<number>(18);
  const [contractorLoaPerDay, setContractorLoaPerDay] = useState<number>(150); // Direct LOA

  // Common project assumptions
  const [productiveHoursPerYear, setProductiveHoursPerYear] = useState<number>(1840);
  const [siteDaysPerYear, setSiteDaysPerYear] = useState<number>(180);
  const [flightsPerYear, setFlightsPerYear] = useState<number>(26); // 14/14 FIFO
  const [flightCost, setFlightCost] = useState<number>(450);

  // Calculations
  const empBonusAmount = empBaseSalary * (empBonusPct / 100);
  const empBurdenAmount = empBaseSalary * (empBenefitsBurdenPct / 100);
  const empTravelFlights = flightsPerYear * flightCost;
  const empTotalCost = empBaseSalary + empBonusAmount + empBurdenAmount + empTravelFlights;
  const empCostPerHour = empTotalCost / productiveHoursPerYear;

  const contractorBillRate = contractorHourlyRate * (1 + contractorAgencyMarkupPct / 100);
  const contractorBaseWages = contractorBillRate * productiveHoursPerYear;
  const contractorLoaTotal = siteDaysPerYear * contractorLoaPerDay;
  const contractorTravelFlights = flightsPerYear * flightCost;
  const contractorTotalCost = contractorBaseWages + contractorLoaTotal + contractorTravelFlights;
  const contractorCostPerHour = contractorTotalCost / productiveHoursPerYear;

  const costDifference = contractorTotalCost - empTotalCost;

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. CALCULATOR HEADER */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="analytics-harmonics" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <Scale className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Financial Workforce Modeling</span>
                <span className="opacity-30">•</span>
                <span>Total Engagement Cost Calculator</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Employee vs Contractor Total Cost of Workforce
              </h1>
            </div>
          </div>

          <Button
            size="xs"
            variant="champagne"
            onClick={() => {
              sound.chime();
              toast('Analysis Exported', 'Saved workforce cost comparison report (PDF).', 'success');
            }}
            className="gap-1.5 font-semibold text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Cost Model</span>
          </Button>
        </div>
      </header>

      {/* 2. MAIN CALCULATOR CANVAS */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Comparison Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Permanent Employee</span>
              <Badge variant="champagne" size="sm">FTE Core Staff</Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
              ${empTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-slate-500 tabular-nums">
              Effective: <strong className="text-slate-900 dark:text-white">${empCostPerHour.toFixed(2)} / productive hr</strong>
            </div>
          </div>

          <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Agency Contractor</span>
              <Badge variant="indigo" size="sm">Contingent EPCM</Badge>
            </div>
            <div className="text-3xl font-bold text-[#8A6D3B] dark:text-[#d4c5a9] tabular-nums">
              ${contractorTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-slate-500 tabular-nums">
              Effective: <strong className="text-[#8A6D3B] dark:text-[#d4c5a9]">${contractorCostPerHour.toFixed(2)} / productive hr</strong>
            </div>
          </div>

          <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Variance Analysis</span>
              <Badge variant={costDifference > 0 ? 'warning' : 'success'} size="sm">
                {costDifference > 0 ? 'CONTRACTOR PREMIUM' : 'EMPLOYEE PREMIUM'}
              </Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
              ${Math.abs(costDifference).toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr
            </div>
            <div className="text-xs text-slate-500">
              Contractor model carries a <strong>{((costDifference / empTotalCost) * 100).toFixed(1)}%</strong> cost premium for project elasticity.
            </div>
          </div>
        </div>

        {/* Input Parameters Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee Inputs */}
          <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
              Permanent Employee Assumptions
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Annual Base Salary ($ CAD)</label>
                <Input
                  type="number"
                  value={empBaseSalary}
                  onChange={(e) => setEmpBaseSalary(Number(e.target.value))}
                  className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 tabular-nums"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Target Bonus (%)</label>
                  <Input
                    type="number"
                    value={empBonusPct}
                    onChange={(e) => setEmpBonusPct(Number(e.target.value))}
                    className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Benefits & Tax Burden (%)</label>
                  <Input
                    type="number"
                    value={empBenefitsBurdenPct}
                    onChange={(e) => setEmpBenefitsBurdenPct(Number(e.target.value))}
                    className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 tabular-nums"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contractor Inputs */}
          <div className="p-6 rounded-[12px] bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/10 shadow-sm specimen-chamfer space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
              Contingent Contractor Assumptions
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Candidate Hourly Rate ($ CAD / hr)</label>
                <Input
                  type="number"
                  value={contractorHourlyRate}
                  onChange={(e) => setContractorHourlyRate(Number(e.target.value))}
                  className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 tabular-nums"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Agency VMS Markup (%)</label>
                  <Input
                    type="number"
                    value={contractorAgencyMarkupPct}
                    onChange={(e) => setContractorAgencyMarkupPct(Number(e.target.value))}
                    className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-semibold">Daily LOA Allowance ($ / day)</label>
                  <Input
                    type="number"
                    value={contractorLoaPerDay}
                    onChange={(e) => setContractorLoaPerDay(Number(e.target.value))}
                    className="bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 tabular-nums"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
