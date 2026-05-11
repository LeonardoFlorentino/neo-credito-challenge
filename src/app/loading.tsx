import styles from "./feedback.module.css";

export default function Loading() {
  return (
    <main className={styles.viewport} aria-busy="true" aria-live="polite">
      <section className={styles.card}>
        <div className={styles.skeletonGrid}>
          <div className={styles.skeletonLine} style={{ width: "55%" }} />
          <div className={styles.skeletonLine} style={{ width: "75%" }} />
          <div className={styles.skeletonBlock} />
          <div className={styles.skeletonBlock} />
        </div>
      </section>
    </main>
  );
}
