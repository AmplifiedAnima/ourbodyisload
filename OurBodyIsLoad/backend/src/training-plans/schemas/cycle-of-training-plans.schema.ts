import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  TrainingPlanBlueprint,
  TrainingPlanBlueprintSchema,
} from './training-plans.schema';

@Schema()
export class CycleOfTrainingPlans extends Document {
  @Prop({
    type: [TrainingPlanBlueprintSchema],
    default: [],
  })
  trainingPlans: TrainingPlanBlueprint[];

  @Prop({ type: String, default: '2' })
  timesAWeek: string;

  @Prop({ type: String, default: 'strength' })
  periodization: string;
}

export const CycleOfTrainingPlansSchema =
  SchemaFactory.createForClass(CycleOfTrainingPlans);
