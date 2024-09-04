import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { type } from 'src/schema/item.schema';

export class itemDto {
  @IsString()
  @IsNotEmpty()
  readonly itemName: string;

  @IsString()
  @IsNotEmpty()
  readonly itemDescription: string;

  @IsNumber()
  @IsNotEmpty()
  readonly itemPrice: number;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsEnum(type)
  readonly type: type;
}
