import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export class reduceDto {
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @IsNotEmpty()
  @IsNumber()
  readonly reducedPrice: number;

  @IsNotEmpty()
  @IsISO8601()
  readonly startTime: Date;

  @IsNotEmpty()
  @IsISO8601()
  readonly endTime: Date;
}
