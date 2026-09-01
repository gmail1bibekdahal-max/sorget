import styles from "./LogoMarquee.module.css";

const logos = [
  { name: "HubSpot", className: styles.hubspot },
  { name: "Salesforce", className: styles.salesforce },
  { name: "Pipedrive", className: styles.pipedrive },
  { name: "Zoho CRM", className: styles.zoho },
  { name: "Gravity Forms", className: styles.gravityForms },
  { name: "WPForms", className: styles.wpforms },
  { name: "Contact Form 7", className: styles.contactForm7 },
  { name: "Webflow", className: styles.webflow },
  { name: "Wix", className: styles.wix },
  { name: "Shopify", className: styles.shopify },
  { name: "Stripe", className: styles.stripe },
  { name: "Paddle", className: styles.paddle },
  { name: "Zapier", className: styles.zapier },
  { name: "Make", className: styles.make },
];

export default function LogoMarquee() {
  return (
    <section className={styles.marqueeSection}>
      <div className={styles.marqueeTrack}>
        {/* Render the list twice to create a seamless infinite loop */}
        {[...logos, ...logos].map((logo, index) => (
          <span key={index} className={`${styles.logoItem} ${logo.className}`}>
            {logo.name}
          </span>
        ))}
      </div>
    </section>
  );
}