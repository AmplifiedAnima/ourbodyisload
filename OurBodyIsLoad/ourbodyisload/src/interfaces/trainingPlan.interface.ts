import { exerciseBlueprintsInterface } from "./exercise.interface";

export interface TrainingPlanInterface {
  mainExercisesPart: exerciseBlueprintsInterface[];

  accesoryExercises: exerciseBlueprintsInterface[];
}
