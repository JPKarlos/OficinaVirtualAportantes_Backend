import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'V_Solicitudes',
  database: 'SIRIS_EPS',
  schema: 'OficinaVirtualAportantes',
  synchronize: false,
})
export class V_Solicitudes {
  @PrimaryColumn({ name: 'solicitudes_Id', type: 'int' })
  solicitudesId: number;

  @Column({ name: 'radicacion', type: 'varchar', length: 550, nullable: true })
  radicacion: string;

  @Column({ name: 'fechaRadicacion', type: 'datetime', nullable: true })
  fechaRadicacion: Date;

  @Column({ name: 'estado_Solicitud', type: 'varchar', length: 50, nullable: true })
  estadoSolicitud: string;

  @Column({ name: 'observacion', type: 'varchar', nullable: true })
  observacion: string;

  @Column({ name: 'rutaSoportes', type: 'varchar', length: 550, nullable: true })
  rutaSoportes: string;

  @Column({ name: 'cantidadDocumentosCargados', type: 'int', nullable: true })
  cantidadDocumentosCargados: number;

  @Column({ name: 'tipo_Novedad', type: 'varchar', length: 50 })
  tipoNovedad: string;

  @Column({ name: 'usuarioResolvio', type: 'varchar', length: 550, nullable: true })
  usuarioResolvio: string;

  @Column({ name: 'fechaSolucion', type: 'datetime', nullable: true })
  fechaSolucion: Date;

  @Column({ name: 'NombreRazonSocial', type: 'varchar', length: 200, nullable: true })
  nombreRazonSocial: string;

  @Column({ name: 'aportante_Id', type: 'int', nullable: true })
  aportanteId: number;
}
