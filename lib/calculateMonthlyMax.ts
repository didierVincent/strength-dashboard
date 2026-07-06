

export function calculateMonthlyMax(grouped: Record<string, any[]>) {
  return Object.entries(grouped).map(([month, sets]) => {
    const maxWeight = Math.max(
      ...sets.map((s) => Number(s.weight || 0))
    );

    return {
      month,
      value: maxWeight,
    };
  });
}