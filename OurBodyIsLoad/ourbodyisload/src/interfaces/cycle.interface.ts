import { trainingPlanInterface } from "./trainingPlan.interface";

export interface cycleInterface {
  trainingPlans: trainingPlanInterface[];
  timesAWeek: string;
  _id: string;
}
