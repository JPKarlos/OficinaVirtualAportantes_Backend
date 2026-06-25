import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'V_ReporteCarteraUGPP_Detallado_NuevoProceso',
  database: 'SIRIS_EPS',
  schema: 'Cartera',
  synchronize: false,
})
export class V_ReporteCarteraUgppDetalladoNuevoProceso {
  @PrimaryColumn({ name: 'Aportante_id', type: 'int' })
  aportanteId: number;

  @PrimaryColumn({ name: 'Afiliado_id', type: 'int' })
  afiliadoId: number;

  @PrimaryColumn({ name: 'Anio', type: 'int' })
  anio: number;

  @PrimaryColumn({ name: 'NumMes', type: 'int' })
  numMes: number;

  @PrimaryColumn({ name: 'documento', type: 'varchar', length: 18 })
  documento: string;

  @Column({ name: 'Fechamaximopago', type: 'date', nullable: true })
  fechaMaximoPago: Date;

  @Column({ name: 'Tipo', type: 'varchar', length: 2, nullable: true })
  tipo: string;

  @Column({ name: 'IdenAportante', type: 'varchar', length: 16, nullable: true })
  idenAportante: string;

  @Column({ name: 'DVAportante', type: 'varchar', length: 1, nullable: true })
  dvAportante: string;

  @Column({ name: 'NombreRazonSocial', type: 'varchar', length: 200, nullable: true })
  nombreRazonSocial: string;

  @Column({ name: 'TipoDocCotizante', type: 'nvarchar', length: 2, nullable: true })
  tipoDocCotizante: string;

  @Column({ name: 'apellido1', type: 'varchar', length: 50, nullable: true })
  apellido1: string;

  @Column({ name: 'apellido2', type: 'varchar', length: 50, nullable: true })
  apellido2: string;

  @Column({ name: 'nombre1', type: 'varchar', length: 50, nullable: true })
  nombre1: string;

  @Column({ name: 'nombre2', type: 'varchar', length: 50, nullable: true })
  nombre2: string;
}
