import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Footer from "@/sections/Footer";
import { trainingData, getCategoryBySlug } from "@/data/trainingData";
import {
  Database,
  Server,
  BrainCircuit,
  Building2,
  BarChart3,
  Bot,
  Briefcase,
  ShieldCheck,
  Code2,
  CheckCircle2,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

// ── Static params for Next.js SSG ─────────────────────────────────────────────
export function generateStaticParams() {
  return trainingData.map((c) => ({ category: c.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Not Found | ByteHubble" };
  return {
    title: `${cat.title} | Training | ByteHubble`,
    description: `${cat.description} Explore ${cat.courses.length} courses in ${cat.title} at ByteHubble.`,
  };
}

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; border: string }
> = {
  dba: {
    icon: Database,
    color: "text-primary",
    bg: "bg-primary/8",
    border: "border-primary/20",
  },
  "data-platforms": {
    icon: Server,
    color: "text-accent",
    bg: "bg-accent/8",
    border: "border-accent/20",
  },
  "ai-for-data": {
    icon: BrainCircuit,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  architecture: {
    icon: Building2,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
  },
  "data-engineering": {
    icon: BarChart3,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  "ai-ml": {
    icon: Bot,
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  product: {
    icon: Briefcase,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
  devops: {
    icon: ShieldCheck,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
  },
  programming: {
    icon: Code2,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);

  if (!cat) notFound();

  const meta = ICON_MAP[cat.slug] ?? {
    icon: Database,
    color: "text-primary",
    bg: "bg-primary/8",
    border: "border-primary/20",
  };
  const Icon = meta.icon;

  return (
    <>
      <div className="pt-20">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-20 lg:py-24 bg-gradient-to-b from-white to-background">
          <div
            className="absolute inset-0 pointer-events-none bg-grid-pattern"
            aria-hidden="true"
          />
          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-dark-accent/50">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/training" className="hover:text-primary transition-colors">
                    Training
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-dark-accent font-medium truncate max-w-[200px]">
                  {cat.title}
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${meta.bg} border ${meta.border}`}
                aria-hidden="true"
              >
                <Icon className={`w-8 h-8 ${meta.color}`} strokeWidth={1.75} />
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-dark-accent leading-tight tracking-tight mb-4">
                {cat.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-dark-accent/60 leading-relaxed mb-8 max-w-2xl">
                {cat.description}
              </p>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border ${meta.bg} ${meta.color} ${meta.border}`}
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  {cat.courses.length} {cat.courses.length === 1 ? "Course" : "Courses"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-dark-accent/60 border border-gray-200">
                  All Levels
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-dark-accent/60 border border-gray-200">
                  Instructor-led
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* ── COURSES LIST ── */}
        <section className="py-20 lg:py-24" aria-labelledby="courses-heading">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">

              {/* Left — course list */}
              <div>
                <h2
                  id="courses-heading"
                  className="text-2xl font-bold text-dark-accent mb-8"
                >
                  Available Courses
                </h2>

                {cat.courses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl bg-white border border-gray-100">
                    <BookOpen className="w-10 h-10 text-dark-accent/20 mb-4" aria-hidden="true" />
                    <p className="text-dark-accent/50 font-medium">Courses coming soon</p>
                    <p className="text-sm text-dark-accent/35 mt-1">
                      Check back shortly or contact us for details.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-3" role="list">
                    {cat.courses.map((course, i) => (
                      <li
                        key={i}
                        className="group flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-100
                          hover:border-primary/20 hover:shadow-md transition-all duration-200"
                      >
                        <CheckCircle2
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${meta.color} opacity-70 group-hover:opacity-100 transition-opacity`}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-dark-accent/80 group-hover:text-dark-accent transition-colors leading-relaxed">
                          {course}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Right — sticky sidebar */}
              <aside className="lg:sticky lg:top-28 space-y-4" aria-label="Enrollment information">
                {/* Enroll card */}
                <div
                  className="rounded-2xl p-7 shadow-xl relative overflow-hidden"
                  style={{ background: "#0f0c3d" }}
                >
                  <div className="relative z-10">
                    <span
                      className="text-xs font-semibold uppercase tracking-widest block mb-1"
                      style={{ color: "#2AC7D6" }}
                    >
                      Get Started
                    </span>
                    <h3
                      className="text-lg font-bold mt-2 mb-1 leading-snug"
                      style={{ color: "#ffffff" }}
                    >
                      {cat.title}
                    </h3>
                    <p
                      className="text-sm font-medium mb-6"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {cat.courses.length} courses available
                    </p>

                    <div className="space-y-0 mb-6">
                      {[
                        ["Format", "Instructor-led"],
                        ["Level", "All Levels"],
                        ["Certificate", "ByteHubble Certified"],
                      ].map(([k, v]) => (
                        <div
                          key={k}
                          className="flex justify-between items-center py-3"
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          <span
                            className="text-xs font-medium"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                          >
                            {k}
                          </span>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "#ffffff" }}
                          >
                            {v}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="block w-full text-center py-3 rounded-lg text-sm font-bold
                        transition-opacity hover:opacity-90"
                      style={{ background: "#2AC7D6", color: "#0f0c3d" }}
                    >
                      Enquire Now →
                    </Link>
                  </div>
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                    style={{ background: "rgba(46,42,143,0.6)" }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                    style={{ background: "rgba(42,199,214,0.15)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Back link */}
                <Link
                  href="/training"
                  className="flex items-center gap-2 text-sm font-medium text-dark-accent/50
                    hover:text-primary transition-colors duration-200 px-1"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Back to all programs
                </Link>
              </aside>
            </div>
          </Container>
        </section>

        {/* ── OTHER CATEGORIES ── */}
        <section className="py-16 bg-white border-t border-gray-100" aria-labelledby="other-heading">
          <Container>
            <h2
              id="other-heading"
              className="text-xl font-bold text-dark-accent mb-6"
            >
              Explore other categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {trainingData
                .filter((c) => c.slug !== cat.slug)
                .map((c) => {
                  const m = ICON_MAP[c.slug] ?? {
                    icon: Database,
                    color: "text-primary",
                    bg: "bg-primary/8",
                    border: "border-primary/20",
                  };
                  const CatIcon = m.icon;
                  return (
                    <Link
                      key={c.slug}
                      href={`/training/${c.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background
                        border border-gray-200 text-sm font-medium text-dark-accent/70
                        hover:border-primary/30 hover:text-primary hover:bg-white
                        transition-all duration-200"
                    >
                      <CatIcon className={`w-4 h-4 ${m.color}`} strokeWidth={1.75} aria-hidden="true" />
                      {c.title}
                    </Link>
                  );
                })}
            </div>
          </Container>
        </section>
      </div>

      <Footer />
    </>
  );
}
