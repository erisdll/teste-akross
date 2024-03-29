import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/**
 * Bootstrap function that creates and configures the NestJS application.
 * Applying global filters, guards, interceptors, and validation pipes.
 * Also sets up Swagger documentation.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters();
  app.useGlobalGuards();
  app.useGlobalInterceptors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  /**
   * Configures and enables Swagger documentation
   */
  const config = new DocumentBuilder()
    .setTitle('Akross Squad Manager API')
    .setDescription(
      'This api was developed as a technical test for a position as a back-end development trainee at Akross',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
