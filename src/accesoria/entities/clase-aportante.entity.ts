import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'ClaseAportante',
  database: 'SIRIS_EPS',
  schema: 'Contributivo',
  synchronize: false,
})
export class ClaseAportante {
  @PrimaryColumn({ name: 'ClaseAportante_ide', type: 'int' })
  claseAportanteIde: number;

  @Column({ name: 'Clase', type: 'varchar', length: 1, nullable: false })
  clase: string;

  @Column({ name: 'Descripcion', type: 'varchar', length: 50, nullable: false })
  descripcion: string;
}
