import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ExerciseBlueprint } from 'src/exercises/Schemas/exercise.schema';
import { userChosenClass } from 'src/user-chosen-classes/schemas/user-chosen-class.schema';
import Role from '../role.enum';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'exercise' }] })
  exercises?: Types.Array<ExerciseBlueprint>;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userChosenClasses' }],
  })
  userChosenClasses?: Types.Array<userChosenClass>;

  @Prop({
    type: [
      {
        type: String,
        enum: Object.values(Role),
      },
    ],
    default: [Role.basicUser],
  })
  roles?: Role[];
  @Prop()
  avatarImageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
