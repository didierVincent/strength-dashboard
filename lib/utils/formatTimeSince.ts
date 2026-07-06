

export function formatTimeSince(t: {
  years: number;
  months: number;
  days: number;
}) {
  if (t.years > 0) {
    return `${t.years}y ${t.months}m ago`;
  }

  if (t.months > 0) {
    return `${t.months}m ${t.days}d ago`;
  }

  return `${t.days}d ago`;
}