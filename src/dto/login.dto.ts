import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class loginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
