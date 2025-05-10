import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
