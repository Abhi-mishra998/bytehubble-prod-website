"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConsultationModal } from "@/context/ConsultationModalContext";

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

export default function ConsultationModal() {
  const { isOpen, closeModal } = useConsultationModal();
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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay to allow exit animation
      const timer = setTimeout(() => {
        setFormData({
          fullName: "",
          workEmail: "",
          phone: "",
          company: "",
          areaOfInterest: "",
          description: "",
        });
        setErrors({});
        setSubmitted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = "Enter a valid email address.";
    }
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
    setSubmitted(true);
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  const inputBase =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-dark-accent placeholder:text-dark-accent/40 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-dark-accent/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl mx-2 sm:mx-0"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 text-dark-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className="w-20 h-20 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-dark-accent mb-3">
                  Thank You!
                </h3>
                <p className="text-dark-accent/60 max-w-sm mb-8">
                  Your consultation request has been received. Our team will reach out within 24 hours.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-brand-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="p-5 sm:p-8">
                {/* Header */}
                <div className="mb-8 pr-10">
                  <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                    Get in Touch
                  </span>
                  <h2 className="text-2xl font-bold text-dark-accent">
                    Schedule a Consultation
                  </h2>
                  <p className="mt-2 text-dark-accent/60 text-sm leading-relaxed">
                    Connect with our experts to explore how ByteHubble can help optimize your database operations.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Full Name */}
                  <div>
                    <label htmlFor="modal-fullName" className="block text-sm font-medium text-dark-accent mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="modal-fullName"
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
                    <label htmlFor="modal-workEmail" className="block text-sm font-medium text-dark-accent mb-1.5">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="modal-workEmail"
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
                    <label htmlFor="modal-phone" className="block text-sm font-medium text-dark-accent mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="modal-phone"
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
                    <label htmlFor="modal-company" className="block text-sm font-medium text-dark-accent mb-1.5">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="modal-company"
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
                    <label htmlFor="modal-areaOfInterest" className="block text-sm font-medium text-dark-accent mb-1.5">
                      Area of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="modal-areaOfInterest"
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
                    <label htmlFor="modal-description" className="block text-sm font-medium text-dark-accent mb-1.5">
                      Project Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="modal-description"
                      name="description"
                      rows={3}
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
                    By submitting this form, you agree to be contacted by the ByteHubble team regarding your inquiry. 
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

