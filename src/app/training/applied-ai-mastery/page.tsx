"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import Footer from "@/sections/Footer";
import jtbiLogo from "@/assets/company-logs/jtbi-log.png";
import bhLogo from "@/assets/company-logs/company.png";

const PARTNERS = [
  { logo: jtbiLogo,  alt: "JTBI",           name: "JTBI"           },
  { logo: bhLogo,    alt: "ByteHubble",      name: "ByteHubble"     },
];

const STATS = [
  { value: "4",   label: "Weeks",            sub: "Accelerated program"   },
  { value: "40+", label: "Hours",            sub: "Live + hands-on"       },
  { value: "4+",  label: "Projects",         sub: "Portfolio builds"       },
  { value: "2+",  label: "Enterprise Use Cases", sub: "Real-world impact" },
];

const OUTCOMES = [
  { icon: "⚡", tag: "RAG",           title: "Production RAG Systems",   desc: "Design and deploy production-grade RAG systems handling millions of documents with access control and observability." },
  { icon: "🤖", tag: "Agents",       title: "Autonomous AI Agents",      desc: "Build multi-agent systems using LangGraph and CrewAI that reason, plan and act on complex real-world tasks."         },
  { icon: "🧬", tag: "Fine-Tuning",  title: "Fine-Tune LLMs",           desc: "Adapt foundation models using LoRA/QLoRA on domain-specific datasets. Evaluate, serve, and monitor custom models."   },
  { icon: "🔗", tag: "Prompt Eng.", title: "LLM Pipelines",             desc: "Architect transformer-based LLM pipelines with advanced prompt engineering, CoT reasoning, and context strategies."  },
  { icon: "☁️", tag: "Cloud Ops",   title: "AI Systems Deployment",    desc: "Deploy AI systems to AWS/GCP with Docker, FastAPI, async queues, LangSmith observability, and cost control."         },
  { icon: "🚀", tag: "Portfolio",   title: "Live Production Portfolio", desc: "Graduate with 3+ live, deployed AI applications — demonstrating real engineering judgment to employers."              },
];

const CURRICULUM = [
  { phase:"01", weeks:"Week 1",   title:"Engineering Foundations & AI Basics", desc:"Master engineering foundations every AI engineer needs — mathematics, data structures, Python, SQL, cloud platforms, REST APIs, and data pipeline tools. Then accelerate into classical ML, deep learning, neural networks, and the latest generative AI and LLM model providers.",                                                                                                                                                                                                                                                            tags:["Applied Maths","DSA","Python 3.12","SQL & NoSQL","Docker & Git","AWS / GCP","FastAPI","Kafka & Spark","ML & DL","Neural Nets","PyTorch","GenAI & LLMs","OpenAI / Anthropic","AWS Bedrock","Multimodal LLMs"] },
  { phase:"02", weeks:"Week 2",   title:"LLM & RAG Mastery",                  desc:"Deep dive into transformer architectures, advanced prompt engineering, context design, and production-grade LLM operations. Master the full RAG pipeline including vector databases, advanced retrieval patterns, multimodal RAG, enterprise-grade access control, and evaluation frameworks. Learn token budgeting, LLM guardrails, and Jinja2 templates for production systems.",                                                                                                      tags:["Transformers","Chain-of-Thought","Few-shot Prompting","Context Engineering","Token Budgeting","LLM Guardrails","Jinja2 Templates","Pinecone","ChromaDB","FAISS / Qdrant","Hybrid Search","Re-ranking","RAGAS Eval","LangSmith"] },
  { phase:"03", weeks:"Week 3",   title:"Model Customization & Multi-Agent Systems", desc:"Adapt foundation models to domain-specific tasks using LoRA, QLoRA, instruction tuning, and the full RLHF training loop with reward modeling. Build multi-agent systems that plan, reason, use tools, and act on complex real-world tasks — master LangGraph state machines, CrewAI orchestration, and production deployment patterns.",                                                                                                                                      tags:["LoRA","QLoRA","PEFT","Instruction Tuning","RLHF","PPO / DPO","HuggingFace","LangChain","LangGraph","CrewAI","AutoGen","ReAct Agents","Tool Use","Multi-Agent"] },
  { phase:"04", weeks:"Week 4",   title:"Production Deployment & Capstone",   desc:"Deploy AI systems to production on AWS/GCP with Docker, FastAPI, async queues, LangSmith observability, and cost control. Build 3 production-grade AI applications for your portfolio, architecting systems that solve real business problems. Prepare for interviews through system design, craft ATS-optimized AI engineer resumes, and access internship fast-track opportunities.",                                                                         tags:["Portfolio Apps","System Design","Interview Prep","Docker","AWS Deployment","LangSmith","FastAPI Production","Resume Building","Offer Negotiation","Network & Outreach","Career Launch"] },
];

