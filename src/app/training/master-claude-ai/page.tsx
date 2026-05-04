"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Footer from "@/sections/Footer";
import bhLogo from "@/assets/company-logs/company.png";

const PARTNERS = [
  { logo: bhLogo, alt: "ByteHubble", name: "ByteHubble" },
];

const STATS = [
  { value: "60", label: "Days", sub: "Complete program" },
  { value: "15", label: "Modules", sub: "Comprehensive mastery" },
  { value: "3", label: "Audiences", sub: "CTOs, Employees, Devs" },
  { value: "200+", label: "Templates", sub: "Ready-to-use prompts" },
];

const OUTCOMES = [
  { icon: "🎯", tag: "Executives", title: "AI Strategy & ROI", desc: "Build AI roadmaps, measure ROI, establish governance frameworks, communicate AI vision to boards." },
  { icon: "⚡", tag: "Employees", title: "Daily Productivity Workflows", desc: "Master prompt engineering, save 2-4 hours daily, write, research, analyze with Claude expertise." },
  { icon: "💻", tag: "Developers", title: "API & MCP Integration", desc: "Build production Claude apps, custom MCP servers, token optimization, 5x faster shipping." },
  { icon: "🧠", tag: "Advanced", title: "Constitutional AI & Safety", desc: "Understand Claude's safety model, responsible deployment, enterprise governance frameworks." },
  { icon: "📊", tag: "Technical", title: "Token Economics", desc: "Reduce costs 40-70%, optimize model routing, implement prompt caching, cost management." },
  { icon: "🚀", tag: "Practical", title: "Real-World Projects", desc: "Build MVPs, ship products, deploy AI systems, complete capstone with expert review." },
];

const CURRICULUM = [
  { phase: "1", weeks: "Days 1-4", title: "Introduction to Claude AI", desc: "Anthropic's mission, Claude vs GPT-4 vs Gemini, Constitutional AI, multimodal capabilities, business case." },
  { phase: "2", weeks: "Days 5-8", title: "Prompt Engineering Fundamentals", desc: "Perfect prompt anatomy, 5 pillars, system vs user prompts, zero/one/few-shot, prompt patterns." },
  { phase: "3", weeks: "Days 9-12", title: "Token Economics", desc: "Token breakdown, cost optimization strategies, compression, caching (90% savings), model routing." },
  { phase: "4", weeks: "Days 13-16", title: "Advanced Prompt Architecture", desc: "System design thinking, XML tagging, structured prompting, agentic prompting, prompt-as-infrastructure." },
  { phase: "5", weeks: "Days 17-20", title: "Claude API Mastery", desc: "Authentication, API fundamentals, vision API, file API, tool use, prompt caching, batch API." },
  { phase: "6", weeks: "Days 21-24", title: "MCP Deep Dive", desc: "MCP architecture, ecosystem overview, using existing servers (GitHub, Drive, Slack, Database)." },
  { phase: "7", weeks: "Days 25-28", title: "Building Custom MCP Servers", desc: "MCP server anatomy, TypeScript & Python SDKs, building CRM integration, authentication, deployment." },
  { phase: "8", weeks: "Days 29-32", title: "Claude for Code", desc: "Claude Code CLI, CLAUDE.md framework, code generation, review, refactoring, documentation." },
  { phase: "9", weeks: "Days 33-36", title: "MVP Development", desc: "Product discovery with Claude, user personas, PRDs, full-stack scaffolding, rapid deployment." },
  { phase: "10", weeks: "Days 37-40", title: "Claude for Data & Analytics", desc: "Data analysis workflows, business intelligence, SQL generation, scenario analysis, reporting." },
  { phase: "11", weeks: "Days 41-44", title: "Claude for GTM", desc: "Sales acceleration, marketing at scale, content calendar, email sequences, customer success automation." },
  { phase: "12", weeks: "Days 45-48", title: "Claude for Professional Functions", desc: "HR, Legal & Compliance, Finance automation, bias reduction, contract review, governance." },
  { phase: "13", weeks: "Days 49-52", title: "AI Safety & Responsible Deployment", desc: "Constitutional AI explained, hallucinations, data privacy, governance frameworks, deployment checklist." },
  { phase: "14", weeks: "Days 53-56", title: "AI Strategy for C-Suite", desc: "AI maturity models, 90-day roadmaps, build vs buy, change management, competitive positioning." },
  { phase: "15", weeks: "Days 57-60", title: "Capstone & Certification", desc: "Developer or Business track projects, peer reviews, certification exam, portfolio building, alumni network." },
];

