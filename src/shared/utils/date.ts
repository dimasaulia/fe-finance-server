export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** "YYYY-MM-DD" (what <input type="date"> produces) → "DD-MM-YYYY". */
export function isoDateToApiDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}-${month}-${year}`;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Default date filter range: 7 days ago through today, both "YYYY-MM-DD". */
export function getDefaultDateRange() {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 6);

  return {
    startDate: toIsoDate(weekAgo),
    endDate: toIsoDate(today),
  };
}
