import { Schema, Prop } from '@nestjs/mongoose/dist/decorators';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories';

@Schema({
  timestamps: true,
})
export class exercise {
  id: string;

  @Prop({ nullable: true })
  name: string;

  @Prop({ nullable: true })
  sets: string;

  @Prop({ nullable: true })
  reps: string;

  @Prop({ nullable: true })
  intensity: string;
}

export const exerciseSchema = SchemaFactory.createForClass(exercise);
