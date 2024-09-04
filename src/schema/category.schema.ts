import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export enum categoryType {
  starter = 'starter',
  mainCourse = 'main course',
  dessert = 'dessert',
  beverages = 'beverages',
}
@Schema()
export class category {
  @Prop({
    required: true,
    type: String,
    enum: Object.values(categoryType),
    default: categoryType.mainCourse,
  })
  category: string;
}

export const categorySchema = SchemaFactory.createForClass(category);
