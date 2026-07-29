import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Sparkles,
  Users,
  Rocket,
  BookOpen,
  Globe2,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Footer from "@/sections/Footer";
import JobsExplorer from "@/components/careers/JobsExplorer";
import {
  CAREERS_EMAILS,
  CAREERS_FAQ,
  HIRING_CATEGORIES,
  HIRING_STAGES,
  JOB_OPENINGS,
  WHY_BYTEHUBBLE,
  buildApplyMailto,
} from "@/data/careersData";

const SITE_URL = "https://bytehubble.com";
const CANONICAL = `${SITE_URL}/careers`;
const PAGE_TITLE = "Careers — Build the Future of AI + Databases";
const PAGE_DESCRIPTION =
  "Join ByteHubble to build the AI intelligence layer for modern databases. Open roles across engineering, applied AI, and business — hybrid, remote, and on-site.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "ByteHubble careers",
    "database jobs",
    "PostgreSQL DBA jobs",
    "AI engineer jobs India",
    "MLOps jobs",
    "SRE hiring",
    "product engineer hiring",
    "remote engineering jobs",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: "ByteHubble",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// ────────────────────────────────────────────────────────────────
// JSON-LD JobPosting schema — one per featured opening.
// Content is fully static from careersData.ts — no user input, no XSS surface.
// Same pattern used in src/app/layout.tsx for the site-wide Organization schema.
// ────────────────────────────────────────────────────────────────

function employmentTypeLd(t: string): string {
  switch (t) {
    case "Full-time":
      return "FULL_TIME";
    case "Contract":
      return "CONTRACTOR";
    case "Internship":
      return "INTERN";
    default:
      return "FULL_TIME";
  }
}

function buildJobPostingLd() {
  return JOB_OPENINGS.filter((j) => j.featured).map((j) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description: [
      j.summary,
      j.responsibilities?.length
        ? "Responsibilities: " + j.responsibilities.join("; ") + "."
        : "",
      j.requirements?.length
        ? "Requirements: " + j.requirements.join("; ") + "."
        : "",
    ]
      .filter(Boolean)
      .join(" "),
    datePosted: j.postedOn,
    employmentType: employmentTypeLd(j.employmentType),
    hiringOrganization: {
      "@type": "Organization",
      name: "ByteHubble",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: j.location },
    },
    jobLocationType: j.workModel === "Remote" ? "TELECOMMUTE" : undefined,
    directApply: false,
    url: `${CANONICAL}#${j.id}`,
    identifier: { "@type": "PropertyValue", name: "ByteHubble", value: j.id },
  }));
}

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CAREERS_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

