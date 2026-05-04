"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";
import type { TrainingCategory } from "@/data/trainingData";

// Map each slug to a lucide icon + accent colour
const ICON_MAP: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  dba: {
    icon: Database,
    color: "text-primary",
    bg: "bg-primary/8",
  },
  "data-platforms": {
    icon: Server,
    color: "text-accent",
    bg: "bg-accent/8",
  },
  "ai-for-data": {
    icon: BrainCircuit,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  architecture: {
    icon: Building2,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  "data-engineering": {
    icon: BarChart3,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  "ai-ml": {
    icon: Bot,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  product: {
    icon: Briefcase,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  devops: {
    icon: ShieldCheck,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  programming: {
    icon: Code2,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
};

interface TrainingCardProps {
  category: TrainingCategory;
  index: number;
}

export default function TrainingCard({ category, index }: TrainingCardProps) {
  const meta = ICON_MAP[category.slug] ?? {
    icon: Database,
    color: "text-primary",
    bg: "bg-primary/8",
  };
  const Icon = meta.icon;
  const courseCount = category.courses.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/training/${category.slug}`}
        aria-label={`Explore ${category.title} courses`}
        className="group flex flex-col h-full rounded-2xl bg-white border border-gray-100
          hover:border-primary/25 hover:shadow-[0_20px_48px_rgba(0,0,0,0.07)]
          hover:scale-[1.025] transition-all duration-300 overflow-hidden focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary/30 via-accent/40 to-primary/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex flex-col flex-1 p-7">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${meta.bg}
              group-hover:scale-110 transition-transform duration-300`}
            aria-hidden="true"
          >
            <Icon className={`w-6 h-6 ${meta.color}`} strokeWidth={1.75} />
          </div>

          {/* Title */}
          <h2 className="text-base font-bold text-dark-accent mb-2 leading-snug
            group-hover:text-primary transition-colors duration-200">
            {category.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-dark-accent/55 leading-relaxed flex-1 mb-5">
            {category.description}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs font-semibold text-dark-accent/40 uppercase tracking-widest">
              {courseCount} {courseCount === 1 ? "course" : "courses"}
            </span>
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary
                group-hover:gap-2 transition-all duration-200"
              aria-hidden="true"
            >
              Explore
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
