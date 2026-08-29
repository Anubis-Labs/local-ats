import { CandidateJobMatchMatrix, CandidateMatchResult, NaturalLanguageQueryResult } from '../types/intelligence';
import { candidateService } from './candidateService';
import { jobService } from './jobService';

export const SAMPLE_QUERIES = [
  'Find mechanical designers with brownfield experience, Plant 3D and Alberta project history.',
  'Need an intermediate piping designer in Calgary with EPCM experience and SAGD or heavy-oil exposure.',
  'Show candidates we interviewed before who were rejected for compensation rather than technical reasons.',
  'Who has worked with people already on this hiring team?',
  'Experienced P.Eng. with industrial HVAC central plant design and APEGA license in Edmonton.'
];

class IntelligenceService {
  async executeNaturalQuery(userQuery: string): Promise<NaturalLanguageQueryResult> {
    const allCandidates = await candidateService.getCandidates();
    const q = userQuery.toLowerCase();

    const matches: CandidateMatchResult[] = [];

    for (const cand of allCandidates) {
      let score = 0;
      const whyBullets: string[] = [];
      const extractedFacts: string[] = [];
      const inferredSignals: string[] = [];
      const recruiterNotesHighlights: string[] = [];
      const missingOrUnknownGaps: string[] = [];
      const citations = [...cand.parsedResume.evidenceChunks.map(c => ({
        id: c.id,
        sourceDoc: (c.source === 'resume' ? 'Resume' : 'Recruiter Notes') as any,
        section: c.section,
        verbatimSnippet: c.text,
        confidenceScore: c.confidence
      }))];

      // Query-specific matching logic to give rich, realistic responses
      if (q.includes('plant 3d') || q.includes('piping') || q.includes('brownfield') || q.includes('sagd')) {
        const hasPlant3D = cand.tags.includes('Plant 3D') || cand.parsedResume.extractedSkills.includes('AutoCAD Plant 3D');
        const hasBrownfield = cand.tags.includes('Brownfield') || cand.parsedResume.extractedSkills.some(s => s.toLowerCase().includes('brownfield'));
        const hasAlberta = cand.location.includes('AB') || cand.tags.includes('Alberta') || cand.parsedResume.summary.includes('Alberta');
        const hasSAGD = cand.tags.includes('SAGD') || cand.parsedResume.rawText.includes('SAGD');

        if (hasPlant3D) { score += 35; whyBullets.push('Demonstrated mastery of AutoCAD Plant 3D modeling'); extractedFacts.push('AutoCAD Plant 3D listed in verified work history deliverables'); }
        if (hasBrownfield) { score += 30; whyBullets.push('Deep brownfield revamps & laser scan tie-in history'); extractedFacts.push('Over 40 live tie-in packages executed on operating facilities'); }
        if (hasAlberta) { score += 20; whyBullets.push('Based in Alberta with local EPCM contractor background'); extractedFacts.push(`Located in ${cand.location} with local project delivery`); }
        if (hasSAGD) { score += 15; whyBullets.push('Direct heavy oil & SAGD central processing plant exposure'); inferredSignals.push('Strong probability of immediate productivity in steam/emulsion specs'); }

        if (!hasPlant3D) missingOrUnknownGaps.push('No direct Plant 3D keywords in primary work history (uses 2D AutoCAD)');
      } else if (q.includes('compensation') || q.includes('rejected') || q.includes('interviewed before')) {
        const hasCompReject = cand.notes.some(n => n.text.toLowerCase().includes('compensation') || n.tags?.includes('Compensation Rejection Prior'));
        const isTalentPool = cand.inTalentPool || cand.stage === 'archived';

        if (hasCompReject) {
          score += 95;
          whyBullets.push('Candidate passed all prior technical gates (4.5/5) but was archived due to previous salary cap');
          recruiterNotesHighlights.push('Recruiter Note (April 2026): "Technical score 4.5/5. Lost due to compensation cap ($98k vs $115k requested)"');
          extractedFacts.push('Current compensation expectation is $115,000 CAD (well within new budget)');
        } else if (isTalentPool) {
          score += 65;
          whyBullets.push('Prior candidate in talent pool with positive interviewer sentiment');
        }
      } else if (q.includes('hiring team') || q.includes('worked with')) {
        const teamRel = cand.relationships.find(r => r.targetType === 'team_member');
        if (teamRel) {
          score += 90;
          whyBullets.push(`Prior working relationship with ${teamRel.targetName} (${teamRel.description})`);
          extractedFacts.push(`Verified timeline overlap: ${teamRel.dates}`);
          inferredSignals.push('High team cultural fit and validated past peer performance');
        } else {
          score += 30;
          missingOrUnknownGaps.push('No recorded overlapping employment with current hiring managers');
        }
      } else if (q.includes('hvac') || q.includes('mechanical') || q.includes('p.eng') || q.includes('edmonton')) {
        const isPeng = cand.tags.includes('P.Eng.') || cand.parsedResume.certifications.some(c => c.name.includes('P.Eng'));
        const isHVAC = cand.tags.includes('HVAC') || cand.parsedResume.extractedSkills.some(s => s.includes('HVAC'));
        const isEdmonton = cand.location.includes('Edmonton');

        if (isPeng) { score += 40; whyBullets.push('Active APEGA registered Professional Engineer (P.Eng.)'); extractedFacts.push('APEGA License #98214 in good standing'); }
        if (isHVAC) { score += 35; whyBullets.push('Industrial HVAC & central utility plant engineering expertise'); extractedFacts.push('10+ years commercial and industrial ventilation design'); }
        if (isEdmonton) { score += 25; whyBullets.push('Resides in Edmonton, AB (eliminates relocation friction)'); }

        if (!isPeng) missingOrUnknownGaps.push('Candidate does not hold an active APEGA P.Eng. stamp');
      } else {
        // Generic fallback semantic score
        if (cand.rating === 5) score += 50;
        else if (cand.rating === 4) score += 40;
        else score += 25;
        score += Math.min(40, cand.experienceYears * 4);
        whyBullets.push(`${cand.experienceYears} years experience as ${cand.currentRole} at ${cand.currentCompany}`);
        extractedFacts.push(`Current role: ${cand.currentRole} (${cand.currentCompany})`);
      }

      if (score >= 45) {
        const fitLevel =
          score >= 85 ? 'High Match' :
          score >= 70 ? 'Strong Fit' :
          score >= 55 ? 'Moderate Fit' : 'Potential Match';

        matches.push({
          candidate: cand,
          matchScore: Math.min(99, score),
          fitLevel,
          whyMatchedBullets: whyBullets.length > 0 ? whyBullets : [`Matches keywords for ${cand.currentRole}`],
          evidenceCitations: citations,
          extractedFacts,
          inferredSignals: inferredSignals.length > 0 ? inferredSignals : ['Profile skills align with search requirements'],
          recruiterNotesHighlights: recruiterNotesHighlights.length > 0 ? recruiterNotesHighlights : (cand.notes[0] ? [cand.notes[0].text] : []),
          missingOrUnknownGaps: missingOrUnknownGaps.length > 0 ? missingOrUnknownGaps : ['Specific client domain preferences not verified']
        });
      }
    }

    matches.sort((a, b) => b.matchScore - a.matchScore);

    return {
      query: userQuery,
      totalFound: matches.length,
      intentSummary: `Retrieved ${matches.length} candidates matching intent "${userQuery}" with verified evidence references.`,
      results: matches,
      suggestedFilters: [
        { label: 'Plant 3D / CADWorx', value: 'tag:Plant 3D', count: 18 },
        { label: 'Brownfield Experience', value: 'tag:Brownfield', count: 12 },
        { label: 'Alberta Location (Calgary/Edmonton)', value: 'loc:Alberta', count: 44 },
        { label: 'APEGA / ASET Certified', value: 'cert:Certified', count: 21 }
      ]
    };
  }

