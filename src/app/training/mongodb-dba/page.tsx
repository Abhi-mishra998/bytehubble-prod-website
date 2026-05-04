"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import Footer from "@/sections/Footer";
import bhLogo from "@/assets/company-logs/company.png";

const PARTNERS = [
  { logo: bhLogo,    alt: "ByteHubble",      name: "ByteHubble"     },
];

const STATS = [
  { value: "12",  label: "Weeks",          sub: "Full-time program"   },
  { value: "11",  label: "Modules",        sub: "Comprehensive topics" },
  { value: "1",   label: "Capstone",       sub: "Real-world project"  },
  { value: "100%", label: "Hands-On",      sub: "Practical labs"      },
];

const OUTCOMES = [
  { icon: "🗄️", tag: "Administration",   title: "MongoDB Administration",    desc: "Master installation, configuration, user management, and day-to-day MongoDB operations in production." },
  { icon: "📈", tag: "Scalability",       title: "Replication & Sharding",    desc: "Design and implement replica sets for high availability and sharded clusters for horizontal scaling." },
  { icon: "⚡", tag: "Performance",       title: "Performance Optimization",  desc: "Index design, query optimization, explain plans, and profiler-based performance tuning." },
  { icon: "🔒", tag: "Security",          title: "Security & Compliance",     desc: "Authentication, authorization, encryption at rest/transit, and enterprise security controls." },
  { icon: "💾", tag: "Data Protection",   title: "Backup & Recovery",         desc: "Backup strategies, point-in-time recovery, disaster recovery planning and execution." },
  { icon: "☁️", tag: "Cloud Deployment",  title: "MongoDB Atlas & Cloud",     desc: "Deploy, manage, and optimize MongoDB in cloud environments using Atlas platform." },
];

const CURRICULUM = [
  { phase:"01", weeks:"Weeks 1–2",   title:"Introduction to MongoDB", desc:"NoSQL fundamentals, MongoDB architecture, BSON format, installation, configuration, and basic connectivity testing.", tags:["NoSQL Concepts","Architecture","Installation","BSON Format","Configuration"] },
  { phase:"02", weeks:"Weeks 2–3",   title:"CRUD Operations", desc:"insertOne/insertMany, find queries, filters, projections, sorting, update/delete operations, and query operators.", tags:["Insert/Update/Delete","find() Queries","Filters","Operators","Pagination"] },
  { phase:"03", weeks:"Weeks 3–4",   title:"Indexing & Performance", desc:"Single/compound/multikey indexes, text/geospatial indexes, query optimization with explain plans, and performance tuning.", tags:["Index Types","Query Optimization","explain() Plans","Hints","Performance"] },
  { phase:"04", weeks:"Weeks 4–5",   title:"Data Modeling", desc:"Schema design principles, embedding vs referencing, relationships, normalization, scalable patterns, and design best practices.", tags:["Schema Design","Embedding","Referencing","Relationships","Best Practices"] },
  { phase:"05", weeks:"Weeks 6–7",   title:"Replication", desc:"Replica set architecture, primary/secondary roles, automatic failover, elections, write concern, read preferences, and oplog management.", tags:["Replica Sets","Failover","Elections","Write Concern","Read Preferences"] },
  { phase:"06", weeks:"Weeks 7–8",   title:"Sharding", desc:"Shard key design, shard cluster components, data distribution, chunk management, balancer operation, and migration monitoring.", tags:["Shard Keys","Cluster Components","Balancer","Chunk Migration","Distribution"] },
  { phase:"07", weeks:"Weeks 8–10",  title:"Security", desc:"Authentication methods, RBAC, role creation, encryption at rest/transit, TLS/SSL, IP whitelisting, and network security.", tags:["Authentication","RBAC","Encryption","TLS/SSL","Network Security"] },
  { phase:"08", weeks:"Weeks 10–11", title:"Backup & Recovery", desc:"Backup methods (mongodump, snapshots), recovery procedures, point-in-time restore, oplog-based recovery, and planning.", tags:["Backup Methods","mongodump","Snapshots","Point-in-time","Disaster Recovery"] },
  { phase:"09", weeks:"Weeks 11",    title:"Monitoring & Diagnostics", desc:"mongostat, mongotop, serverStatus, profiler, slow logs, query analysis, Cloud Manager monitoring and alerting.", tags:["Monitoring Tools","Profiler","Slow Logs","Cloud Manager","Alerts"] },
];

