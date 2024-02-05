import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class userChosenClass extends Document {
  @Prop()
  preExistingClassName: string;

  @Prop()
  preExistingClassVideoUrl: string;

  @Prop({ ref: 'User' })
  userOwnerId: string;

  @Prop()
  scheduleTime: string;
}
export const userChosenClassSchema =
  SchemaFactory.createForClass(userChosenClass);
