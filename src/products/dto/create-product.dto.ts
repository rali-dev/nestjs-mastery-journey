import { IsNotEmpty, IsNumber, IsString, MinLength, IsOptional } from 'class-validator';

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
}
