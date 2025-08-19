import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { db } from 'src/lib/db';
import { generateColosseumNickname } from 'src/lib/utils';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService) {}

  async findByEmailOrSave(email: string, data: any) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        provider: true,
        providerId: true,
        photo: true,
        nickname: true,
        nicknameIndex: true,
      },
    });

    if (!user) {
      const randomNickname = generateColosseumNickname();
      return db.user.create({
        data: {
          ...data,
          nickname: randomNickname,
        },
        select: {
          id: true,
          email: true,
          provider: true,
          providerId: true,
          photo: true,
          nickname: true,
          nicknameIndex: true,
        },
      });
    } else {
      return user;
    }
  }

  findAll() {
    return db.user.findMany();
  }

  findOne(id: string) {
    return db.user.findUnique({ where: { id } });
  }

  updateAll(body: any) {
    return db.user.updateMany({
      where: {
        id: body.id,
      },
      data: body,
    });
  }

  update(id: string, body: any) {
    return db.user.update({
      where: { id },
      data: body,
    });
  }

  async generateNickname(id: string) {
    const user = await db.user.findUnique({ where: { id } });

    const randomNickname = generateColosseumNickname();

    if (user && user.nicknameIndex) {
      const padStart = user.nicknameIndex.toString().padStart(4, '0');
      const userNickname = randomNickname + padStart;

      const result = await db.user.update({
        where: { id },
        data: {
          nickname: userNickname,
        },
        select: { name: true, nickname: true, email: true },
      });

      return {
        ok: 'success',
        message: 'Nickname generated successfully',
        data: result,
      };
    } else {
      return {
        status: 'failed',
        message: 'User not found',
      };
    }
  }
}
