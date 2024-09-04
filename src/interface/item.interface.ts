import { Document } from 'mongoose';

export interface isItem extends Document {
  readonly itemName: string;
  readonly itemDescritpion: string;
  readonly itemPrice: string;
  readonly category: string;
  readonly type: string;
}
