"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import { track } from "@/lib/track";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.sorget.site";

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Sorget Logo"
            width={34}
            height={34}
            style={{ height: "34px", width: "auto", objectFit: "contain" }}
            priority
          />
          <span className={styles.logoText}>Sorget</span>
        </Link>


        {/* Desktop links */}
        <div className={styles.links}>
          <Link href="/how-it-works" className={styles.link}>How it Works</Link>
          <Link href="/integrations" className={styles.link}>Integrations</Link>
          <Link href="/pricing" className={styles.link}>Pricing</Link>
          <Link href="/contact" className={styles.link}>Contact Us</Link>
        </div>

        {/* Desktop actions */}
        <div className={styles.actions}>
          <Link href={`${APP_URL}/login`} className={styles.signIn} onClick={() => track("click_sign_in", { location: "navbar" })}>
            Sign In <User size={16} style={{ color: "var(--olvy-pink)" }} />
          </Link>
          <Link href={`${APP_URL}/signup`} onClick={() => track("click_start_free", { location: "navbar" })}>
            <button className={styles.startBtn}>
              Start for Free
              <div className={styles.startBtnIcon}>
                <ArrowUpRight size={16} />
              </div>
            </button>
          </Link>
        </div>

        {/* Hamburger */}
        <button className={styles.hamburger} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={styles.drawer}>
          <Link href="/how-it-works" className={styles.drawerLink} onClick={() => setOpen(false)}>How it Works</Link>
          <Link href="/integrations" className={styles.drawerLink} onClick={() => setOpen(false)}>Integrations</Link>
          <Link href="/pricing" className={styles.drawerLink} onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/contact" className={styles.drawerLink} onClick={() => setOpen(false)}>Contact Us</Link>
          <div className={styles.drawerDivider} />
          <Link href={`${APP_URL}/login`} className={styles.drawerLink} onClick={() => { setOpen(false); track("click_sign_in", { location: "navbar_mobile" }); }}>Sign In</Link>
          <Link href={`${APP_URL}/signup`} className={styles.drawerCta} onClick={() => { setOpen(false); track("click_start_free", { location: "navbar_mobile" }); }}>Start for Free</Link>
        </div>
      )}
    </nav>
  );
}
