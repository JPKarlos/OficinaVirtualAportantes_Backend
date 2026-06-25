import { MoraAportanteItemDto } from '../dto/mora-aportante-response.dto';
import { V_ReporteCarteraUgppAfiliadoResumen } from '../entities/v_reporte-cartera-ugpp-afiliado-resumen.entity';

export function mapMoraAportanteToDto(
  row: V_ReporteCarteraUgppAfiliadoResumen,
): MoraAportanteItemDto {
  return {
    anio: row.anio ?? null,
    numMes: row.numMes ?? null,
    fechaMaximoPago: row.fechaMaximoPago ?? null,
    tipoDocCotizante: row.tipoDocCotizante ?? null,
    documento: row.documento,
    apellido1: row.apellido1 ?? null,
    apellido2: row.apellido2 ?? null,
    nombre1: row.nombre1 ?? null,
    nombre2: row.nombre2 ?? null,
    nombreCompleto: buildNombreCompleto(row),
    codTipCot: row.codTipCot ?? null,
    tipoCotizante: row.tipoCotizante ?? null,
    codEstadoAfiliacion: row.codEstadoAfiliacion ?? null,
    desRegimen: row.desRegimen ?? null,
    correoElectronicoCotizante: row.correoElectronicoCotizante ?? null,
    telefonoCotizante: row.telefonoCotizante ?? null,
    valorPeriodo: row.valorPeriodo != null ? Number(row.valorPeriodo) : null,
    cantidadRegistros: row.cantidadRegistros ?? null,
    tipo: row.tipo ?? null,
    idenAportante: row.idenAportante ?? null,
    dvAportante: row.dvAportante ?? null,
    nombreRazonSocial: row.nombreRazonSocial ?? null,
    correoElectronicoAportante: row.correoElectronicoAportante ?? null,
    telefonoAportante: row.telefonoAportante ?? null,
  };
}

function buildNombreCompleto(row: V_ReporteCarteraUgppAfiliadoResumen): string {
  return [row.apellido1, row.apellido2, row.nombre1, row.nombre2]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(' ');
}
