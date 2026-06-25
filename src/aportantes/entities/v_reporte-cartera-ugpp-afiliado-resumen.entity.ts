import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'V_ReporteCarteraUGPP_AfiliadoResumen',
  database: 'SIRIS_EPS',
  schema: 'OficinaVirtualAportantes',
  synchronize: false,
})
export class V_ReporteCarteraUgppAfiliadoResumen {
  @PrimaryColumn({ name: 'documento', type: 'varchar', length: 18 })
  documento: string;

  @PrimaryColumn({ name: 'Anio', type: 'int' })
  anio: number;

  @PrimaryColumn({ name: 'NumMes', type: 'int' })
  numMes: number;

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

  @Column({ name: 'CorreoElectronicoAportante', type: 'varchar', length: 60, nullable: true })
  correoElectronicoAportante: string;

  @Column({ name: 'TelefonoAportante', type: 'varchar', length: 13, nullable: true })
  telefonoAportante: string;

  @Column({ name: 'CodTipCot', type: 'varchar', length: 2, nullable: true })
  codTipCot: string;

  @Column({ name: 'TipoCotizante', type: 'varchar', length: 256, nullable: true })
  tipoCotizante: string;

  @Column({ name: 'CodEstadoAfiliacion', type: 'varchar', length: 2, nullable: true })
  codEstadoAfiliacion: string;

  @Column({ name: 'DesRegimen', type: 'varchar', length: 50, nullable: true })
  desRegimen: string;

  @Column({ name: 'Afiliado_id', type: 'int', nullable: true })
  afiliadoId: number;

  @Column({ name: 'TipoDocCotizante', type: 'nvarchar', length: 2, nullable: true })
  tipoDocCotizante: string;

  @Column({ name: 'apellido1', type: 'varchar', length: 50, nullable: true })
  apellido1: string;

  @Column({ name: 'apellido2', type: 'varchar', length: 50, nullable: false })
  apellido2: string;

  @Column({ name: 'nombre1', type: 'varchar', length: 50, nullable: false })
  nombre1: string;

  @Column({ name: 'nombre2', type: 'varchar', length: 50, nullable: false })
  nombre2: string;

  @Column({ name: 'CorreoElectronicoCotizante', type: 'varchar', length: 80, nullable: true })
  correoElectronicoCotizante: string;

  @Column({ name: 'TelefonoCotizante', type: 'varchar', length: 20, nullable: true })
  telefonoCotizante: string;

  @Column({
    name: 'Valor_Periodo',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  valorPeriodo: number;

  @Column({ name: 'Aportante_id', type: 'int', nullable: true })
  aportanteId: number;

  @Column({ name: 'CantidadRegistros', type: 'int', nullable: true })
  cantidadRegistros: number;
}
