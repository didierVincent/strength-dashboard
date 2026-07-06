

export function groupByMonth(sets: any[]) {
  const grouped: Record<string, any[]> = {};

  for (const set of sets) {
    const date = new Date(set.date);
    const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(set);
  }

  return grouped;
}