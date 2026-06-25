import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'V_Aportante_Afiliados',
  database: 'SIRIS_EPS',
  schema: 'OficinaVirtualAportantes',
  synchronize: false,
})
export class V_AportanteAfiliados {
  @PrimaryColumn({ name: 'Historico_Id', type: 'int' })
  historicoId: number;

  @Column({ name: 'tipo', type: 'nvarchar', length: 2, nullable: true })
  tipo: string;

  @Column({ name: 'documento', type: 'varchar', length: 18, nullable: true })
  documento: string;

  @Column({ name: 'apellido1', type: 'varchar', length: 50, nullable: true })
  apellido1: string;

  @Column({ name: 'apellido2', type: 'varchar', length: 50, nullable: true })
  apellido2: string;

  @Column({ name: 'nombre1', type: 'varchar', length: 50, nullable: true })
  nombre1: string;

  @Column({ name: 'nombre2', type: 'varchar', length: 50, nullable: true })
  nombre2: string;

  @Column({ name: 'CodTipCot', type: 'varchar', length: 2, nullable: true })
  codTipCot: string;

  @Column({ name: 'TipoCotizante', type: 'varchar', length: 256, nullable: true })
  tipoCotizante: string;

  @Column({ name: 'TipoApt', type: 'varchar', length: 2, nullable: true })
  tipoApt: string;

  @Column({ name: 'IdenAportante', type: 'varchar', length: 16, nullable: true })
  idenAportante: string;

  @Column({ name: 'DVAportante', type: 'varchar', length: 1, nullable: true })
  dvAportante: string;

  @Column({ name: 'NombreRazonSocial', type: 'varchar', length: 200, nullable: true })
  nombreRazonSocial: string;

  @Column({ name: 'Afiliado_id', type: 'int', nullable: false })
  afiliadoId: number;

  @Column({ name: 'Aportante_id', type: 'int', nullable: true })
  aportanteId: number;

  @Column({ name: 'EstadoRelacionLaboral', type: 'int', nullable: true })
  estadoRelacionLaboral: number;
}