const PROJECTS = [
  { num: "01", badge: "Enterprise", title: "Enterprise RAG + Agents Use Case", desc: "Multi-source document Q&A with agentic follow-up, citations, and role-based access control. Deployed on AWS.", tags: ["LangChain", "Pinecone", "FastAPI", "Docker", "AWS"], grad: "from-primary to-accent" },
  { num: "02", badge: "Enterprise", title: "Autonomous Multi-Agent Workflow Use Case", desc: "Orchestrator + specialist agents solving complex multi-step tasks. Real-time monitoring via LangSmith dashboard.", tags: ["LangGraph", "CrewAI", "FastAPI", "Redis"], grad: "from-violet-600 to-purple-500" },
  { num: "03", badge: "Fine-Tuning", title: "Fine-Tuned Domain AI Assistant", desc: "Custom LLM fine-tuned on industry dataset. LoRA adapter training, evaluation pipeline, and production serving.", tags: ["QLoRA", "HuggingFace", "vLLM", "Gradio"], grad: "from-emerald-600 to-teal-500" },
  { num: "04", badge: "Multimodal", title: "Multimodal RAG Pipeline", desc: "Image, table, and text retrieval from complex documents. PDF layout-aware extraction with ColPali visual embeddings.", tags: ["ColPali", "Weaviate", "GPT-4o", "Streamlit"], grad: "from-amber-500 to-orange-500" },
  { num: "05", badge: "Backend", title: "AI-Powered REST API Backend", desc: "Production FastAPI service with LLM integration, streaming responses, token tracking, and rate limiting.", tags: ["FastAPI", "PostgreSQL", "Docker", "Celery"], grad: "from-sky-600 to-blue-500" },
  { num: "04+", badge: "Mini Projects", title: "Phase Mini Projects", desc: "Additional hands-on builds across each phase: prompt pipelines, vector search apps, RL reward models, and more.", tags: ["LangChain", "PyTorch", "ChromaDB", "Plotly"], grad: "from-rose-500 to-pink-500" },
];

const SOURCE_OPTIONS = ["LinkedIn","Instagram","Friend / Referral","JNTU Notice Board","JTBI","YouTube","Google Search","Other"];
const DEGREE_OPTIONS = ["B.Tech / B.E.","M.Tech / M.E.","MCA","BCA","BSc Computer Science","Other"];
const GRAD_YEARS     = ["2024","2025","2026","2027","2028"];

// ─── Section heading — matches site style ────────────────────────────────────
function SectionLabel({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 px-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">{label}</span>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-accent mt-3 mb-4 leading-tight">{title}</h2>
      {desc && <p className="text-dark-accent/60 text-sm sm:text-base leading-relaxed">{desc}</p>}
    </div>
  );
}

