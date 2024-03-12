// import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ExerciseBlueprint,
  ExerciseBlueprintSchema,
} from 'src/exercises/Schemas/exercise.schema';

@Schema()
export class TrainingPlanBlueprint {
  @Prop({ type: [ExerciseBlueprintSchema], default: [] })
  mainExercises: ExerciseBlueprint[]; // Changed from mainExercisesPart

  @Prop({ type: [ExerciseBlueprintSchema], default: [] })
  accessoryExercises: ExerciseBlueprint[];

  @Prop({ type: String })
  day: string;
}

export const TrainingPlanBlueprintSchema = SchemaFactory.createForClass(
  TrainingPlanBlueprint,
);
