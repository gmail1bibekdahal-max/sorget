import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import { FileInput, Bot, Share2, BarChart3, ChevronDown, Check, Zap, TrendingUp } from "lucide-react";
import styles from "./HowItWorks.module.css";

function StepArrow() {
  return (
    <div className={styles.stepArrow}>
      <ChevronDown size={22} strokeWidth={2.5} />
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLabel}>How It Works</div>
        <h1 className={styles.heroTitle}>Simple setup. Powerful insights.</h1>
        <p className={styles.heroSubtitle}>
          Sorget works in 4 simple steps to connect your marketing channels to the leads and customers you're generating.
        </p>
        <Link href={`${process.env.NEXT_PUBLIC_APP_URL || "https://app.sorget.site"}/signup`} className={styles.heroBtn}>Get Started Free</Link>
      </section>

      {/* Steps */}
      <div className={styles.stepsSection}>

        {/* Step 1 */}
        <div className={styles.step}>
          <div className={styles.stepVisual}>
            <div className={styles.cardHeader}>
              <div className={styles.stepIconCircle}><FileInput size={28} /></div>
              <span className={styles.cardTitle}>Form Setup</span>
            </div>
            <div className={styles.cardBody}>
              {["utm_source", "utm_medium", "utm_campaign", "utm_content", "landing_page"].map((field) => (
                <div key={field} className={styles.fieldRow}>
                  <span className={styles.fieldName}>{field}</span>
                  <span className={styles.fieldEmpty}>hidden</span>
                </div>
              ))}
            </div>
            <span className={styles.stepBadge}>✓ Fields Ready</span>
          </div>
          <div className={styles.stepCenter}>
            <div className={styles.stepNode}>01</div>
            <StepArrow />
          </div>
          <div className={styles.stepContent}>
            <div className={styles.stepLabel}>Step 01</div>
            <h2 className={styles.stepTitle}>Add hidden fields to your forms</h2>
            <p className={styles.stepText}>
              Add a few hidden fields to your lead capture forms. These fields allow Sorget to pass through marketing channel attribution data whenever a visitor submits a form on your site.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className={`${styles.step} ${styles.stepReverse}`}>
          <div className={styles.stepVisual}>
            <div className={styles.cardHeader}>
              <div className={styles.stepIconCircle}><Bot size={28} /></div>
              <span className={styles.cardTitle}>Auto-fill in action</span>
            </div>
            <div className={styles.cardBody}>
              {[
                { label: "utm_source", value: "google" },
                { label: "utm_medium", value: "cpc" },
                { label: "utm_campaign", value: "brand-q4" },
                { label: "utm_content", value: "ad-variant-b" },
                { label: "landing_page", value: "/pricing" },
              ].map((f) => (
                <div key={f.label} className={styles.fieldRow}>
                  <span className={styles.fieldName}>{f.label}</span>
                  <span className={styles.fieldValue}>{f.value}</span>
                </div>
              ))}
            </div>
            <span className={styles.stepBadgeGreen}><Zap size={12} /> Completing Fields</span>
          </div>
          <div className={styles.stepCenter}>
            <div className={styles.stepNode}>02</div>
            <StepArrow />
          </div>
          <div className={styles.stepContent}>
            <div className={styles.stepLabel}>Step 02</div>
            <h2 className={styles.stepTitle}>Sorget completes the hidden fields</h2>
            <p className={styles.stepText}>
              Sorget monitors what marketing channels your leads are coming from and automatically writes that information into the hidden form fields — channel, campaign, ad name, landing page, and more.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className={styles.step}>
          <div className={styles.stepVisual}>
            <div className={styles.cardHeader}>
              <div className={styles.stepIconCircle}><Share2 size={28} /></div>
              <span className={styles.cardTitle}>Data flowing to</span>
            </div>
            <div className={styles.cardBody}>
              {[
                { name: "HubSpot CRM", color: "#FF7A59" },
                { name: "Google Analytics", color: "#4285F4" },
                { name: "Mailchimp", color: "#FFE01B", dark: true },
                { name: "Slack", color: "#4A154B" },
                { name: "Salesforce", color: "#00A1E0" },
              ].map((tool) => (
                <div key={tool.name} className={styles.toolRow}>
                  <span className={styles.toolDot} style={{ background: tool.color }} />
                  <span className={styles.toolName}>{tool.name}</span>
                  <Check size={13} color="#10B981" strokeWidth={3} />
                </div>
              ))}
            </div>
            <span className={styles.stepBadge}>✓ All Synced</span>
          </div>
          <div className={styles.stepCenter}>
            <div className={styles.stepNode}>03</div>
            <StepArrow />
          </div>
          <div className={styles.stepContent}>
            <div className={styles.stepLabel}>Step 03</div>
            <h2 className={styles.stepTitle}>Marketing data flows into your tools</h2>
            <p className={styles.stepText}>
              When a visitor submits a form, the marketing attribution data — channel, campaign name, ad name, and more — is passed directly into your CRM, analytics platform, email marketing tool, and any other connected tools.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className={`${styles.step} ${styles.stepReverse}`}>
          <div className={styles.stepVisual}>
            <div className={styles.cardHeader}>
              <div className={styles.stepIconCircle}><BarChart3 size={28} /></div>
              <span className={styles.cardTitle}>Attribution Report</span>
            </div>
            <div className={styles.cardBody}>
              {[
                { channel: "Google Ads", leads: 142, rev: "$28,400", pct: 72 },
                { channel: "Facebook", leads: 89, rev: "$14,200", pct: 45 },
                { channel: "Organic", leads: 61, rev: "$9,800", pct: 31 },
                { channel: "Email", leads: 34, rev: "$5,100", pct: 17 },
              ].map((row) => (
                <div key={row.channel} className={styles.reportRow}>
                  <span className={styles.reportChannel}>{row.channel}</span>
                  <div className={styles.reportBar}>
                    <div className={styles.reportBarFill} style={{ width: `${row.pct}%` }} />
                  </div>
                  <span className={styles.reportRev}>{row.rev}</span>
                </div>
              ))}
            </div>
            <span className={styles.stepBadgeGreen}><TrendingUp size={12} /> Revenue Attributed</span>
          </div>
          <div className={styles.stepCenter}>
            <div className={styles.stepNode}>04</div>
          </div>
          <div className={styles.stepContent}>
            <div className={styles.stepLabel}>Step 04</div>
            <h2 className={styles.stepTitle}>Understand what's driving leads, customers & revenue</h2>
            <p className={styles.stepText}>
              Use the marketing attribution data to build reports that show exactly which channels, campaigns, and ads are driving leads, customers, and revenue — so you can invest more in what works.
            </p>
          </div>
        </div>

      </div>

      <GetStarted />
      <Footer />
    </div>
  );
}
