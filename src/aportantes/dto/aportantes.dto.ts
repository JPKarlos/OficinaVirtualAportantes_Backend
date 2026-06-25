import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryAportanteDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  aportanteId?: number;

  @IsOptional()
  @IsString()
  nombreRazonSocial?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  apidentificacionId?: number;

  @IsOptional()
  @IsString()
  idenAportante?: string;

  @IsOptional()
  @IsString()
  dvAportante?: string;

  @IsOptional()
  @IsString()
  codSucDep?: string;

  @IsOptional()
  @IsString()
  nomSucDep?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  claseAportanteIde?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  naturalezaAportanteIde?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tipoPersonaIde?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  formaPresentacionIde?: number;

  @IsOptional()
  @IsString()
  direccionCorres?: string;

  @IsOptional()
  @IsString()
  direccionAlterna?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  municipioIde?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ciiuClaseId?: number;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  telefono2?: string;

  @IsOptional()
  @IsString()
  celular?: string;

  @IsOptional()
  @IsString()
  celular2?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  email2?: string;

  @IsOptional()
  @IsString()
  idenRepLegal?: string;

  @IsOptional()
  @IsString()
  dvRepLegal?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rlIdentificacionId?: number;

  @IsOptional()
  @IsString()
  apellido1RepLeg?: string;

  @IsOptional()
  @IsString()
  apellido2RepLeg?: string;

  @IsOptional()
  @IsString()
  nombre1RepLeg?: string;

  @IsOptional()
  @IsString()
  nombre2RepLeg?: string;

  @IsOptional()
  @Type(() => Date)
  fechaInicio?: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tipoAccionIde?: number;

  @IsOptional()
  @Type(() => Date)
  fechaFin?: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tipoAportanteContIde?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  datosGenAportanteIde?: number;
}
