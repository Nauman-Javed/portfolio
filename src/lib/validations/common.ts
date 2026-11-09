import { z } from "zod";

// Form fields are plain strings so React Hook Form and the server share one
// schema. Server Actions convert "" to null and split list fields afterwards.

export const required = (label: string, max = 200) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `Max ${max} characters`);

export const optional = (max = 200) =>
  z.string().trim().max(max, `Max ${max} characters`);

function isHttpUrl(value: string) {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

// http(s) only, so a stored value can never be a javascript: or data: link.
export const optionalUrl = optional(500).refine(
  (v) => v === "" || isHttpUrl(v),
  "Enter a valid http(s) URL",
);

// An https URL or a site-relative /path (e.g. a file in /public).
export const optionalLinkOrPath = optional(500).refine(
  (v) => v === "" || (v.startsWith("/") && !v.startsWith("//")) || isHttpUrl(v),
  "Enter an https URL or a /path",
);

export const imageSource = optional(500).refine(
  (v) => v === "" || (v.startsWith("/") && !v.startsWith("//")) || isHttpUrl(v),
  "Enter an https URL or a /path",
);

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const isDate = (v: string) => DATE.test(v) && !Number.isNaN(Date.parse(v));

export const dateString = z
  .string()
  .trim()
  .refine(isDate, "Enter a valid date");
export const optionalDate = z
  .string()
  .trim()
  .refine((v) => v === "" || isDate(v), "Enter a valid date");

export const emptyToNull = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

export const parseList = (value: string, separator: RegExp) =>
  value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);

export const toUtcDate = (value: string) => new Date(`${value}T00:00:00.000Z`);
