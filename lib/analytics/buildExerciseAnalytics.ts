import { getExerciseTrend } from "./getExerciseTrend";
import { maxWeight } from "./metrics/maxWeight";
import { estimated1RM } from "./metrics/estimated1RM";
import { getExerciseInsights } from "./getExerciseInsights";



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

    // 2. combine trends
    const combinedTrend = weightTrend.map((w) => {
    const e = e1rmTrend.find(
        (x) => x.month === w.month
    );

    return {
        month: w.month,
        maxWeight: w.value,
        bestMaxWeightSet: w.bestSet ?? null,
        
        e1rm: e?.value ?? undefined,
        bestE1RMSet: e?.bestSet ?? null,
    };
    });

    // 3. compute insights
    const newInsights = getExerciseInsights(combinedTrend);

    // 4. extract PR months for UI
    const maxWeightPRMonth = newInsights?.maxWeightPR?.month;
    const e1rmPRMonth = newInsights?.e1rmPR?.month;

    // 5. add flags to UI chart data for PRs
    const chartData = combinedTrend.map((w) => ({
    ...w,
    isMaxWeightPR: w.month === maxWeightPRMonth,
    isE1RMPR: w.month === e1rmPRMonth,
    }));

  return {
    trend: chartData,
    insights: newInsights,
  };
}


