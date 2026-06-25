import { SetMetadata } from '@nestjs/common';
import { AspNetRole } from '../entities/roles.entity';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: AspNetRole['name'][]) => {
  return SetMetadata(META_ROLES, args);
};
