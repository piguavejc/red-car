import { ConfigModule } from '@nestjs/config';
import { CasbinModule } from 'src/shared/modules/casbin/casbin.module';
import { GraphqlConfigModule } from 'src/shared/modules/graphql.module';
import { JwtModule } from 'src/shared/modules/jwt/jwt.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { envSchema } from 'src/config/config';
import { UserModule } from 'src/module/user/user.module';
import { TypeOrmConfigModule } from 'src/shared/modules/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validate: (config) => envSchema.parse(config),
      isGlobal: true,
    }),
    JwtModule,
    CasbinModule,
    TypeOrmConfigModule,
    GraphqlConfigModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
