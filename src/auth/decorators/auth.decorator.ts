import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { AspNetRole } from '../entities/roles.entity';

export function Auth(...roles: AspNetRole['name'][]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard('jwt-api'), UserRoleGuard),
  );
}
