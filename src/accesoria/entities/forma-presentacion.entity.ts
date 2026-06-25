import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'FormaPresentacion',
  database: 'SIRIS_EPS',
  schema: 'Contributivo',
  synchronize: false,
})
export class FormaPresentacion {
  @PrimaryColumn({ name: 'FormaPresentacion_ide', type: 'int' })
  formaPresentacionIde: number;

  @Column({ name: 'FP', type: 'varchar', length: 1, nullable: false })
  fp: string;

  @Column({ name: 'Descripcion', type: 'varchar', length: 50, nullable: false })
  descripcion: string;
}
