import styles from "../feedback.module.css";

export default function MainLoading() {
  return (
    <section className={styles.card} aria-busy="true" aria-live="polite">
      <div className={styles.skeletonGrid}>
        <div className={styles.skeletonLine} style={{ width: "38%" }} />
        <div className={styles.skeletonLine} style={{ width: "62%" }} />
        <div className={styles.skeletonBlock} />
        <div className={styles.skeletonBlock} />
      </div>
    </section>
  );
}
