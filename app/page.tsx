"use client";

import { useState } from "react";
import Papa from "papaparse";
import { buildStrengthDataset } from "@/lib/analytics/buildStrengthDataset";
import { getExerciseTrend } from "@/lib/analytics/getExerciseTrend";
import { maxWeight } from "@/lib/analytics/metrics/maxWeight";
import { estimated1RM } from "@/lib/analytics/metrics/estimated1RM";
import { StrengthTooltip } from "@/components/StrengthTooltip";

import { getExerciseInsights } from "@/lib/analytics/getExerciseInsights";

import { getTimeSince } from "@/lib/utils/getTimeSince";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const COLORS = {
  maxWeight: "#8884d8",
  e1rm: "#82ca9d",
  bestSet: "#82ca9d",
};


export default function Home() {
  const [data, setData] = useState<any[]>([])
  const [insights, setInsights] = useState<any | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {

        const strengthSets = buildStrengthDataset(results.data)

        const weightTrend = getExerciseTrend(
          strengthSets, 
          "Bench Press (Barbell)", 
          maxWeight
        );

        const e1rmTrend = getExerciseTrend(
          strengthSets,
          "Bench Press (Barbell)",
          estimated1RM
        );

        const combinedTrend = weightTrend.map((w) => {
        const e = e1rmTrend.find((x) => x.month === w.month);

        return {
          month: w.month,
          maxWeight: w.value,
          e1rm: e?.value ?? null,
          bestE1RMSet: e?.bestSet ?? null,
        };
      });
        setData(combinedTrend);
        console.log("Combined Trend: ", combinedTrend)
        
        const newInsights = getExerciseInsights(combinedTrend)
        setInsights(newInsights);

      },
    });
  };
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Strength Dashboard MVP
      </h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />

      <div className="mt-6">
        <p className="font-semibold">Rows loaded:</p>
        <p>{data.length}</p>
      </div>

      <div className="mt-8" style={{ width: "100%", height: 300 }}>
  <ResponsiveContainer>
    
    
    <LineChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip content={<StrengthTooltip />} />

  <Line
    type="monotone"
    dataKey="maxWeight"
    name="Heaviest Weight"
    stroke={COLORS.maxWeight}
    strokeWidth={2}
    connectNulls
  />

  <Line
    type="monotone"
    dataKey="e1rm"
    name="Estimated 1RM"
    stroke={COLORS.e1rm}
    strokeWidth={2}
    connectNulls
  />
</LineChart>


  </ResponsiveContainer>

  {insights && (
  <div className="mt-4 space-y-2 text-sm text-gray-700">
    <div>
      <p style={{ color: COLORS.maxWeight}}>
        🏆 Heaviest Weight PR
      </p>
      <p>
        {insights.maxWeightPR.value} kg — {insights.maxWeightPR.month}
      </p>
      <p className="text-gray-500">
        {insights.maxWeightPR.timeSince}
      </p>
    </div>

    <div>
      <p style={{ color: COLORS.e1rm}}>
        📈 Best Estimated 1RM
      </p>
      <p>
        {insights.e1rmPR.value} kg — {insights.e1rmPR.month}
      </p>
      <p className="text-gray-500">
        {insights.e1rmPR.timeSince}
      </p>
    </div>
  </div>
)}


</div>
    </main>
  );
}
