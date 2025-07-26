// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import * as deepmerge from 'deepmerge';

import {
  AutoResolverOpts,
  PagingStrategies,
  ReadResolverOpts,
} from '@nestjs-query/query-graphql';

import { JwtAuthGuard } from 'src/shared/modules/jwt/guard/jwt.guard';

type CRUDResolverOptions = AutoResolverOpts<
  unknown,
  unknown,
  unknown,
  unknown,
  ReadResolverOpts<unknown>,
  PagingStrategies
>;

type InitialResolverOptions = Omit<
  CRUDResolverOptions,
  'ServiceClass' | 'DTOClass'
>;

const initialResolver: InitialResolverOptions = {
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
  guards: [JwtAuthGuard],
  create: { many: { disabled: true } },
  update: { many: { disabled: true } },
  delete: { many: { disabled: true } },
};

export const createCustomResolver = (
  options: CRUDResolverOptions,
): CRUDResolverOptions => {
  return deepmerge(initialResolver, options);
};
