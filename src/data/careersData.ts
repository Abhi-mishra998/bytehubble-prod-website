/**
 * Careers data — single source of truth for the /careers portal.
 *
 * Keep this file data-only. UI lives in src/app/careers/*.
 * Add or edit openings here and they flow through featured, search, and JSON-LD.
 */

// ────────────────────────────────────────────────────────────────
// Contact
// ────────────────────────────────────────────────────────────────

export const CAREERS_EMAILS = {
  primary: "careers@bytehubble.ai",
  secondary: "abhishek.mishra@bytehubble.ai",
} as const;

// ────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────

export type CategoryId = "engineering" | "data-ai" | "business";

export type EmploymentType = "Full-time" | "Contract" | "Internship";
export type WorkModel = "On-site" | "Hybrid" | "Remote";
export type ExperienceLevel = "Entry" | "Mid" | "Senior" | "Lead" | "Principal";

export interface HiringCategory {
  id: CategoryId;
  label: string;
  tagline: string;
  roles: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  category: CategoryId;
  location: string;
  employmentType: EmploymentType;
  workModel: WorkModel;
  experience: ExperienceLevel;
  experienceYears: string;
  featured?: boolean;
  urgentHire?: boolean;
  postedOn: string; // ISO date
  summary: string;
  responsibilities?: string[];
  requirements?: string[];
}

// ────────────────────────────────────────────────────────────────
// Hiring categories (spec §3)
// ────────────────────────────────────────────────────────────────

export const HIRING_CATEGORIES: HiringCategory[] = [
  {
    id: "engineering",
    label: "Technology & Engineering",
    tagline: "Build the platforms, databases, and services that power modern data infrastructure.",
    roles: [
      "Artificial Intelligence (AI)",
      "Machine Learning",
      "Data Science",
      "Data Engineering",
      "Analytics & Business Intelligence",
      "Cloud Engineering",
      "Platform Engineering",
      "DevOps",
      "Site Reliability Engineering (SRE)",
      "Backend Engineering",
      "Frontend Engineering",
      "Full Stack Engineering",
      "Mobile Development",
      "QA & Test Automation",
      "Cybersecurity",
      "Network Engineering",
      "System Administration",
      "Database Engineering",
      "Microsoft SQL DBA",
      "Oracle DBA",
      "PostgreSQL DBA",
      "MySQL DBA",
      "MongoDB DBA",
      "SAP",
      "Salesforce",
      "Microsoft Power Platform",
      "ERP & CRM",
      "Embedded Systems",
      "IoT",
      "Blockchain",
      "UI/UX Design",
      "Product Management",
      "Technical Support",
      "IT Operations",
    ],
  },
  {
    id: "data-ai",
    label: "Data & AI",
    tagline: "Ship applied AI systems, agentic platforms, and next-generation ML infrastructure.",
    roles: [
      "AI Research",
      "Generative AI",
      "LLM Engineering",
      "AI Platform Engineering",
      "AI Infrastructure",
      "Prompt Engineering",
      "MLOps",
      "Data Governance",
      "Data Architecture",
      "Computer Vision",
      "NLP",
      "Recommendation Systems",
    ],
  },
  {
    id: "business",
    label: "Business Functions",
    tagline: "Grow the company across sales, marketing, finance, operations, and leadership.",
    roles: [
      "Human Resources",
      "Talent Acquisition",
      "Recruitment",
      "Sales",
      "Enterprise Sales",
      "Pre-Sales",
      "Customer Success",
      "Business Development",
      "Partnerships",
      "Account Management",
      "Marketing",
      "Product Marketing",
      "Digital Marketing",
      "Content Marketing",
      "Finance",
      "Accounting",
      "Operations",
      "Procurement",
      "Supply Chain",
      "Legal",
      "Compliance",
      "PMO",
      "Business Analyst",
      "Project Manager",
      "Program Manager",
      "Executive Leadership",
    ],
  },
];

