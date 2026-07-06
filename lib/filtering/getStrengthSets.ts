

export function getStrengthSets(sets: any[]) {
  return sets.filter((set) => {
    const hasWeight = set.weight != null && set.weight !== "";
    const hasReps = set.reps != null && set.reps !== "";

    return hasWeight && hasReps;
  });
}