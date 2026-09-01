"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import styles from "./Setup.module.css";
import { track, saveLead } from "@/lib/track";

const CMS_OPTIONS = ["WordPress", "Webflow", "Squarespace", "Wix", "Shopify", "Framer", "Custom / Other"];
const FORM_OPTIONS = ["Gravity Forms", "Typeform", "HubSpot Forms", "Webflow Forms", "Formstack", "Jotform", "Custom / Other"];
const CRM_OPTIONS = ["HubSpot", "Salesforce", "Pipedrive", "ActiveCampaign", "Marketo", "Google Sheets", "Custom / Other"];

export default function SetupPage() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [cms, setCms] = useState("");
  const [formTool, setFormTool] = useState("");
  const [crm, setCrm] = useState("");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    const setupData = {
      company,
      website,
      cms,
      form_tool: formTool,
      crm,
      step_reached: "setup",
    };

    track({
      event_name: "click_continue_setup",
      event_type: "submit",
      target_text: "Continue Setup",
      properties: { page: "setup", ...setupData },
    });

    saveLead(setupData);
    router.push("/signup/plan");
  };

  return (
    <div className={styles.page}>
      {/* Left panel */}
      <div className={styles.left}>
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


        <div className={styles.stepBadge}>Step 2 of 3</div>
        <div className={styles.progressBar}><div className={styles.progressFill} /></div>

        <h1 className={styles.heading}>Select your tools</h1>
        <p className={styles.sub}>
          Tell us what tools you use so we can help you get them configured with Attributer.
        </p>

        <form className={styles.form} onSubmit={handleContinue}>
          <div className={styles.field}>
            <label className={styles.label}>
              What company do you work for? <span className={styles.req}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onBlur={(e) => {
                track("fill_field", { page: "setup", field: "company", value: e.target.value });
              }}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              What website do you want to use Attributer on? <span className={styles.req}>*</span>
            </label>
            <input
              type="text"
              placeholder="www.mysite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              onBlur={(e) => {
                track("fill_field", { page: "setup", field: "website", value: e.target.value });
              }}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              What website builder does this site use? <span className={styles.req}>*</span>
            </label>
            <select
              className={styles.select}
              value={cms}
              onChange={(e) => {
                setCms(e.target.value);
                track("select_option", { page: "setup", field: "cms", value: e.target.value });
              }}
              required
            >
              <option value="" disabled>Select your CMS</option>
              {CMS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              What form tool does this website use? <span className={styles.req}>*</span>
            </label>
            <select
              className={styles.select}
              value={formTool}
              onChange={(e) => {
                setFormTool(e.target.value);
                track("select_option", { page: "setup", field: "form_tool", value: e.target.value });
              }}
              required
            >
              <option value="" disabled>Select your form tool</option>
              {FORM_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Where do you want to send the attribution information? <span className={styles.req}>*</span>
            </label>
            <select
              className={styles.select}
              value={crm}
              onChange={(e) => {
                setCrm(e.target.value);
                track("select_option", { page: "setup", field: "crm", value: e.target.value });
              }}
              required
            >
              <option value="" disabled>Select your CRM or destination</option>
              {CRM_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <button type="submit" className={styles.submitBtn}>Continue Setup</button>
        </form>
      </div>


      {/* Right panel */}
      <div className={styles.right}>
        <div className={styles.rightContent}>
          <div className={styles.iconGrid}>
            {["🔌","📊","📋","🎯","💬","📧","🔗","⚙️"].map((icon, i) => (
              <div key={i} className={styles.iconCard}>{icon}</div>
            ))}
          </div>
          <h2 className={styles.rightHeading}>Connect your entire stack</h2>
          <p className={styles.rightSub}>
            Attributer works with the tools you already use — no switching required.
          </p>
          <ul className={styles.featureList}>
            <li>✓ 50+ CMS &amp; website builders</li>
            <li>✓ 30+ form tools supported</li>
            <li>✓ Sends data to any CRM</li>
            <li>✓ Setup in under 10 minutes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
