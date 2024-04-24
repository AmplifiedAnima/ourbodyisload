import { Schema, Prop } from '@nestjs/mongoose/dist/decorators';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories';

@Schema({
  timestamps: true,
})
export class ExerciseBlueprint {
  @Prop({ nullable: true })
  name: string;

  @Prop({ nullable: true })
  toolsUsedInExercise: string;

  @Prop({ default: 'default', nullable: true })
  sets: string;

  @Prop({ default: 'default', nullable: true })
  reps: string;

  @Prop({ nullable: true })
  intensity: string;

  @Prop({ nullable: true })
  movementPattern: string;

  @Prop({ nullable: true })
  exerciseTempo?: string;

  @Prop({ nullable: true })
  pauseDuration?: string;

  @Prop({ nullable: true })
  plane: string;

  @Prop({ nullable: true })
  type: string;

  @Prop({ nullable: true })
  videoURL: string;
}

export const ExerciseBlueprintSchema =
  SchemaFactory.createForClass(ExerciseBlueprint);
