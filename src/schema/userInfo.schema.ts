import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { user } from './user.schema';

@Schema()
export class userInfo {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user', required: true })
  user: user;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  contact: number;
  @Prop({ required: true })
  city: string;
}
export const userInfoSchema = SchemaFactory.createForClass(userInfo);
