import { getTimeSince } from "../utils/getTimeSince";
import { formatTimeSince } from "../utils/formatTimeSince";

export function getExerciseInsights(trend: any[]) {
  if (!trend.length) return null;

  let bestWeight = {
    value: 0,
    month: "",
    bestSet: null as any,
  };

  let bestE1RM = {
    value: 0,
    month: "",
    bestSet: null as any,
  };

  for (const point of trend) {
    if (point.maxWeight > bestWeight.value) {
      bestWeight = {
        value: point.maxWeight,
        month: point.month,
        bestSet: point.bestMaxWeightSet,
      };
    }

    if (point.e1rm > bestE1RM.value) {
      bestE1RM = {
        value: point.e1rm,
        month: point.month,
        bestSet: point.bestE1RMSet,
      };
    }
  }

  const weightTimeSince = getTimeSince(bestWeight.month);
  const e1rmTimeSince = getTimeSince(bestE1RM.month);

  return {
    maxWeightPR: {
      ...bestWeight,
      timeSince: formatTimeSince(weightTimeSince),
    },

    e1rmPR: {
      ...bestE1RM,
      timeSince: formatTimeSince(e1rmTimeSince),
    },
  };
}