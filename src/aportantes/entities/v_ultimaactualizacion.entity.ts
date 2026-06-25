import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'V_UltimaActualizacionAportante',
  database: 'SIRIS_EPS',
  schema: 'OficinaVirtualAportantes',
  synchronize: false,
})
export class V_UltimaactualizacionAportantes {
  @PrimaryGeneratedColumn({ name: 'UltimaActualizacion_id', type: 'int' })
  ultimaActualizacionId: number;

  @Column({ name: 'Aportante_id', type: 'int',nullable: false })
  aportanteId: number;

  @Column({ name: 'IdenAportante', type: 'varchar', length: 500, nullable: false })
  idenAportante: string;

  @Column({ name: 'FechaUltimaActualizacion', type: 'datetime', nullable: false })
  fechaUltimaActualizacion: Date;

  @Column({ name: 'MesesDesdeUltimaActualizacion', type: 'int', nullable: false })
  mesesDesdeUltimaActualizacion: number;

  @Column({ name: 'NombreRazonSocial', type: 'varchar', length: 500, nullable: false })
  nombreRazonSocial: string;

}