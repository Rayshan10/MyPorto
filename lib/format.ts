const monthYear = new Intl.DateTimeFormat("id-ID", {
  month: "short",
  year: "numeric",
});

export function formatMonthYear(value: string | null): string {
  if (!value) return "Sekarang";
  return monthYear.format(new Date(value));
}

export function formatRange(start: string, end: string | null): string {
  return `${formatMonthYear(start)} — ${formatMonthYear(end)}`;
}

export function initials(title: string): string {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
