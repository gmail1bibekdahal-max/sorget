"use client";
import Link from "next/link";
import styles from "./Sections.module.css";
import { track } from "@/lib/track";

export default function GetStarted() {
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.sorget.site";

  return (
    <section className={`${styles.section} ${styles.ctaSection}`}>
      <div className={styles.container}>
        <h2 className={styles.ctaTitle}>Get Started For Free</h2>
        <p className={styles.description}>It's free to get started with Sorget, and paid plans start at just $29 per month</p>
        <Link href={`${APP_URL}/signup`} onClick={() => track("click_start_free_trial", { location: "get_started_section" })}>
          <button className={styles.ctaButton}>Start 14 Day Free Trial</button>
        </Link>
      </div>
    </section>
  );
}