import type { RawRecord } from "./models";

/**
 * Format-level ingestion helpers.
 *
 * These turn "whatever format the raw data arrived in" (CSV text, JSON
 * text/array, or an already-parsed API payload) into a plain array of
 * `RawRecord` (string-keyed objects) — the common input shape that
 * `mapper.ts` / `parser.ts` then normalize into internal data models.
 *
 * Nothing above this layer (logic, components, pages) ever sees CSV rows
 * or raw JSON directly.
 */

/** Minimal CSV parser: header row + comma-separated values, quote-aware. */
export function parseCsv(text: string): RawRecord[] {
  const rows = splitCsvLines(text).filter((line) => line.trim().length > 0);
  if (rows.length === 0) return [];

  const headers = parseCsvLine(rows[0]);
  return rows.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const record: RawRecord = {};
    headers.forEach((header, i) => {
      record[header] = values[i] ?? "";
    });
    return record;
  });
}

function splitCsvLines(text: string): string[] {
  return text.split(/\r\n|\n/);
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

/** Parses a JSON string expected to contain an array of records. */
export function parseJson(text: string): RawRecord[] {
  const data = JSON.parse(text);
  return normalizeToRecordArray(data);
}

/** Accepts an already-parsed API payload (array, or {data: [...]}). */
export function normalizeToRecordArray(input: unknown): RawRecord[] {
  if (Array.isArray(input)) {
    return input as RawRecord[];
  }
  if (input && typeof input === "object" && Array.isArray((input as { data?: unknown }).data)) {
    return (input as { data: RawRecord[] }).data;
  }
  return [];
}