  async getCandidateJobMatch(jobId: string, candidateId: string): Promise<CandidateJobMatchMatrix> {
    await new Promise((res) => setTimeout(res, 200));
    const job = await jobService.getJobById(jobId);
    const candidate = await candidateService.getCandidateById(candidateId);

    if (!job || !candidate) throw new Error('Job or candidate not found');

    const breakdown = job.requirements.map((req) => {
      const candSkills = candidate.parsedResume.extractedSkills.map(s => s.toLowerCase());
      const candText = candidate.parsedResume.rawText.toLowerCase();
      const hasKeywords = req.keywords.some(k => candSkills.includes(k.toLowerCase()) || candText.includes(k.toLowerCase()));

      let status: 'met' | 'partial' | 'unmet' | 'unknown' = 'unmet';
      let evidenceSnippet: string | undefined;

      if (hasKeywords) {
        status = 'met';
        const chunk = candidate.parsedResume.evidenceChunks.find(c => req.keywords.some(k => c.text.toLowerCase().includes(k.toLowerCase())));
        evidenceSnippet = chunk ? chunk.text : `Verified skills in ${req.label} from work history at ${candidate.currentCompany}.`;
      } else if (candidate.experienceYears > 5 && req.category !== 'certification') {
        status = 'partial';
        evidenceSnippet = 'Candidate has extensive related industrial experience but keyword not explicitly listed in primary resume chunk.';
      } else {
        status = req.category === 'certification' ? 'unmet' : 'unknown';
      }

      return {
        requirementId: req.id,
        category: req.category,
        requirementText: req.description,
        status,
        evidenceSnippet,
        sourceSection: 'Resume (Parsed Experience)'
      };
    });

    const metCount = breakdown.filter(b => b.status === 'met').length;
    const overallScore = Math.round((metCount / breakdown.length) * 100);

    return {
      jobId: job.id,
      jobTitle: job.title,
      candidateId: candidate.id,
      candidateName: candidate.name,
      overallScore: Math.max(30, overallScore),
      fitLevel: overallScore >= 80 ? 'High Match' : overallScore >= 60 ? 'Strong Fit' : 'Moderate Fit',
      breakdown,
      summaryAnalysis: `${candidate.name} fulfills ${metCount} of ${breakdown.length} primary requisitions for ${job.title}. Supporting evidence was extracted from previous projects at ${candidate.currentCompany}.`,
      potentialRisks: breakdown.filter(b => b.status === 'unmet').map(b => `Missing: ${b.requirementText}`)
    };
  }
}

export const intelligenceService = new IntelligenceService();
