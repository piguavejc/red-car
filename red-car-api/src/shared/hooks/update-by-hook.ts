import {
  BeforeUpdateOneHook,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';

import { Injectable } from '@nestjs/common';
import { UserContext } from 'src/shared/context/auth.context';

interface UpdatedBy {
  tenantId: string;
}

@Injectable()
export class UpdatedByHook<T extends UpdatedBy>
  implements BeforeUpdateOneHook<T, UserContext>
{
  run(
    input: UpdateOneInputType<T>,
    // context: UserContext,
  ): UpdateOneInputType<T> {
    // const role = context.req.user.role;

    // const tenantId = input.update.tenantId;
    // const isAdmin = role.includes('admin');

    // input.update.tenantId =
    //   isAdmin && tenantId ? tenantId : context.req.user.tenantId;
    return input;
  }
}
