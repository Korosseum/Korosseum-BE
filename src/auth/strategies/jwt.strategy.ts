// src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { db } from 'src/lib/db';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // 쿠키에서 access token 추출

          const cookie = request.headers.cookie;
          const accessToken = cookie
            ?.split('; ')
            .find((row) => row.startsWith('accessToken='));

          console.log('✨accessToken : ', accessToken);
          return accessToken ? accessToken.split('=')[1] : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_SECRET, // 환경변수에서 시크릿 키 가져오기
    });
  }

  async validate(payload: any) {
    // JWT 페이로드에서 사용자 정보 검증
    const user = await db.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    return user; // request.user에 저장됨
  }
}
