"use client";
import styles from "./Integration.module.css";

// Array of integrations matching the screenshot exactly
const integrations = [
  { name: "Salesforce", slug: "salesforce", color: "00A1E0" },
  { name: "HubSpot", slug: "hubspot", color: "FF7A59" },
  { name: "Microsoft", slug: "microsoft", color: "0078D4" },
  { name: "WordPress", slug: "wordpress", color: "21759B" },
  { name: "Wix", slug: "wix", color: "000000" },
  { name: "Typeform", slug: "typeform", color: "262627" },
  { name: "Zoho", slug: "zoho", color: "E42527" },
  { name: "Pipedrive", slug: "pipedrive", color: "262626" },
  { name: "Squarespace", slug: "squarespace", color: "000000" },
  { name: "Webflow", slug: "webflow", color: "4353FF" },
  { name: "Mailchimp", slug: "mailchimp", color: "FFE01B" },
];

export default function Integration() {
  return (
    <section className={styles.integrationSection}>
      <div className={styles.integrationContainer}>
        <h2 className={styles.integrationTitle}>Works with your tools</h2>
        <p className={styles.integrationSubtitle}>
          Attributer integrates with your CRM, form builder, email marketing or analytics tools to give you the marketing attribution information you need, where you need it.
        </p>

        <div className={styles.logoGrid}>
          {integrations.map((tool) => (
            <div key={tool.name} className={styles.logoCard}>
              {/* Using Simple Icons CDN to render real logos. If an exact slug fails, it falls back to a colored div. */}
              <img 
                src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`} 
                alt={tool.name} 
                className={styles.logoImage}
                onError={(e) => {
                  // Fallback to text if logo not found on CDN
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.innerText = tool.name;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}