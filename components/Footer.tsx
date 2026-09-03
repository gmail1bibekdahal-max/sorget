import Link from "next/link";
import Image from "next/image";
import styles from "./Sections.module.css";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Partners",
    links: [
      { label: "Agencies", href: "#" },
      { label: "Tech", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "UTM Builder", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Request Demo", href: "/login" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {columns.map((col) => (
          <div key={col.heading} className={styles.footerColumn}>
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.footerBottom}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image
            src="/logo.png"
            alt="Sorget Logo"
            width={28}
            height={28}
            style={{ height: "28px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
          <span style={{ fontSize: "20px", fontWeight: 800 }}>Sorget</span>
          <span style={{ opacity: 0.8, marginLeft: "4px" }}>© 2026</span>
        </div>
        <span>
          <Link href="#" className={styles.footerLink}>Terms</Link>
          {" · "}
          <Link href="#" className={styles.footerLink}>Privacy</Link>
          {" · "}
          <Link href="#" className={styles.footerLink}>Cookies</Link>
        </span>
      </div>
    </footer>
  );
}

