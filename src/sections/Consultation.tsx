"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";

const EXPERTISE_TAGS = [
  "AI Infrastructure",
  "Database Optimization",
  "Cloud Architecture",
  "Enterprise DevOps",
  "PostgreSQL Performance",
  "Incident Automation",
];

const AREA_OPTIONS = [
  { value: "", label: "Select an area of interest" },
  { value: "database-optimization", label: "Database Optimization" },
  { value: "postgresql-performance", label: "PostgreSQL Performance" },
  { value: "ai-agents", label: "AI Agents for DB Operations" },
  { value: "enterprise-training", label: "Enterprise Training" },
  { value: "incident-automation", label: "Incident Automation" },
  { value: "platform-demo", label: "Platform Demo" },
];

interface FormData {
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  areaOfInterest: string;
  description: string;
}

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  phone?: string;
  company?: string;
  areaOfInterest?: string;
  description?: string;
}

export default function Consultation() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    workEmail: "",
    phone: "",
    company: "",
    areaOfInterest: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = "Enter a valid email address.";
    }
    // Validate phone only if provided (optional field)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }
    if (!formData.company.trim()) newErrors.company = "Company name is required.";
    if (!formData.areaOfInterest) newErrors.areaOfInterest = "Please select an area of interest.";
    if (!formData.description.trim()) newErrors.description = "Project description is required.";
    return newErrors;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Replace with actual API submission
    setSubmitted(true);
  }

  const inputBase =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-dark-accent placeholder:text-dark-accent/40 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none";

  return (
    <section className="py-20 lg:py-28 bg-background" id="consultation">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT — Contact Information */}
          <div className="flex flex-col justify-center">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-3">
              Get in Touch
            </span>
            <h2 className="text-3xl font-bold text-dark-accent sm:text-4xl lg:text-5xl">
              Schedule a Consultation
            </h2>
            <p className="mt-4 text-lg text-dark-accent/70 leading-relaxed max-w-lg">
              Connect with our experts to explore how ByteHubble can help
              optimize your database operations, reduce costs, and improve
              reliability.
            </p>

            {/* Contact details */}
            <div className="mt-10 space-y-6">
              <ContactItem
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                label="Email"
                value="support@bytehubble.ai"
                href="mailto:support@bytehubble.ai"
              />
              <ContactItem
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                label="Phone"
                value="+1 (555) 123-4567"
                href="tel:+15551234567"
              />
              <ContactItem
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                label="Location"
                value="San Francisco, CA"
              />
            </div>

            {/* Our Expertise */}
            <div className="mt-12">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-dark-accent/50 mb-4">
                Our Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-primary/5 text-xs font-medium text-primary border border-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Consultation Form */}
          <div>
            <div className="rounded-xl bg-white shadow-lg shadow-dark-accent/5 border border-gray-100 p-6 sm:p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark-accent mb-2">
                    Thank You!
                  </h3>
                  <p className="text-dark-accent/60 max-w-sm">
                    Your consultation request has been received. Our team will
                    reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-dark-accent mb-6">
                    Request a Consultation
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-dark-accent mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={`${inputBase} ${errors.fullName ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
                      />
                      {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label htmlFor="workEmail" className="block text-sm font-medium text-dark-accent mb-1.5">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="workEmail"
                        name="workEmail"
                        type="email"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={`${inputBase} ${errors.workEmail ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
                      />
                      {errors.workEmail && <p className="mt-1 text-xs text-red-500">{errors.workEmail}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-dark-accent mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={`${inputBase} ${errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-dark-accent mb-1.5">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className={`${inputBase} ${errors.company ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
                      />
                      {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
                    </div>

                    {/* Area of Interest */}
                    <div>
                      <label htmlFor="areaOfInterest" className="block text-sm font-medium text-dark-accent mb-1.5">
                        Area of Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="areaOfInterest"
                        name="areaOfInterest"
                        value={formData.areaOfInterest}
                        onChange={handleChange}
                        className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%231B1F5E%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10 ${errors.areaOfInterest ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
                      >
                        {AREA_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.areaOfInterest && <p className="mt-1 text-xs text-red-500">{errors.areaOfInterest}</p>}
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-dark-accent mb-1.5">
                        Project Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Briefly describe your current challenges or goals."
                        className={`${inputBase} resize-none ${errors.description ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
                      />
                      {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-brand-gradient text-white font-semibold py-3.5 rounded-lg shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                      Request Consultation
                    </button>

                    {/* Privacy disclaimer */}
                    <p className="text-xs text-dark-accent/40 leading-relaxed text-center">
                      By submitting this form, you agree to be contacted by the
                      ByteHubble team regarding your inquiry. We respect your
                      privacy and will never share your information.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── small helper ───────────────────────────────────────────────── */

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-dark-accent/40">
          {label}
        </p>
        <p className="text-sm font-semibold text-dark-accent mt-0.5">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}