const MODULES = [
  { num: "01", badge: "Core", title: "NoSQL & MongoDB Basics", desc: "Document-oriented design, BSON format, MongoDB architecture, and core concepts for modern databases.", tags: ["NoSQL", "BSON", "Architecture", "Design"] },
  { num: "02", badge: "Core", title: "CRUD Operations Mastery", desc: "Complete data manipulation with insert, read, update, delete, and advanced query operators.", tags: ["CRUD", "Queries", "Operators", "Filtering"] },
  { num: "03", badge: "Performance", title: "Indexing & Query Optimization", desc: "Index strategies, query plans, performance analysis, and real-world optimization techniques.", tags: ["Indexes", "Optimization", "explain()", "Performance"] },
  { num: "04", badge: "Architecture", title: "Data Modeling Patterns", desc: "Schema design, embedding strategies, relationship patterns, and scalable data structures.", tags: ["Schema Design", "Embedding", "Patterns", "Scalability"] },
  { num: "05", badge: "HA", title: "Replication & HA", desc: "Replica sets, failover, read preferences, write concern, and high-availability architecture.", tags: ["Replica Sets", "Failover", "HA", "Replication"] },
  { num: "06", badge: "Scaling", title: "Sharding for Scale", desc: "Shard key design, cluster architecture, chunk management, and horizontal scaling strategies.", tags: ["Sharding", "Scaling", "Distribution", "Balancer"] },
  { num: "07", badge: "Security", title: "Security & Compliance", desc: "Authentication, authorization, encryption, TLS/SSL, auditing, and enterprise security controls.", tags: ["Auth", "RBAC", "Encryption", "Security"] },
  { num: "08", badge: "Operations", title: "Backup & Recovery", desc: "Backup strategies, recovery procedures, disaster planning, and data protection best practices.", tags: ["Backup", "Recovery", "Protection", "DR"] },
  { num: "09", badge: "Monitoring", title: "Monitoring & Diagnostics", desc: "Performance monitoring, profiling, slow logs, Cloud Manager integration, and troubleshooting.", tags: ["Monitoring", "Profiler", "Analytics", "Alerts"] },
];

const SOURCE_OPTIONS = ["LinkedIn","Instagram","Friend / Referral","JTBI Notice Board","YouTube","Google Search","Other"];
const DEGREE_OPTIONS = ["B.Tech / B.E.","M.Tech / M.E.","MCA","BCA","BSc Computer Science","Other"];
const GRAD_YEARS     = ["2024","2025","2026","2027","2028"];

