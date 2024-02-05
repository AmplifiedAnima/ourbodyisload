import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class preExistingClass {
  @Prop({ unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  videoUrl: string;
}
export const preExistingClassSchema =
  SchemaFactory.createForClass(preExistingClass);
