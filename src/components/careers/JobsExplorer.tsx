"use client";

import { useMemo, useState, useId } from "react";
import { Search, MapPin, Briefcase, Clock, Globe2, X } from "lucide-react";
import {
  JOB_OPENINGS,
  JOB_FACETS,
  buildApplyMailto,
  type JobOpening,
} from "@/data/careersData";

const ALL = "All";

interface Filters {
  q: string;
  department: string;
  location: string;
  workModel: string;
  employmentType: string;
  experience: string;
}

const EMPTY_FILTERS: Filters = {
  q: "",
  department: ALL,
  location: ALL,
  workModel: ALL,
  employmentType: ALL,
  experience: ALL,
};

function matches(job: JobOpening, f: Filters): boolean {
  if (f.department !== ALL && job.department !== f.department) return false;
  if (f.location !== ALL && job.location !== f.location) return false;
  if (f.workModel !== ALL && job.workModel !== f.workModel) return false;
  if (f.employmentType !== ALL && job.employmentType !== f.employmentType) return false;
  if (f.experience !== ALL && job.experience !== f.experience) return false;
  const q = f.q.trim().toLowerCase();
  if (!q) return true;
  return (
    job.title.toLowerCase().includes(q) ||
    job.department.toLowerCase().includes(q) ||
    job.summary.toLowerCase().includes(q) ||
    job.location.toLowerCase().includes(q)
  );
}

export default function JobsExplorer() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const searchId = useId();

  const results = useMemo(
    () => JOB_OPENINGS.filter((j) => matches(j, filters)),
    [filters],
  );

  const activeCount =
    (filters.q.trim() ? 1 : 0) +
    Number(filters.department !== ALL) +
    Number(filters.location !== ALL) +
    Number(filters.workModel !== ALL) +
    Number(filters.employmentType !== ALL) +
    Number(filters.experience !== ALL);

  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      {/* Filter bar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
        <label htmlFor={searchId} className="sr-only">
          Search openings
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-accent/40"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            value={filters.q}
            onChange={(e) => update("q", e.target.value)}
            placeholder="Search by title, team, location, or skill…"
            className="w-full rounded-xl border border-gray-200 bg-background/50 py-3 pl-11 pr-10 text-sm text-dark-accent placeholder:text-dark-accent/40 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {filters.q && (
            <button
              type="button"
              onClick={() => update("q", "")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-dark-accent/40 hover:bg-gray-100 hover:text-dark-accent"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <FilterSelect
            label="Department"
            value={filters.department}
            options={JOB_FACETS.departments}
            onChange={(v) => update("department", v)}
          />
          <FilterSelect
            label="Location"
            value={filters.location}
            options={JOB_FACETS.locations}
            onChange={(v) => update("location", v)}
          />
          <FilterSelect
            label="Work model"
            value={filters.workModel}
            options={JOB_FACETS.workModels}
            onChange={(v) => update("workModel", v)}
          />
          <FilterSelect
            label="Type"
            value={filters.employmentType}
            options={JOB_FACETS.employmentTypes}
            onChange={(v) => update("employmentType", v)}
          />
          <FilterSelect
            label="Experience"
            value={filters.experience}
            options={JOB_FACETS.experience}
            onChange={(v) => update("experience", v)}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <p
            className="text-sm text-dark-accent/70"
            role="status"
            aria-live="polite"
          >
            <span className="font-semibold text-dark-accent">{results.length}</span>{" "}
            {results.length === 1 ? "opening" : "openings"}
            {activeCount > 0 && (
              <span className="text-dark-accent/50"> · {activeCount} filter{activeCount === 1 ? "" : "s"} active</span>
            )}
          </p>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="text-sm font-medium text-primary hover:text-accent"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        {results.length === 0 ? (
          <EmptyState onReset={() => setFilters(EMPTY_FILTERS)} />
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {results.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-semibold uppercase tracking-wider text-dark-accent/60"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm text-dark-accent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value={ALL}>All</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-accent/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────

function JobCard({ job }: { job: JobOpening }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {job.department}
          </p>
          <h3 className="mt-1 text-lg font-bold text-dark-accent group-hover:text-primary transition-colors">
            {job.title}
          </h3>
        </div>
        {job.urgentHire && (
          <span className="whitespace-nowrap rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            Immediate
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-dark-accent/70 leading-relaxed line-clamp-3">
        {job.summary}
      </p>

      <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-dark-accent/70">
        <Meta icon={<MapPin className="h-3.5 w-3.5" />} label={job.location} />
        <Meta icon={<Globe2 className="h-3.5 w-3.5" />} label={job.workModel} />
        <Meta icon={<Briefcase className="h-3.5 w-3.5" />} label={job.employmentType} />
        <Meta icon={<Clock className="h-3.5 w-3.5" />} label={job.experienceYears} />
      </dl>

      <div className="mt-5 flex-1" />

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs text-dark-accent/50">
          Posted {formatDate(job.postedOn)}
        </span>
        <a
          href={buildApplyMailto(job)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
        >
          Apply
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  );
}

function Meta({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-dark-accent/40">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
        <Search className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-dark-accent">
        No matching openings — yet.
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-dark-accent/60">
        Don&apos;t see the right role? Join our talent network and we&apos;ll reach out when
        something matching your profile opens up.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-dark-accent hover:bg-gray-50"
        >
          Reset filters
        </button>
        <a
          href={buildApplyMailto()}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Join talent network
        </a>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
