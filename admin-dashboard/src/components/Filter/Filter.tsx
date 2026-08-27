import styles from "./Filter.module.css";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

/**
 * Generic labeled select filter. Receives its options as plain data, so
 * it works for any dimension (game, platform, company, period, ...)
 * without page-specific variants.
 */
export function Filter({ label, options, value, onChange, placeholder = "전체" }: FilterProps) {
  const disabled = options.length === 0;
  return (
    <label className={styles.filter}>
      <span className={styles.label}>{label}</span>
      <select
        className={styles.select}
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="">{disabled ? "데이터 없음" : placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