const MODULES = [
  {
    num: "01",
    badge: "Foundations",
    title: "Introduction to Claude AI",
    desc: "Understand Claude's architecture, Constitutional AI, and why enterprises trust Claude over alternatives.",
    topics: ["What is Claude AI?", "Anthropic's Mission", "Claude vs GPT-4 vs Gemini", "Constitutional AI Explained", "Model Family (Haiku, Sonnet, Opus)", "Multimodal Capabilities", "The Business Case for Claude"],
    outcomes: ["Compare Claude with competitors", "Choose the right Claude plan", "Understand Constitutional AI principles", "Complete first 10 business tasks"],
    project: "Set up Claude Pro account, integrate into workflow, complete sample tasks"
  },
  {
    num: "02",
    badge: "Prompting",
    title: "Prompt Engineering Fundamentals",
    desc: "Master the 5 pillars, prompt patterns, and Chain-of-Thought techniques for precision outputs.",
    topics: ["The 5 Pillars (Role, Context, Task, Format, Constraints)", "System Prompts vs User Prompts", "Zero-shot, One-shot, Few-shot Prompting", "Chain-of-Thought (CoT) Pattern", "Persona Pattern", "Template Pattern", "Positive vs Negative Framing"],
    outcomes: ["Write precision prompts on first try", "Master 5 core prompt patterns", "Reduce back-and-forth by 70%", "Build personal prompt library"],
    project: "Create 20+ professional prompts for your role (emails, reports, SOPs)"
  },
  {
    num: "03",
    badge: "Economics",
    title: "Token Economics",
    desc: "Reduce costs 40-70%, optimize model routing, implement caching, manage token budgets.",
    topics: ["What are Tokens?", "Token Counting & Pricing", "Context Window Limits (200K)", "Input vs Output Tokens", "Prompt Caching (90% savings)", "Compression Techniques", "Model Routing Strategy", "Cost Management at Scale"],
    outcomes: ["Calculate token costs accurately", "Achieve 40-70% cost reduction", "Implement caching strategy", "Set up usage alerts & budgets"],
    project: "Build interactive token cost calculator for your organization"
  },
  {
    num: "04",
    badge: "Architecture",
    title: "Advanced Prompt Architecture",
    desc: "System design thinking, XML tagging, prompt versioning, A/B testing, infrastructure-as-prompt.",
    topics: ["System Prompt Design", "Layered Prompt Architecture", "XML Tagging Best Practices", "Document Injection for RAG", "Multi-turn Conversation Design", "Prompt Versioning", "A/B Testing Prompts", "Agentic Prompting Patterns"],
    outcomes: ["Design enterprise-grade prompt systems", "Version control prompts like code", "Implement RAG patterns", "Build reusable prompt libraries"],
    project: "Create organizational prompt library with version control"
  },
  {
    num: "05",
    badge: "API",
    title: "Claude API Mastery",
    desc: "Production-ready API integration, vision, files, tool use, streaming, error handling, monitoring.",
    topics: ["API Authentication & Keys", "Messages Structure", "Vision API (Images & Screenshots)", "File API (PDFs, CSVs, Docs)", "Tool Use / Function Calling", "Streaming Responses", "Batch API for Scale", "Rate Limiting & Retries", "Error Handling", "Production Monitoring"],
    outcomes: ["Deploy first Claude API application", "Handle vision & file inputs", "Implement tool use", "Production error handling & monitoring"],
    project: "Ship a production Claude API app with full error handling"
  },
  {
    num: "06",
    badge: "MCP",
    title: "MCP Deep Dive",
    desc: "Model Context Protocol architecture, ecosystem, official servers, security, team-wide deployment.",
    topics: ["MCP Architecture Fundamentals", "Hosts, Clients, Servers, Transport", "Official MCP Servers", "Filesystem MCP", "GitHub MCP", "Google Drive & Docs MCP", "Slack MCP", "Database MCP", "Security & Permissions", "Team Configuration"],
    outcomes: ["Connect Claude to 5+ existing tools", "Configure team-wide MCP", "Automate real workflows", "Secure MCP deployments"],
    project: "Connect Claude to your CRM, Slack, GitHub, and local databases"
  },
  {
    num: "07",
    badge: "MCP",
    title: "Building Custom MCP Servers",
    desc: "Create proprietary integrations, CRM/ERP connections, stateful servers, Docker deployment.",
    topics: ["MCP Server Anatomy", "Tools, Resources, Prompts", "Stdio vs SSE vs HTTP Transport", "TypeScript SDK Setup", "Python SDK Setup", "Building CRM Integration", "Authentication & Security", "Stateful Servers", "Testing & Debugging", "Docker Deployment", "Production Observability"],
    outcomes: ["Build a working MCP server", "Integrate with proprietary systems", "Deploy to production", "Secure team access"],
    project: "Build & deploy custom CRM integration MCP server"
  },
  {
    num: "08",
    badge: "Code",
    title: "Claude for Code",
    desc: "Claude Code CLI, CLAUDE.md, code generation, review, refactoring, documentation at scale.",
    topics: ["Claude Code CLI Installation", "CLAUDE.md Framework", "Context Management", "Code Generation", "Code Review & Security Scanning", "Refactoring Legacy Code", "Documentation Generation", "Git Workflows", "CI/CD Integration", "Team Standards"],
    outcomes: ["Reduce code review time by 60%", "Generate comprehensive tests", "Onboard engineers faster", "Standardize team practices"],
    project: "Refactor legacy codebase with Claude Code, generate test coverage"
  },
  {
    num: "09",
    badge: "MVP",
    title: "MVP Development with Claude",
    desc: "Ship full-stack MVPs in days, product discovery, scaffolding, deployment, user feedback loops.",
    topics: ["Product Discovery with Claude", "User Persona Generation", "PRD Writing Assistance", "Tech Stack Selection", "Full-stack Scaffolding", "Next.js / FastAPI Setup", "Database Schema Design", "Auth & Payments Boilerplate", "Deployment to Vercel/Railway", "User Feedback Loops"],
    outcomes: ["Ship a working MVP in days", "Complete product from idea to launch", "Deploy to production", "Gather user feedback"],
    project: "Build & deploy a complete working MVP from scratch"
  },
  {
    num: "10",
    badge: "Data",
    title: "Claude for Data & Analytics",
    desc: "Instant data analysis, SQL generation, business intelligence, KPI tracking, automated reports.",
    topics: ["CSV & Data File Analysis", "Statistical Analysis", "Pattern Recognition", "Anomaly Detection", "SQL Query Generation", "Natural Language to SQL", "Financial Modeling", "Scenario Analysis", "Executive Dashboard Creation", "Automated Report Generation", "Data Storytelling"],
    outcomes: ["Analyze data without data scientist", "Generate business reports", "Create executive dashboards", "Extract insights from raw data"],
    project: "Analyze company dataset, create executive presentation"
  },
  {
    num: "11",
    badge: "GTM",
    title: "Claude for Sales, Marketing & CS",
    desc: "Personalized outreach, content factory, email sequences, support automation, churn prediction.",
    topics: ["Sales Personalization at Scale", "Prospect Research Automation", "Objection Handling Scripts", "RFP Response Generation", "CRM Data Enrichment", "Email Sequence Building", "Content Calendar Generation", "Social Media Content Factory", "Support Ticket Summarization", "Customer Health Analysis", "Churn Prediction"],
    outcomes: ["Generate more qualified pipeline", "Ship 10x more content", "Improve customer retention", "Automate routine tasks"],
    project: "Create sales playbooks, 30-day content calendar, CS automations"
  },
  {
    num: "12",
    badge: "Professional",
    title: "Claude for HR, Legal & Finance",
    desc: "Policy generation, contract review, job descriptions, interview rubrics, financial reporting.",
    topics: ["Job Description Generation", "Bias Reduction in Hiring", "Interview Question Banks", "Evaluation Rubrics", "Performance Review Writing", "Employee Handbook Creation", "Contract Review & Risk Flagging", "NDA Generation", "Compliance Checklists (GDPR, SOC2, ISO27001)", "Legal Research Summarization", "Financial Report Narratives", "Budget Variance Analysis", "Tax Filing Preparation"],
    outcomes: ["Reduce document creation time by 80%", "Eliminate inconsistencies", "Handle compliance systematically", "Automate routine processes"],
    project: "Generate company policies, job descriptions, and compliance docs"
  },
  {
    num: "13",
    badge: "Safety",
    title: "AI Safety, Ethics & Governance",
    desc: "Constitutional AI model, data classification, GDPR compliance, audit trails, incident response.",
    topics: ["Constitutional AI Explained", "Claude's Safety Model", "Refusal Mechanisms", "Hallucination Risks", "Data Privacy Considerations", "Responsible Scaling", "AI Acceptable Use Policy", "Data Classification Framework", "GDPR & CCPA Compliance", "Human-in-the-Loop Design", "Audit Trails & Logging", "Red-teaming Prompts", "Incident Response Planning"],
    outcomes: ["Build compliant AI systems", "Establish governance framework", "Understand safety limitations", "Deploy responsibly at scale"],
    project: "Create organizational AI governance policy & framework"
  },
  {
    num: "14",
    badge: "Strategy",
    title: "AI Strategy for C-Suite",
    desc: "AI maturity assessment, 90-day roadmaps, ROI measurement, change management, competitive moats.",
    topics: ["AI Maturity Model Assessment", "Building 90-Day AI Roadmaps", "Identifying High-ROI Opportunities", "Build vs Buy vs Partner Decisions", "AI Budgeting & Economics", "Change Management Strategy", "Employee Resistance & Adoption", "Training Programs & Literacy", "Measuring AI ROI", "Board Communications", "AI as Competitive Moat", "Future-proofing for Claude 5+"],
    outcomes: ["Complete AI strategy document", "Implementation roadmap", "Board-ready presentations", "Signed leadership alignment"],
    project: "Develop comprehensive AI strategy & 90-day roadmap for organization"
  },
  {
    num: "15",
    badge: "Capstone",
    title: "Capstone & Professional Certification",
    desc: "Real project development, expert code review, certification exam, LinkedIn credential, lifetime updates.",
    topics: ["Developer Track: Full-stack Claude App", "Business Track: AI Transformation Plan", "Project Development & Planning", "Peer Review Sessions", "Instructor Evaluation", "Certification Exam (100 questions)", "Portfolio Building", "LinkedIn Badge", "Alumni Network Access", "Lifetime Updates", "Advanced Topics Synthesis"],
    outcomes: ["Deployable real-world project", "Professional Claude certification", "LinkedIn credential", "Alumni network access"],
    project: "Complete either developer MVP or business transformation plan"
  },
];

