import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'NaturalezaAportante',
  database: 'SIRIS_EPS',
  schema: 'Contributivo',
  synchronize: false,
})
export class NaturalezaAportante {
  @PrimaryColumn({ name: 'NaturalezaAportante_ide', type: 'int' })
  naturalezaAportanteIde: number;

  @Column({ name: 'NJ', type: 'varchar', length: 1, nullable: false })
  nj: string;

  @Column({ name: 'Descripcion', type: 'varchar', length: 80, nullable: false })
  descripcion: string;
}
