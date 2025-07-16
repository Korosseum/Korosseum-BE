import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { db } from 'src/lib/db';
import { generateColosseumNickname } from 'src/lib/utils';

@Injectable()
export class NicknameService {
  constructor(private configService: ConfigService) {}
  generateNickname() {
    return generateColosseumNickname();
  }

  async createNickname(nickname: string) {
    const user = await db.user.update({
      where: {
        nickname,
      },
      data: {
        nickname,
      },
    });
  }
}
