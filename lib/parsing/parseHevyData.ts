

export function parseHevyData(rows: any[]) {
  return rows.map((row) => {
    return {
      date: row.start_time,
      exercise: row.exercise_title,
      workoutTitle: row.title,

      type: row.set_type,

      weight: row.weight_kg ? Number(row.weight_kg) : null,
      reps: row.reps ? Number(row.reps) : null,
      duration: row.duration_seconds ? Number(row.duration_seconds) : null,
    };
  });
}