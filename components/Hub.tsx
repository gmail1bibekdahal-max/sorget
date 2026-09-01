import { User, CreditCard, Search, Globe, Check, Megaphone } from "lucide-react";
import styles from "./Hub.module.css";

export default function Hub() {
  return (
    <section className={styles.hubSection}>
      {/* The Pink Fluid Background - Untouched */}
      <div className={styles.backgroundBlob}></div>

      <div className={styles.container}>
        
        {/* 🛠️ UPDATED SVG THREADS - Exact mid-bottom connections & single mid line */}
        <svg className={styles.linesLayer} viewBox="0 0 1400 450" preserveAspectRatio="none">
          <defs>
            {/* Left Fade: Opaque at icon -> Transparent at center */}
            <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E097AC" stopOpacity="1" />
              <stop offset="100%" stopColor="#E097AC" stopOpacity="0" />
            </linearGradient>
            
            {/* Right Fade: Transparent at center -> Opaque at icon */}
            <linearGradient id="fadeRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E097AC" stopOpacity="0" />
              <stop offset="100%" stopColor="#E097AC" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Threads from bottom-center of each icon to card top */}
          <path d="M 343 110 Q 350 200 700 260" fill="none" stroke="url(#fadeLeft)" strokeWidth="1.5" />
          <path d="M 427 75  Q 450 180 700 260" fill="none" stroke="url(#fadeLeft)" strokeWidth="1.5" />
          <path d="M 525 115 Q 550 200 700 260" fill="none" stroke="url(#fadeLeft)" strokeWidth="1.5" />
          <path d="M 609 50  Q 620 160 700 260" fill="none" stroke="url(#fadeLeft)" strokeWidth="1.5" />
          <path d="M 693 110 Q 700 180 700 260" fill="none" stroke="url(#fadeLeft)" strokeWidth="1.5" />
          <path d="M 791 80  Q 790 180 700 260" fill="none" stroke="url(#fadeRight)" strokeWidth="1.5" />
          <path d="M 875 110 Q 850 200 700 260" fill="none" stroke="url(#fadeRight)" strokeWidth="1.5" />
          <path d="M 973 50  Q 980 160 700 260" fill="none" stroke="url(#fadeRight)" strokeWidth="1.5" />

        </svg>

        {/* 🛠️ UPDATED TOP ICONS - Real Logos via CDN (Simple Icons) */}
        {/* Google Ads */}
        <div className={`${styles.appIcon} ${styles.icon1}`}>
          <img src="https://cdn.simpleicons.org/googleads/4285F4" alt="Google Ads" width="32" height="32" />
        </div>
        {/* Google Search */}
        <div className={`${styles.appIcon} ${styles.icon2}`}>
          <img src="https://cdn.simpleicons.org/google/34A853" alt="Google Search" width="32" height="32" />
        </div>
        {/* Facebook */}
        <div className={`${styles.appIcon} ${styles.icon3}`}>
          <img src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook" width="32" height="32" />
        </div>
        {/* Instagram */}
        <div className={`${styles.appIcon} ${styles.icon4}`}>
          <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" width="32" height="32" />
        </div>
        {/* Reddit */}
        <div className={`${styles.appIcon} ${styles.icon5}`}>
          <img src="https://cdn.simpleicons.org/reddit/FF4500" alt="Reddit" width="32" height="32" />
        </div>
        {/* YouTube */}
        <div className={`${styles.appIcon} ${styles.icon6}`}>
          <img src="https://cdn.simpleicons.org/youtube/FF0000" alt="YouTube" width="32" height="32" />
        </div>
        {/* Email (Gmail) */}
        <div className={`${styles.appIcon} ${styles.icon7}`}>
          <img src="https://cdn.simpleicons.org/gmail/EA4335" alt="Email" width="32" height="32" />
        </div>
        {/* Referral (Generic as it's not a branded platform) */}
        <div className={`${styles.appIcon} ${styles.icon8}`}>
          <img src="https://cdn.simpleicons.org/trustpilot/333333" alt="Referral" width="32" height="32" />
        </div>

        {/* Central Visitor Card - UNTOUCHED (Exactly as you requested) */}
        

        {/* Central Visitor Card - New Professional Style */}
        <div className={styles.attributionCard}>
          
          {/* Header */}
          <div className={styles.cardHeader}>
            <div className={styles.avatarWrap}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User" className={styles.avatarImg} />
              <span className={styles.statusDot}></span>
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>John Doe</span>
              <span className={styles.userEmail}>john@example.com</span>
            </div>
            <div className={styles.proBadge}>Active</div>
          </div>

          {/* Data Grid */}
          <div className={styles.dataGrid}>
            <div className={styles.dataItem}>
              <div className={styles.dataIcon}><Search size={14} /></div>
              <div>
                <span className={styles.dataLabel}>First Touch</span>
                <span className={styles.dataValue}>Google Ads</span>
              </div>
            </div>
            
            <div className={styles.dataItem}>
              <div className={styles.dataIcon}><Megaphone size={14} /></div>
              <div>
                <span className={styles.dataLabel}>Campaign</span>
                <span className={styles.dataValue}>SaaS Growth 2026</span>
              </div>
            </div>

            <div className={styles.dataItem}>
              <div className={styles.dataIcon}><Globe size={14} /></div>
              <div>
                <span className={styles.dataLabel}>Landing Page</span>
                <span className={styles.dataValue}>/pricing</span>
              </div>
            </div>
          </div>

          {/* Visual Timeline */}
          <div className={styles.timeline}>
            <div className={`${styles.timelineStep} ${styles.completed}`}>
              <div className={styles.timelineDot}><Check size={12} /></div>
              <span>Visited</span>
            </div>
            <div className={styles.timelineLine}></div>
            <div className={`${styles.timelineStep} ${styles.active}`}>
              <div className={styles.timelineDot}><User size={12} /></div>
              <span>Signed Up</span>
            </div>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineStep}>
              <div className={styles.timelineDot}><CreditCard size={12} /></div>
              <span>Checkout</span>
            </div>
          </div>

        </div>
      </div>

      
    </section>
  );
}