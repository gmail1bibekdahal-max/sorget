import { MapPin, BarChart2, TrendingUp } from "lucide-react";
import styles from "./Features.module.css";

export default function Features() {
  return (
    <section className={styles.features}>
      {/* Replace this div with an <img src="your-image.jpg" className={styles.fluidBackground} /> if you have the file */}
      <div className={styles.fluidBackground}></div>

      <div className={styles.container}>
        <h1 className={styles.headline}>
          <span className={styles.headlinePink}>Sorget </span>
          <span className={styles.headlineDark}>Turn<br/> website visitors into</span><br />
          <span className={styles.headlinePink}>measurable customers.</span>
        </h1>
        <p className={styles.subheadline}>Stop guessing which marketing channels actually work. Track the journey from the first visit to signup, checkout, and purchase intent.</p>

        <div className={styles.cardsGrid}>
          {/* Card 1 */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <MapPin size={24} />
            </div>
            <h3 className={styles.cardTitle}>See where every visitor comes from</h3>
            <p className={styles.cardDescription}>
              Automatically understand whether visitors arrived from Google, Facebook, LinkedIn, email, organic search, or other channels.
            </p>
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <BarChart2 size={24} />
            </div>
            <h3 className={styles.cardTitle}>Know which channels drive real customers</h3>
            <p className={styles.cardDescription}>
              Go beyond pageviews. See which marketing sources bring signups, leads, checkout attempts, and eventually paying customers.
            </p>
          </div>

          {/* Card 3 */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <TrendingUp size={24} />
            </div>
            <h3 className={styles.cardTitle}>Turn customer journeys into decisions</h3>
            <p className={styles.cardDescription}>
              Connect the dots between marketing and revenue. Know what is working, what isn&apos;t, and where you should spend your next dollar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}