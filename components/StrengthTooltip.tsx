import { COLORS } from "@/lib/data/chartColors";

export function StrengthTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;

  return (
    <div className="rounded-md border bg-white p-3 shadow">
      <p className="font-semibold">{label}</p>


      {point.bestMaxWeightSet?.weight != null && (
        <p style={{ color: COLORS.maxWeight }}>
          Heaviest Set: {point.bestMaxWeightSet.weight} kg ×{" "}
          {point.bestMaxWeightSet.reps}
        </p>
      )}

      {point.bestE1RMSet?.weight != null && (
        <p style={{ color: COLORS.bestSet }}>
          Best 1RM Set: {point.bestE1RMSet.weight} kg ×{" "}
          {point.bestE1RMSet.reps}
        </p>
      )}

      {point.e1rm != null && (
        <p style={{ color: COLORS.e1rm }}>
          Estimated 1RM: {point.e1rm} kg
        </p>
      )}

      
    </div>
  );
}