// ─── Keys ────────────────────────────────────────────────────────────────────
const SIGNUP_MODAL_KEY = "bh_signup_modal_seen";
const QUICK_POPUP_KEY  = "bh_popup_seen";

// ─── Signup modal (centered) — persists across sessions ──────────────────────
export const storage = {
  hasSeenSignupModal(): boolean {
    try {
      return !!localStorage.getItem(SIGNUP_MODAL_KEY);
    } catch {
      return false;
    }
  },

  markSignupModalSeen(): void {
    try {
      localStorage.setItem(SIGNUP_MODAL_KEY, Date.now().toString());
    } catch {
      // ignore — private browsing
    }
  },

  clearSignupModal(): void {
    try {
      localStorage.removeItem(SIGNUP_MODAL_KEY);
    } catch {
      // ignore
    }
  },
};

// ─── Quick popup (bottom-right) — persists across sessions ───────────────────
export const quickPopupStorage = {
  hasSeen(): boolean {
    try {
      return !!localStorage.getItem(QUICK_POPUP_KEY);
    } catch {
      return false;
    }
  },

  markSeen(): void {
    try {
      localStorage.setItem(QUICK_POPUP_KEY, Date.now().toString());
    } catch {
      // ignore
    }
  },
};

// ─── Dev helper — call clearAllPopupFlags() in browser console to reset ──────
export function clearAllPopupFlags(): void {
  try {
    localStorage.removeItem(SIGNUP_MODAL_KEY);
    localStorage.removeItem(QUICK_POPUP_KEY);
    console.log("[ByteHubble] Popup flags cleared. Reload the page.");
  } catch {
    // ignore
  }
}
