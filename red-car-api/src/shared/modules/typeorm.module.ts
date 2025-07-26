import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get<string>('DATABASE_URL'),
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          namingStrategy: new SnakeNamingStrategy(),
          extra: {
            max: 20, // :small_blue_diamond: Número máximo de conexiones simultáneas (ajustable)
            min: 5, // :small_blue_diamond: Conexiones mínimas mantenidas abiertas
            idleTimeoutMillis: 30000, // :small_blue_diamond: Tiempo que una conexión ociosa permanece abierta
            connectionTimeoutMillis: 10000, // :small_blue_diamond: Timeout al intentar conectar
            keepAlive: true, // :small_blue_diamond: Mantiene conexiones vivas para evitar cierres abruptos
          },
        };
      },
      dataSourceFactory(options) {
        if (options === undefined) {
          throw new Error('Opciones inválidas proporcionadas');
        }
        const dataSource = addTransactionalDataSource(new DataSource(options));
        return dataSource.initialize();
      },
    }),
  ],
})
export class TypeOrmConfigModule {}
