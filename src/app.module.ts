import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app.config';

@Module({
  imports: [config], // 配置模块
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
