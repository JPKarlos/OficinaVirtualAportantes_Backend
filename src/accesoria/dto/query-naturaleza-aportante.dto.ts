import { IsOptional, IsString } from 'class-validator';

export class QueryNaturalezaAportanteDto {
  @IsOptional()
  @IsString()
  search?: string;
}
