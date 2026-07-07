

export function volume(sets: any[]) {
  let total = 0;

  for (const set of sets) {
    const weight = Number(set.weight || 0);
    const reps = Number(set.reps || 0);

    total += weight * reps;
  }

  return {
    value: total,
  };
}