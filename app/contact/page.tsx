"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import styles from "./Contact.module.css";
import { track, saveLead } from "@/lib/track";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setLoading(true);

    const contactPayload = {
      full_name: fullName,
      email: email,
      company: company,
      step_reached: "contact_form_submission",
      raw_data: {
        message: message,
        submitted_at: new Date().toISOString(),
        source: "contact_page",
      },
    };

    // Track analytics event
    track({
      event_name: "submit_contact_form",
      event_type: "submit",
      target_text: "Send Message",
      properties: {
        page: "contact",
        full_name: fullName,
        email: email,
        company: company,
      },
    });

    // Save lead data directly into Supabase 'leads' table
    await saveLead(contactPayload);

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroLabel}>Contact Us</div>
        <h1 className={styles.heroTitle}>Get in touch with us</h1>
        <p className={styles.heroSubtitle}>
          Have questions about Sorget, pricing, or marketing attribution? We&apos;re here to help.
        </p>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          {/* Info Side */}
          <div className={styles.infoSide}>
            <h2 className={styles.infoHeading}>Reach out directly</h2>
            <p className={styles.infoSub}>
              Connect with our team via email or social media. We typically respond within a few hours.
            </p>

            <div className={styles.cardsGrid}>
              {/* Email Card */}
              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Email Us</h3>
                  <a
                    href="mailto:bibekdahal0807@gmail.com"
                    className={styles.cardLink}
                    onClick={() => track("click_contact_email", { page: "contact" })}
                  >
                    bibekdahal0807@gmail.com
                  </a>
                </div>
              </div>

              {/* X / Twitter Card */}
              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Follow / DM on X</h3>
                  <a
                    href="https://x.com/bibek_dahal0807"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                    onClick={() => track("click_contact_x_profile", { page: "contact" })}
                  >
                    https://x.com/bibek_dahal0807
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.supportBox}>
              <div className={styles.supportBadge}>Dedicated Beta Support</div>
              <p className={styles.supportText}>
                Are you an existing user or private beta partner? Our engineering team provides direct line support for fast setup and integrations.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className={styles.formSide}>
            {submitted ? (
              <div className={styles.successCard}>
                <div className={styles.successIcon}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 className={styles.successTitle}>Message Sent!</h3>
                <p className={styles.successSub}>
                  Thank you for contacting us, <strong>{fullName || email}</strong>. Your message has been saved in our system and we&apos;ll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  className={styles.resetBtn}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formCard}>
                <h2 className={styles.formTitle}>Send us a message</h2>
                <p className={styles.formSub}>Fill out the form below and we&apos;ll be in touch.</p>

                <div className={styles.field}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    Email Address <span className={styles.req}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Company or Website</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Inc."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    Message <span className={styles.req}>*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.textarea}
                    required
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <GetStarted />
      <Footer />
    </div>
  );
}
