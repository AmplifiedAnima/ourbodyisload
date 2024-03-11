import { ExerciseBlueprint } from 'src/exercises/Schemas/exercise.schema';

export class CreateTrainingPlanDto {
  mainExercisesPart: ExerciseBlueprint[];
  accesoryExercises: ExerciseBlueprint[];
}
