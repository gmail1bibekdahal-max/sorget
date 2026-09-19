"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Calendar, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import { track } from "@/lib/track";
import { useBookDemo } from "@/components/BookDemoContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { openDemoModal } = useBookDemo();

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.sorget.site";

  const handleBookDemo = (location: string) => {
    openDemoModal();
    track("click_book_demo", { location });
  };

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
          <button
            type="button"
            className={styles.startBtn}
            onClick={() => handleBookDemo("navbar")}
            aria-label="Book Demo"
          >
            Book Demo
            <div className={styles.startBtnIcon}>
              <Calendar size={15} />
            </div>
          </button>
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
          <button
            type="button"
            className={styles.drawerCta}
            onClick={() => {
              setOpen(false);
              handleBookDemo("navbar_mobile");
            }}
          >
            Book Demo
          </button>
        </div>
      )}
    </nav>
  );
}
