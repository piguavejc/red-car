/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Enforcer, newEnforcer } from 'casbin';

import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CasbinModel } from 'src/shared/modules/casbin/schema/casbin.schema';
import TypeORMAdapter from 'typeorm-adapter';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const CasbinEnforcerProvider: Provider = {
  provide: 'CASBIN_ENFORCER',
  inject: [ConfigService],

  useFactory: async (configService: ConfigService): Promise<Enforcer> => {
    // const nodeEnv = configService.get<string>('NODE_ENV')
    const databaseUrl = configService.get<string>('DATABASE_URL');
    // Configurar el adaptador de TypeORM con tus credenciales
    const casbinAdapter = await TypeORMAdapter.newAdapter({
      type: 'postgres',
      url: databaseUrl,
      synchronize: false, //configService.get('NODE_ENV') !== 'production',
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    });

    // Crear el Enforcer con tu modelo de Casbin y el adaptador
    const enforcer = await newEnforcer(CasbinModel, casbinAdapter);

    return enforcer;
  },
};
