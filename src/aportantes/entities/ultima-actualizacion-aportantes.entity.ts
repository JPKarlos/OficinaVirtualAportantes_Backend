import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'UltimaActualizacionAportantes',
  database: 'SIRIS_EPS',
  schema: 'Contributivo',
  synchronize: false,
})
export class UltimaActualizacionAportantes {
  @PrimaryGeneratedColumn({ name: 'UltimaActualizacion_id', type: 'int' })
  ultimaActualizacionId: number;

  @Column({ name: 'Aportante_id', type: 'int', nullable: false })
  aportanteId: number;

  @Column({ name: 'NombreRazonSocial', type: 'varchar', length: 200, nullable: true })
  nombreRazonSocial: string;

  @Column({ name: 'Apidentificacion_id', type: 'int', nullable: true })
  apidentificacionId: number;

  @Column({ name: 'IdenAportante', type: 'varchar', length: 16, nullable: true })
  idenAportante: string;

  @Column({ name: 'DVAportante', type: 'varchar', length: 1, nullable: true })
  dvAportante: string;

  @Column({ name: 'CodSucDep', type: 'varchar', length: 10, nullable: true })
  codSucDep: string;

  @Column({ name: 'NomSucDep', type: 'varchar', length: 40, nullable: true })
  nomSucDep: string;

  @Column({ name: 'ClaseAportante_ide', type: 'int', nullable: true })
  claseAportanteIde: number;

  @Column({ name: 'NaturalezaAportante_ide', type: 'int', nullable: true })
  naturalezaAportanteIde: number;

  @Column({ name: 'TipoPersona_ide', type: 'int', nullable: true })
  tipoPersonaIde: number;

  @Column({ name: 'FormaPresentacion_ide', type: 'int', nullable: true })
  formaPresentacionIde: number;

  @Column({ name: 'DireccionCorres', type: 'varchar', length: 40, nullable: true })
  direccionCorres: string;

  @Column({ name: 'DireccionAlterna', type: 'varchar', length: 50, nullable: true })
  direccionAlterna: string;

  @Column({ name: 'Municipio_ide', type: 'int', nullable: true })
  municipioIde: number;

  @Column({ name: 'CiiuClase_id', type: 'int', nullable: true })
  ciiuClaseId: number;

  @Column({ name: 'Telefono', type: 'varchar', length: 13, nullable: true })
  telefono: string;

  @Column({ name: 'Telefono2', type: 'varchar', length: 13, nullable: true })
  telefono2: string;

  @Column({ name: 'Celular', type: 'varchar', length: 13, nullable: true })
  celular: string;

  @Column({ name: 'Celular2', type: 'varchar', length: 13, nullable: true })
  celular2: string;

  @Column({ name: 'Fax', type: 'varchar', length: 13, nullable: true })
  fax: string;

  @Column({ name: 'email', type: 'varchar', length: 60, nullable: true })
  email: string;

  @Column({ name: 'email2', type: 'varchar', length: 60, nullable: true })
  email2: string;

  @Column({ name: 'IdenRepLegal', type: 'varchar', length: 16, nullable: true })
  idenRepLegal: string;

  @Column({ name: 'DVRepLegal', type: 'varchar', length: 1, nullable: true })
  dvRepLegal: string;

  @Column({ name: 'RLidentificacion_id', type: 'int', nullable: true })
  rlIdentificacionId: number;

  @Column({ name: 'Apellido1RepLeg', type: 'varchar', length: 20, nullable: true })
  apellido1RepLeg: string;

  @Column({ name: 'Apellido2RepLeg', type: 'varchar', length: 30, nullable: true })
  apellido2RepLeg: string;

  @Column({ name: 'Nombre1RepLeg', type: 'varchar', length: 20, nullable: true })
  nombre1RepLeg: string;

  @Column({ name: 'Nombre2RepLeg', type: 'varchar', length: 30, nullable: true })
  nombre2RepLeg: string;

  @Column({ name: 'FechaInicio', type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ name: 'TipoAccion_ide', type: 'int', nullable: true })
  tipoAccionIde: number;

  @Column({ name: 'FechaFin', type: 'date', nullable: true })
  fechaFin: Date;

  @Column({ name: 'TipoAportanteCont_ide', type: 'int', nullable: true })
  tipoAportanteContIde: number;

  @Column({ name: 'DatosGenAportante_ide', type: 'int', nullable: true })
  datosGenAportanteIde: number;

  @Column({ name: 'FechaActualización', type: 'datetime', nullable: false })
  fechaActualizacion: Date;

  @Column({ name: 'Usuario', type: 'varchar', length: 256, nullable: false })
  usuario: string;
}
