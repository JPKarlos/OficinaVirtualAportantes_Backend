import { IsOptional, IsString } from 'class-validator';

export class QueryFormaPresentacionDto {
  @IsOptional()
  @IsString()
  search?: string;
}
