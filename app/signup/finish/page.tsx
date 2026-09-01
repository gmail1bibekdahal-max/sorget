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


      <h1 className={styles.heading}>You&apos;re ready to go</h1>
      <p className={styles.sub}>
        We&apos;ve saved your Sorget setup.
        <br /><br />
        We&apos;re currently onboarding our first users and validating the product. We&apos;ll use the information you provided to prepare your Sorget workspace.
        <br /><br />
        <strong>We&apos;ll be in touch soon.</strong>
      </p>

      <Link
        href="/"
        className={`${styles.planBtn} ${styles.planBtnFeatured}`}
        style={{ maxWidth: 220, textAlign: "center", textDecoration: "none" }}
        onClick={() => track({
          event_name: "click_back_to_sorget",
          event_type: "click",
          target_text: "Back to Sorget",
          properties: { page: "signup_finish" },
        })}
      >
        Back to Sorget
      </Link>
    </div>
  );
}

