import { Aportante } from '../entities/aportantes.entity';
import { AportantePayload } from '../dto/create-aportante.dto';

export function mapAportanteEntityToPayload(aportante: Aportante): AportantePayload {
  return {
    nombreRazonSocial: aportante.nombreRazonSocial,
    apidentificacionId: aportante.apidentificacionId,
    idenAportante: aportante.idenAportante,
    dvAportante: aportante.dvAportante ?? null,
    codSucDep: aportante.codSucDep ?? null,
    nomSucDep: aportante.nomSucDep ?? null,
    claseAportanteIde: aportante.claseAportanteIde,
    naturalezaAportanteIde: aportante.naturalezaAportanteIde,
    tipoPersonaIde: aportante.tipoPersonaIde,
    formaPresentacionIde: aportante.formaPresentacionIde ?? null,
    direccionCorres: aportante.direccionCorres ?? null,
    direccionAlterna: aportante.direccionAlterna ?? null,
    municipioIde: aportante.municipioIde,
    ciiuClaseId: aportante.ciiuClaseId,
    telefono: aportante.telefono ?? null,
    telefono2: aportante.telefono2 ?? null,
    celular: aportante.celular ?? null,
    celular2: aportante.celular2 ?? null,
    fax: aportante.fax ?? null,
    email: aportante.email ?? null,
    email2: aportante.email2 ?? null,
    idenRepLegal: aportante.idenRepLegal ?? null,
    dvRepLegal: aportante.dvRepLegal ?? null,
    rlIdentificacionId: aportante.rlIdentificacionId,
    apellido1RepLeg: aportante.apellido1RepLeg ?? null,
    apellido2RepLeg: aportante.apellido2RepLeg ?? null,
    nombre1RepLeg: aportante.nombre1RepLeg ?? null,
    nombre2RepLeg: aportante.nombre2RepLeg ?? null,
    fechaInicio: aportante.fechaInicio ?? null,
    tipoAccionIde: aportante.tipoAccionIde ?? null,
    fechaFin: aportante.fechaFin ?? null,
    tipoAportanteContIde: aportante.tipoAportanteContIde ?? null,
  };
}
