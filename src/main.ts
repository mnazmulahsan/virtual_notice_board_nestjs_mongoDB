import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import { configSwagger } from '@config';
import { HttpExceptionFilter } from '@common/filters';
import {
  ErrorsLoggerInterceptor,
  RequestLoggingInterceptor,
  ResponseTransformInterceptor,
} from '@common/interceptors/http';
import { ConfigService } from '@nestjs/config';
import { MongoValidationErrorFilter } from '@common/filters';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const prefix = configService.get<string>('api_prefix');

  app.use(helmet());
  app.use(compression());
  app.enableCors();
  app.useGlobalFilters();
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new MongoValidationErrorFilter(),
  );
  app.useGlobalInterceptors(
    new ResponseTransformInterceptor(),
    new RequestLoggingInterceptor(),
    new ErrorsLoggerInterceptor(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.setGlobalPrefix(prefix);
  configSwagger(app);
  await app.listen(port);
  return port;
};

bootstrap().then((port: number) => {
  Logger.log(`Application running on port: ${port}`, 'Virtual Notice Board Service');
});
