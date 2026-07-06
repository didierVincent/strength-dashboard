

export function maxWeight(sets: any[]) {
  let best = 0;
  let bestSet = null;

  for (const set of sets) {
    const weight = Number(set.weight || 0);
    if (!weight) continue;

    if (weight > best) {
      best = weight;
      bestSet = set;
    }
  }

  if (best === 0) return null;

  return {
    value: best,
    bestSet,
  };
}