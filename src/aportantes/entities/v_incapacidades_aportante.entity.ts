import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'V_Incapacidades_Aportante',
  database: 'SIRIS_EPS',
  schema: 'OficinaVirtualAportantes',
  synchronize: false,
})
export class V_IncapacidadesAportante {
  @PrimaryColumn({ name: 'Incapacidad_id', type: 'int' })
  incapacidadId: number;

  @Column({ name: 'Afiliado_id', type: 'int', nullable: true })
  afiliadoId: number;

  @Column({ name: 'Tipo_Documento', type: 'varchar', length: 2, nullable: true })
  tipoDocumento: string;

  @Column({ name: 'Documento', type: 'varchar', length: 18, nullable: true })
  documento: string;

  @Column({ name: 'Apellido1', type: 'varchar', length: 50, nullable: true })
  apellido1: string;

  @Column({ name: 'Apellido2', type: 'varchar', length: 50, nullable: true })
  apellido2: string;

  @Column({ name: 'Nombre1', type: 'varchar', length: 50, nullable: true })
  nombre1: string;

  @Column({ name: 'Nombre2', type: 'varchar', length: 50, nullable: true })
  nombre2: string;

  @Column({ name: 'Genero', type: 'varchar', length: 1, nullable: true })
  genero: string;

  @Column({ name: 'FechaInicio', type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ name: 'FechaFin', type: 'date', nullable: true })
  fechaFin: Date;

  @Column({ name: 'FechaRadicado', type: 'date', nullable: true })
  fechaRadicado: Date;

  @Column({ name: 'BarCode', type: 'varchar', length: 50, nullable: true })
  barCode: string;

  @Column({ name: 'Cod_Diagnostico', type: 'varchar', length: 10, nullable: true })
  codDiagnostico: string;

  @Column({ name: 'Diagnostico', type: 'varchar', length: 256, nullable: true })
  diagnostico: string;

  @Column({ name: 'Estado_Novedad', type: 'varchar', length: 50, nullable: true })
  estadoNovedad: string;

  @Column({ name: 'ObservacionesRegistro', type: 'varchar', length: 500, nullable: true })
  observacionesRegistro: string;

  @Column({ name: 'NombreRazonSocial', type: 'varchar', length: 200, nullable: true })
  nombreRazonSocial: string;

  @Column({ name: 'TipoIncapacidad', type: 'varchar', length: 50, nullable: true })
  tipoIncapacidad: string;

  @Column({ name: 'FechaPago', type: 'date', nullable: true })
  fechaPago: Date;

  @Column({ name: 'PagoPor', type: 'varchar', length: 100, nullable: true })
  pagoPor: string;

  @Column({ name: 'Comprobante', type: 'varchar', length: 50, nullable: true })
  comprobante: string;

  @Column({ name: 'Estado_Pago', type: 'varchar', length: 50, nullable: true })
  estadoPago: string;

  @Column({ name: 'Aportante_id', type: 'int', nullable: true })
  aportanteId: number;

  @Column({ name: 'TipoDoc_aportante', type: 'varchar', length: 2, nullable: true })
  tipoDocAportante: string;

  @Column({ name: 'DocumentoAportante', type: 'varchar', length: 16, nullable: true })
  documentoAportante: string;

  @Column({ name: 'DVAportante', type: 'varchar', length: 1, nullable: true })
  dvAportante: string;
}
