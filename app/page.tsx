"use client";

import { useState } from "react";
import { useEffect } from "react";

import Papa from "papaparse";

import { buildStrengthDataset } from "@/lib/analytics/buildStrengthDataset";
import { buildExerciseAnalytics } from "@/lib/analytics/buildExerciseAnalytics";

import { supportedExercises } from "@/lib/data/supportedExercises";

import { ExerciseChart } from "@/components/ExerciseChart";
import { ExerciseInsights } from "@/components/ExerciseInsights";


export default function Home() {
  const [chartData, setChartData] = useState<any[]>([]) // state for chart
  const [insights, setInsights] = useState<any | null>(null); // state for insights under chart
  const [selectedExercise, setSelectedExercise] = useState(supportedExercises[3]);
  const [strengthSets, setStrengthSets] = useState<any[]>([]);

  useEffect(() => {
  if (!strengthSets.length) return;

  const analytics = buildExerciseAnalytics(
    strengthSets,
    selectedExercise.name
  );

  setChartData(analytics.trend);
  setInsights(analytics.insights);

}, [strengthSets, selectedExercise.name]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        
      // parse + clean data to get working sets 
      // and for exercises that are weight x reps only
      const parsedStrengthSets = buildStrengthDataset(results.data);
      setStrengthSets(parsedStrengthSets);
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
        <p>{chartData.length} sets</p>
      </div>

      <div className="mt-8" style={{ width: "100%", height: 300 }}>

        <select
          value={selectedExercise.name}
          onChange={(e) => {
            const exercise = supportedExercises.find(
              (x) => x.name === e.target.value
            );

            if (exercise) {
              setSelectedExercise(exercise);
            }
          }}
        >
          {supportedExercises.map((exercise) => (
            <option key={exercise.name} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
      </select>


        <h2 className="text-xl font-semibold">{selectedExercise.name}</h2>

        <ExerciseChart chartData={chartData} />

        <ExerciseInsights insights={insights} />


</div>
    </main>
  );
}