// Escape </script> to prevent HTML injection when embedding JSON in a script tag.
// ponytail: safe helper is a few lines; no library needed.
function safeJson(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

const whyIcons = [Users, Sparkles, Rocket, BookOpen, Globe2, Wallet];

export default function CareersPage() {
  const jobLd = buildJobPostingLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(jobLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(faqLd) }}
      />

      <div className="pt-20">
        {/* ─────────────── HERO ─────────────── */}
        <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-white to-background py-16 sm:py-20 lg:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(46,42,143,0.08),transparent_70%)]"
          />
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
                We&apos;re hiring across {HIRING_CATEGORIES.length} disciplines
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-dark-accent sm:text-5xl lg:text-6xl">
                Build technology <br className="hidden sm:block" />
                <span className="text-brand-gradient">that actually matters.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-dark-accent/70 sm:text-lg">
                ByteHubble is the AI intelligence layer for modern databases. We hire engineers,
                researchers, and operators who want to ship real systems to real customers —
                not slideware.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#openings"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
                >
                  View open roles
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={buildApplyMailto()}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-dark-accent transition-all hover:border-primary/30 hover:bg-gray-50 active:scale-[0.98]"
                >
                  Join talent network
                </a>
              </div>

              <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 border-t border-gray-200 pt-10 sm:grid-cols-4">
                {[
                  { v: `${JOB_OPENINGS.length}+`, l: "Open roles" },
                  { v: `${HIRING_CATEGORIES.length}`, l: "Disciplines" },
                  { v: "3", l: "Global offices" },
                  { v: "24m", l: "Talent-pool retention" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <dt className="text-2xl font-bold text-primary sm:text-3xl">{s.v}</dt>
                    <dd className="mt-1 text-xs font-medium text-dark-accent/60 sm:text-sm">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        {/* ─────────────── WHY BYTEHUBBLE ─────────────── */}
        <section className="py-20 lg:py-24" aria-labelledby="why-heading">
          <Container>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Why ByteHubble
              </span>
              <h2 id="why-heading" className="mt-3 text-3xl font-bold text-dark-accent sm:text-4xl">
                A place to do the best engineering of your career.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-dark-accent/60">
                No performative culture, no manufactured urgency — just serious people, real
                problems, and the space to solve them well.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_BYTEHUBBLE.map((item, i) => {
                const Icon = whyIcons[i % whyIcons.length];
                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-dark-accent">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-dark-accent/65">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ─────────────── HIRING CATEGORIES ─────────────── */}
        <section className="border-y border-gray-100 bg-white py-20 lg:py-24" aria-labelledby="categories-heading">
          <Container>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Where we hire
              </span>
              <h2 id="categories-heading" className="mt-3 text-3xl font-bold text-dark-accent sm:text-4xl">
                Roles across every discipline we build in.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-dark-accent/60">
                Even if a role isn&apos;t currently listed below, we&apos;re always looking for
                exceptional people in these areas.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {HIRING_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-bold text-dark-accent">{cat.label}</h3>
                    <span className="text-xs font-medium text-dark-accent/50">
                      {cat.roles.length} roles
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-dark-accent/65">
                    {cat.tagline}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {cat.roles.map((role) => (
                      <li
                        key={role}
                        className="rounded-full border border-gray-200 bg-background/50 px-2.5 py-1 text-[11px] font-medium text-dark-accent/75"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ─────────────── OPENINGS + FILTER ─────────────── */}
        <section id="openings" className="py-20 lg:py-24 scroll-mt-24" aria-labelledby="openings-heading">
          <Container>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Current openings
                </span>
                <h2 id="openings-heading" className="mt-3 text-3xl font-bold text-dark-accent sm:text-4xl">
                  Find your next role.
                </h2>
              </div>
              <p className="max-w-md text-sm text-dark-accent/60">
                Search, filter, and apply directly — we reply to every serious application within
                five business days.
              </p>
            </div>

            <JobsExplorer />
          </Container>
        </section>

        {/* ─────────────── TALENT NETWORK ─────────────── */}
        <section className="pb-20 lg:pb-24" aria-labelledby="talent-heading">
          <Container>
            <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/[0.04] to-accent/[0.06] p-8 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Talent network
                  </span>
                  <h2 id="talent-heading" className="mt-3 text-2xl font-bold text-dark-accent sm:text-3xl">
                    Don&apos;t see the right role today?
                  </h2>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-dark-accent/70">
                    Introduce yourself. We keep applications on file for up to 24 months and reach
                    out proactively when a role opens up that matches your background.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <a
                    href={buildApplyMailto()}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary/90 active:scale-[0.98]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Join talent network
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ─────────────── HOW TO APPLY ─────────────── */}
        <section className="border-y border-gray-100 bg-white py-20 lg:py-24" aria-labelledby="apply-heading">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  How to apply
                </span>
                <h2 id="apply-heading" className="mt-3 text-3xl font-bold text-dark-accent sm:text-4xl">
                  A single email. That&apos;s it.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-dark-accent/70">
                  We&apos;ve deliberately kept the application process short. No account, no long
                  form, no third-party portal. Send us your resume and we take it from there.
                </p>

                <ol className="mt-8 space-y-4">
                  {[
                    "Attach your resume (PDF preferred).",
                    "Mention your preferred role in the subject line.",
                    "Share current location, notice period, current & expected CTC.",
                    "Optionally include your LinkedIn or portfolio.",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm text-dark-accent/80">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-background/60 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-dark-accent/60">
                  Send your application to
                </p>
                <ul className="mt-4 space-y-4">
                  <EmailRow
                    email={CAREERS_EMAILS.primary}
                    label="Primary — Talent Team"
                    href={buildApplyMailto()}
                  />
                  <EmailRow
                    email={CAREERS_EMAILS.secondary}
                    label="Alternate — Hiring Manager"
                    href={`mailto:${CAREERS_EMAILS.secondary}`}
                  />
                </ul>

                <div className="mt-6 rounded-xl border border-primary/15 bg-white p-4 text-sm text-dark-accent/70">
                  <p className="font-semibold text-dark-accent">Suggested subject line</p>
                  <code className="mt-2 block rounded-md bg-background px-3 py-2 font-mono text-[13px] text-primary">
                    Application — [Role Name] — [Your Name]
                  </code>
                </div>

                <p className="mt-5 flex items-start gap-2 text-xs text-dark-accent/55">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                  ByteHubble never charges a fee at any stage of hiring. Report suspicious
                  outreach to {CAREERS_EMAILS.primary}.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ─────────────── HIRING PROCESS ─────────────── */}
        <section className="py-20 lg:py-24" aria-labelledby="process-heading">
          <Container>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Hiring process
              </span>
              <h2 id="process-heading" className="mt-3 text-3xl font-bold text-dark-accent sm:text-4xl">
                What to expect, end to end.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-dark-accent/60">
                Structured, respectful of your time, and typically wrapped up in two to three weeks.
              </p>
            </div>

            <ol className="relative mx-auto max-w-4xl space-y-6 border-l border-primary/15 pl-6 sm:space-y-8 sm:pl-8">
              {HIRING_STAGES.map((stage, i) => (
                <li key={stage.title} className="relative">
                  <span
                    className="absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary/20 bg-white text-xs font-bold text-primary sm:-left-[41px] sm:h-7 sm:w-7"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
                    <h3 className="text-base font-semibold text-dark-accent sm:text-lg">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-sm text-dark-accent/65">{stage.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* ─────────────── FAQ ─────────────── */}
        <section className="border-y border-gray-100 bg-white py-20 lg:py-24" aria-labelledby="faq-heading">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="mb-10 text-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Frequently asked
                </span>
                <h2 id="faq-heading" className="mt-3 text-3xl font-bold text-dark-accent sm:text-4xl">
                  Questions candidates ask.
                </h2>
              </div>

              <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
                {CAREERS_FAQ.map(({ q, a }) => (
                  <details
                    key={q}
                    className="group p-5 sm:p-6 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-dark-accent hover:text-primary">
                      <span>{q}</span>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-dark-accent/40 transition-transform duration-200 group-open:rotate-45"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-dark-accent/70">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ─────────────── CTA ─────────────── */}
        <section className="py-20 lg:py-24">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#1a4a9e] p-8 text-center shadow-xl shadow-primary/20 sm:p-12 lg:p-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
              />
              <h2 className="relative z-10 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Ready to help build the intelligence layer for modern databases?
              </h2>
              <p className="relative z-10 mx-auto mt-4 max-w-2xl text-base text-white/75">
                Whether a role listed above is a perfect match — or not quite — we want to hear
                from you.
              </p>
              <div className="relative z-10 mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#openings"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow-md transition-colors hover:bg-background"
                >
                  Browse open roles
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Learn about ByteHubble
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>

      <Footer />
    </>
  );
}

// ────────────────────────────────────────────────────────────────

function EmailRow({
  email,
  label,
  href,
}: {
  email: string;
  label: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10">
          <Mail className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium uppercase tracking-wider text-dark-accent/55">
            {label}
          </span>
          <span className="mt-0.5 block truncate text-sm font-semibold text-dark-accent group-hover:text-primary">
            {email}
          </span>
        </span>
        <ArrowRight
          className="mt-1 h-4 w-4 flex-shrink-0 text-dark-accent/30 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </a>
    </li>
  );
}
