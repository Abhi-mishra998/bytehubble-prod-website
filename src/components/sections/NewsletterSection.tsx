"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  function validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1000);
  }

  const inputBase =
    "w-full rounded-full border border-gray-300 bg-white px-5 py-3.5 text-sm text-dark-accent placeholder:text-dark-accent/40 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none";

  return (
    <section className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-lg shadow-dark-accent/5 border border-gray-100 p-6 sm:p-10 lg:p-14"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-accent mb-2">
                Thank you for subscribing to ByteHubble updates.
              </h3>
              <p className="text-dark-accent/60 max-w-sm">
                You&apos;ll receive expert insights, product updates, and engineering best practices in your inbox.
              </p>
            </div>
          ) : (
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-dark-accent sm:text-3xl lg:text-4xl xl:text-5xl">
                Stay Ahead With The Latest In Database Intelligence
              </h2>
              <p className="mt-4 text-lg text-dark-accent/70 leading-relaxed">
                Subscribe to receive expert insights, product updates, and engineering best practices for modern PostgreSQL infrastructure, performance optimization, and incident prevention.
              </p>

              <form onSubmit={handleSubmit} className="mt-8" noValidate>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="name@company.com"
                      className={`${inputBase} ${error ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
                      aria-invalid={error ? "true" : "false"}
                      aria-describedby={error ? "email-error" : undefined}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="shrink-0 bg-brand-gradient text-white font-semibold py-3.5 px-8 rounded-full shadow-sm hover:shadow-md hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
                
                {error && (
                  <p id="email-error" className="mt-2 text-sm text-red-500" role="alert">
                    {error}
                  </p>
                )}
              </form>

              <p className="mt-6 text-xs text-dark-accent/40 leading-relaxed">
                By subscribing, you agree to receive communications from ByteHubble. We respect your privacy and will never share your information.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

