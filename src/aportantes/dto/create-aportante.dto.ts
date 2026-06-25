import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAportanteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombreRazonSocial: string;

  @IsInt()
  @Type(() => Number)
  apidentificacionId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  idenAportante: string;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  dvAportante?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  codSucDep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  nomSucDep?: string;

  @IsInt()
  @Type(() => Number)
  claseAportanteIde: number;

  @IsInt()
  @Type(() => Number)
  naturalezaAportanteIde: number;

  @IsInt()
  @Type(() => Number)
  tipoPersonaIde: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  formaPresentacionIde?: number;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  direccionCorres?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direccionAlterna?: string;

  @IsInt()
  @Type(() => Number)
  municipioIde: number;

  @IsInt()
  @Type(() => Number)
  ciiuClaseId: number;

  @IsOptional()
  @IsString()
  @MaxLength(13)
  telefono?: string;

  @IsOptional()
  @IsString()
  @MaxLength(13)
  telefono2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(13)
  celular?: string;

  @IsOptional()
  @IsString()
  @MaxLength(13)
  celular2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(13)
  fax?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(60)
  email?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(60)
  email2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  idenRepLegal?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  dvRepLegal?: string;

  @IsInt()
  @Type(() => Number)
  rlIdentificacionId: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  apellido1RepLeg?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  apellido2RepLeg?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  nombre1RepLeg?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  nombre2RepLeg?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  tipoAccionIde?: number;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  tipoAportanteContIde?: number;
}

export interface AportantePayload {
  nombreRazonSocial: string;
  apidentificacionId: number;
  idenAportante: string;
  dvAportante: string | null;
  codSucDep: string | null;
  nomSucDep: string | null;
  claseAportanteIde: number;
  naturalezaAportanteIde: number;
  tipoPersonaIde: number;
  formaPresentacionIde: number | null;
  direccionCorres: string | null;
  direccionAlterna: string | null;
  municipioIde: number;
  ciiuClaseId: number;
  telefono: string | null;
  telefono2: string | null;
  celular: string | null;
  celular2: string | null;
  fax: string | null;
  email: string | null;
  email2: string | null;
  idenRepLegal: string | null;
  dvRepLegal: string | null;
  rlIdentificacionId: number;
  apellido1RepLeg: string | null;
  apellido2RepLeg: string | null;
  nombre1RepLeg: string | null;
  nombre2RepLeg: string | null;
  fechaInicio: Date | null;
  tipoAccionIde: number | null;
  fechaFin: Date | null;
  tipoAportanteContIde: number | null;
}

export function mapCreateAportanteDtoToPayload(
  dto: CreateAportanteDto,
): AportantePayload {
  const toNullableString = (value?: string) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : null;
  };

  const toDate = (value?: string) => (value ? new Date(value) : null);

  return {
    nombreRazonSocial: dto.nombreRazonSocial.trim(),
    apidentificacionId: dto.apidentificacionId,
    idenAportante: dto.idenAportante.trim(),
    dvAportante: toNullableString(dto.dvAportante),
    codSucDep: toNullableString(dto.codSucDep),
    nomSucDep: toNullableString(dto.nomSucDep),
    claseAportanteIde: dto.claseAportanteIde,
    naturalezaAportanteIde: dto.naturalezaAportanteIde,
    tipoPersonaIde: dto.tipoPersonaIde,
    formaPresentacionIde: dto.formaPresentacionIde ?? null,
    direccionCorres: toNullableString(dto.direccionCorres),
    direccionAlterna: toNullableString(dto.direccionAlterna),
    municipioIde: dto.municipioIde,
    ciiuClaseId: dto.ciiuClaseId,
    telefono: toNullableString(dto.telefono),
    telefono2: toNullableString(dto.telefono2),
    celular: toNullableString(dto.celular),
    celular2: toNullableString(dto.celular2),
    fax: toNullableString(dto.fax),
    email: toNullableString(dto.email),
    email2: toNullableString(dto.email2),
    idenRepLegal: toNullableString(dto.idenRepLegal),
    dvRepLegal: toNullableString(dto.dvRepLegal),
    rlIdentificacionId: dto.rlIdentificacionId,
    apellido1RepLeg: toNullableString(dto.apellido1RepLeg),
    apellido2RepLeg: toNullableString(dto.apellido2RepLeg),
    nombre1RepLeg: toNullableString(dto.nombre1RepLeg),
    nombre2RepLeg: toNullableString(dto.nombre2RepLeg),
    fechaInicio: toDate(dto.fechaInicio),
    tipoAccionIde: dto.tipoAccionIde ?? null,
    fechaFin: toDate(dto.fechaFin),
    tipoAportanteContIde: dto.tipoAportanteContIde ?? null,
  };
}
