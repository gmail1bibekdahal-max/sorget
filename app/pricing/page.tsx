import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import styles from "./Pricing.module.css";

const Check = ({ featured }: { featured?: boolean }) => (
  <span className={`${styles.checkIcon} ${featured ? styles.checkIconFeatured : ""}`}>
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const plans = [
  {
    name: "Starter",
    price: "$29",
    desc: "For small businesses getting started with attribution.",
    cta: "Start Free Trial",
    ctaLink: "/signup",
    featured: false,
    features: [
      "1 website",
      "10,000 visitors/month",
      "First & last-touch attribution",
      "UTM tracking",
      "Marketing channel classification",
      "Lead attribution",
      "Basic analytics",
      "Standard integrations",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$79",
    desc: "For growing businesses that need deeper attribution.",
    cta: "Start Free Trial",
    ctaLink: "/signup",
    featured: true,
    features: [
      "5 websites",
      "50,000 visitors/month",
      "Everything in Starter",
      "Multi-touch attribution",
      "Campaign & ad tracking",
      "Customer attribution",
      "Revenue attribution",
      "Advanced analytics",
      "CRM integrations",
      "Webhooks",
      "Priority support",
    ],
  },
  {
    name: "Business",
    price: "$199",
    desc: "For teams running serious marketing operations.",
    cta: "Talk to Sales",
    ctaLink: "/signup",
    featured: false,
    features: [
      "20 websites",
      "250,000 visitors/month",
      "Everything in Growth",
      "Unlimited team members",
      "Advanced attribution",
      "Custom attribution rules",
      "Advanced integrations",
      "Custom reporting",
      "API access",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroLabel}>Pricing</div>
        <h1 className={styles.heroTitle}>Simple, transparent pricing</h1>
        <p className={styles.heroSubtitle}>Start free for 14 days. No credit card required.</p>
      </section>

      <div className={styles.cardsSection}>
        {plans.map((plan) => (
          <div key={plan.name} className={`${styles.card} ${plan.featured ? styles.cardFeatured : ""}`}>
            {plan.featured && <div className={styles.featuredBadge}>Most Popular</div>}

            <div className={styles.planName}>{plan.name}</div>
            <div className={styles.planPrice}>
              {plan.price} <span className={styles.planPriceSub}>/ month</span>
            </div>
            <p className={styles.planDesc}>{plan.desc}</p>

            <ul className={styles.featureList}>
              {plan.features.map((f) => (
                <li key={f} className={styles.featureItem}>
                  <Check featured={plan.featured} />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={plan.ctaLink}
              className={`${styles.planBtn} ${plan.featured ? styles.planBtnFeatured : ""}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <GetStarted />
      <Footer />
    </div>
  );
}
