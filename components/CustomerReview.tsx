import { TrendingUp, ArrowUpRight } from "lucide-react";
import styles from "./review.module.css";

export default function CustomerReview() {
  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewContainer}>
        
        {/* Left Side: Author & Headline */}
        <div className={styles.reviewLeft}>
          <div className={styles.reviewAuthor}>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" 
              alt="Sarah Mitchell" 
              className={styles.reviewAvatar} 
            />
            <div className={styles.reviewerName}>Sarah Mitchell</div>
            <div className={styles.reviewerTitle}>Head of Growth</div>
          </div>

          <h2 className={styles.reviewHeadline}>
            Sorget <span className={styles.headlineGrey}>showed us which marketing channels</span><br />
            were actually driving customers
          </h2>
        </div>

        {/* Right Side: Metric, Text & CTA */}
        <div className={styles.reviewRight}>
          <div className={styles.reviewMetricContainer}>
            <div className={styles.metricLeft}>
              <span className={styles.metricValue}>2.4x</span>
              <span className={styles.metricLabel}>Higher ROI from marketing spend</span>
            </div>
            <TrendingUp size={48} strokeWidth={2} className={styles.metricIcon} />
          </div>

          <p className={styles.reviewText}>
            Before Sorget, we could see where our website traffic was coming from, but we couldn't connect that traffic to the leads and customers we were generating.
          </p>
          <p className={styles.reviewText}>
            Sorget gave us a clear view of the customer journey — from the first marketing touchpoint to signup and purchase. We quickly discovered which campaigns were driving real business results and shifted our budget toward them.
          </p>

          <a href="#" className={styles.caseBtn}>
            Read Complete Case Study
            <div className={styles.caseBtnIcon}>
              <ArrowUpRight size={16} />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}