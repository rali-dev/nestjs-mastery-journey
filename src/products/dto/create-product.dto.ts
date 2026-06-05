import { IsNotEmpty, IsNumber, IsString, MinLength, IsOptional } from 'class-validator';
import UserGuard from 'src/users/dto/userGuards';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  readonly description!: string;

  @IsNumber()
  @IsOptional()
  readonly price!: number;

  @IsOptional()
  user!: UserGuard;

}
