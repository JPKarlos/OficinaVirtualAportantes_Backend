import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'TipoPersona',
  database: 'SIRIS_EPS',
  schema: 'Contributivo',
  synchronize: false,
})
export class TipoPersona {
  @PrimaryColumn({ name: 'TipoPersona_ide', type: 'int' })
  tipoPersonaIde: number;

  @Column({ name: 'TP', type: 'varchar', length: 1, nullable: false })
  tp: string;

  @Column({ name: 'Descripcion', type: 'varchar', length: 50, nullable: false })
  descripcion: string;
}
