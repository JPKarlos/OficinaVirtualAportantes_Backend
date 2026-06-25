import { AportanteAfiliadoItemDto } from '../dto/aportante-afiliado-response.dto';
import { V_AportanteAfiliados } from '../entities/v_aportante_afiliados.entity';

export function mapAportanteAfiliadoToDto(
  row: V_AportanteAfiliados,
): AportanteAfiliadoItemDto {
  return {
    historicoId: row.historicoId,
    afiliadoId: row.afiliadoId,
    tipo: row.tipo ?? null,
    documento: row.documento ?? null,
    apellido1: row.apellido1 ?? null,
    apellido2: row.apellido2 ?? null,
    nombre1: row.nombre1 ?? null,
    nombre2: row.nombre2 ?? null,
    nombreCompleto: buildNombreCompleto(row),
    codTipCot: row.codTipCot ?? null,
    tipoCotizante: row.tipoCotizante ?? null,
    tipoApt: row.tipoApt ?? null,
    idenAportante: row.idenAportante ?? null,
    dvAportante: row.dvAportante ?? null,
    nombreRazonSocial: row.nombreRazonSocial ?? null,
    aportanteId: row.aportanteId ?? null,
    estadoRelacionLaboral: row.estadoRelacionLaboral ?? null,
  };
}

function buildNombreCompleto(row: V_AportanteAfiliados): string {
  return [row.apellido1, row.apellido2, row.nombre1, row.nombre2]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(' ');
}
