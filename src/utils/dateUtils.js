export function toDate(d) {
  return new Date(typeof d === "string" ? d + "T00:00:00" : d);
}

export function daysBetween(start, end) {
  return Math.round((toDate(end) - toDate(start)) / (1000 * 60 * 60 * 24));
}

export function formatDateRange(startDate, endDate) {
  const start = toDate(startDate);
  const end = toDate(endDate);

  const options = { year: "numeric", month: "short", day: "numeric" };
  const startStr = start.toLocaleDateString(undefined, options);
  const endStr = end.toLocaleDateString(undefined, options);

  return startStr === endStr ? startStr : `${startStr} – ${endStr}`;
}

/** Clamp value v between min a and max b */
export function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}
