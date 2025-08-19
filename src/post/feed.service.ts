import { Injectable } from '@nestjs/common';
import { db } from 'src/lib/db';

@Injectable()
export class FeedService {
  constructor() {}

  async getFeeds() {
    const posts = await db.post.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      include: {
        user: true,
      },
    });

    // 가져온 포스트에 속한 파일들을 가져옴
    const allFiles = await db.file.findMany({
      where: {
        ownerType: 'post',
        ownerId: { in: posts.map((p) => p.id) },
      },
      orderBy: {
        index: 'asc', // 0부터 순서대로 가져옴
      },
    });

    const feeds = posts.map((post) => {
      return {
        ...post,
        files: allFiles.filter((file) => file.ownerId === post.id),
      };
    });

    return { ok: true, data: feeds };
  }
}
