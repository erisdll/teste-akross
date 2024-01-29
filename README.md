@Module({
  imports: [
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
        }) as TypeOrmModuleOptions,
    }),
  ],
})
export class DatabaseModule {}