"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, ExternalLink } from "lucide-react";
import styles from "./CalendlyModal.module.css";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export default function CalendlyModal({ isOpen, onClose, url }: CalendlyModalProps) {
  const [loading, setLoading] = useState(true);

  // Clean URL: prioritize explicit prop, then env variable (trimmed), then fallback
  const rawUrl =
    url ||
    (process.env.NEXT_PUBLIC_CALENDLY_URL ? process.env.NEXT_PUBLIC_CALENDLY_URL.trim() : "") ||
    "https://calendly.com/gmail1-bibekdahal/30min";

  const defaultCalendlyUrl = rawUrl.trim();

  // Append embedding parameters for clean, responsive presentation
  const embedUrl = (() => {
    try {
      const parsed = new URL(defaultCalendlyUrl);
      parsed.searchParams.set("hide_landing_page_details", "1");
      parsed.searchParams.set("hide_gdpr_banner", "1");
      parsed.searchParams.set("background_color", "ffffff");
      parsed.searchParams.set("text_color", "3a313c");
      parsed.searchParams.set("primary_color", "bb0c68");
      return parsed.toString();
    } catch {
      return defaultCalendlyUrl;
    }
  })();

  // Prevent body scrolling when open
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendly-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.badgeIcon}>
              <Calendar size={20} />
            </div>
            <div>
              <h2 id="calendly-modal-title" className={styles.title}>
                Schedule a Demo
              </h2>
              <p className={styles.subtitle}>
                Choose a time for a 1-on-1 walkthrough of Sorget with our team.
              </p>
            </div>
          </div>

          <div className={styles.controls}>
            <a
              href={defaultCalendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
              title="Open Calendly in a new tab"
            >
              <span>Open in new tab</span>
              <ExternalLink size={14} />
            </a>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close scheduling modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body / Calendly iframe */}
        <div className={styles.body}>
          {loading && (
            <div className={styles.loadingSpinner}>
              <div className={styles.spinner} />
              <span>Loading scheduler...</span>
            </div>
          )}
          <iframe
            src={embedUrl}
            className={styles.iframe}
            title="Calendly Scheduling"
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
