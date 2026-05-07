import { format, parse } from "date-fns";

export const dateStringConverter = (time?: string, formatString?: string) => {
  if (!time) return "";
  const cleaned = time
    .replace(/([+-]\d{4})\s+\w+$/, "$1")
    .replace(/\.(\d{3})\d+/, ".$1");
  const parsed = parse(cleaned, "yyyy-MM-dd HH:mm:ss.SSS xx", new Date());
  const fca = format(parsed, formatString ?? "yyyy/MM/dd HH:mm:ss");
  return fca;
};
