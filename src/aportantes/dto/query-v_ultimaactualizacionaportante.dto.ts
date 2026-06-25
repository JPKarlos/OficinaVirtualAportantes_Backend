import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryV_UltimaActualizacionAportanteDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ultimaActualizacionId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  aportanteId?: number;

  @IsOptional()
  @IsString()
  idenAportante?: string;

  @IsOptional()
  @IsString()
  fechaUltimaActualizacion?: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  MesesDesdeUltimaActualizacion?: number;

   @IsOptional()
  @IsString()
  NombreRazonSocial?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10;
}