// ────────────────────────────────────────────────────────────────
// Featured & current openings
// ────────────────────────────────────────────────────────────────
// ponytail: seed list. Real openings should be added or removed here
// directly — no CMS needed until we have >~30 concurrent roles.

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "mssql-dba-blr",
    title: "Microsoft SQL DBA",
    department: "Database Engineering",
    category: "engineering",
    location: "Bangalore, India",
    employmentType: "Full-time",
    workModel: "Hybrid",
    experience: "Mid",
    experienceYears: "4–7 years",
    featured: true,
    urgentHire: true,
    postedOn: "2026-07-20",
    summary:
      "Own the reliability, performance, and security of mission-critical SQL Server estates for enterprise customers. Immediate joiners preferred.",
    responsibilities: [
      "Administer, tune, and troubleshoot SQL Server 2016+ across on-prem and Azure",
      "Own Always On availability groups, backup strategy, and DR drills",
      "Lead incident response and post-mortem culture for database systems",
    ],
    requirements: [
      "4+ years hands-on SQL Server DBA experience in production",
      "Deep understanding of query plans, indexing, and lock/wait analysis",
      "Experience with Azure SQL, PowerShell/T-SQL automation, and monitoring stacks",
    ],
  },
  {
    id: "pg-dba-hyd",
    title: "PostgreSQL DBA — Senior",
    department: "Database Engineering",
    category: "engineering",
    location: "Hyderabad, India",
    employmentType: "Full-time",
    workModel: "Hybrid",
    experience: "Senior",
    experienceYears: "6–10 years",
    featured: true,
    postedOn: "2026-07-18",
    summary:
      "Design, scale, and safeguard the PostgreSQL platforms that anchor our customers' AI and analytics workloads.",
    responsibilities: [
      "Architect HA, replication, and multi-region PostgreSQL deployments",
      "Tune performance across query, index, autovacuum, and connection layers",
      "Partner with platform teams on migrations from Oracle, MSSQL, and MySQL",
    ],
    requirements: [
      "Strong PostgreSQL internals knowledge (MVCC, WAL, pg_stat_*)",
      "Production experience with pgBouncer, Patroni/Stolon, or Aurora/RDS",
      "Comfort with Linux, Terraform, and observability tooling",
    ],
  },
  {
    id: "llm-engineer",
    title: "LLM & Agentic Systems Engineer",
    department: "Generative AI",
    category: "data-ai",
    location: "Remote — India / Global",
    employmentType: "Full-time",
    workModel: "Remote",
    experience: "Senior",
    experienceYears: "4–8 years",
    featured: true,
    postedOn: "2026-07-15",
    summary:
      "Build the runbook, incident, and query intelligence agents at the core of the ByteHubble platform.",
    responsibilities: [
      "Design retrieval, tool-use, and evaluation pipelines for production LLM agents",
      "Prototype rapidly, then harden the best patterns into the product",
      "Own model selection, prompt architecture, cost and latency budgets",
    ],
    requirements: [
      "Shipped LLM-powered features to real users at meaningful scale",
      "Fluent with Python, TypeScript, vector stores, and agent frameworks",
      "Product intuition — you know when to build vs. buy vs. delete",
    ],
  },
  {
    id: "sre-lead",
    title: "Site Reliability Engineering Lead",
    department: "Platform Engineering",
    category: "engineering",
    location: "Hyderabad / Remote",
    employmentType: "Full-time",
    workModel: "Hybrid",
    experience: "Lead",
    experienceYears: "8+ years",
    featured: true,
    postedOn: "2026-07-10",
    summary:
      "Lead the SRE practice — SLOs, incident response, chaos engineering, and platform reliability across the ByteHubble stack.",
    responsibilities: [
      "Define reliability strategy, error budgets, and platform SLOs",
      "Mentor a small SRE team, on-call rotation, and DR readiness",
      "Drive automation across Kubernetes, Terraform, and CI/CD pipelines",
    ],
    requirements: [
      "Deep SRE experience in cloud-native, high-traffic environments",
      "Strong Kubernetes, observability, and post-incident review track record",
      "Excellent judgment on where to invest engineering effort",
    ],
  },
  {
    id: "fullstack-nextjs",
    title: "Full-Stack Engineer (Next.js + Python)",
    department: "Product Engineering",
    category: "engineering",
    location: "Hyderabad / Remote",
    employmentType: "Full-time",
    workModel: "Remote",
    experience: "Mid",
    experienceYears: "3–6 years",
    postedOn: "2026-07-05",
    summary:
      "Ship customer-facing features across the ByteHubble platform — from admin dashboards to agent interfaces.",
    responsibilities: [
      "Own features end-to-end in Next.js, TypeScript, and Python backends",
      "Care about performance, accessibility, and design polish",
      "Collaborate closely with design, ML, and infra engineers",
    ],
    requirements: [
      "3+ years shipping production TypeScript / React and a backend language",
      "Strong opinions about maintainability, testing, and simplicity",
      "Comfort working in small, fast-moving teams",
    ],
  },
  {
    id: "mlops-eng",
    title: "MLOps Engineer",
    department: "AI Infrastructure",
    category: "data-ai",
    location: "Remote — India",
    employmentType: "Full-time",
    workModel: "Remote",
    experience: "Mid",
    experienceYears: "3–6 years",
    postedOn: "2026-07-02",
    summary:
      "Own the training, evaluation, deployment, and monitoring pipelines for ByteHubble's model portfolio.",
    responsibilities: [
      "Build reproducible pipelines for fine-tuning, evaluation, and rollout",
      "Manage GPU/inference infra with a cost-conscious mindset",
      "Instrument drift, quality, and latency monitoring",
    ],
    requirements: [
      "Hands-on experience with modern ML infra (Ray, vLLM, Kubernetes, or similar)",
      "Fluent in Python and infra-as-code",
      "Bias to reproducibility and clean interfaces",
    ],
  },
  {
    id: "devops-eng",
    title: "DevOps Engineer",
    department: "Platform Engineering",
    category: "engineering",
    location: "Hyderabad, India",
    employmentType: "Full-time",
    workModel: "Hybrid",
    experience: "Mid",
    experienceYears: "3–6 years",
    postedOn: "2026-06-28",
    summary:
      "Automate the pipelines, environments, and release paths that let the team ship confidently every day.",
    requirements: [
      "Strong experience with Kubernetes, Terraform, and one major cloud (AWS/Azure/GCP)",
      "Comfort with CI/CD systems (GitHub Actions, ArgoCD, or similar)",
      "Security-first mindset for secrets, IAM, and audit trails",
    ],
  },
  {
    id: "cybersecurity-eng",
    title: "Cybersecurity Engineer",
    department: "Security & Compliance",
    category: "engineering",
    location: "Hyderabad / Remote",
    employmentType: "Full-time",
    workModel: "Hybrid",
    experience: "Senior",
    experienceYears: "5–8 years",
    postedOn: "2026-06-25",
    summary:
      "Own application, cloud, and data security across the ByteHubble platform and customer engagements.",
  },
  {
    id: "enterprise-sales",
    title: "Enterprise Account Executive",
    department: "Sales",
    category: "business",
    location: "Sterling, VA (USA)",
    employmentType: "Full-time",
    workModel: "Hybrid",
    experience: "Senior",
    experienceYears: "7+ years",
    featured: true,
    postedOn: "2026-07-12",
    summary:
      "Close strategic enterprise deals for the ByteHubble platform across North America.",
    responsibilities: [
      "Own the full sales cycle from qualification to close for 6–7 figure ACVs",
      "Partner with pre-sales, product, and CS to land and expand accounts",
      "Bring existing enterprise data / infrastructure relationships",
    ],
  },
  {
    id: "product-marketing",
    title: "Product Marketing Manager",
    department: "Marketing",
    category: "business",
    location: "Remote — India / USA",
    employmentType: "Full-time",
    workModel: "Remote",
    experience: "Senior",
    experienceYears: "5–8 years",
    postedOn: "2026-06-30",
    summary:
      "Position ByteHubble's AI + database platform for CTOs, platform teams, and enterprise buyers.",
  },
  {
    id: "talent-partner",
    title: "Talent Acquisition Partner",
    department: "People",
    category: "business",
    location: "Hyderabad, India",
    employmentType: "Full-time",
    workModel: "On-site",
    experience: "Mid",
    experienceYears: "3–6 years",
    postedOn: "2026-06-20",
    summary:
      "Own hiring for our engineering and AI teams end-to-end — sourcing, structured interviews, and candidate experience.",
  },
  {
    id: "ai-research-intern",
    title: "AI Research Intern",
    department: "AI Research",
    category: "data-ai",
    location: "Remote — India",
    employmentType: "Internship",
    workModel: "Remote",
    experience: "Entry",
    experienceYears: "0–1 years",
    postedOn: "2026-07-01",
    summary:
      "Six-month research internship on retrieval, agents, and evaluation. Open to final-year students and fresh graduates.",
  },
];

