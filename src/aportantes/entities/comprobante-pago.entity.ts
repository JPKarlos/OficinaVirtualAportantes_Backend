import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'ComprobantesPago',
  database: 'SIRIS_EPS',
  schema: 'Contributivo',
  synchronize: false,
})
export class ComprobantePago {
  @PrimaryColumn({ name: 'ComprobantesPago_id', type: 'int' })
  comprobantesPagoId!: number;

  @Column({ name: 'Afiliado_id', type: 'int', nullable: true })
  afiliadoId!: number;

  @Column({ name: 'Incapacidad_id', type: 'int', nullable: true })
  incapacidadId!: number;

  @Column({ name: 'Archivo', type: 'varchar', nullable: true })
  archivo!: string;
}