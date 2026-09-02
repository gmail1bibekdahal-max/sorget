"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import styles from "./Pricing.module.css";

const CheckIcon = ({ featured }: { featured?: boolean }) => (
  <span className={`${styles.checkIcon} ${featured ? styles.checkIconFeatured : ""}`}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

interface SingleSitePlan {
  name: string;
  price: string;
  currencyPeriod: string;
  siteCount: string;
  leads: string;
  cta: string;
  ctaLink: string;
  featured?: boolean;
}

interface MultiSitePlan {
  name: string;
  price: string;
  currencyPeriod?: string;
  siteCount?: string;
  desc?: string;
  cta: string;
  ctaLink: string;
  featured?: boolean;
}

const singleSitePlans: SingleSitePlan[] = [
  {
    name: "Lite",
    price: "$29",
    currencyPeriod: "USD per month",
    siteCount: "1 Site",
    leads: "Up to 100 Leads Per Month",
    cta: "START FREE TRIAL",
    ctaLink: "https://app.attributer.io/signup",
    featured: false,
  },
  {
    name: "Starter",
    price: "$49",
    currencyPeriod: "USD per month",
    siteCount: "1 Site",
    leads: "Up to 500 Leads Per Month",
    cta: "START FREE TRIAL",
    ctaLink: "https://app.attributer.io/signup",
    featured: true,
  },
  {
    name: "Professional",
    price: "$99",
    currencyPeriod: "USD per month",
    siteCount: "1 Site",
    leads: "Up to 1,000 Leads Per Month",
    cta: "START FREE TRIAL",
    ctaLink: "https://app.attributer.io/signup",
    featured: false,
  },
];

const multiSitePlans: MultiSitePlan[] = [
  {
    name: "10 Sites",
    price: "$199",
    currencyPeriod: "USD per month",
    siteCount: "10 Sites",
    cta: "GET STARTED",
    ctaLink: "https://app.attributer.io/signup/multisite",
    featured: false,
  },
  {
    name: "25 Sites",
    price: "$299",
    currencyPeriod: "USD per month",
    siteCount: "25 Sites",
    cta: "GET STARTED",
    ctaLink: "https://app.attributer.io/signup/multisite",
    featured: true,
  },
  {
    name: "50 Sites",
    price: "$399",
    currencyPeriod: "USD per month",
    siteCount: "50 Sites",
    cta: "GET STARTED",
    ctaLink: "https://app.attributer.io/signup/multisite",
    featured: false,
  },
  {
    name: "Custom",
    price: "Contact Us",
    desc: "Tailored multi-site enterprise plans",
    cta: "TALK TO US",
    ctaLink: "https://attributer.io/multi-site/schedule",
    featured: false,
  },
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"single" | "multiple">("single");

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroLabel}>Pricing</div>
        <h1 className={styles.heroTitle}>Simple, transparent pricing</h1>
        <p className={styles.heroSubtitle}>Choose the right plan for your business website footprint.</p>

        <div className={styles.tabContainer}>
          <div className={styles.tabSwitcher}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "single" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("single")}
            >
              Single Site
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "multiple" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("multiple")}
            >
              Multiple Sites
            </button>
          </div>
        </div>
      </section>

      {activeTab === "single" ? (
        <div className={styles.cardsSectionSingle}>
          {singleSitePlans.map((plan) => (
            <div key={plan.name} className={`${styles.card} ${plan.featured ? styles.cardFeatured : ""}`}>
              {plan.featured && <div className={styles.featuredBadge}>Most Popular</div>}

              <div className={styles.planName}>{plan.name}</div>
              <div className={styles.planPrice}>{plan.price}</div>
              <div className={styles.planCurrencyPeriod}>{plan.currencyPeriod}</div>

              <div className={styles.divider} />

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <CheckIcon featured={plan.featured} />
                  <span>{plan.siteCount}</span>
                </li>
                <li className={styles.featureItem}>
                  <CheckIcon featured={plan.featured} />
                  <span>{plan.leads}</span>
                </li>
              </ul>

              <a
                href={plan.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.planBtn} ${plan.featured ? styles.planBtnFeatured : ""}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.cardsSectionMultiple}>
          {multiSitePlans.map((plan) => (
            <div key={plan.name} className={`${styles.card} ${plan.featured ? styles.cardFeatured : ""}`}>
              {plan.featured && <div className={styles.featuredBadge}>Most Popular</div>}

              <div className={styles.planName}>{plan.name}</div>
              <div className={plan.price === "Contact Us" ? styles.planPriceText : styles.planPrice}>
                {plan.price}
              </div>
              {plan.currencyPeriod && (
                <div className={styles.planCurrencyPeriod}>{plan.currencyPeriod}</div>
              )}
              {plan.desc && <div className={styles.planDesc}>{plan.desc}</div>}

              <div className={styles.divider} />

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <CheckIcon featured={plan.featured} />
                  <span>{plan.siteCount ? plan.siteCount : "Custom site & lead limit"}</span>
                </li>
                <li className={styles.featureItem}>
                  <CheckIcon featured={plan.featured} />
                  <span>Full attribution analytics</span>
                </li>
              </ul>

              <a
                href={plan.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.planBtn} ${plan.featured ? styles.planBtnFeatured : ""}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      )}

      <GetStarted />
      <Footer />
    </div>
  );
}

