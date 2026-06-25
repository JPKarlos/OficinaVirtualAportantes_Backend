import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'CiiuClase',
  database: 'SIRIS_EPS',
  schema: 'Accesoria',
  synchronize: false,
})
export class CiiuClase {
  @PrimaryColumn({ name: 'CiiuClase_id', type: 'int' })
  ciiuClaseId: number;

  @Column({ name: 'CiiuGrupo_id', type: 'int', nullable: false })
  ciiuGrupoId: number;

  @Column({ name: 'codigo', type: 'varchar', length: 4, nullable: false })
  codigo: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 250, nullable: false })
  descripcion: string;
}
