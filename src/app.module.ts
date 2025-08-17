import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app.config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
// import { NextAuthJwtGuard } from './auth/nextauth-jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [config, UserModule, PostModule, AuthModule],
  controllers: [AppController],
  // providers: [{ provide: APP_GUARD, useClass: NextAuthJwtGuard }, AppService],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
