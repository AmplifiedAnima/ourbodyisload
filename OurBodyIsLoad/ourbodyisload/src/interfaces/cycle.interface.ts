import { TrainingPlanInterface } from "./TrainingPlan.interface";

export interface CycleInterface {
  trainingPlans: TrainingPlanInterface[];
  timesAWeek: string;
  _id: string;
}
