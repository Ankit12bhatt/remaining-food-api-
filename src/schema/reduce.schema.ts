import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { store } from './store.schema';
import { item } from './item.schema';

@Schema()
export class reduce {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'store', required: true })
  store: store;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'item', required: true })
  item: item;
  @Prop({ required: true })
  quantity: number;
  @Prop({ required: true })
  reducedPrice: number;
  @Prop({ required: true, default: true })
  isAvailable: boolean;
  @Prop({ required: true })
  startTime: Date;
  @Prop({ required: true })
  endTIme: Date;
}
export const reduceSchema = SchemaFactory.createForClass(reduce);
