export function maxWeight(sets: any[]) {
  let bestWeight = 0;
  let bestReps = 0;
  let bestSet = null;

  for (const set of sets) {
    const weight = Number(set.weight || 0);
    const reps = Number(set.reps || 0);

    if (!weight || !reps) continue;

    const isHeavier =
      weight > bestWeight;

    const isSameWeightMoreReps =
      weight === bestWeight && reps > bestReps;

    if (isHeavier || isSameWeightMoreReps) {
      bestWeight = weight;
      bestReps = reps;

      bestSet = {
        weight,
        reps,
      };
    }
  }

  if (bestWeight === 0) return null;

  return {
    value: bestWeight,
    bestSet,
  };
}