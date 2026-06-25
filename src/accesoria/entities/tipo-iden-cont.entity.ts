import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'TipoIdenCont',
  database: 'SIRIS_EPS',
  schema: 'Contributivo',
  synchronize: false,
})
export class TipoIdenCont {
  @PrimaryColumn({ name: 'TipoIdenCont_id', type: 'int' })
  tipoIdenContId: number;

  @Column({ name: 'Tipo', type: 'varchar', length: 2, nullable: false })
  tipo: string;
}
