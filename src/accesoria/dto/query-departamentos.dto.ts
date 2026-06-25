import { IsOptional, IsString } from 'class-validator';

export class QueryDepartamentosDto {
  @IsOptional()
  @IsString()
  search?: string;
}
