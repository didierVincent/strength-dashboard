

export function getTimeSince(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);

  let years = now.getFullYear() - past.getFullYear();
  let months = now.getMonth() - past.getMonth();
  let days = now.getDate() - past.getDate();

  // adjust negatives
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years,
    months,
    days,
    totalDays: Math.floor(
      (now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24)
    ),
  };
}