import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [config, UserModule], // 配置模块
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
