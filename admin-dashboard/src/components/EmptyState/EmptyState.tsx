import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  title: string;
  description?: string;
}

/**
 * Shown wherever real data would appear once connected, but none exists
 * yet. Never receives fabricated numbers — only a message describing what
 * will show up once data is available.
 */
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles.empty} role="status">
      <span className={styles.icon} aria-hidden="true">
        ⌗
      </span>
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
