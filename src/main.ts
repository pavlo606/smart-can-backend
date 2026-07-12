import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { PrismaExceptionFilter } from './common/filters/PrismaExceptionFilter';
import { requestLogger } from './common/middlware/request-logger.middleware';
import { ResponseLoggerInterceptor } from './common/interceptors/response-logger.interseptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  app.use(cookieParser());
  app.use(requestLogger);

  app.useGlobalInterceptors(new ResponseLoggerInterceptor())

  app.useGlobalFilters(new PrismaExceptionFilter())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Solar HUB API')
    .setDescription('API documentation for Solar Hub')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
  
  const logger = new Logger();
  logger.debug(`Aplication is running on: ${await app.getUrl()}`, "Bootstrap")
}
bootstrap();