const SOURCE_OPTIONS = ["LinkedIn", "Instagram", "Friend / Referral", "YouTube", "Google Search", "GitHub", "Other"];
const DEGREE_OPTIONS = ["B.Tech / B.E.", "M.Tech / M.E.", "MCA", "BCA", "BSc Computer Science", "MBA", "Other"];
const GRAD_YEARS = ["2023", "2024", "2025", "2026", "2027"];

function SectionLabel({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 px-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{label}</span>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-accent mt-3 mb-4 leading-tight">{title}</h2>
      {desc && <p className="text-dark-accent/60 text-sm sm:text-base leading-relaxed">{desc}</p>}
    </div>
  );
}

function PhaseItem({ phase, weeks, title, desc, index }: { phase: string; weeks: string; title: string; desc: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="relative pl-12 pb-12 last:pb-0">
      {index !== CURRICULUM.length - 1 && <div className="absolute left-[21px] top-11 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 to-transparent" />}
      <button onClick={() => setOpen(!open)} className={`absolute left-0 top-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 z-10 ${open ? "bg-primary text-white shadow-[0_0_20px_rgba(46,42,143,0.3)] scale-110" : "bg-white border-2 border-gray-100 text-dark-accent/40 hover:border-primary/30 hover:text-primary"}`}>
        {phase}
      </button>
      <div onClick={() => setOpen(!open)} className={`group p-5 sm:p-8 rounded-3xl border transition-all duration-500 cursor-pointer ${open ? "bg-white border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.04)]" : "bg-background/40 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-xl"}`}>
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <div className="text-xs font-semibold text-primary/70 mb-1">{weeks}</div>
            <h3 className="text-lg sm:text-xl font-bold text-dark-accent">{title}</h3>
          </div>
        </div>
        {open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
          <p className="text-dark-accent/60 text-sm mt-4 leading-relaxed">{desc}</p>
        </motion.div>}
      </div>
    </motion.div>
  );
}

