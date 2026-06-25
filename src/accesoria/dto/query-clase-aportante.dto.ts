import { IsOptional, IsString } from 'class-validator';

export class QueryClaseAportanteDto {
  @IsOptional()
  @IsString()
  search?: string;
}
