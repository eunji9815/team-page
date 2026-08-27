import styles from "./Skeleton.module.css";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

/** Generic loading placeholder — renders while data has not arrived yet. */
export function Skeleton({ width = "100%", height = 16, className }: SkeletonProps) {
  return (
    <span
      className={[styles.skeleton, className].filter(Boolean).join(" ")}
      style={{ display: "block", width, height }}
      aria-hidden="true"
    />
  );
}
