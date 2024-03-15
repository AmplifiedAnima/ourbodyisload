import { ExerciseBlueprintsInterface } from "./Exercise.interface";

export interface TrainingPlanInterface {
  _id: string;
  mainExercises: ExerciseBlueprintsInterface[];

  accessoryExercises: ExerciseBlueprintsInterface[];
}

export type TrainingDay = {
  main: ExerciseBlueprintsInterface[];
  accessory: ExerciseBlueprintsInterface[];
};

export type TrainingDays = {
  [key: string]: TrainingDay;
};
