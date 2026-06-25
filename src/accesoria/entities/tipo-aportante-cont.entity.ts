import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'TipoAportanteCont',
  database: 'SIRIS_EPS',
  schema: 'Contributivo',
  synchronize: false,
})
export class TipoAportanteCont {
  @PrimaryColumn({ name: 'TipoAportanteCont_ide', type: 'int' })
  tipoAportanteContIde: number;

  @Column({ name: 'TA', type: 'varchar', length: 2, nullable: false })
  ta: string;

  @Column({ name: 'Descripcion', type: 'varchar', length: 120, nullable: false })
  descripcion: string;
}
