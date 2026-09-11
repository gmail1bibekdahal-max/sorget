"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import styles from "./Pricing.module.css";
import { track } from "@/lib/track";

const CheckIcon = ({ featured }: { featured?: boolean }) => (
  <span className={`${styles.checkIcon} ${featured ? styles.checkIconFeatured : ""}`}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

interface PricingPlan {
  name: string;
  price: string;
  currencyPeriod?: string;
  siteCount: string;
  leads: string;
  cta: string;
  featured?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$29",
    currencyPeriod: "/mo",
    siteCount: "1 Site",
    leads: "100 Leads/month",
    cta: "START FREE TRIAL",
    featured: false,
  },
  {
    name: "Growth",
    price: "$99",
    currencyPeriod: "/mo",
    siteCount: "3 Sites",
    leads: "1,000 Leads/month",
    cta: "START FREE TRIAL",
    featured: true,
  },
  {
    name: "Scale",
    price: "$199",
    currencyPeriod: "/mo",
    siteCount: "10 Sites",
    leads: "10,000 Leads/month",
    cta: "START FREE TRIAL",
    featured: false,
  },
  {
    name: "Business",
    price: "$399",
    currencyPeriod: "/mo",
    siteCount: "25 Sites",
    leads: "25,000 Leads/month",
    cta: "START FREE TRIAL",
    featured: false,
  },
  {
    name: "Custom",
    price: "Contact us",
    currencyPeriod: "",
    siteCount: "Custom Sites",
    leads: "Custom Leads/month",
    cta: "TALK TO US",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroLabel}>Pricing</div>
        <h1 className={styles.heroTitle}>Simple, transparent pricing</h1>
        <p className={styles.heroSubtitle}>Choose the right plan for your business website footprint.</p>
      </section>

      {/* Cards Section: 3 above, 2 below on desktop */}
      <div className={styles.cardsContainer}>
        <div className={styles.cardsRowTop}>
          {plans.slice(0, 3).map((plan) => {
            const isContact = plan.price.toLowerCase().includes("contact");
            const targetHref = isContact
              ? "/contact"
              : `${process.env.NEXT_PUBLIC_APP_URL || "https://app.sorget.site"}/signup`;

            return (
              <div
                key={plan.name}
                className={`${styles.card} ${plan.featured ? styles.cardFeatured : ""}`}
              >
                {plan.featured && <div className={styles.featuredBadge}>Most Popular</div>}

                <div className={styles.planName}>{plan.name}</div>

                <div style={{ display: "flex", alignItems: "baseline", marginTop: "4px" }}>
                  <span className={isContact ? styles.planPriceText : styles.planPrice}>
                    {plan.price}
                  </span>
                  {plan.currencyPeriod && (
                    <span className={styles.planCurrencyPeriod}>{plan.currencyPeriod}</span>
                  )}
                </div>

                <div className={styles.divider} />

                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <CheckIcon featured={plan.featured} />
                    <span style={{ fontWeight: 600 }}>{plan.siteCount}</span>
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon featured={plan.featured} />
                    <span>{plan.leads}</span>
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon featured={plan.featured} />
                    <span>Full attribution analytics</span>
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon featured={plan.featured} />
                    <span>CRM &amp; webhook integrations</span>
                  </li>
                </ul>

                <Link
                  href={targetHref}
                  className={`${styles.planBtn} ${plan.featured ? styles.planBtnFeatured : ""}`}
                  onClick={() =>
                    track({
                      event_name: "click_pricing_plan_cta",
                      event_type: "click",
                      target_text: plan.cta,
                      properties: { page: "pricing", plan: plan.name },
                    })
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <div className={styles.cardsRowBottom}>
          {plans.slice(3).map((plan) => {
            const isContact = plan.price.toLowerCase().includes("contact");
            const targetHref = isContact
              ? "/contact"
              : `${process.env.NEXT_PUBLIC_APP_URL || "https://app.sorget.site"}/signup`;

            return (
              <div
                key={plan.name}
                className={`${styles.card} ${plan.featured ? styles.cardFeatured : ""}`}
              >
                {plan.featured && <div className={styles.featuredBadge}>Most Popular</div>}

                <div className={styles.planName}>{plan.name}</div>

                <div style={{ display: "flex", alignItems: "baseline", marginTop: "4px" }}>
                  <span className={isContact ? styles.planPriceText : styles.planPrice}>
                    {plan.price}
                  </span>
                  {plan.currencyPeriod && (
                    <span className={styles.planCurrencyPeriod}>{plan.currencyPeriod}</span>
                  )}
                </div>

                <div className={styles.divider} />

                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <CheckIcon featured={plan.featured} />
                    <span style={{ fontWeight: 600 }}>{plan.siteCount}</span>
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon featured={plan.featured} />
                    <span>{plan.leads}</span>
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon featured={plan.featured} />
                    <span>Full attribution analytics</span>
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon featured={plan.featured} />
                    <span>CRM &amp; webhook integrations</span>
                  </li>
                </ul>

                <Link
                  href={targetHref}
                  className={`${styles.planBtn} ${plan.featured ? styles.planBtnFeatured : ""}`}
                  onClick={() =>
                    track({
                      event_name: "click_pricing_plan_cta",
                      event_type: "click",
                      target_text: plan.cta,
                      properties: { page: "pricing", plan: plan.name },
                    })
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Table Section */}
      <section className={styles.tableSection}>
        <h2 className={styles.tableTitle}>Plan Overview</h2>
        <div className={styles.tableContainer}>
          <table className={styles.pricingTable}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Plan</th>
                <th style={{ textAlign: "right" }}>Sites</th>
                <th style={{ textAlign: "right" }}>Leads/month</th>
                <th style={{ textAlign: "right" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.name} className={p.featured ? styles.tableRowFeatured : ""}>
                  <td>
                    <strong>{p.name}</strong>
                    {p.featured && <span className={styles.tableBadge}>Popular</span>}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {p.name === "Custom" ? "Custom" : p.siteCount.replace(" Sites", "").replace(" Site", "")}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {p.name === "Custom" ? "Custom" : p.leads.replace(" Leads/month", "").replace(" leads/month", "")}
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 700 }}>
                    {p.price}{p.currencyPeriod || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <GetStarted />
      <Footer />
    </div>
  );
}
