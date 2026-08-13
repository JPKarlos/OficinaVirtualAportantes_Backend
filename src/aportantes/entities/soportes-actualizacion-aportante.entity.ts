import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'SoportesActualizacionAportante',
  database: 'SIRIS_EPS',
  schema: 'OficinaVirtualAportantes',
  synchronize: false,
})
export class SoportesActualizacionAportante {
  @PrimaryGeneratedColumn({ name: 'soportes_Id', type: 'int' })
  soportesId: number;

  @Column({ name: 'aportante_Id', type: 'int', nullable: false })
  aportanteId: number;

  @Column({ name: 'rutaSoportes', type: 'varchar', length: 550, nullable: true })
  rutaSoportes: string;

  @Column({ name: 'cantidadDocumentosCargados', type: 'int', nullable: true })
  cantidadDocumentosCargados: number;

  @Column({ name: 'UltimaActualizacion_id', type: 'int', nullable: false })
  ultimaActualizacionId: number;

  @Column({ name: 'fechaCarga', type: 'datetime', nullable: false })
  fechaCarga: Date;
}