import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  CacheModule,
  CacheModuleAsyncOptions,
  CacheModuleOptions,
} from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import Keyv from 'keyv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_KEYS } from './config/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get(CONFIG_KEYS.DB_HOST, 'localhost'),
        port: config.get<number>(CONFIG_KEYS.DB_PORT, 5432),
        username: config.get(CONFIG_KEYS.DB_USERNAME, 'postgres'),
        password: config.get(CONFIG_KEYS.DB_PASSWORD, 'password'),
        database: config.get(CONFIG_KEYS.DB_NAME, 'app'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): CacheModuleOptions => {
        const redisHost = config.get<string>(CONFIG_KEYS.REDIS_HOST, 'redis');
        const redisPort = config.get<number>(CONFIG_KEYS.REDIS_PORT, 6379);
        const redisUrl = `redis://${redisHost}:${redisPort}`;

        // 🔧 타입 단언을 추가하여 no-unsafe-call 회피
        const redisStore = new KeyvRedis(redisUrl);
        const keyvStore: Keyv<any> = new Keyv({ store: redisStore });

        return {
          store: keyvStore,
        };
      },
    } as CacheModuleAsyncOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
