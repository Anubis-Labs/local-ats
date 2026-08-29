export interface TemplateItem {
  id: string;
  category: 'email' | 'scorecard' | 'rejection' | 'offer' | 'screening' | 'job_description';
  title: string;
  subject?: string;
  description: string;
  content: string;
  variables: string[];
  lastModified: string;
}

export const mockTemplates: TemplateItem[] = [
  {
    id: 'tpl-email-1',
    category: 'email',
    title: 'Technical Interview Invitation',
    subject: 'Interview with {{company_name}} for {{job_title}}',
    description: 'Standard invitation sent to candidates advancing to technical assessment round.',
    content: `Hi {{candidate_first_name}},

Thank you for speaking with our team earlier this week. We were very impressed with your background in {{primary_skill}} and would love to invite you to our next technical interview stage.

Interview Details:
• Role: {{job_title}}
• Duration: {{duration}}
• Interviewer: {{interviewer_name}} ({{interviewer_role}})
• Format: Microsoft Teams / Video Call

Please select a time that suits you best using this link or reply directly with your availability for next Tuesday or Wednesday.

Best regards,
{{recruiter_name}}
{{company_name}} Talent Acquisition`,
    variables: ['candidate_first_name', 'company_name', 'job_title', 'primary_skill', 'duration', 'interviewer_name', 'interviewer_role', 'recruiter_name'],
    lastModified: '2026-08-10'
  },
  {
    id: 'tpl-rej-1',
    category: 'rejection',
    title: 'Post-Interview Polite Rejection',
    subject: 'Update on your application for {{job_title}} at {{company_name}}',
    description: 'Empathetic feedback communication after an interview.',
    content: `Dear {{candidate_first_name}},

Thank you for taking the time to meet with {{interviewer_name}} and our engineering leadership team to discuss the {{job_title}} position.

While our team was genuinely impressed by your experience with {{candidate_experience_highlight}}, we have decided to move forward with another candidate whose background more closely matches our immediate requirements for {{specific_requirement}}.

We will keep your resume in our talent pool for future opportunities that align with your skill set.

Thank you again for your interest in {{company_name}}, and we wish you continued success.

Sincerely,
{{recruiter_name}}`,
    variables: ['candidate_first_name', 'company_name', 'job_title', 'interviewer_name', 'candidate_experience_highlight', 'specific_requirement', 'recruiter_name'],
    lastModified: '2026-07-15'
  },
  {
    id: 'tpl-offer-1',
    category: 'offer',
    title: 'Formal Offer Letter Template (Salaried)',
    subject: 'Offer of Employment: {{job_title}} - {{company_name}}',
    description: 'Standard EPCM engineering professional offer letter with benefits schedule.',
    content: `CONFIDENTIAL OFFER OF EMPLOYMENT

Date: {{offer_date}}
Candidate: {{candidate_full_name}}

Dear {{candidate_first_name}},

On behalf of {{company_name}}, I am delighted to offer you the position of {{job_title}} reporting to {{hiring_manager_name}}.

Key Terms of Offer:
• Position: {{job_title}} ({{employment_type}})
• Base Salary: {{base_salary}} CAD per annum, payable bi-weekly
• Annual Incentive: Eligible for company annual performance bonus (target {{bonus_percentage}}%)
• Start Date: {{start_date}}
• Location: {{office_location}}
• Vacation: 4 weeks paid annual vacation
• Benefits: Comprehensive dental, extended health, and RRSP matching up to 5%

Please review the attached formal agreement and sign via our offline sign package before {{offer_expiry_date}}.

Sincerely,
{{managing_director}}
{{company_name}}`,
    variables: ['offer_date', 'candidate_full_name', 'candidate_first_name', 'company_name', 'job_title', 'hiring_manager_name', 'employment_type', 'base_salary', 'bonus_percentage', 'start_date', 'office_location', 'offer_expiry_date', 'managing_director'],
    lastModified: '2026-08-01'
  },
  {
    id: 'tpl-sc-1',
    category: 'scorecard',
    title: 'Engineering Technical Competency Scorecard',
    description: 'Structured scorecard for technical assessment of designers and engineers.',
    content: `Competencies:
1. Core CAD / 3D Modeling Proficiency (Weight 30%)
2. Alberta Codes, Standards & ASME/APEGA Compliance (Weight 25%)
3. Brownfield Tie-in & Laser Scan Execution (Weight 20%)
4. Multi-discipline Coordination & Problem Solving (Weight 15%)
5. Clear Communication & Safety Mentality (Weight 10%)`,
    variables: ['discipline', 'seniority_level'],
    lastModified: '2026-07-20'
  },
  {
    id: 'tpl-scr-1',
    category: 'screening',
    title: 'Standard Alberta Engineering Screening Questionnaire',
    description: 'Initial intake questions covering licensing, location, notice period, and CAD proficiency.',
    content: `Questions:
1. Are you legally authorized to work in Canada without sponsorship? (Yes/No)
2. Do you hold an active P.Eng. (APEGA) or CET (ASET) designation? (Multiple Choice)
3. How many years of experience do you have in AutoCAD Plant 3D or Revit MEP? (Number)
4. What is your required compensation and notice period? (Short Text)`,
    variables: ['province', 'minimum_experience'],
    lastModified: '2026-06-18'
  }
];
