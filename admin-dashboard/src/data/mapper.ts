import type { AliasMap } from "./aliases";
import type { RawRecord } from "./models";

/** Normalizes a column name for loose matching: case/space/underscore-insensitive. */
function normalizeKey(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .replace(/[\s_\-]+/g, "");
}

/**
 * Builds a lookup from every normalized alias -> internal field name,
 * so a raw record's columns can be resolved regardless of exact casing,
 * spacing, or language.
 */
function buildAliasIndex<TField extends string>(
  aliasMap: AliasMap<TField>,
): Map<string, TField> {
  const index = new Map<string, TField>();
  (Object.keys(aliasMap) as TField[]).forEach((field) => {
    aliasMap[field].forEach((alias) => {
      index.set(normalizeKey(alias), field);
    });
  });
  return index;
}

/**
 * Maps a single raw record (arbitrary column names) onto the internal
 * field names described by `aliasMap`. Columns that don't match any known
 * alias are preserved under `extra` so no source data is silently dropped.
 */
export function mapRecord<TField extends string>(
  raw: RawRecord,
  aliasMap: AliasMap<TField>,
): { mapped: Partial<Record<TField, unknown>>; extra: RawRecord } {
  const aliasIndex = buildAliasIndex(aliasMap);
  const mapped: Partial<Record<TField, unknown>> = {};
  const extra: RawRecord = {};

  Object.entries(raw).forEach(([rawKey, value]) => {
    const field = aliasIndex.get(normalizeKey(rawKey));
    if (field) {
      mapped[field] = value;
    } else {
      extra[rawKey] = value;
    }
  });

  return { mapped, extra };
}

export function toNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const n = typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

export function toStringField(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  const s = String(value).trim();
  return s.length > 0 ? s : undefined;
}

export function toBoolean(value: unknown): boolean | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  if (typeof value === "boolean") return value;
  const s = String(value).trim().toLowerCase();
  if (["true", "y", "yes", "1", "자사"].includes(s)) return true;
  if (["false", "n", "no", "0", "타사"].includes(s)) return false;
  return undefined;
}
