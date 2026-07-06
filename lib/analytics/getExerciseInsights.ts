import { getTimeSince } from "../utils/getTimeSince";
import { formatTimeSince } from "../utils/formatTimeSince";

export function getExerciseInsights(trend: any[]) {
  if (!trend.length) return null;

  let bestWeight = { value: 0, month: "" };
  let bestE1RM = { value: 0, month: "" };

  for (const point of trend) {
    if (point.maxWeight > bestWeight.value) {
      bestWeight = {
        value: point.maxWeight,
        month: point.month,
      };
    }

    if (point.e1rm > bestE1RM.value) {
      bestE1RM = {
        value: point.e1rm,
        month: point.month,
      };
    }
  }

  const weightTimeSince = getTimeSince(bestWeight.month);
  const e1rmTimeSince = getTimeSince(bestE1RM.month);

  const weightTimeFormatted = formatTimeSince(weightTimeSince);
    const e1rmTimeFormatted = formatTimeSince(e1rmTimeSince);

  return {
    maxWeightPR: {
      ...bestWeight,
      timeSince: weightTimeFormatted,
    },
    e1rmPR: {
      ...bestE1RM,
      timeSince: e1rmTimeFormatted,
    },
  };
}