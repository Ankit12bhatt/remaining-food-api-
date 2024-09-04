import { Document } from 'mongoose';
export interface isStore extends Document {
  readonly businessName: string;
  readonly businessEmail: string;
  readonly description: string;
  readonly address: string;
  readonly location: [number, number];
}
