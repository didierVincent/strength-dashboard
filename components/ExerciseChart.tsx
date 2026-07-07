

import { StrengthTooltip } from "@/components/StrengthTooltip";
import { COLORS } from "@/lib/data/chartColors";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
} from "recharts";

type ExerciseChartProps = {
  chartData: any[];
};

export function ExerciseChart({
  chartData,
}: ExerciseChartProps) {
  return (
   <div className="mt-8" style={{ width: "100%", height: 300 }}>
   
    <ResponsiveContainer>
    
    
        <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<StrengthTooltip />} />

        <Bar
  dataKey="maxWeight"
  fill="#8884d8"
  opacity={0.15}
/>

<Bar
  dataKey="e1rm"
  fill="#fff"
  opacity={0.15}
/>
        <Line
            type="monotone"
            dataKey="maxWeight"
            name="Heaviest Weight"
            stroke={COLORS.maxWeight}
            strokeWidth={2}
            connectNulls
            activeDot={{ r: 3 }}
            dot={(props: any) => {
        const { cx, cy, payload } = props;

        if (payload.isMaxWeightPR) {
            return (
            <circle
                cx={cx}
                cy={cy}
                r={7}
                fill={COLORS.maxWeight}
                stroke="#fff"
                strokeWidth={2}
            />
            );
        }

        return <circle cx={cx} cy={cy} r={2.5} fill={COLORS.maxWeight} opacity={0.5} />;
        }}
        />

        <Line
            type="monotone"
            dataKey="e1rm"
            name="Estimated 1RM"
            stroke={COLORS.e1rm}
            strokeWidth={2}
            connectNulls
            activeDot={{ r: 3 }}
            dot={(props: any) => {
        const { cx, cy, payload } = props;

        if (cy == null || isNaN(cy)) return null;

        if (payload.isE1RMPR) {
            return (
            <circle
                cx={cx}
                cy={cy}
                r={7}
                fill={COLORS.e1rm}
                stroke="#fff"
                strokeWidth={2}
      />
    );
  }

  return <circle cx={cx} cy={cy} r={2.5} fill={COLORS.e1rm} opacity={0.5} />;
}}
  />
</LineChart>


  </ResponsiveContainer>
  </div>


  );
}

 