// ────────────────────────────────────────────────────────────────
// Facets derived from JOB_OPENINGS (single source of truth)
// ────────────────────────────────────────────────────────────────

const uniq = <T,>(xs: T[]) => Array.from(new Set(xs));

export const JOB_FACETS = {
  departments: uniq(JOB_OPENINGS.map((j) => j.department)).sort(),
  locations: uniq(JOB_OPENINGS.map((j) => j.location)).sort(),
  workModels: ["On-site", "Hybrid", "Remote"] as WorkModel[],
  employmentTypes: ["Full-time", "Contract", "Internship"] as EmploymentType[],
  experience: ["Entry", "Mid", "Senior", "Lead", "Principal"] as ExperienceLevel[],
};

// ────────────────────────────────────────────────────────────────
// Why ByteHubble (spec §2)
// ────────────────────────────────────────────────────────────────

export const WHY_BYTEHUBBLE = [
  {
    title: "Real ownership",
    body:
      "Small teams, direct responsibility for the systems you build, and the autonomy to make decisions that matter.",
  },
  {
    title: "Applied AI at the core",
    body:
      "Not a research demo — production LLM agents that run alongside enterprise databases every day.",
  },
  {
    title: "Modern engineering culture",
    body:
      "Trunk-based workflows, thoughtful reviews, generous docs, and a strong bias toward shipping small, safe changes.",
  },
  {
    title: "Deep technical growth",
    body:
      "Work with people who genuinely enjoy databases, distributed systems, and applied AI — and want to teach.",
  },
  {
    title: "Global, hybrid, flexible",
    body:
      "Offices in Hyderabad and Sterling (VA). Remote and hybrid roles across most functions.",
  },
  {
    title: "Meaningful compensation",
    body:
      "Competitive base, equity, and a real learning budget for books, courses, and conferences.",
  },
];

