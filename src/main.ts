import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as path from 'path';
async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync(path.join(__dirname, '..', 'localhost-key.pem')),
  //   cert: fs.readFileSync(path.join(__dirname, '..', 'localhost.pem')),
  // };

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'], // 정확한 도메인
    credentials: true, // 🎯 이 설정이 필수!
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 4000);
  const host = configService.get<string>('HOST', 'localhost');

  app.use(cookieParser());
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();
