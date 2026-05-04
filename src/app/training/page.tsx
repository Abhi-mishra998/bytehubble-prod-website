import type { Metadata } from "next";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Footer from "@/sections/Footer";
import TrainingGrid from "@/components/training/TrainingGrid";
import { trainingData } from "@/data/trainingData";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Training Programs | ByteHubble",
  description:
    "Explore ByteHubble's professional training programs across database administration, AI/ML engineering, data platforms, architecture, and more.",
};

export default function TrainingPage() {
  const totalCourses = trainingData.reduce((sum, c) => sum + c.courses.length, 0);

  return (
    <>
      <div className="pt-20">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-background">
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none bg-grid-pattern"
            aria-hidden="true"
          />

          <Container>
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="flex justify-center mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                  {trainingData.length} Categories · {totalCourses}+ Courses
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark-accent leading-tight tracking-tight mb-5">
                Professional{" "}
                <span className="text-primary">Training</span>{" "}
                <span className="text-accent">Programs</span>
              </h1>

              <p className="text-base sm:text-lg text-dark-accent/60 leading-relaxed max-w-2xl mx-auto mb-10">
                Industry-led courses across database engineering, AI/ML, cloud architecture,
                and data platforms — built for engineers who want to level up fast.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#categories"
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md shadow-primary/25
                    hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]
                    transition-all duration-200 text-sm"
                >
                  Browse Categories →
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-gray-300 text-dark-accent/80 font-semibold rounded-lg
                    hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98] transition-all duration-200 text-sm"
                >
                  Request Custom Training
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* ── STATS ── */}
        <section className="py-12 bg-white border-y border-gray-100" aria-label="Program statistics">
          <Container>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
              {[
                { value: `${trainingData.length}`, label: "Categories" },
                { value: `${totalCourses}+`, label: "Courses" },
                { value: "500+", label: "Engineers Trained" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-3xl font-bold text-primary mb-1">{stat.value}</dt>
                  <dd className="text-sm text-dark-accent/60 font-medium">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* ── CATEGORIES GRID ── */}
        <section id="categories" className="py-20 lg:py-24">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                All Programs
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-accent mt-3 mb-4 leading-tight">
                Choose your learning path
              </h2>
              <p className="text-dark-accent/55 text-base leading-relaxed">
                Click any category to explore the full course list. Each program is designed
                by practitioners with real-world production experience.
              </p>
            </div>

            <TrainingGrid categories={trainingData} />
          </Container>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-white border-t border-gray-100">
          <Container>
            <div className="rounded-3xl bg-gradient-to-br from-primary to-[#1a4a9e] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-xl shadow-primary/20">
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(42,199,214,0.15)" }}
                aria-hidden="true"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 relative z-10">
                Need a custom curriculum?
              </h2>
              <p className="text-white/70 text-base mb-8 max-w-xl mx-auto relative z-10">
                We design bespoke training programs for enterprises and institutions.
                Talk to our team to build the right program for your organisation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-white text-primary font-semibold rounded-lg
                    hover:bg-background transition-colors duration-200 text-sm shadow-md"
                >
                  Contact Us
                </Link>
                <Link
                  href="/training/applied-ai-mastery"
                  className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-lg
                    hover:bg-white/10 transition-colors duration-200 text-sm"
                >
                  View Flagship Program →
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
