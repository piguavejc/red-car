/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

// import { HelloResolver } from './hello.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: true,
        csrfPrevention: process.env.NODE_ENV === 'production',
        installSubscriptionHandlers: true,
      }),
    }),
  ],
  //   providers: [HelloResolver],
})
export class GraphqlConfigModule {}
