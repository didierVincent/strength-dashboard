import { getExerciseTrend } from "./getExerciseTrend";
import { maxWeight } from "./metrics/maxWeight";
import { estimated1RM } from "./metrics/estimated1RM";
import { getExerciseInsights } from "./getExerciseInsights";
import { frequency } from "./metrics/frequency";
import { volume } from "./metrics/volume";

import { scaleMetricForChart } from "../utils/scaleMetricForChart";


export function buildExerciseAnalytics(
  strengthSets: any[],
  exercise: string
) {
  
    // 1. build trends
    const weightTrend = getExerciseTrend(
    strengthSets,
    exercise,
    maxWeight
    );

    const e1rmTrend = getExerciseTrend(
    strengthSets,
    exercise,
    estimated1RM
    );

    const frequencyTrend = getExerciseTrend(
    strengthSets,
     exercise,
     frequency
    );

    const volumeTrend = getExerciseTrend(
    strengthSets,
    exercise,
    volume
    );

    // 2. combine trends
    const combinedTrend = weightTrend.map((w) => {
    const e = e1rmTrend.find((x) => x.month === w.month);
    const f = frequencyTrend.find(x => x.month === w.month);
    const v = volumeTrend.find(x => x.month === w.month);


    return {
        month: w.month,

        maxWeight: w.value,
        e1rm: e?.value ?? undefined,

        frequency: f?.value ?? 0,
        volume: v?.value ?? 0,

        bestMaxWeightSet: w.bestSet ?? null,
        bestE1RMSet: e?.bestSet ?? null,


    };
    });

    const maxE1RM = Math.max(
    ...combinedTrend.map(
        (point) => point.e1rm ?? 0)
    );

    
    const chartHeightLimit = maxE1RM / 4;

    const frequencyChartValue = scaleMetricForChart(
    combinedTrend.map(x => x.frequency),
    chartHeightLimit
    );

    const volumeChartValue = scaleMetricForChart(
    combinedTrend.map(x => x.volume),
    chartHeightLimit
    );

    // 3. compute insights
    const newInsights = getExerciseInsights(combinedTrend);

    // 4. extract PR months for UI
    const maxWeightPRMonth = newInsights?.maxWeightPR?.month;
    const e1rmPRMonth = newInsights?.e1rmPR?.month;

    // 5. add flags to UI chart data for PRs
    const chartData = combinedTrend.map((w, index) => ({
  ...w,

  frequencyChartValue: frequencyChartValue[index],

  volumeChartValue: volumeChartValue[index],

  isMaxWeightPR: w.month === maxWeightPRMonth,
  isE1RMPR: w.month === e1rmPRMonth,
}));

  return {
    trend: chartData,
    insights: newInsights,
  };
}


