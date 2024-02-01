// DatabaseModule

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
/**
 * Module for configuring the TypeORM connection based on environment variables.
 */
@Module({
  imports: [
    /**
     * @property inject - Injects the ConfigService to access environment variables.
     * @property useFactory - Factory function that creates and returns the TypeOrmModuleAsyncOptions.
     */
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get<string>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: configService.get<boolean>('DB_AUTOLOAD'),
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        }) as TypeOrmModuleAsyncOptions,
    }),
  ],
})
export class DatabaseModule {}
