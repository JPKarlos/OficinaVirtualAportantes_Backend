import { IsOptional, IsString } from 'class-validator';

export class QueryTipoAccionDto {
  @IsOptional()
  @IsString()
  search?: string;
}
