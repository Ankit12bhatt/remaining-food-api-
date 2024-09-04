import { Document } from 'mongoose';

export interface isCatergory extends Document {
  readonly category: string;
}
