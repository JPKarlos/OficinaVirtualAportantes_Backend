import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'TipoAccion',
  database: 'SIRIS_EPS',
  schema: 'Contributivo',
  synchronize: false,
})
export class TipoAccion {
  @PrimaryColumn({ name: 'TipoAccion_ide', type: 'int' })
  tipoAccionIde: number;

  @Column({ name: 'TA', type: 'varchar', length: 1, nullable: false })
  ta: string;

  @Column({ name: 'Descripcion', type: 'varchar', length: 50, nullable: false })
  descripcion: string;
}
