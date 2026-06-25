import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Solicitudes',
  database: 'SIRIS_EPS',
  schema: 'OficinaVirtualAportantes',
  synchronize: false,
})
export class Solicitud {
  @PrimaryGeneratedColumn({ name: 'solicitudes_Id', type: 'int' })
  solicitudesId: number;

  @Column({ name: 'aportante_Id', type: 'int', nullable: true })
  aportanteId: number;

  @Column({ name: 'radicacion', type: 'varchar', length: 550, nullable: true })
  radicacion: string;

  @Column({ name: 'fechaRadicacion', type: 'datetime', nullable: true })
  fechaRadicacion: Date;

  @Column({ name: 'estadoRadicacion_Id', type: 'int' })
  estadoRadicacionId: number;

  @Column({ name: 'observacion', type: 'varchar', nullable: true })
  observacion: string;

  @Column({ name: 'rutaSoportes', type: 'varchar', length: 550, nullable: true })
  rutaSoportes: string;

  @Column({ name: 'cantidadDocumentosCargados', type: 'int', nullable: true })
  cantidadDocumentosCargados: number;

  @Column({ name: 'tipoNovedad_Id', type: 'int', nullable: true })
  tipoNovedadId: number;

  @Column({ name: 'usuarioResolvio', type: 'varchar', length: 550, nullable: true })
  usuarioResolvio: string;

  @Column({ name: 'fechaSolucion', type: 'datetime', nullable: true })
  fechaSolucion: Date;
}
