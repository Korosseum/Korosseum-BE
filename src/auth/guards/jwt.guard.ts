// src/auth/guards/jwt-auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Public 데코레이터가 있는 경우 인증 생략
    // const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    // console.log('✨isPublic', context);

    // if (isPublic) {
    //   return true;
    // }

    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return user || null;
    } else if (err || !user) {
      throw err || new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
    return user;
  }
}
