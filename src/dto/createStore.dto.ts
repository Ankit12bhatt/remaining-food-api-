import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class storeDto {
  @IsNotEmpty()
  @IsString()
  readonly businessName: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly businessEmail: string;

  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  location: [number, number];
}