// ────────────────────────────────────────────────────────────────
// Hiring process (spec §7)
// ────────────────────────────────────────────────────────────────

export const HIRING_STAGES: { title: string; detail: string }[] = [
  { title: "Application", detail: "You email us your resume and preferred role." },
  { title: "Recruiter Review", detail: "We respond within 5 business days if there's a strong fit." },
  { title: "Technical Assessment", detail: "A short, take-home or live problem relevant to the role." },
  { title: "Technical Interview", detail: "60–75 minutes with senior engineers on the team." },
  { title: "Manager Interview", detail: "Scope, ownership, and long-term fit with the hiring manager." },
  { title: "Offer", detail: "Written offer, references, and a chance to ask any final questions." },
  { title: "Onboarding", detail: "Structured 30-day ramp with a buddy, a manager check-in, and clear goals." },
];

// ────────────────────────────────────────────────────────────────
// FAQ (spec §8)
// ────────────────────────────────────────────────────────────────

export const CAREERS_FAQ: { q: string; a: string }[] = [
  {
    q: "Do you offer fully remote roles?",
    a: "Yes. Many engineering, AI, and marketing roles are fully remote within India, and select roles are open globally. Each opening lists its work model.",
  },
  {
    q: "How does the hybrid model work?",
    a: "Hybrid roles are anchored to our Hyderabad or Sterling (VA) office and expect 2–3 in-office days per week. Individual teams decide the specific days.",
  },
  {
    q: "Do you hire interns and fresh graduates?",
    a: "Yes. We run structured internships across AI research, engineering, and data — usually 3 to 6 months, with a strong path to a full-time role for high performers.",
  },
  {
    q: "What notice periods do you accept?",
    a: "We prefer 30–60 days. For roles marked \"Immediate Joiners Preferred,\" we prioritize candidates who can start within 15 days.",
  },
  {
    q: "How do I check my application status?",
    a: "Reply to the confirmation email you received or write to careers@bytehubble.ai with the role name in the subject line. We reply to every candidate.",
  },
  {
    q: "What does the interview process look like?",
    a: "A recruiter screen, a role-specific technical assessment, one or two technical interviews, and a hiring-manager conversation. Total time is typically 2–3 weeks.",
  },
  {
    q: "Do you charge candidates any recruitment fees?",
    a: "Never. ByteHubble does not charge any fee at any stage of the hiring process. If someone asks for money on our behalf, please report it to careers@bytehubble.ai.",
  },
  {
    q: "Are you an equal-opportunity employer?",
    a: "Yes. We hire based on ability, potential, and character — regardless of gender, background, orientation, disability, age, religion, or nationality.",
  },
  {
    q: "How do you handle my personal data?",
    a: "Resumes and application data are used only for hiring decisions, stored securely, and retained for up to 24 months so we can consider you for future openings. Ask us to delete your data anytime.",
  },
];

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

/** Build a prefilled mailto: link for a specific role, or a generic apply link. */
export function buildApplyMailto(job?: Pick<JobOpening, "title" | "id">): string {
  const subject = job
    ? `Application — ${job.title} [${job.id}]`
    : "Application — Talent Network";

  const body = [
    "Hello ByteHubble Talent Team,",
    "",
    job
      ? `I would like to apply for the ${job.title} role.`
      : "I would like to join the ByteHubble talent network for future opportunities.",
    "",
    "Please find my details below and my resume attached:",
    "",
    "• Full Name:",
    "• Current Location:",
    "• Preferred Role:",
    "• Total Experience:",
    "• Notice Period:",
    "• Current CTC:",
    "• Expected CTC:",
    "• LinkedIn / Portfolio:",
    "",
    "Thank you,",
  ].join("\n");

  const params = new URLSearchParams({ subject, body });
  return `mailto:${CAREERS_EMAILS.primary}?${params.toString()}`;
}
