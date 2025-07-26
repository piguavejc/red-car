/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { type Observable } from 'rxjs';
import { UserContext } from 'src/shared/context/auth.context';
import { ROLE_KEY } from 'src/shared/modules/rbac/decorator/rbac.decorator';
import { Role } from 'src/shared/modules/rbac/enum/rbac.enum';
import { RbacService } from 'src/shared/modules/rbac/rbac.service';
// import { type UserContext } from 'src/auth/auth.interfaces'
// import { AccessContorlService } from 'src/rbac/access-control.service'
// import { ROLE_KEY } from 'src/rbac/decorator/role.decorator'
// import { type UserRole } from 'src/shared/enums/role.enum'

export class TokenDto {
  id: number;
  role: Role;
}

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rbacService: RbacService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<UserContext>().req;
    const token = request.user;

    for (const role of requiredRoles) {
      const result = this.rbacService.isAuthorized({
        requiredRole: role,
        currentRole: token.role,
      });

      if (result) {
        return true;
      }
    }

    return false;
  }
}
