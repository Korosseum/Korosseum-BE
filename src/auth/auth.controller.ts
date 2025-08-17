import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './guards/google.guard';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { Public } from './public.decorator';
import { JwtService } from '@nestjs/jwt';
import { db } from 'src/lib/db';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('verifyRefreshToken')
  @Public()
  async verifyRefreshToken(@Req() req, @Res() res) {
    // const refreshToken = req.headers.cookie['accessToken'];

    const accessToken = req.cookies['accessToken'];

    try {
      const decodedUser = this.jwtService.verify(accessToken, {
        secret: this.configService.get('ACCESS_SECRET'),
      });

      if (!decodedUser) {
        return res.json({ user: null });
      } else {
        const refreshToken = await db.refreshToken.findUnique({
          where: {
            userId: decodedUser.id,
          },
          select: {
            token: true,
            expiresAt: true,
          },
        });

        if (!refreshToken) {
          return { user: null };
        } else {
          if (refreshToken.expiresAt < new Date()) {
            // 기한 지난 토큰 삭제 (자동 로그인 해제)
            await db.refreshToken.delete({
              where: {
                token: refreshToken.token,
              },
            });

            return res.json({ user: null });
          } else {
            // 토큰 유효 시 토큰 갱신

            delete decodedUser.iat;
            delete decodedUser.exp;

            const tokens = await this.authService.generateTokens(decodedUser);

            return res.json({
              user: decodedUser,
              accessToken: tokens.accessToken,
            });
          }
        }
      }
    } catch (error) {
      return res.json({ user: null });
    }
  }

  @Get('google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    await this.handleOAuthCallback(req, res);
  }

  private async handleOAuthCallback(@Req() req, @Res() res) {
    const { email, provider, providerId, photo } = req.user;

    const user = await this.userService.findByEmailOrSave(email, {
      email,
      provider,
      providerId,
      photo,
    });

    try {
      const tokens = await this.authService.generateTokens(user);
      const isSaved = await this.authService.saveRefreshToken(
        user.id,
        tokens.refreshToken,
      );

      if (isSaved) {
        res.cookie('accessToken', tokens.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: CookieExpires.EXPIRES_IN_1DAY,
          sameSite: 'strict',
        });
        return res.redirect(
          this.configService.get('FRONTEND_URL') +
            'api/auth/callback?' +
            new URLSearchParams(user as unknown as Record<string, string>),
        );
      } else {
        throw new Error('Failed to save refresh token');
      }
    } catch (error) {
      throw new UnauthorizedException(error.message); //에러처리
    }
  }
}

enum CookieExpires {
  EXPIRES_IN_1DAY = 1000 * 60 * 60 * 24,
  EXPIRES_IN_7DAYS = 1000 * 60 * 60 * 24 * 7,
}
