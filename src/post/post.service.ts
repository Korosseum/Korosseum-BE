import { Injectable } from '@nestjs/common';

import { db } from 'src/lib/db';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor() {}

  async create(user: any, body: CreatePostDto) {
    const { id } = user;
    const { content, topic, files } = body;
    console.log('✨user', user);

    console.log('✨body', body);

    const post = await db.$transaction(async (tx) => {
      const newPost = await tx.post.create({
        data: {
          userId: id,
          content: content,
          isActive: true,
          type: 'debate',
          topic: topic,
        },
      });
      if (!newPost) {
        throw new Error('Failed to create post');
      }

      const postUser = await tx.post_user.create({
        data: {
          userId: id,
          postId: newPost.id,
        },
      });
      if (!postUser) {
        throw new Error('Failed to create post user');
      }

      const postFiles = await tx.file.createMany({
        data: files.map((file: any, index: number) => ({
          userId: id,
          ownerId: newPost.id,
          ownerType: 'post',
          originalName: file.originalName,
          type: file.type,
          url: file.url,
          size: file.size,
          index: index,
        })),
      });
      if (!postFiles) {
        throw new Error('Failed to create post files');
      }
      return { newPost, postUser, postFiles };
    });
    console.log('✨post', post);
    return { ok: true, data: post };
  }

  async getPost(id: string) {
    const post = await db.post.findUnique({
      where: { id: Number(id) },

      include: {
        opinions: {
          include: {
            user: true,
          },
        },
        user: {
          select: {
            id: true,
            nickname: true,
            photo: true,
          },
        },
      },
    });
    if (!post) {
      return { ok: false, message: 'Post not found' };
    }

    const files = await db.file.findMany({
      where: {
        ownerId: post.id,
        ownerType: 'post',
      },
    });

    if (!files) {
      return { ok: false, message: 'Files not found' };
    }

    const data = { ...post, files };

    return { ok: true, data };
  }
}
