import { IsEnum } from 'class-validator';
import { categoryType } from 'src/schema/category.schema';

export class catergoryDto {
  @IsEnum(categoryType)
  readonly category: categoryType;
}
