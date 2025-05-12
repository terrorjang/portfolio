import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis'; // Import KeyvRedis
import Keyv from 'keyv'; // Import Keyv
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_KEYS } from './config/constants';
import { UserModule } from './user/user.module';

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
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const redisHost = configService.getOrThrow<string>(
          CONFIG_KEYS.REDIS_HOST,
        );
        const redisPort = configService.getOrThrow<number>(
          CONFIG_KEYS.REDIS_PORT,
        );
        const redisUrl = `redis://${redisHost}:${redisPort}`;

        const store = new Keyv({ store: new KeyvRedis(redisUrl) });

        return {
          store: store, // Provide the Keyv store instance directly
          // ttl: 60 * 1000, // Optional: Default TTL for cache entries in milliseconds
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
