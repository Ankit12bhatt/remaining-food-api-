import { PartialType } from '@nestjs/mapped-types';
import { storeDto } from './createStore.dto';

export class updateStoreDto extends PartialType(storeDto) {}
