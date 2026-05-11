"use client";

import { useEffect } from "react";

import styles from "./feedback.module.css";

type ErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function Error({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.viewport}>
      <section className={styles.card} role="alert" aria-live="assertive">
        <h1 className={styles.title}>Não foi possível concluir esta ação</h1>
        <p className={styles.description}>
          Ocorreu uma falha inesperada. Tente novamente para recarregar os dados.
        </p>
        <button className={styles.action} onClick={() => unstable_retry()}>
          Tentar novamente
        </button>
      </section>
    </main>
  );
}
