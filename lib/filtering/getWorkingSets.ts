

export function getWorkingSets(sets) {
  return sets.filter(s => s.type === "normal");
}

