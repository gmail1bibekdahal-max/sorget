import Navbar from "@/components/Navbar";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import { Database, FileText, CreditCard, BarChart2, Mail, Zap, Calendar, Globe } from "lucide-react";
import styles from "./Integrations.module.css";

const categories = [
  {
    name: "CRM",
    icon: Database,
    why: "Send attribution data alongside every lead and customer directly into your CRM.",
    tools: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM"],
  },
  {
    name: "Form Builders",
    icon: FileText,
    why: "Attach marketing attribution to every form submission automatically.",
    tools: ["Gravity Forms", "WPForms", "Contact Form 7", "Webflow Forms", "Wix Forms"],
  },
  {
    name: "Billing",
    icon: CreditCard,
    why: "Connect marketing sources to actual revenue and understand true ROI.",
    tools: ["Stripe", "Paddle", "PayPal", "Chargebee"],
  },
  {
    name: "Analytics",
    icon: BarChart2,
    why: "Analyze conversions and revenue by marketing source in your BI tools.",
    tools: ["Google Analytics", "Looker Studio", "Power BI", "Tableau"],
  },
  {
    name: "Email Marketing",
    icon: Mail,
    why: "Track which channels and campaigns generate your best email subscribers.",
    tools: ["Mailchimp", "ActiveCampaign", "Klaviyo", "Campaign Monitor"],
  },
  {
    name: "Automation",
    icon: Zap,
    why: "Send Sorget attribution data to almost any tool via automation workflows.",
    tools: ["Zapier", "Make"],
  },
  {
    name: "Scheduling",
    icon: Calendar,
    why: "Attribute booked meetings and demos back to the marketing sources that drove them.",
    tools: ["Calendly", "HubSpot Meetings"],
  },
  {
    name: "Website Builders",
    icon: Globe,
    why: "Install Sorget on any platform and start capturing visitor attribution instantly.",
    tools: ["WordPress", "Webflow", "Wix", "Shopify"],
  },
];

export default function IntegrationsPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroLabel}>Integrations</div>
        <h1 className={styles.heroTitle}>Works with your tools</h1>
        <p className={styles.heroSubtitle}>
          Sorget integrates with your CRM, form builder, billing, analytics, and marketing tools — so attribution data flows exactly where you need it.
        </p>
      </section>

      <div className={styles.categoriesSection}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.name} className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <Icon size={24} />
                </div>
                <h2 className={styles.categoryName}>{cat.name}</h2>
              </div>
              <p className={styles.categoryWhy}>{cat.why}</p>
              <div className={styles.toolsList}>
                {cat.tools.map((tool) => (
                  <span key={tool} className={styles.toolChip}>{tool}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <GetStarted />
      <Footer />
    </div>
  );
}
