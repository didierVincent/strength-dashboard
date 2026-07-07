


import { COLORS } from "@/lib/data/chartColors";

type ExerciseInsightsProps = {
  insights: any;
};

export function ExerciseInsights({
  insights,
}: ExerciseInsightsProps) {
  if (!insights) return null;

  return (
  <div className="mt-4 space-y-2 text-sm text-gray-700">
    <div>
      <p style={{ color: COLORS.maxWeight}}>
        🏆 Heaviest Weight PR
      </p>
      <p>
        {insights.maxWeightPR.bestSet.weight} kg ×{" "}
        {insights.maxWeightPR.bestSet.reps} — {insights.maxWeightPR.month} 
      </p>

       <p className="text-gray-700">
        
      </p>

      <p className="text-gray-500">
        {insights.maxWeightPR.timeSince}
      </p>

      
    </div>

    <div>
      <p style={{ color: COLORS.e1rm}}>
        📈 Best Estimated 1RM
      </p>
      
      <p className="text-gray-700">
        {insights.e1rmPR.value} kg ({insights.e1rmPR.bestSet.weight}kg ×{" "}
        {insights.e1rmPR.bestSet.reps})

        — {insights.e1rmPR.month}
      </p>

      <p className="text-gray-500">
        {insights.e1rmPR.timeSince} 
      </p>

    </div>
  </div>
    
  );
}

 