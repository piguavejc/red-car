import { Injectable } from '@nestjs/common';
import { Role } from 'src/shared/modules/rbac/enum/rbac.enum';

interface IsAuthorizedParams {
  currentRole: Role;
  requiredRole: Role;
}

@Injectable()
export class RbacService {
  private readonly hierarchies: Array<Map<string, number>> = [];
  private priority: number = 1;

  constructor() {
    this.buildRoles([Role.User, Role.Admin]);
    this.buildRoles([Role.Admin, Role.SuperAdmin]);
  }

  /**
   * The buildRoles method allows for creating a role hierarchy between specified set of roles.
   * Roles have to be specified from least privileged user to the most priviliged one
   * @param roles Array that contains list of roles
   */
  private buildRoles(roles: Role[]): void {
    const hierarchy = new Map<string, number>();
    roles.forEach((role) => {
      hierarchy.set(role, this.priority);
      this.priority++;
    });
    this.hierarchies.push(hierarchy);
  }

  public isAuthorized({
    currentRole,
    requiredRole,
  }: IsAuthorizedParams): boolean {
    for (const hierarchy of this.hierarchies) {
      const priority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);
      if (
        priority !== undefined &&
        requiredPriority !== undefined &&
        priority >= requiredPriority
      ) {
        return true;
      }
    }
    return false;
  }
}
