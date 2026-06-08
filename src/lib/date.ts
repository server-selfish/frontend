import { format } from "date-fns";

export const dateStringConverter = (
  time?: string | null,
  formatString?: string
) => {
  if (!time) return "";

  let cleaned = time;

  // Handle format: "2026-06-04 15:01:14.092926 +0800 WITA"
  // Remove timezone abbreviation (WITA, UTC, etc.)
  cleaned = cleaned.replace(/\s+[A-Z]{2,5}$/, "");

  // Truncate microseconds to milliseconds (keep first 3 digits)
  cleaned = cleaned.replace(/\.(\d{3})\d+/, ".$1");

  // Normalize separator between date and time
  cleaned = cleaned.replace(/T/, " ");

  const date = new Date(cleaned);
  if (isNaN(date.getTime())) return "";

  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const formatted = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  return formatString ? format(date, formatString) : formatted;
};
