import { IsOptional, IsString } from 'class-validator';

export class QueryTipoIdenContDto {
  @IsOptional()
  @IsString()
  search?: string;
}
