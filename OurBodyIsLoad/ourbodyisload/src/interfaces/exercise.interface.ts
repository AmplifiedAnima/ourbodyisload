export interface ExerciseBlueprintsInterface {
  _id: string;
  name: string;
  sets: string;
  reps: string;
  intensity: string;
  movementPattern: string;
  plane: string;
  type: string;
}

export interface ChosenExercises {
  timesAWeek: string;
  trainingPlans: Array<{
    day: string;
    mainExercises: ExerciseBlueprintsInterface[];
    accessoryExercises: ExerciseBlueprintsInterface[];
  }>;
  periodization: string;
}
