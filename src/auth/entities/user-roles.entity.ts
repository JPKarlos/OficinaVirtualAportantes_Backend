import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AspNetRole } from './roles.entity';
import { User } from './user.entity';

@Entity({
  name: 'AspNetUserRoles',
  database: 'SirisAutentication',
  schema: 'dbo',
  synchronize: false,
})
export class AspNetUserRole {
  @PrimaryColumn({ type: 'nvarchar', length: 128 })
  userId: string;

  @PrimaryColumn({ type: 'nvarchar', length: 128 })
  roleId: string;

  @ManyToOne(() => AspNetRole, (role) => role.userRoles)
  @JoinColumn({ name: 'RoleId' })
  role: AspNetRole;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn({ name: 'UserId' })
  user: User;
}
