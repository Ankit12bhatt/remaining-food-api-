import { PartialType } from '@nestjs/mapped-types';
import { reduceDto } from './reduce.dto';

export class updateReduceList extends PartialType(reduceDto) {}
