"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { useConsultationModal } from "@/context/ConsultationModalContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const TRUST_BADGES = [
  { label: "No credit card required" },
  { label: "14-day free trial" },
  { label: "Cancel anytime" },
];

const STATS = [
  { value: "98%", label: "Uptime SLA" },
  { value: "3 min", label: "P1 MTTR" },
  { value: "41%", label: "Cost Reduction" },
  { value: "500+", label: "Engineers Trained" },
];

export default function Hero() {
  const { openModal } = useConsultationModal();

  const scrollToContent = () => {
    document.getElementById("problem-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-background to-white pt-20 pb-0">

      {/* ── Background layers ─────────────────────────────────────── */}
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(46,42,143,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(46,42,143,0.08) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial glow — top right */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(42,199,214,0.08) 0%, transparent 65%)",
        }}
      />
      {/* Radial glow — bottom left */}
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(46,42,143,0.12) 0%, transparent 65%)",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">

        {/* Top eyebrow badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-7"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Enterprise AI Database Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-dark-accent">
            AI Agents That{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary-blue bg-clip-text text-transparent">
                Handle Your Databases
              </span>
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "100%" }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-center text-base sm:text-lg text-dark-accent/70 leading-relaxed max-w-2xl mx-auto"
        >
          ByteHubble is the AI intelligence layer your PostgreSQL stack is missing —
          combining enterprise knowledge RAG, autonomous DB agents, self-healing incident AI,
          and world-class database training.
        </motion.p>

        {/* CTA row */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.03, boxShadow: "0 0 32px rgba(46,42,143,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5
              px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white
              bg-gradient-to-r from-primary to-secondary-blue
              shadow-[0_0_20px_rgba(46,42,143,0.3)]
              hover:shadow-[0_0_36px_rgba(46,42,143,0.5)]
              transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule a Demo
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={scrollToContent}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5
              px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-dark-accent/80
              border border-dark-accent/15 bg-dark-accent/5
              hover:bg-dark-accent/10 hover:border-dark-accent/30 hover:text-dark-accent
              transition-all duration-300"
          >
            Learn More
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {TRUST_BADGES.map((b) => (
            <span key={b.label} className="flex items-center gap-1.5 text-xs text-dark-accent/60 font-medium">
              <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {b.label}
            </span>
          ))}
        </motion.div>

        {/* ── Dashboard preview card ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 relative max-w-5xl mx-auto px-2 sm:px-0"
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-sm opacity-40" />
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 blur-xl opacity-30" />

          {/* Card shell */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-[0_32px_80px_rgba(0,0,0,0.08)]">

            {/* Window chrome bar */}
            <div className="flex items-center gap-2 px-4 sm:px-5 h-10 bg-gray-50 border-b border-gray-200">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-3 flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-gray-200">
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
                <span className="text-[11px] text-dark-accent/60 font-mono">bytehubble.ai / dashboard</span>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="p-4 sm:p-6 lg:p-8">

              {/* Top metric row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.08 }}
                    whileHover={{ y: -3, borderColor: "rgba(46,42,143,0.3)" }}
                    className="group rounded-xl border border-gray-200 bg-gray-50 p-4
                      hover:bg-gray-100 transition-all duration-300 cursor-default"
                  >
                    <p className="text-xl sm:text-2xl font-bold text-dark-accent mb-0.5">{s.value}</p>
                    <p className="text-[11px] text-dark-accent/60 font-medium uppercase tracking-wider">{s.label}</p>
                    <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" />
                  </motion.div>
                ))}
              </div>

              {/* Main panel row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">

                {/* DB Health */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 }}
                  whileHover={{ borderColor: "rgba(46,42,143,0.3)", y: -2 }}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-5
                    hover:bg-gray-100 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-dark-accent/60">
                      DB Health
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-4xl font-extrabold text-dark-accent">98</span>
                    <span className="text-lg font-bold text-emerald-600">%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "98%" }}
                      transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-dark-accent/50">All systems operational</p>
                </motion.div>

                {/* Active Queries */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95 }}
                  whileHover={{ borderColor: "rgba(46,42,143,0.3)", y: -2 }}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-5
                    hover:bg-gray-100 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-dark-accent/60">
                      Active Queries
                    </span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </motion.div>
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-4xl font-extrabold text-dark-accent">124</span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[65, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 1.1 + i * 0.05, duration: 0.4 }}
                        className="flex-1 rounded-sm bg-primary/30 origin-bottom"
                        style={{ height: `${h * 0.28}px` }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] text-dark-accent/50">AI analyzing performance</p>
                </motion.div>

                {/* AI Recommendation */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.05 }}
                  whileHover={{ borderColor: "rgba(46,42,143,0.3)", y: -2 }}
                  className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-5
                    hover:from-primary/8 hover:to-accent/8 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
                      AI Insight
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center"
                    >
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </motion.div>
                  </div>
                  <p className="text-sm text-dark-accent/70 leading-relaxed mb-3">
                    Add index on{" "}
                    <code className="px-1.5 py-0.5 rounded bg-gray-200 text-primary text-[11px] font-mono">
                      users.email
                    </code>{" "}
                    to reduce query latency by{" "}
                    <span className="text-emerald-600 font-semibold">63%</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[11px] text-dark-accent/50">Confidence: 97%</span>
                  </div>
                </motion.div>
              </div>

              {/* Bottom status bar */}
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 sm:gap-5 px-1">
                {[
                  { dot: "bg-emerald-500", label: "PostgreSQL 16 · Primary" },
                  { dot: "bg-primary", label: "3 Replicas synced" },
                  { dot: "bg-yellow-500", label: "1 Slow query detected" },
                ].map((item) => (
                  <span key={item.label} className="flex items-center gap-1.5 text-[11px] text-dark-accent/50">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                    {item.label}
                  </span>
                ))}
                <span className="ml-auto text-[11px] text-dark-accent/40 font-mono hidden sm:block">
                  Last sync: just now
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-10 sm:mt-12 flex justify-center"
        >
          <motion.button
            onClick={scrollToContent}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5 text-dark-accent/30 hover:text-dark-accent/60 transition-colors duration-200"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Explore</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </motion.div>

      </Container>
    </section>
  );
}