// ─── Phase accordion ─────────────────────────────────────────────────────────
function PhaseItem({ phase, weeks, title, desc, tags, index }: {
  phase: string; weeks: string; title: string; desc: string; tags: string[]; index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-12 pb-12 last:pb-0"
    >
      {/* Vertical Roadmap Line */}
      {index !== CURRICULUM.length - 1 && (
        <div className="absolute left-[21px] top-11 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 to-transparent" />
      )}

      {/* Phase Circle Indicator */}
      <button
        onClick={() => setOpen(!open)}
        className={`absolute left-0 top-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 z-10 ${
          open
            ? "bg-primary text-white shadow-[0_0_20px_rgba(46,42,143,0.3)] scale-110"
            : "bg-white border-2 border-gray-100 text-dark-accent/40 hover:border-primary/30 hover:text-primary"
        }`}
      >
        {phase}
      </button>

      <div 
        className={`group p-5 sm:p-8 rounded-3xl border transition-all duration-500 cursor-pointer ${
          open 
            ? "bg-white border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.04)]" 
            : "bg-background/40 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-xl"
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2 block">
              {weeks}
            </span>
            <h3 className={`text-xl font-bold transition-colors duration-300 ${
              open ? "text-primary" : "text-dark-accent"
            }`}>
              {title}
            </h3>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            open ? "bg-primary/10 rotate-180" : "bg-gray-100 group-hover:bg-primary/5"
          }`}>
            <svg className={`w-4 h-4 ${open ? "text-primary" : "text-gray-400 group-hover:text-primary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="pt-2 border-t border-gray-50 mt-4">
                <p className="text-dark-accent/60 text-sm leading-relaxed mb-6">
                  {desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg bg-background text-[11px] font-bold text-dark-accent/70 border border-gray-100 hover:border-primary/20 hover:text-primary transition-all duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Registration form ────────────────────────────────────────────────────────
function RegistrationForm() {
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", phone:"", graduationYear:"", degree:"", college:"", motivation:"", source:"", agreed:false });
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreed) { setErrorMsg("Please agree to the program terms before submitting."); return; }
    setStatus("submitting"); setErrorMsg("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email, phone: form.phone,
          course: "Applied AI Engineer Mastery Program",
          graduation_year: form.graduationYear, degree: form.degree,
          college: form.college, motivation: form.motivation, source: form.source,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("success");
      setForm({ firstName:"", lastName:"", email:"", phone:"", graduationYear:"", degree:"", college:"", motivation:"", source:"", agreed:false });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again or email support@bytehubble.ai");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="text-center py-12">
        <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-dark-accent mb-2">Application Submitted!</h3>
        <p className="text-dark-accent/60 text-sm">We&apos;ll email you within 24 hours with next steps.</p>
      </motion.div>
    );
  }

  const inp = "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-sm text-dark-accent placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 hover:border-gray-400 transition-all duration-200";
  const lbl = "block text-xs font-semibold text-dark-accent/70 mb-1.5";

  return (
    <form onSubmit={submit} className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div><label className={lbl}>First Name <span className="text-accent">*</span></label><input required name="firstName" value={form.firstName} onChange={set} placeholder="Arjun" className={inp} /></div>
        <div><label className={lbl}>Last Name <span className="text-accent">*</span></label><input required name="lastName" value={form.lastName} onChange={set} placeholder="Sharma" className={inp} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div><label className={lbl}>Email <span className="text-accent">*</span></label><input required type="email" name="email" value={form.email} onChange={set} placeholder="arjun@example.com" className={inp} /></div>
        <div><label className={lbl}>Phone <span className="text-accent">*</span></label><input required name="phone" value={form.phone} onChange={set} placeholder="+91 98765 43210" className={inp} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={lbl}>Grad Year <span className="text-accent">*</span></label>
          <select required name="graduationYear" value={form.graduationYear} onChange={set} className={`${inp} appearance-none`}>
            <option value="">Select</option>
            {GRAD_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label className={lbl}>Degree <span className="text-accent">*</span></label>
          <select required name="degree" value={form.degree} onChange={set} className={`${inp} appearance-none`}>
            <option value="">Select</option>
            {DEGREE_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div><label className={lbl}>College / University <span className="text-accent">*</span></label><input required name="college" value={form.college} onChange={set} placeholder="e.g. JNTU Hyderabad" className={inp} /></div>
      <div><label className={lbl}>Statement of Purpose</label><textarea name="motivation" value={form.motivation} onChange={set} rows={3} placeholder="Why do you want to join this program?" className={`${inp} resize-none`} /></div>
      <div>
        <label className={lbl}>How did you hear about us?</label>
        <select name="source" value={form.source} onChange={set} className={`${inp} appearance-none`}>
          <option value="">Select Source</option>
          {SOURCE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
        <input type="checkbox" name="agreed" id="agreed" checked={form.agreed} onChange={set} className="mt-0.5 w-4 h-4 accent-primary cursor-pointer flex-shrink-0" />
        <label htmlFor="agreed" className="text-sm text-dark-accent/60 leading-relaxed cursor-pointer">
          I agree to the program terms and commit to the 4-week accelerated schedule. Seats are limited and subject to selection.
        </label>
      </div>
      {errorMsg && (
        <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {errorMsg}
        </div>
      )}
      <button type="submit" disabled={status === "submitting"}
        className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg shadow-md shadow-primary/25 hover:bg-primary/90 hover:shadow-lg active:scale-[0.99] transition-all duration-200 disabled:opacity-60 cursor-pointer text-sm">
        {status === "submitting" ? "Processing..." : "Submit Application"}
      </button>
      <p className="text-center text-xs text-dark-accent/40 uppercase tracking-widest">Free registration · 24hr response</p>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AppliedAIMasteryPage() {
  return (
    <>
      <div className="pt-20">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-background">
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage:"linear-gradient(rgba(46,42,143,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(46,42,143,0.04) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
          <Container>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="max-w-3xl mx-auto text-center">

              {/* Partner pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {PARTNERS.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    {i > 0 && <span className="text-gray-300 text-sm">×</span>}
                    <div className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white border border-gray-200 shadow-sm">
                      <div className="relative w-24 sm:w-32 md:w-40 h-8 sm:h-10 md:h-12 flex-shrink-0">
                        <Image src={p.logo} alt={p.alt} fill className="object-contain" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Badge */}
              <div className="flex justify-center mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Limited Seats · Cohort 01 · 2025
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark-accent leading-tight tracking-tight mb-5">
                Applied AI Engineer<br />
                <span className="text-primary">Mastery</span> <span className="text-accent">Program</span>
              </h1>

              {/* Sub */}
              <p className="text-base sm:text-lg text-dark-accent/60 leading-relaxed max-w-2xl mx-auto mb-8">
                A Stanford-inspired 7-phase curriculum — from engineering fundamentals to production-ready AI systems.
                Build real apps, fine-tune LLMs, and deploy enterprise-grade systems.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a href="#apply" className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md shadow-primary/25 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 text-sm">
                  Apply for Cohort 01 →
                </a>
                <a href="#curriculum" className="px-6 py-3 border border-gray-300 text-dark-accent/80 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98] transition-all duration-200 text-sm">
                  View Curriculum
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity:0, y:12 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ duration:0.4, delay: 0.3 + i * 0.06 }}
                    whileHover={{ y:-4, boxShadow:"0 12px 24px -6px rgba(46,42,143,0.15)" }}
                    className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-primary/20 transition-all duration-200 cursor-default"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">{s.value}</div>
                    <div className="text-sm font-semibold text-dark-accent">{s.label}</div>
                    <div className="text-xs text-dark-accent/50 mt-0.5">{s.sub}</div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </Container>
        </section>

        {/* ── PARTNERS ── */}
        <section className="py-10 bg-white border-y border-gray-100">
          <Container>
            <div className="flex flex-col items-center gap-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-dark-accent/40">In Collaboration With</span>
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16">
                {PARTNERS.map((p, i) => (
                  <motion.div key={p.alt} initial={{ opacity:0, y:6 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <div className="relative w-24 sm:w-32 md:w-40 h-8 sm:h-10 md:h-12"><Image src={p.logo} alt={p.alt} fill className="object-contain" /></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── OUTCOMES ── */}
        <section className="py-20 lg:py-24 bg-background">
          <Container>
            <SectionLabel
              label="Graduate Outcomes"
              title="Production-proven skills the industry is actively hiring for"
              desc="Go beyond toy demos. Master the engineering patterns used by top AI labs to build scalable, reliable systems."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {OUTCOMES.map((o, i) => (
                <motion.div
                  key={o.tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden"
                >
                  {/* Background Glow Effect */}
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-300" />
                  
                  {/* Numbering & Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-5xl font-black text-primary/30 group-hover:text-primary/40 transition-colors duration-300 italic">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-background border border-gray-100 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300">
                      {o.icon}
                    </div>
                  </div>

                  <span className="inline-block px-2.5 py-1 rounded-full bg-accent/5 text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/10 mb-4">
                    {o.tag}
                  </span>

                  <h3 className="text-lg font-bold text-dark-accent mb-3 group-hover:text-primary transition-colors duration-300">
                    {o.title}
                  </h3>
                  <p className="text-dark-accent/60 leading-relaxed text-sm">
                    {o.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── CURRICULUM ── */}
        <section id="curriculum" className="py-20 lg:py-24 bg-white border-t border-gray-100">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">

              <div>
                <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">4-Week Accelerated Curriculum</span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-dark-accent mt-3 mb-3 leading-tight">From zero to production AI engineer in 4 weeks</h2>
                  <p className="text-dark-accent/60 text-sm leading-relaxed max-w-lg">A 4-week intensive journey designed to transform you into a production-ready AI Engineer. Packed with hands-on labs and real-world enterprise use cases.</p>
                </motion.div>
                <div>{CURRICULUM.map((c, i) => <PhaseItem key={c.phase} {...c} index={i} />)}</div>
              </div>

              <div className="lg:sticky lg:top-28 space-y-4">
                <motion.div initial={{ opacity:0, x:12 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.4 }}
                  className="rounded-2xl p-7 shadow-2xl relative overflow-hidden" style={{ background: "#0f0c3d" }}>
                  <div className="relative z-10">
                    <span className="text-xs font-semibold uppercase tracking-widest block mb-1" style={{ color: "#2AC7D6" }}>Program at a Glance</span>
                    <h3 className="text-lg font-bold mt-2 mb-1 leading-snug" style={{ color: "#ffffff" }}>Cohort 01</h3>
                    <p className="text-sm font-medium mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>Cohort 01 · 2025</p>
                    <div className="space-y-1">
                      {[["Duration","4 Weeks"],["Format","In-person"],["Projects","4+ Enterprise Use Cases"],["Certificate","JTBI × BH"]].map(([k,v]) => (
                        <div key={k} className="flex justify-between items-center py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                          <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{k}</span>
                          <span className="text-sm font-semibold" style={{ color: "#ffffff" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <a href="#apply" className="mt-6 block w-full text-center py-3 rounded-lg text-sm font-bold transition-opacity hover:opacity-90" style={{ background: "#2AC7D6", color: "#0f0c3d" }}>
                      Reserve Your Seat →
                    </a>
                  </div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(46,42,143,0.6)" }} />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(42,199,214,0.15)" }} />
                </motion.div>

                <div className="rounded-2xl border border-gray-200 bg-background p-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-dark-accent/50">Career Paths</span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {["AI Engineer","MLOps","RAG Architect","GenAI Lead"].map((r) => (
                      <span key={r} className="text-xs px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-dark-accent/70 font-medium shadow-sm">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── PROJECTS ── */}
        <section className="py-20 lg:py-24 bg-background border-t border-gray-100">
          <Container>
            <SectionLabel
              label="Capstone Projects"
              title="Build real, deployed AI systems"
              desc="Every project in our curriculum is production-grade. You won't just build toy demos — you'll architect systems that solve real business problems."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {PROJECTS.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden"
                >
                  {/* Background Glow Effect */}
                  <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${p.grad} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity duration-300`} />
                  
                  {/* Numbering */}
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-5xl font-black bg-gradient-to-br ${p.grad} bg-clip-text text-transparent opacity-30 group-hover:opacity-40 transition-opacity duration-300 italic`}>
                      {p.num}
                    </span>
                    {p.badge && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-dark-accent mb-3 group-hover:text-primary transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-dark-accent/60 leading-relaxed mb-6 text-sm">
                    {p.desc}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-background text-[11px] font-semibold text-dark-accent/70 border border-gray-100 group-hover:border-primary/10 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── INTERNSHIP ── */}
        <section className="py-20 lg:py-24 bg-white border-t border-gray-100">
          <Container>
            <SectionLabel
              label="For Top Talent Only"
              title="Internship Opportunities"
              desc="High-performing graduates will be considered for paid internships at ByteHubble or our network of 50+ hiring partners."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: "🏢", title: "Real Product Experience", desc: "Contribute to live RAG pipelines and agent systems used by real enterprise customers." },
                { icon: "🚀", title: "Fast-track Career", desc: "Direct pathways to full-time AI Engineer roles with competitive compensation packages." },
                { icon: "🤝", title: "Exclusive Network", desc: "Access to the ByteHubble alumni network and warm referrals to top-tier tech companies." },
              ].map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative p-8 rounded-3xl bg-background border border-gray-100 hover:bg-white hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden"
                >
                  {/* Numbering */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-5xl font-black text-primary/20 group-hover:text-primary/30 transition-colors duration-300 italic">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300">
                      {b.icon}
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-dark-accent mb-3 group-hover:text-primary transition-colors duration-300">
                    {b.title}
                  </h4>
                  <p className="text-dark-accent/60 text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="max-w-4xl mx-auto p-8 rounded-2xl bg-background border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-lg font-bold text-dark-accent mb-4">Selection Criteria</h3>
                  <ul className="space-y-3">
                    {["Top performers in project evaluations","Consistent participation in labs","Minimum 80% attendance rate"].map((c) => (
                      <li key={c} className="flex items-center gap-3 text-dark-accent/70 text-sm">
                        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📜</span>
                    <h4 className="text-base font-bold text-dark-accent">Guaranteed Certificate</h4>
                  </div>
                  <p className="text-sm text-dark-accent/60 leading-relaxed mb-5">Every graduate receives a co-branded certificate from JTBI and ByteHubble.</p>
                  <a href="#apply" className="inline-block px-5 py-2.5 bg-white border border-gray-300 text-dark-accent/80 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">
                    Apply Now →
                  </a>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* ── APPLY ── */}
        <section id="apply" className="py-20 lg:py-24 bg-background border-t border-gray-100">
          <Container>
            <SectionLabel
              label="Apply Now"
              title="Secure your seat for Cohort 01"
              desc="Applications are reviewed on a rolling basis. Early applicants receive priority selection."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">

              {/* Left summary */}
              <motion.div initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[{t:"4 Weeks",d:"Accelerated curriculum"},{t:"40+ Hours",d:"Live + hands-on"},{t:"4+ Projects",d:"Portfolio builds"},{t:"2+ Enterprise Use Cases",d:"Real-world impact"}].map((item) => (
                    <div key={item.t} className="p-5 rounded-2xl bg-white border border-gray-100">
                      <h4 className="text-base font-bold text-dark-accent mb-1">{item.t}</h4>
                      <p className="text-xs text-dark-accent/50">{item.d}</p>
                    </div>
                  ))}
                </div>
                <div className="p-7 rounded-2xl bg-gradient-to-br from-primary to-[#1a4a9e] text-white relative overflow-hidden shadow-lg shadow-primary/20">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-accent/80 mb-5">Application Process</h4>
                  <div className="space-y-4 relative z-10">
                    {[{n:"01",t:"Submit Form",d:"Academic and professional details."},{n:"02",t:"Quick Screening",d:"Assessment of engineering skills."},{n:"03",t:"Selection",d:"Receive your offer letter."}].map((s) => (
                      <div key={s.n} className="flex gap-4">
                        <span className="text-accent/60 font-bold text-sm w-6 flex-shrink-0">{s.n}</span>
                        <div>
                          <h5 className="font-semibold text-sm text-white">{s.t}</h5>
                          <p className="text-xs text-white/60">{s.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                </div>
              </motion.div>

              {/* Form */}
              <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 shadow-lg shadow-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-dark-accent">Registration</h3>
                  <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-md border border-accent/20">Cohort 01</span>
                </div>
                <RegistrationForm />
              </motion.div>
            </div>
          </Container>
        </section>

      </div>
      <Footer />
    </>
  );
}
