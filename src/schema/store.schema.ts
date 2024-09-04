import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { user } from './user.schema';

@Schema({ timestamps: true })
export class store {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user', required: true })
  user: user;
  @Prop({ required: true })
  businessName: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  businessEmail: string;
  @Prop({ required: true, type: [Number] })
  location: [number, number];
}
const storeSchema = SchemaFactory.createForClass(store);

// Define index separately
storeSchema.index({ location: '2dsphere' });

export { storeSchema };
