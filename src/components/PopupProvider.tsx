"use client";

import { useEffect } from "react";
import { useSignupTrigger } from "@/hooks/useSignupTrigger";
import { useSignupModalTrigger } from "@/hooks/useSignupModalTrigger";
import QuickLeadPopup from "@/components/modal/QuickLeadPopup";
import SignupModal from "@/components/modal/SignupModal";
import { clearAllPopupFlags } from "@/utils/storage";

export default function PopupProvider() {
  const quick = useSignupTrigger();
  const signup = useSignupModalTrigger();

  // ── DEV: auto-clear stale flags on every mount so popups always work ──────
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      clearAllPopupFlags();
    }
  }, []);

  // SignupModal takes priority — suppress quick popup while it's open
  const showQuick = quick.show && !signup.show;

  return (
    <>
      <QuickLeadPopup open={showQuick} onClose={quick.dismiss} />
      <SignupModal open={signup.show} onClose={signup.dismiss} />

      {/* ── DEV-only test buttons ─────────────────────────────────────────── */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[200] flex gap-2">
          <button
            onClick={() => signup.forceShow()}
            className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100"
          >
            Test Signup Modal
          </button>
          <button
            onClick={() => quick.setShow(true)}
            className="px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100"
          >
            Test Quick Popup
          </button>
        </div>
      )}
    </>
  );
}
