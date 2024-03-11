import { trainingPlanInterface } from "./trainingPlan.interface";

export interface cycleOfTrainingPlansInterface {
  trainingPlans: trainingPlanInterface[];
  timesAWeek: string;
  _id: string;
}
