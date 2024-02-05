import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class RecoveryToken {
  @Prop({ required: true, index: true })
  userEmail: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expirationDate: Date;

  @Prop({ default: false })
  used: boolean;
}

export const RecoveryTokenSchema = SchemaFactory.createForClass(RecoveryToken);
export type RecoveryTokenDocument = RecoveryToken & Document;
