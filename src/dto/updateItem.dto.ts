import { PartialType } from '@nestjs/mapped-types';
import { itemDto } from './createItem.dto';

export class itemUpdateDto extends PartialType(itemDto) {}
