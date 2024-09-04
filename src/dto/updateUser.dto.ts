import { PartialType } from '@nestjs/mapped-types';
import { userDto } from './createUser.dto';

export class updateUserDto extends PartialType(userDto) {}
