import { Document } from 'mongoose';

export interface isUser extends Document {
  readonly role: string;
  readonly email: string;
  readonly password: string;
}

export interface isUserInfo extends Document {
  readonly contact: string;
  readonly city: string;
}
