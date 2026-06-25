import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { AspNetUserRole } from './user-roles.entity';

@Entity({
  name: 'AspNetRoles',
  database: 'SirisAutentication',
  schema: 'dbo',
  synchronize: false,
})
export class AspNetRole {
  @PrimaryColumn({ type: 'nvarchar', length: 128 })
  id: string;

  @Column({ type: 'nvarchar', length: 256 })
  name: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  description: string | null;

  @Column({ type: 'nvarchar', length: 128 })
  discriminator: string;

  @Column({ type: 'int', nullable: true })
  aplicacion_id: number | null;

  @Column({ type: 'nvarchar', length: 256, nullable: true })
  normalizedName: string | null;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  concurrencyStamp: string | null;

  @OneToMany(() => AspNetUserRole, (userRole) => userRole.role)
  userRoles: AspNetUserRole[];
}
