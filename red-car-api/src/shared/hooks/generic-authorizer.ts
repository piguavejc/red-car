import { AuthorizationContext, Authorizer } from '@nestjs-query/query-graphql';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';

import { UserContext } from 'src/shared/context/auth.context';
import { CasbinService } from 'src/shared/modules/casbin/casbin.service';

// Función que genera una clase Authorizer específica para una entidad
export function createGenericAuthorizer<T extends object>(
  entity: EntityTarget<T>,
): new (casbinService: CasbinService, dataSource: DataSource) => Authorizer<T> {
  @Injectable()
  class GenericAuthorizerClass implements Authorizer<T> {
    constructor(
      private readonly casbinService: CasbinService,
      private readonly dataSource: DataSource,
    ) {}

    async authorize(
      context: UserContext,
      authContext?: AuthorizationContext,
    ): Promise<Record<string, any>> {
      //   const userId = context.req.user.id;
      //   const tenantId = context.req.user.tenantId;
      //   const action = authContext?.operationGroup;
      //   const userRole = context.req.user.role;
      //   const isSuperAdmin = userRole.includes('super-admin');
      //   const tableNameSnakeCase = this.dataSource.getMetadata(entity).tableName;
      //   const tableName = tableNameSnakeCase.replace(
      //     /_([a-z])/g,
      //     (_, letter: string) => letter.toUpperCase(),
      //   );

      //   console.log(
      //     `Authorizing action: ${action} on table: ${tableName} for tenant: ${userId}`,
      //   );

      //   if (!action || !tableName) {
      //     throw new Error('Missing operation group or table name');
      //   }

      //   const allowed = await this.casbinService.enforce(
      //     userId,
      //     tableName,
      //     action,
      //   );

      //   if (!allowed) {
      //     throw new BadRequestException('Unauthorized action');
      //   }
      //   if (
      //     [
      //       'taxes',
      //       'paymentMethods',
      //       'documentTypes',
      //       'measurementUnits',
      //       'warehouses',
      //     ].includes(tableName)
      //   ) {
      //     return {};
      //   }
      //   return isSuperAdmin ? {} : { tenantId: { eq: tenantId } };

      return {};
    }

    authorizeRelation(): Promise<Record<string, any>> {
      return Promise.resolve({});
    }
  }

  return GenericAuthorizerClass;
}
