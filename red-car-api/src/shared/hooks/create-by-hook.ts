import {
  BeforeCreateOneHook,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';

import { Injectable } from '@nestjs/common';
import { UserContext } from 'src/shared/context/auth.context';

interface CreatedBy {
  tenantId: string;
}

@Injectable()
export class CreatedByHook<T extends CreatedBy>
  implements BeforeCreateOneHook<T, UserContext>
{
  run(
    input: CreateOneInputType<T>,
    // context: UserContext,
  ): CreateOneInputType<T> {
    // const role = context.req.user.role;

    // const tenantId = input.input.tenantId;
    // const isAdmin = role.includes('admin');
    // input.input.tenantId =
    //   isAdmin && tenantId ? tenantId : context.req.user.tenantId;
    return input;
  }
}
