import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { store } from './store.schema';
import { category } from './category.schema';

export enum type {
  veg = 'veg',
  NonVeg = 'non-veg',
}

@Schema()
export class item {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'store', required: true })
  store: store;
  @Prop({ required: true })
  itemName: string;
  @Prop({ required: true })
  itemDescription: string;
  @Prop({ required: true })
  itemPrice: number;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'category',
    required: true,
  })
  category: category;
  @Prop({
    type: String,
    enum: Object.values(type),
    default: type.veg,
  })
  type: type;
}

export const ItemSchema = SchemaFactory.createForClass(item);
