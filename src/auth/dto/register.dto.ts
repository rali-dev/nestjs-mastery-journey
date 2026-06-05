import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @IsInt()
  @Min(0)
  age!: number;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
