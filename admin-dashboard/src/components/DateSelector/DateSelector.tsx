import { Filter } from "../Filter/Filter";

export interface DateSelectorProps {
  periods: string[];
  value?: string;
  onChange?: (value: string) => void;
}

/** Period/date-range selector. Thin semantic wrapper around Filter. */
export function DateSelector({ periods, value, onChange }: DateSelectorProps) {
  return (
    <Filter
      label="기간"
      value={value}
      onChange={onChange}
      options={periods.map((period) => ({ value: period, label: period }))}
      placeholder="전체 기간"
    />
  );
}
