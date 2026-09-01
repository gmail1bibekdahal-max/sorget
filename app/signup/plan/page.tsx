"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Plan.module.css";
import { track, saveLead } from "@/lib/track";


const plans = [
  {
    name: "Lite",
    sites: "1 Site",
    leads: "100 leads per month",
    price: "$29",
    period: "per month",
  },
  {
    name: "Starter",
    sites: "1 Site",
    leads: "500 leads per month",
    price: "$49",
    period: "per month",
    featured: true,
  },
  {
    name: "Pro",
    sites: "1 Site",
    leads: "1,000 leads per month",
    price: "$99",
    period: "per month",
  },
];

export default function PlanPage() {
  const router = useRouter();
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo.png"
          alt="Sorget Logo"
          width={34}
          height={34}
          style={{ height: "34px", width: "auto", objectFit: "contain" }}
          priority
        />
        <span>Sorget</span>
      </Link>

      <div className={styles.stepBadge}>Step 3 of 3</div>
      <div className={styles.progressBar}><div className={styles.progressFill} /></div>

      <h1 className={styles.heading}>Choose a plan</h1>
      <p className={styles.sub}>
        Choose the plan you&apos;d use if you were paying for Sorget. <strong>No payment is required right now.</strong>
        <br /> We&apos;re currently validating Sorget, so selecting a plan will not charge you.
      </p>

      <div className={styles.grid}>
        {plans.map((plan) => (
          <div key={plan.name} className={`${styles.card} ${plan.featured ? styles.featured : ""}`}>
            {plan.featured && <div className={styles.badge}>Most Popular</div>}
            <h2 className={styles.planName}>{plan.name}</h2>
            <ul className={styles.features}>
              <li>{plan.sites}</li>
              <li>{plan.leads}</li>
            </ul>
            <div className={styles.priceRow}>
              <span className={styles.price}>{plan.price}</span>
              <span className={styles.period}>{plan.period}</span>
            </div>
            <button
              className={`${styles.planBtn} ${plan.featured ? styles.planBtnFeatured : ""}`}
              onClick={() => {
                track({
                  event_name: "click_select_plan",
                  event_type: "submit",
                  target_text: `Select ${plan.name} Plan`,
                  properties: { plan: plan.name, price: plan.price, period: plan.period },
                });
                saveLead({
                  plan: `${plan.name} (${plan.price}/${plan.period})`,
                  step_reached: "plan_selected",
                  raw_data: { plan: plan.name, price: plan.price },
                });
                router.push("/signup/finish");
              }}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>

      <p className={styles.enterprise}>
        Need more leads per month?{" "}
        <Link
          href="#"
          className={styles.enterpriseLink}
          onClick={() => {
            track({
              event_name: "click_enterprise_plan",
              event_type: "click",
              target_text: "Try our Enterprise plan",
              properties: { page: "plan" },
            });
            saveLead({
              plan: "Enterprise",
              step_reached: "enterprise_intent",
            });
          }}
        >
          Try our Enterprise plan
        </Link>
      </p>
    </div>
  );
}

