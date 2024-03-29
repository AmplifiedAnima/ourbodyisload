import { TrainingPlanBlueprint } from '../schemas/training-plans.schema';

export class CreatePeriodizedTrainingCycleDto {
  trainingPlans: TrainingPlanBlueprint[];
  timesAWeek: string;
  periodization: string;
}
