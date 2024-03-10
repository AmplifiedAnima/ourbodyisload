// import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ExerciseBlueprint,
  ExerciseBlueprintSchema,
} from 'src/exercises/Schemas/exercise.schema';

@Schema()
export class TrainingPlanBlueprint {
  @Prop({ type: [ExerciseBlueprintSchema], default: [] })
  mainExercisesPart: ExerciseBlueprint[] | ExerciseBlueprint;

  @Prop({ type: [ExerciseBlueprintSchema], default: [] })
  accesoryExercises: ExerciseBlueprint[] | ExerciseBlueprint;
}

export const TrainingPlanBlueprintSchema = SchemaFactory.createForClass(
  TrainingPlanBlueprint,
);
