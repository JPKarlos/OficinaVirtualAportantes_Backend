import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'V_Licencias_Aportante',
  database: 'SIRIS_EPS',
  schema: 'OficinaVirtualAportantes',
  synchronize: false,
})
export class V_LicenciasAportante {
  @PrimaryColumn({ name: 'Radicacion', type: 'varchar', length: 50 })
  radicacion: string;

  @Column({ name: 'Codigo_EPS', type: 'varchar', length: 10, nullable: true })
  codigoEps: string;

  @Column({ name: 'Fecha_radicacion', type: 'date', nullable: true })
  fechaRadicacion: Date;

  @Column({ name: 'TipoDocumento', type: 'varchar', length: 2, nullable: true })
  tipoDocumento: string;

  @Column({ name: 'documento', type: 'varchar', length: 18, nullable: true })
  documento: string;

  @Column({ name: 'apellido1', type: 'varchar', length: 50, nullable: true })
  apellido1: string;

  @Column({ name: 'apellido2', type: 'varchar', length: 50, nullable: true })
  apellido2: string;

  @Column({ name: 'nombre1', type: 'varchar', length: 50, nullable: true })
  nombre1: string;

  @Column({ name: 'nombre2', type: 'varchar', length: 50, nullable: true })
  nombre2: string;

  @Column({ name: 'Tipo_documentoaportante', type: 'varchar', length: 2, nullable: true })
  tipoDocumentoAportante: string;

  @Column({ name: 'Documento_aportante', type: 'varchar', length: 16, nullable: true })
  documentoAportante: string;

  @Column({ name: 'NombreRazonSocial', type: 'varchar', length: 200, nullable: true })
  nombreRazonSocial: string;

  @Column({ name: 'Salario', type: 'decimal', precision: 18, scale: 2, nullable: true })
  salario: number;

  @Column({ name: 'Tipo_salario', type: 'varchar', length: 50, nullable: true })
  tipoSalario: string;

  @Column({ name: 'FechaInicio', type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ name: 'FechaFinLicencia', type: 'date', nullable: true })
  fechaFinLicencia: Date;

  @Column({ name: 'Dias_Reconocer', type: 'int', nullable: true })
  diasReconocer: number;

  @Column({ name: 'FechaPago', type: 'date', nullable: true })
  fechaPago: Date;

  @Column({ name: 'Pagada', type: 'varchar', length: 10, nullable: true })
  pagada: string;

  @Column({ name: 'Vr_a_pagar', type: 'decimal', precision: 18, scale: 2, nullable: true })
  vrAPagar: number;

  @Column({ name: 'Tipo_prestacioneconomica', type: 'varchar', length: 50, nullable: true })
  tipoPrestacionEconomica: string;

  @Column({ name: 'Tipo_licencia', type: 'varchar', length: 50, nullable: true })
  tipoLicencia: string;

  @Column({ name: 'DiasGestacion', type: 'int', nullable: true })
  diasGestacion: number;

  @Column({ name: 'Dias_Prematuro', type: 'int', nullable: true })
  diasPrematuro: number;

  @Column({ name: 'Fecha_parto', type: 'date', nullable: true })
  fechaParto: Date;

  @Column({ name: 'FechaPP', type: 'date', nullable: true })
  fechaPp: Date;

  @Column({ name: 'EstadoNovedad', type: 'varchar', length: 50, nullable: true })
  estadoNovedad: string;

  @Column({ name: 'NroComprobante', type: 'varchar', length: 50, nullable: true })
  nroComprobante: string;

  @Column({ name: 'Aportante_id', type: 'int', nullable: true })
  aportanteId: number;
}
