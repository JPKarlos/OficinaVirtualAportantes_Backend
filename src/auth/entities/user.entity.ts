import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { AspNetUserRole } from './user-roles.entity';

@Entity({
  name: 'AspNetUsers',
  database: 'SirisAutentication',
  schema: 'dbo',
  synchronize: false,
})
export class User {
  @PrimaryColumn({ name: 'Id', type: 'nvarchar', length: 128 })
  id: string;

  @Column({ name: 'Address', type: 'nvarchar', nullable: true })
  address: string;

  @Column({ name: 'City', type: 'nvarchar', nullable: true })
  city: string;

  @Column({ name: 'State', type: 'nvarchar', nullable: true })
  state: string;

  @Column({ name: 'PostalCode', type: 'nvarchar', nullable: true })
  postalCode: string;

  @Column({ name: 'Email', type: 'nvarchar', length: 256, nullable: true })
  email: string;

  @Column({ name: 'EmailConfirmed', type: 'bit' })
  emailConfirmed: boolean;

  @Column({ name: 'PasswordHash', type: 'nvarchar', nullable: true })
  passwordHash: string;

  @Column({ name: 'SecurityStamp', type: 'nvarchar', nullable: true })
  securityStamp: string;

  @Column({ name: 'PhoneNumber', type: 'nvarchar', nullable: true })
  phoneNumber: string;

  @Column({ name: 'PhoneNumberConfirmed', type: 'bit' })
  phoneNumberConfirmed: boolean;

  @Column({ name: 'TwoFactorEnabled', type: 'bit' })
  twoFactorEnabled: boolean;

  @Column({ name: 'LockoutEndDateUtc', type: 'datetimeoffset', nullable: true })
  lockoutEndDateUtc: Date;

  @Column({ name: 'LockoutEnabled', type: 'bit' })
  lockoutEnabled: boolean;

  @Column({ name: 'AccessFailedCount', type: 'int' })
  accessFailedCount: number;

  @Column({ name: 'UserName', type: 'nvarchar', length: 256 })
  userName: string;

  @Column({
    name: 'FechaCreacion',
    type: 'datetime',
    nullable: true,
    default: () => 'getdate()',
  })
  fechaCreacion: Date;

  @Column({ name: 'Municipio_id', type: 'int', nullable: true })
  municipioId: number;

  @Column({ name: 'Nombres', type: 'varchar', length: 150, nullable: true })
  nombres: string;

  @Column({ name: 'LastPasswordChangedDate', type: 'datetime', nullable: true })
  lastPasswordChangedDate: Date;

  @Column({ name: 'LastActivityDate', type: 'datetime', nullable: true })
  lastActivityDate: Date;

  @Column({ name: 'IDE_PRESTADOR', type: 'int', nullable: true })
  idePrestador: number;

  @Column({ name: 'EsPrestador', type: 'bit', nullable: true })
  esPrestador: boolean;

  @Column({ name: 'Cargo', type: 'varchar', length: 250, nullable: true })
  cargo: string;

  @Column({ name: 'Telefono', type: 'varchar', length: 50, nullable: true })
  telefono: string;

  @Column({ name: 'Celular', type: 'varchar', length: 50, nullable: true })
  celular: string;

  @Column({ name: 'modulo_id', type: 'int', nullable: true })
  moduloId: number;

  @Column({ name: 'sede_id', type: 'int', nullable: true })
  sedeId: number;

  @Column({ name: 'Portabilidad', type: 'int', default: 0 })
  portabilidad: number;

  @Column({ name: 'externo', type: 'bit', nullable: true })
  externo: boolean;

  @Column({ name: 'IDE_PRESTADOR_EXTERNO', type: 'int', nullable: true })
  idePrestadorExterno: number;

  @Column({ name: 'Activo', type: 'bit', nullable: true })
  activo: boolean;

  @Column({
    name: 'NormalizedUserName',
    type: 'nvarchar',
    length: 256,
    nullable: true,
  })
  normalizedUserName: string;

  @Column({
    name: 'NormalizedEmail',
    type: 'nvarchar',
    length: 256,
    nullable: true,
  })
  normalizedEmail: string;

  @Column({ name: 'LockoutEnd', type: 'datetimeoffset', nullable: true })
  lockoutEnd: Date;

  @Column({ name: 'ConcurrencyStamp', type: 'nvarchar', nullable: true })
  concurrencyStamp: string;

  @Column({ name: 'Device_Id', type: 'varchar', length: 250, nullable: true })
  deviceId: string;

  @Column({ name: 'Aportante_id', type: 'int',nullable:true })
  aportanteId:number;

  @Column({ name: 'EsAportante', type: 'bit', nullable: true })
  esAportante: boolean;

  // Relación con AspNetUserRole
  @OneToMany(() => AspNetUserRole, (userRole) => userRole.user)
  userRoles: AspNetUserRole[];
}
