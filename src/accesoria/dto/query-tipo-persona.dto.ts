import { IsOptional, IsString } from 'class-validator';

export class QueryTipoPersonaDto {
  @IsOptional()
  @IsString()
  search?: string;
}