function ModuleDetailItem({ num, badge, title, topics, outcomes, project, index }: any) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }} className="relative rounded-2xl bg-white border border-gray-100 hover:border-primary/20 transition-all duration-300 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-6 text-left hover:bg-gray-50/50 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl font-bold text-primary">{num}</div>
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">{badge}</span>
            </div>
            <h3 className="text-lg font-bold text-dark-accent">{title}</h3>
          </div>
          <svg className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </button>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="border-t border-gray-100">
          <div className="p-6 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-dark-accent mb-3 flex items-center gap-2"><span className="text-primary">▪</span> Key Topics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {topics.map((t: string, i: number) => (
                  <div key={i} className="text-sm text-dark-accent/70 flex items-start gap-2">
                    <span className="text-primary text-lg leading-none mt-0.5">→</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-dark-accent mb-3 flex items-center gap-2"><span className="text-primary">▪</span> Learning Outcomes</h4>
              <ul className="space-y-2">
                {outcomes.map((o: string, i: number) => (
                  <li key={i} className="text-sm text-dark-accent/70 flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-dark-accent mb-2 flex items-center gap-2"><span className="text-primary">▪</span> Capstone Project</h4>
              <p className="text-sm text-dark-accent/70 bg-primary/5 rounded-lg p-3 border border-primary/10">{project}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function RegistrationForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", graduationYear: "", degree: "", college: "", motivation: "", source: "", agreed: false });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(p => ({ ...p, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreed) { setErrorMsg("Please agree to the program terms."); return; }
    setStatus("submitting"); setErrorMsg("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          course: "Master Claude AI",
          graduation_year: form.graduationYear,
          degree: form.degree,
          college: form.college,
          motivation: form.motivation,
          source: form.source,
        }),
      });
      if (!res.ok) {
        const e = await res.json();
        setErrorMsg(e.error || "Submission failed");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-xl font-bold text-dark-accent mb-2">Application Submitted!</h3>
        <p className="text-dark-accent/60 text-sm">We'll email you within 24 hours with next steps.</p>
      </motion.div>
    );
  }

  const inp = "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-sm text-dark-accent placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all";
  const lbl = "block text-xs font-semibold text-dark-accent/70 mb-1.5";

  return (
    <form onSubmit={submit} className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div><label className={lbl}>First Name <span className="text-primary">*</span></label><input required name="firstName" value={form.firstName} onChange={set} placeholder="John" className={inp} /></div>
        <div><label className={lbl}>Last Name <span className="text-primary">*</span></label><input required name="lastName" value={form.lastName} onChange={set} placeholder="Doe" className={inp} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div><label className={lbl}>Email <span className="text-primary">*</span></label><input required type="email" name="email" value={form.email} onChange={set} placeholder="john@example.com" className={inp} /></div>
        <div><label className={lbl}>Phone <span className="text-primary">*</span></label><input required name="phone" value={form.phone} onChange={set} placeholder="+91 98765 43210" className={inp} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div><label className={lbl}>Grad Year <span className="text-primary">*</span></label><select required name="graduationYear" value={form.graduationYear} onChange={set} className={`${inp} appearance-none`}><option value="">Select</option>{GRAD_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}</select></div>
        <div><label className={lbl}>Degree <span className="text-primary">*</span></label><select required name="degree" value={form.degree} onChange={set} className={`${inp} appearance-none`}><option value="">Select</option>{DEGREE_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
      </div>
      <div><label className={lbl}>College / University <span className="text-primary">*</span></label><input required name="college" value={form.college} onChange={set} placeholder="e.g. JNTU Hyderabad" className={inp} /></div>
      <div><label className={lbl}>Statement of Purpose</label><textarea name="motivation" value={form.motivation} onChange={set} rows={3} placeholder="Why do you want to master Claude AI?" className={`${inp} resize-none`} /></div>
      <div><label className={lbl}>How did you hear about us?</label><select name="source" value={form.source} onChange={set} className={`${inp} appearance-none`}><option value="">Select Source</option>{SOURCE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
      <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
        <input type="checkbox" name="agreed" id="agreed" checked={form.agreed} onChange={set} className="mt-0.5 w-4 h-4 accent-primary cursor-pointer flex-shrink-0" />
        <label htmlFor="agreed" className="text-sm text-dark-accent/60 leading-relaxed cursor-pointer">
          I agree to the program terms and commit to the 60-day schedule. Seats are limited and subject to selection.
        </label>
      </div>
      {errorMsg && <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"><svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{errorMsg}</div>}
      <button type="submit" disabled={status === "submitting"} className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg shadow-md shadow-primary/25 hover:bg-primary/90 hover:shadow-lg active:scale-[0.99] transition-all duration-200 disabled:opacity-60 cursor-pointer text-sm">
        {status === "submitting" ? "Processing..." : "Submit Application"}
      </button>
      <p className="text-center text-xs text-dark-accent/40 uppercase tracking-widest">Free registration · 24hr response</p>
    </form>
  );
}

export default function MasterClaudeAIPage() {
  return (
    <>
      <div className="pt-20">
        <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-background">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(46,42,143,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(46,42,143,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <Container>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto text-center">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {PARTNERS.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white border border-gray-200 shadow-sm">
                    <div className="relative w-24 sm:w-32 md:w-40 h-8 sm:h-10 md:h-12 flex-shrink-0">
                      <Image src={p.logo} alt={p.alt} fill className="object-contain" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Professional Certification · 2026
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark-accent leading-tight tracking-tight mb-5">
                Master<br />
                <span className="text-primary">Claude AI</span> <span className="text-primary">Mastery</span>
              </h1>
              <p className="text-base sm:text-lg text-dark-accent/60 leading-relaxed max-w-2xl mx-auto mb-8">
                The only 60-day comprehensive program designed for CTOs, Employees, and Developers. From prompt engineering to MCP servers, token optimization to C-Suite strategy — complete Claude mastery with expert certification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a href="#apply" className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md shadow-primary/25 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 text-sm">
                  Apply Now →
                </a>
                <a href="#curriculum" className="px-6 py-3 border border-gray-300 text-dark-accent/80 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98] transition-all duration-200 text-sm">
                  View Curriculum
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }} whileHover={{ y: -4, boxShadow: "0 12px 24px -6px rgba(46,42,143,0.15)" }} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-primary/20 transition-all duration-200 cursor-default">
                    <div className="text-2xl font-bold text-primary mb-1">{s.value}</div>
                    <div className="text-sm font-semibold text-dark-accent">{s.label}</div>
                    <div className="text-xs text-dark-accent/50 mt-0.5">{s.sub}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <Container>
            <SectionLabel label="Learning Outcomes" title="What You'll Master" desc="Comprehensive skills tailored for your role — Executive, Employee, or Developer" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {OUTCOMES.map((o, i) => (
                <motion.div key={o.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-background to-white border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-3">{o.icon}</div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-primary/8 text-xs font-semibold text-primary mb-3">{o.tag}</span>
                  <h3 className="text-lg font-bold text-dark-accent mb-2">{o.title}</h3>
                  <p className="text-sm text-dark-accent/60 leading-relaxed">{o.desc}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        <section id="curriculum" className="py-16 sm:py-20 lg:py-24 bg-background">
          <Container>
            <SectionLabel label="Program Structure" title="60-Day Curriculum" desc="15 modules covering Claude fundamentals, APIs, MCP servers, strategy, and professional certification" />
            <div className="max-w-3xl mx-auto">
              {CURRICULUM.map((phase, i) => (
                <PhaseItem key={phase.phase} {...phase} index={i} />
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <Container>
            <SectionLabel label="Core Modules" title="Comprehensive Topics" desc="15 detailed modules with hands-on projects, real code, and capstone certification" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULES.map((m, i) => (
                <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl font-bold text-primary">{m.num}</div>
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">{m.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-dark-accent mb-2">{m.title}</h3>
                  <p className="text-sm text-dark-accent/60">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20 lg:py-24 bg-background">
          <Container>
            <SectionLabel label="Module Details" title="Deep Dive into Each Module" desc="Click to expand and see topics, outcomes, and capstone projects for each module" />
            <div className="space-y-4">
              {MODULES.map((m, i) => (
                <ModuleDetailItem key={m.num} {...m} index={i} />
              ))}
            </div>
          </Container>
        </section>

        <section id="apply" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-background">
          <Container>
            <div className="max-w-2xl mx-auto">
              <SectionLabel label="Apply Now" title="Join Master Claude AI Program" desc="60-day transformation with expert instruction and lifetime certification. Limited seats available." />
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg">
                <RegistrationForm />
              </div>
            </div>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  );
}
