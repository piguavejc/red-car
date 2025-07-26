import { UserEntity } from 'src/module/user/entity/user.entity';
import { Role } from 'src/shared/modules/rbac/enum/rbac.enum';

export type AuthenticatedUser = Pick<UserEntity, 'role' | 'id'>;

export interface JwtPayload {
  role: Role;
  id: string;
}

export interface UserContext {
  req: {
    user: AuthenticatedUser;
    app: any;
  };
}
