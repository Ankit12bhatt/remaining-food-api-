import { Document } from 'mongoose';

export interface isDetails extends Document {
  readonly id: string;
  readonly role: string;
  readonly iat: number;
  readonly exp: number;
}
