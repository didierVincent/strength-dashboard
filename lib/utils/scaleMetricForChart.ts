

export function scaleMetricForChart(
  values: number[],
  maxChartValue: number
) {
  const maxValue = Math.max(...values);

  if (maxValue === 0) {
    return values.map(() => 0);
  }

  return values.map(
    value => (value / maxValue) * maxChartValue
  );
}