function SectionLabel({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 px-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{label}</span>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-accent mt-3 mb-4 leading-tight">{title}</h2>
      {desc && <p className="text-dark-accent/60 text-sm sm:text-base leading-relaxed">{desc}</p>}
    </div>
  );
}

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
      {index !== CURRICULUM.length - 1 && (
        <div className="absolute left-[21px] top-11 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 to-transparent" />
      )}
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
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <div className="text-xs font-semibold text-primary/70 mb-1">{weeks}</div>
            <h3 className="text-lg sm:text-xl font-bold text-dark-accent">{title}</h3>
          </div>
        </div>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-dark-accent/60 text-sm mt-4 leading-relaxed">{desc}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-primary/8 text-xs font-semibold text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function RegistrationForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    graduationYear: "", degree: "", college: "",
    motivation: "", source: "", agreed: false
  });
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(p => ({ ...p, [name]: value }));
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
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          course: "MongoDB DBA",
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
        <p className="text-dark-accent/60 text-sm">We&apos;ll email you within 24 hours with next steps.</p>
      </motion.div>
    );
  }

  const inp = "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-sm text-dark-accent placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 hover:border-gray-400 transition-all duration-200";
  const lbl = "block text-xs font-semibold text-dark-accent/70 mb-1.5";

  return (
    <form onSubmit={submit} className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div><label className={lbl}>First Name <span className="text-primary">*</span></label><input required name="firstName" value={form.firstName} onChange={set} placeholder="Arjun" className={inp} /></div>
        <div><label className={lbl}>Last Name <span className="text-primary">*</span></label><input required name="lastName" value={form.lastName} onChange={set} placeholder="Sharma" className={inp} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div><label className={lbl}>Email <span className="text-primary">*</span></label><input required type="email" name="email" value={form.email} onChange={set} placeholder="arjun@example.com" className={inp} /></div>
        <div><label className={lbl}>Phone <span className="text-primary">*</span></label><input required name="phone" value={form.phone} onChange={set} placeholder="+91 98765 43210" className={inp} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={lbl}>Grad Year <span className="text-primary">*</span></label>
          <select required name="graduationYear" value={form.graduationYear} onChange={set} className={`${inp} appearance-none`}>
            <option value="">Select</option>
            {GRAD_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label className={lbl}>Degree <span className="text-primary">*</span></label>
          <select required name="degree" value={form.degree} onChange={set} className={`${inp} appearance-none`}>
            <option value="">Select</option>
            {DEGREE_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div><label className={lbl}>College / University <span className="text-primary">*</span></label><input required name="college" value={form.college} onChange={set} placeholder="e.g. JNTU Hyderabad" className={inp} /></div>
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
          I agree to the program terms and commit to the 12-week schedule. Seats are limited and subject to selection.
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

export default function MongoDBDBAPage() {
  return (
    <>
      <div className="pt-20">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-background">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(46,42,143,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(46,42,143,0.04) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
          <Container>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="max-w-3xl mx-auto text-center">
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
                  Master NoSQL Administration · 2025
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark-accent leading-tight tracking-tight mb-5">
                MongoDB<br />
                <span className="text-primary">DBA</span> <span className="text-primary">Mastery</span>
              </h1>
              <p className="text-base sm:text-lg text-dark-accent/60 leading-relaxed max-w-2xl mx-auto mb-8">
                Complete NoSQL database administration — from fundamentals through production deployment, replication, sharding, and cloud management with MongoDB Atlas.
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

        {/* ── Learning Outcomes ── */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <Container>
            <SectionLabel label="Learning Outcomes" title="What You'll Master" desc="Comprehensive skills for MongoDB administration in production environments" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {OUTCOMES.map((o, i) => (
                <motion.div
                  key={o.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-background to-white border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{o.icon}</div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-primary/8 text-xs font-semibold text-primary mb-3">{o.tag}</span>
                  <h3 className="text-lg font-bold text-dark-accent mb-2">{o.title}</h3>
                  <p className="text-sm text-dark-accent/60 leading-relaxed">{o.desc}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Curriculum ── */}
        <section id="curriculum" className="py-16 sm:py-20 lg:py-24 bg-background">
          <Container>
            <SectionLabel label="Program Structure" title="12-Week Curriculum" desc="Master MongoDB administration through structured learning and practical application" />
            <div className="max-w-3xl mx-auto">
              {CURRICULUM.map((phase, i) => (
                <PhaseItem key={phase.phase} {...phase} index={i} />
              ))}
            </div>
          </Container>
        </section>

        {/* ── Modules ── */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <Container>
            <SectionLabel label="Core Modules" title="Comprehensive Topics" desc="11 detailed modules covering all aspects of MongoDB administration" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULES.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl font-bold text-primary">{m.num}</div>
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">{m.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-dark-accent mb-2">{m.title}</h3>
                  <p className="text-sm text-dark-accent/60 mb-4">{m.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded text-xs font-medium bg-primary/5 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Application Form ── */}
        <section id="apply" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-background">
          <Container>
            <div className="max-w-2xl mx-auto">
              <SectionLabel label="Apply Now" title="Join the MongoDB DBA Program" desc="Fill out the application form below. Limited seats available." />
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
