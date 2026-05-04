"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Loader2 } from "lucide-react";

interface QuickLeadPopupProps {
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function QuickLeadPopup({ open, onClose }: QuickLeadPopupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/popup-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || null, source: "behavior_popup" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      // Auto-close after 2.5 s
      setTimeout(onClose, 2500);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="quick-lead-popup"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[340px] max-w-[340px]
            bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.14)] border border-gray-100
            overflow-hidden"
        >
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="p-6">
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close popup"
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center
                text-dark-accent/40 hover:text-dark-accent hover:bg-gray-100
                transition-all duration-150 focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-accent"
            >
              <X className="w-4 h-4" />
            </button>

            {status === "success" ? (
              /* ── Success state ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-dark-accent mb-1">You&apos;re in! 🎉</h3>
                <p className="text-sm text-dark-accent/55">
                  Expect insights from the ByteHubble team soon.
                </p>
              </motion.div>
            ) : (
              /* ── Form state ── */
              <>
                {/* Icon + heading */}
                <div className="flex items-start gap-3 mb-4 pr-6">
                  <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4.5 h-4.5 text-primary" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3
                      id="popup-title"
                      className="text-sm font-bold text-dark-accent leading-snug"
                    >
                      Get AI &amp; System Design Insights 🚀
                    </h3>
                    <p className="text-xs text-dark-accent/50 mt-0.5 leading-relaxed">
                      Join engineers building modern AI systems
                    </p>
                  </div>
                </div>

                <form onSubmit={submit} className="space-y-2.5" noValidate>
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm
                      text-dark-accent placeholder-gray-400 bg-white
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
                      hover:border-gray-300 transition-all duration-150"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Enter your email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm
                      text-dark-accent placeholder-gray-400 bg-white
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
                      hover:border-gray-300 transition-all duration-150"
                  />

                  {errorMsg && (
                    <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || !email}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white
                      text-sm font-semibold rounded-lg shadow-md shadow-primary/20
                      hover:bg-primary/90 hover:shadow-lg active:scale-[0.99]
                      transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Joining…
                      </>
                    ) : (
                      <>
                        Join Free
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <button
                  onClick={onClose}
                  className="mt-3 w-full text-xs text-dark-accent/35 hover:text-dark-accent/60
                    transition-colors duration-150 text-center"
                >
                  Maybe later
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
