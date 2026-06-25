import { IsOptional, IsString } from 'class-validator';

export class QueryTipoAportanteContDto {
  @IsOptional()
  @IsString()
  search?: string;
}
