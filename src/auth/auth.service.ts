import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { db } from 'src/lib/db';
import { AuthUserDto } from './dto/auth-user.dto';

interface OAuthUser {
  provider: 'google' | 'kakao' | 'naver';
  email: string | null;
  name: string;
  picture: string | null;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //   async validateOAuthUser(authUser: AuthUserDto): Promise<any> {
  //     const user = await db.user.findUnique({
  //       where: {
  //         provider: authUser.provider,
  //         providerId: authUser.providerId,
  //       },
  //     });

  //     if (!user) {
  //       const newUser = await db.user.create({
  //         data: authUser,
  //       });
  //       return newUser;
  //     } else {
  //       return user;
  //     }
  //   }

  generateTokens(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: this.configService.get('ACCESS_SECRET'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('REFRESH_SECRET'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(userId: string, token: string) {
    const refreshToken = await db.refreshToken.upsert({
      where: {
        userId,
      },
      update: {
        token,
      },
      create: {
        user: {
          connect: {
            id: userId,
          },
        },
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

        token,
      },
    });

    if (refreshToken) {
      return true;
    } else {
      throw new Error('Failed to save refresh token');
    }
  }
}
