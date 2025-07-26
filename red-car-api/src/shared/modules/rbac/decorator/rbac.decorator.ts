import { type CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from 'src/shared/modules/rbac/enum/rbac.enum';

export const ROLE_KEY = 'role';

export const Roles = (...role: Role[]): CustomDecorator<string> =>
  SetMetadata(ROLE_KEY, role);
