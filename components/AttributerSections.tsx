import Image from "next/image";
import { TrendingUp, Target, DollarSign } from "lucide-react";
import styles from "./Sections.module.css";

export default function AttributerSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Benefits of using Attributer</h2>
        
        <div className={styles.featureFlow}>
          
          {/* Feature 1: Image Left, Text Right */}
          <div className={styles.featureRow}>
            <div className={styles.featureImage}>
              <Image src="/img1.png" alt="Know your channels" width={480} height={320} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
            </div>
            <div className={styles.featureContent}>
              <div className={styles.featureIcon}>
                <TrendingUp size={24} />
              </div>
              <h3 className={styles.featureHeading}>See which channels actually bring customers</h3>
              <p className={styles.featureText}>
                Stop judging your marketing by clicks and website traffic alone. See how many leads, signups, and customers come from Google, Facebook, LinkedIn, organic search, referrals, email, and more.
              </p>
            </div>
          </div>

          {/* Feature 2: Text Left, Image Right (Reversed) */}
          <div className={`${styles.featureRow} ${styles.featureRowReverse}`}>
            <div className={styles.featureImage}>
              <Image src="/img2.png" alt="Better ROI insights" width={480} height={320} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
            </div>
            <div className={styles.featureContent}>
              <div className={styles.featureIcon}>
                <Target size={24} />
              </div>
              <h3 className={styles.featureHeading}>Find the campaigns worth your money</h3>
              <p className={styles.featureText}>
                Connect marketing activity with real business results. Discover which campaigns generate valuable leads and customers, and which ones are simply consuming your budget.
              </p>
            </div>
          </div>

          {/* Feature 3: Image Left, Text Right */}
          <div className={styles.featureRow}>
            <div className={styles.featureImage}>
              <Image src="/img3.png" alt="Generate more customers" width={480} height={320} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
            </div>
            <div className={styles.featureContent}>
              <div className={styles.featureIcon}>
                <DollarSign size={24} />
              </div>
              <h3 className={styles.featureHeading}>Spend smarter. Grow faster.</h3>
              <p className={styles.featureText}>
                When you know where your best customers come from, you can put more time and money into what works — and stop wasting it on what doesn't. Turn better attribution into more customers and higher revenue.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}