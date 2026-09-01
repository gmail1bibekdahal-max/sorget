import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import { FileInput, Bot, Share2, BarChart3 } from "lucide-react";
import styles from "./HowItWorks.module.css";

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
        <Link href="/signup" className={styles.heroBtn}>Get Started Free</Link>
      </section>

      {/* Steps */}
      <div className={styles.stepsSection}>

        {/* Step 1 */}
        <div className={styles.step}>
          <div className={styles.stepImageBox}>
            <div className={styles.stepImageInner}>
              <div className={styles.stepIconCircle}>
                <FileInput size={40} />
              </div>
              <span className={styles.stepBadge}>Hidden Fields Added ✓</span>
            </div>
          </div>
          <div className={styles.stepContent}>
            <div className={styles.stepNumber}>Step 01</div>
            <h2 className={styles.stepTitle}>Add hidden fields to your forms</h2>
            <p className={styles.stepText}>
              Add a few hidden fields to your lead capture forms. These fields allow Sorget to pass through marketing channel attribution data whenever a visitor submits a form on your site.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className={`${styles.step} ${styles.stepReverse}`}>
          <div className={styles.stepImageBox}>
            <div className={styles.stepImageInner}>
              <div className={styles.stepIconCircle}>
                <Bot size={40} />
              </div>
              <span className={styles.stepBadgeGreen}>Completing Fields... 2x</span>
            </div>
          </div>
          <div className={styles.stepContent}>
            <div className={styles.stepNumber}>Step 02</div>
            <h2 className={styles.stepTitle}>Sorget completes the hidden fields</h2>
            <p className={styles.stepText}>
              Sorget monitors what marketing channels your leads are coming from and automatically writes that information into the hidden form fields — channel, campaign, ad name, landing page, and more.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className={styles.step}>
          <div className={styles.stepImageBox}>
            <div className={styles.stepImageInner}>
              <div className={styles.stepIconCircle}>
                <Share2 size={40} />
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span className={styles.stepBadge}>CRM</span>
                <span className={styles.stepBadge}>Analytics</span>
                <span className={styles.stepBadge}>Email</span>
              </div>
            </div>
          </div>
          <div className={styles.stepContent}>
            <div className={styles.stepNumber}>Step 03</div>
            <h2 className={styles.stepTitle}>Marketing data flows into your tools</h2>
            <p className={styles.stepText}>
              When a visitor submits a form, the marketing attribution data — channel, campaign name, ad name, and more — is passed directly into your CRM, analytics platform, email marketing tool, and any other connected tools.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className={`${styles.step} ${styles.stepReverse}`}>
          <div className={styles.stepImageBox}>
            <div className={styles.stepImageInner}>
              <div className={styles.stepIconCircle}>
                <BarChart3 size={40} />
              </div>
              <span className={styles.stepBadgeGreen}>Revenue Attributed ✓</span>
            </div>
          </div>
          <div className={styles.stepContent}>
            <div className={styles.stepNumber}>Step 04</div>
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
