"use client";

import { useEffect } from "react";

import "./globals.css";
import styles from "./feedback.module.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <main className={styles.viewport}>
          <section className={styles.card} role="alert" aria-live="assertive">
            <h1 className={styles.title}>Erro crítico na aplicação</h1>
            <p className={styles.description}>
              Não foi possível renderizar a interface principal. Clique em Tentar
              novamente para reprocessar a rota.
            </p>
            <button className={styles.action} onClick={() => unstable_retry()}>
              Tentar novamente
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
