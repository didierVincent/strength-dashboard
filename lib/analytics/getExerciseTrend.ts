export function getExerciseTrend(
  sets: any[],
  exercise: string,
  metric: (sets: any[]) => {
    value: number;
    bestSet?: any;
  } | null
) {
  const filtered = sets.filter((s) =>
    s.exercise?.toLowerCase().includes(exercise.toLowerCase())
  );

  const grouped: Record<string, any[]> = {};

  for (const s of filtered) {
    const date = new Date(s.date);

    const month = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!grouped[month]) grouped[month] = [];

    grouped[month].push(s);
  }

  const result = Object.entries(grouped).map(
    ([month, monthSets]) => {
      const metricResult = metric(monthSets);

      return {
        month,
        value: metricResult?.value ?? null,
        bestSet: metricResult?.bestSet ?? null,
      };
    }
  );

  return result.sort((a, b) =>
    a.month.localeCompare(b.month)
  );
}