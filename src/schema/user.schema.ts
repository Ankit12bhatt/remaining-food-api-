import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum userRole {
  SELLER = 'seller',
  BUYER = 'buyer',
}
@Schema()
export class user {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({
    type: String,
    enum: Object.values(userRole),
    default: userRole.BUYER,
  })
  role: userRole;
}

export const userSchema = SchemaFactory.createForClass(user);
