import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'ComprobantesPagoLicencias',
  database: 'SIRIS_EPS',
  schema: 'Contributivo',
  synchronize: false,
})
export class ComprobantePagoLicencia {
  @PrimaryColumn({ name: 'ComprobantesPagoLicencias_id', type: 'int' })
  comprobantesPagoLicenciasId!: number;

  @Column({ name: 'Afiliado_id', type: 'int', nullable: true })
  afiliadoId!: number;

  @Column({ name: 'LicenciasMaternidad_id', type: 'int', nullable: true })
  licenciasMaternidadId!: number;

  @Column({ name: 'Archivo', type: 'varchar', nullable: true })
  archivo!: string;
}