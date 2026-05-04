"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import Backdrop from "@/components/ui/Backdrop";

// ─── Types ────────────────────────────────────────────────────────────────────
type Status = "idle" | "submitting" | "success" | "error";

const ROLES = [
  "Database Administrator (DBA)",
  "Data Engineer",
  "AI / ML Engineer",
  "Backend Engineer",
  "DevOps / SRE",
  "Solution Architect",
  "Engineering Manager",
  "Student / Learner",
  "Other",
];

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

// ─── Focus trap helper ────────────────────────────────────────────────────────
function useFocusTrap(active: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const el = ref.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    el.addEventListener("keydown", trap);
    return () => el.removeEventListener("keydown", trap);
  }, [active]);

  return ref;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SignupModal({ open, onClose }: SignupModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [googleMsg, setGoogleMsg] = useState(false);

  const dialogRef = useFocusTrap(open);

  // Prevent body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || null,
          email: email.trim(),
          role: role || null,
          source: "website_popup",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setTimeout(onClose, 2800);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const inp =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-dark-accent " +
    "placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 " +
    "focus:border-primary/50 hover:border-gray-300 transition-all duration-150";

  const lbl = "block text-xs font-semibold text-dark-accent/60 mb-1.5";

  return (
    <AnimatePresence>
      {open && (
        <Backdrop onClick={onClose}>
          {/* Stop click propagation so clicking the card doesn't close */}
          <motion.div
            key="signup-modal"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-modal-title"
            className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.18)]
              overflow-hidden mx-2 sm:mx-4"
          >
            {/* Top gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close signup modal"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center
                text-dark-accent/40 hover:text-dark-accent hover:bg-gray-100
                transition-all duration-150 focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-accent"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-6 sm:pb-7">
              {status === "success" ? (
                /* ── Success state ─────────────────────────────────────── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark-accent mb-2">Welcome aboard! 🎉</h3>
                  <p className="text-sm text-dark-accent/55 leading-relaxed">
                    You&apos;re now part of the ByteHubble community. Expect insights, resources,
                    and early access to new programs.
                  </p>
                </motion.div>
              ) : (
                /* ── Form state ────────────────────────────────────────── */
                <>
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-5 h-5 text-primary" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h2
                        id="signup-modal-title"
                        className="text-lg font-bold text-dark-accent leading-snug"
                      >
                        Join the Future of AI &amp; Database Engineering
                      </h2>
                      <p className="text-sm text-dark-accent/50 mt-1 leading-relaxed">
                        Get access to premium training, resources, and career paths
                      </p>
                    </div>
                  </div>

                  {/* Google button */}
                  <button
                    type="button"
                    onClick={() => { setGoogleMsg(true); setTimeout(() => setGoogleMsg(false), 3000); }}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl
                      border border-gray-200 bg-white text-sm font-semibold text-dark-accent/80
                      hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99]
                      transition-all duration-150 mb-2 shadow-sm"
                    aria-label="Continue with Google"
                  >
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </button>
                  {googleMsg && (
                    <p className="text-xs text-center text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3">
                      Google sign-in coming soon — use email below for now.
                    </p>
                  )}

                  {/* Divider */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-dark-accent/35 font-medium">or sign up with email</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="sm-name" className={lbl}>
                        Name
                      </label>
                      <input
                        id="sm-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Arjun Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inp}
                      />
                    </div>

                    <div>
                      <label htmlFor="sm-email" className={lbl}>
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="sm-email"
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="arjun@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inp}
                      />
                    </div>

                    <div>
                      <label htmlFor="sm-role" className={lbl}>
                        Role <span className="text-dark-accent/30">(optional)</span>
                      </label>
                      <select
                        id="sm-role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={`${inp} appearance-none`}
                      >
                        <option value="">Select your role</option>
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {errorMsg && (
                      <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                        <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting" || !email}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white
                        text-sm font-semibold rounded-xl shadow-md shadow-primary/25
                        hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5
                        active:scale-[0.99] transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Getting you in…
                        </>
                      ) : (
                        "Get Started →"
                      )}
                    </button>
                  </form>

                  {/* Trust line */}
                  <div className="flex items-center justify-center gap-1.5 mt-4">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent flex-shrink-0" strokeWidth={2} />
                    <p className="text-[11px] text-dark-accent/40 text-center leading-relaxed">
                      Trusted by engineers &amp; teams building modern AI systems
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col items-center gap-2">
                    <p className="text-xs text-dark-accent/45">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-primary font-semibold hover:underline focus-visible:outline-none
                          focus-visible:ring-2 focus-visible:ring-accent rounded"
                        onClick={onClose}
                      >
                        Sign in
                      </button>
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-xs text-dark-accent/30 hover:text-dark-accent/55 transition-colors duration-150"
                    >
                      Maybe later
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
