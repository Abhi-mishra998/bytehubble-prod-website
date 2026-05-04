"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import companyLogo from "@/assets/company-logs/company.png";

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({
  value,
  suffix = "",
  inView,
}: {
  value: number;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number;
    let raf: number;
    const run = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 2000, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * value));
      if (p < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [value, inView]);
  return (
    <>
      {count}
      {suffix}
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const METRICS = [
  { value: 3,   suffix: " min", label: "P1 Incident MTTR"     },
  { value: 8,   suffix: " sec", label: "Automated Failover"   },
  { value: 41,  suffix: "%",    label: "Cloud Cost Reduction" },
  { value: 90,  suffix: " sec", label: "Threat Detection"     },
  { value: 95,  suffix: "%",    label: "DBA On-Call Reduction"},
  { value: 500, suffix: "+",    label: "Engineers Trained"    },
];

const PILLARS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Incident & HA AI",
    desc: "Autonomous incident triage and high-availability orchestration for mission-critical PostgreSQL.",
    tags: ["Root Cause AI", "Auto Failover", "Self-Healing"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: "Query & Index Intelligence",
    desc: "AI-driven query performance optimization and automated index lifecycle management.",
    tags: ["Slow Query AI", "EXPLAIN Analysis", "HypoPG"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Capacity & FinOps AI",
    desc: "Predict infrastructure growth and continuously optimize database performance and cloud costs.",
    tags: ["90-day Forecast", "Cost Optimizer", "DR Orchestration"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Runbook GPT & Security AI",
    desc: "Enterprise operational intelligence, RAG-powered runbooks, and automated security compliance.",
    tags: ["RAG Runbooks", "PII Detection", "Compliance AI"],
  },
];

const CLOUD = [
  "AWS RDS / Aurora", "Azure PostgreSQL", "Google Cloud SQL",
  "Oracle Cloud", "Kubernetes", "Patroni",
  "Prometheus", "Terraform", "LangChain",
];

const CUSTOMERS = [
  {
    name: "Paycio",
    industry: "FinTech Payments",
    initial: "P",
    results: ["99.99% database uptime", "Automated incident triage", "PCI-DSS audit trails"],
  },
  {
    name: "LowTouch AI",
    industry: "AI Infrastructure",
    initial: "L",
    results: ["60% cloud cost reduction", "Enterprise RAG architecture", "Production vector DB platform"],
  },
  {
    name: "ChatBucket",
    industry: "Conversational AI",
    initial: "C",
    results: ["10× retrieval latency improvement", "Unified relational + vector arch", "Production LLM infrastructure"],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function About() {
  const metricsRef   = useRef<HTMLDivElement>(null);
  const pillarsRef   = useRef<HTMLDivElement>(null);
  const cloudRef     = useRef<HTMLDivElement>(null);
  const customersRef = useRef<HTMLDivElement>(null);

  const metricsInView   = useInView(metricsRef,   { once: true, margin: "-80px" });
  const pillarsInView   = useInView(pillarsRef,   { once: true, margin: "-80px" });
  const cloudInView     = useInView(cloudRef,     { once: true, margin: "-80px" });
  const customersInView = useInView(customersRef, { once: true, margin: "-80px" });

  return (
    <div className="overflow-hidden">

      {/* ══════════════════════════════════════════════════════════════
          HERO — dark purple, matches applied-ai-mastery card style
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-28 pb-24" style={{ background: "#0f0c3d" }}>

        {/* Grid overlay — exact same as applied-ai-mastery */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(46,42,143,0.25) 1px,transparent 1px),linear-gradient(90deg,rgba(46,42,143,0.25) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow blobs */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(46,42,143,0.6) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(42,199,214,0.12) 0%, transparent 65%)" }}
        />

        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

            {/* ── Left: text ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 text-center lg:text-left"
            >
              {/* Eyebrow */}
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-6"
                style={{ borderColor: "rgba(42,199,214,0.25)", background: "rgba(42,199,214,0.08)", color: "#2AC7D6" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ background: "#2AC7D6" }} />
                About ByteHubble
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-6" style={{ color: "#ffffff" }}>
                Autonomous{" "}
                <span style={{ background: "linear-gradient(90deg,#2AC7D6,#7dd3fc,#2E2A8F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  PostgreSQL
                </span>
                <br />Intelligence Platform
              </h1>

              <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
                ByteHubble is an AI-native database intelligence platform built to transform
                how enterprises operate PostgreSQL at scale — combining autonomous AI agents,
                deep database expertise, and cloud-agnostic architecture.
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {["SOC 2 Ready", "Cloud-Agnostic", "Enterprise SLA", "24/7 AI Ops"].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── Right: logo card — exact applied-ai-mastery dark card style ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0"
            >
              {/* Outer glow ring — same as curriculum sidebar card */}
              <div className="relative rounded-2xl p-7 shadow-2xl overflow-hidden w-72 sm:w-80" style={{ background: "#0f0c3d", border: "1px solid rgba(255,255,255,0.08)" }}>

                {/* Glow blobs inside card */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(46,42,143,0.6)" }} />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(42,199,214,0.15)" }} />

                <div className="relative z-10 flex flex-col items-center gap-5">
                  {/* Logo */}
                  <div className="relative w-44 h-12">
                    <Image src={companyLogo} alt="ByteHubble" fill className="object-contain" priority />
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

                  {/* Live status rows */}
                  <div className="w-full space-y-0">
                    {[
                      { dot: "#4ade80", label: "Platform Status", val: "Operational" },
                      { dot: "#2AC7D6", label: "AI Agents",       val: "Active"      },
                      { dot: "#a78bfa", label: "Uptime SLA",      val: "99.99%"      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between py-3"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: row.dot }} />
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{row.label}</span>
                        </div>
                        <span className="text-xs font-semibold" style={{ color: "#ffffff" }}>{row.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

                  {/* HQ */}
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Headquarters</p>
                    <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>Sterling, VA · Hyderabad, IN</p>
                  </div>

                  {/* CTA button — same style as "Reserve Your Seat" */}
                  <a
                    href="/contact"
                    className="block w-full text-center py-3 rounded-lg text-sm font-bold transition-opacity hover:opacity-90"
                    style={{ background: "#2AC7D6", color: "#0f0c3d" }}
                  >
                    Schedule a Demo →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to top, #F7F9FC, transparent)" }} />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          METRICS — white bg, primary gradient numbers
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">By the numbers</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-accent mt-3">
              Results that speak for themselves
            </h2>
          </motion.div>

          <div ref={metricsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl bg-white border border-gray-100 p-5 text-center
                  hover:border-primary/20 hover:shadow-[0_16px_40px_rgba(46,42,143,0.08)]
                  transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-2xl sm:text-3xl font-extrabold text-primary mb-1">
                  <Counter value={m.value} suffix={m.suffix} inView={metricsInView} />
                </p>
                <p className="text-[11px] font-medium text-dark-accent/50 leading-tight">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PLATFORM PILLARS — white bg, primary/accent accent colors
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Platform</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-accent mt-3 mb-4">
              Four AI systems. One unified platform.
            </h2>
            <p className="text-dark-accent/55 text-base max-w-2xl mx-auto">
              Working together to automate, optimize, and secure enterprise PostgreSQL operations around the clock.
            </p>
          </motion.div>

          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl bg-white border border-gray-100
                  hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]
                  transition-all duration-300 overflow-hidden p-7"
              >
                {/* Glow on hover — same as outcomes cards in applied-ai-mastery */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-300" />

                {/* Icon — same gradient as applied-ai-mastery icon boxes */}
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                  <div className="text-white relative z-10">{p.icon}</div>
                </div>

                <h3 className="text-base font-bold text-dark-accent mb-2 group-hover:text-primary transition-colors duration-200">
                  {p.title}
                </h3>
                <p className="text-sm text-dark-accent/55 leading-relaxed mb-5">{p.desc}</p>

                {/* Tags — same style as curriculum tags */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-background text-[11px] font-bold text-dark-accent/70 border border-gray-100 hover:border-primary/20 hover:text-primary transition-all duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CLOUD AGNOSTIC — background section
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-background border-t border-gray-100">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Integrations</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-accent mt-3 mb-3">
              Cloud-agnostic by design
            </h2>
            <p className="text-dark-accent/55 text-base max-w-xl mx-auto">
              ByteHubble's intelligence layer works across every major cloud and PostgreSQL deployment environment.
            </p>
          </motion.div>

          <div ref={cloudRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CLOUD.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={cloudInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05, type: "spring", stiffness: 220 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="group relative rounded-xl bg-white border border-gray-100 px-4 py-3.5 text-center
                  hover:border-primary/25 hover:shadow-md transition-all duration-250 overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-accent/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <span className="relative text-sm font-semibold text-dark-accent/70 group-hover:text-primary transition-colors duration-200">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CUSTOMER SUCCESS — white bg
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Customer Stories</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-accent mt-3 mb-3">
              Trusted by data-driven companies
            </h2>
            <p className="text-dark-accent/55 text-base max-w-xl mx-auto">
              Leading enterprises rely on ByteHubble to power their mission-critical database infrastructure.
            </p>
          </motion.div>

          <div ref={customersRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CUSTOMERS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 28 }}
                animate={customersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-white border border-gray-100
                  hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]
                  transition-all duration-300 overflow-hidden"
              >
                {/* Top gradient bar — same as applied-ai-mastery sidebar card accent */}
                <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

                <div className="p-7">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-black shadow-lg shadow-primary/20">
                      {c.initial}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark-accent group-hover:text-primary transition-colors duration-200">
                        {c.name}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent/70">{c.industry}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <ul className="space-y-3">
                    {c.results.map((r) => (
                      <li key={r} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-sm text-dark-accent/65 leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM CTA — dark purple, exact applied-ai-mastery style
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20" style={{ background: "#0f0c3d" }}>
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(46,42,143,0.25) 1px,transparent 1px),linear-gradient(90deg,rgba(46,42,143,0.25) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[700px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(42,199,214,0.08) 0%, transparent 70%)" }}
          />
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center gap-6 relative z-10"
          >
            {/* Logo */}
            <div className="relative w-44 h-12">
              <Image src={companyLogo} alt="ByteHubble" fill className="object-contain" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold max-w-2xl" style={{ color: "#ffffff" }}>
              Ready to put your databases on{" "}
              <span style={{ background: "linear-gradient(90deg,#2AC7D6,#7dd3fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                autopilot?
              </span>
            </h2>

            <p className="text-base max-w-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
              Join leading engineering teams who trust ByteHubble to automate, optimize, and secure their PostgreSQL infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="px-7 py-3 rounded-lg text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: "#2AC7D6", color: "#0f0c3d" }}
              >
                Schedule a Demo →
              </a>
              <a
                href="/training"
                className="px-7 py-3 rounded-lg text-sm font-semibold transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
              >
                Explore Training
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

    </div>
  );
}
