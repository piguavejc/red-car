import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from 'src/module/user/entity/user.entity';
import { UserService } from 'src/module/user/user.service';
import { CasbinModule } from 'src/shared/modules/casbin/casbin.module';
import { JwtModule } from 'src/shared/modules/jwt/jwt.module';
import { createCustomResolver } from 'src/shared/resolver/auth.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([UserEntity]),
        CasbinModule,
        JwtModule,
      ],
      services: [UserService],
      resolvers: [
        createCustomResolver({
          DTOClass: UserEntity,
          EntityClass: UserEntity,
          ServiceClass: UserService,
        }),
      ],
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
