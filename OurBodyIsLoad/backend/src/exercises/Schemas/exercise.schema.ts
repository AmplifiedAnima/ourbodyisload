import { Schema, Prop } from '@nestjs/mongoose/dist/decorators';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories';

@Schema({
  timestamps: true,
})
export class ExerciseBlueprint {
  @Prop({ nullable: true })
  name: string;

  @Prop({ default: 'Default', nullable: true })
  sets: string;

  @Prop({ default: 'Default', nullable: true })
  reps: string;

  @Prop({ nullable: true })
  intensity: string;

  @Prop({ nullable: true })
  movementPattern: string;

  @Prop({ nullable: true })
  plane: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(ExerciseBlueprint);
