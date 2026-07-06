

import { parseHevyData } from "../parsing/parseHevyData";
import { getWorkingSets } from "../filtering/getWorkingSets";
import { getStrengthSets } from "../filtering/getStrengthSets";

export function buildStrengthDataset(rawData: any[]) {
  const clean = parseHevyData(rawData);

  const workingSets = getWorkingSets(clean);

  const strengthSets = getStrengthSets(workingSets);

  return strengthSets;
}