"use client";

import { useState, useEffect, useCallback } from "react";

interface LeadMagnet {
  id: string;
  title: string;
  subtitle: string;
  pdfUrl: string;
  icon: string;
}

const magnets: Record<string, LeadMagnet> = {
  pricedrops: {
    id: "pricedrops",
    title: "Never Overpay for Peptides",
    subtitle: "Get notified when prices drop on your favourite compounds. We track every UK supplier daily.",
    pdfUrl: "",
    icon: "💷",
  },
};

export default function LeadMagnetPopup() {
  const [show, setShow] = useState(false);
  const [activeMagnet, setActiveMagnet] = useState<LeadMagnet | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Determine which popup to show based on page
  const getMagnetForPage = useCallback((): LeadMagnet | null => {
    if (typeof window === "undefined") return null;
    const path = window.location.pathname;
    const viewed = sessionStorage.getItem("vp_popup_shown");
    const pageView = parseInt(sessionStorage.getItem("vp_page_views") || "0");

    // Price Drops: compound pages (first view), or 2nd page view (any other page)
    if (!viewed && (path.startsWith("/compounds") || pageView >= 2)) {
      return magnets.pricedrops;
    }

    return null;
  }, []);

  useEffect(() => {
    // Track page views
    if (typeof window !== "undefined") {
      const views = parseInt(sessionStorage.getItem("vp_page_views") || "0");
      sessionStorage.setItem("vp_page_views", String(views + 1));
    }

    const magnet = getMagnetForPage();
    if (magnet) {
      // Delay showing popup
      const timer = setTimeout(() => {
        setActiveMagnet(magnet);
        setShow(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [getMagnetForPage]);

  const handleSubmit = async () => {
    if (!email || !activeMagnet) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, result: activeMagnet.title }),
      });
      if (res.ok || res.status === 409) {
        setStatus("sent");
        sessionStorage.setItem("vp_popup_shown", "true");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("vp_popup_shown", "true");
  };

  if (!show || !activeMagnet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 md:p-8">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="text-4xl mb-3">{activeMagnet.icon}</div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">{activeMagnet.title}</h3>
        <p className="text-sm text-gray-500 mb-5">{activeMagnet.subtitle}</p>

        {status === "sent" ? (
          <div className="space-y-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm">
              <p className="text-emerald-900 font-semibold">
                ✅ You're in! We'll email you when prices drop.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 bg-white"
            />
            <button
              onClick={handleSubmit}
              disabled={!email || status === "sending"}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-4 py-2.5 rounded-lg text-sm transition"
            >
              {status === "sending" ? "Subscribing..." : "Get Price Drop Alerts"}
            </button>
            <p className="text-xs text-gray-400 text-center">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
