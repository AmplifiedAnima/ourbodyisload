import { exerciseBlueprintsInterface } from "./exercise.interface";

export interface trainingPlanInterface {
  _id: string;
  mainExercises: exerciseBlueprintsInterface[];

  accessoryExercises: exerciseBlueprintsInterface[];
}
