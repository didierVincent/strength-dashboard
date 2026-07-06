


export function estimated1RM(sets: any[]) {
  let best = 0;
  let bestSet = null;

  for (const set of sets) {
    const weight = Number(set.weight || 0);
    const reps = Number(set.reps || 0);

    // ignore invalid sets
    if (!weight || !reps) continue;

    // ignore high rep sets that break formula (10+ reps starts to become unstable)
    // including up to 12 reps since some strength work is done higher reps like OHP
    if (reps >= 12) continue;

    // Brzycki formula
    const estimate =
      weight / (1.0278 - 0.0278 * reps);

     if (estimate > best) {
      best = estimate;
      bestSet = {
        weight,
        reps,
      };
    }
  }

  if (best === 0) return null;

  return {
    value: Number(best.toFixed(1)),
    bestSet,
  };
}