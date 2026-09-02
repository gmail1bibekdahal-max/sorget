"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../plan/Plan.module.css";
import { track, saveLead } from "@/lib/track";

export default function FinishPage() {
  useEffect(() => {
    track({
      event_name: "onboarding_completed",
      event_type: "submit",
      properties: { page: "signup_finish" },
    });
    saveLead({ step_reached: "completed" });
  }, []);

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

      <h1 className={styles.heading} style={{ maxWidth: 640 }}>
        See where your customers actually come from.
      </h1>
      <p className={styles.sub} style={{ maxWidth: 580, marginTop: "16px", marginBottom: "40px" }}>
        Sorget connects your marketing campaigns to leads, customers and revenue.
        <br />
        <br />
        We&apos;re currently onboarding a small number of companies for our private beta.
      </p>

      <Link
        href="/pricing"
        className={`${styles.planBtn} ${styles.planBtnFeatured}`}
        style={{ maxWidth: 280, textAlign: "center", textDecoration: "none", display: "inline-block" }}
        onClick={() =>
          track({
            event_name: "click_apply_early_access",
            event_type: "click",
            target_text: "Apply for early access",
            properties: { page: "signup_finish" },
          })
        }
      >
        → Apply for early access
      </Link>
    </div>
  );
}


