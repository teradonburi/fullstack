import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';
import { HttpExceptionFilter } from './http-exception.filter';
import { generateLocalSwaggerDocument } from './lib/swaggerFileGenerator';
import { NestApplicationOptions } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap({
  options,
}: {
  options?: NestApplicationOptions & {
    swagger?: boolean;
  };
}) {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  if (options?.swagger) {
    const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('API')
      .setDescription('The API Reference')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/swagger', app, document);

    /**
     * This is necessary for generating rtk-query endpoints via @rtk-query/codegen-openapi
     */
    await generateLocalSwaggerDocument(document);
  }

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.init();
  await app.listen(3000);
}
bootstrap({ options: { swagger: process.env.NODE_ENV !== 'production' } });
