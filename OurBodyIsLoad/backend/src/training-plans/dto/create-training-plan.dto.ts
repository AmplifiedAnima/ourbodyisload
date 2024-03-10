import { ExerciseBlueprint } from 'src/exercises/Schemas/exercise.schema';

export class CreateTrainingPlanDto {
  mainExercisesPart: ExerciseBlueprint[] | ExerciseBlueprint;
  accesoryExercises: ExerciseBlueprint[] | ExerciseBlueprint;
}
