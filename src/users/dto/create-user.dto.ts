import { IsOptional, MinLength, IsEmail, IsNotEmpty, IsString, IsInt, Min } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  age!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}