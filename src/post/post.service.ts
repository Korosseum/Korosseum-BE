import { Injectable } from '@nestjs/common';

import { db } from 'src/lib/db';

@Injectable()
export class PostService {
  constructor() {}

  async create(user: any, files: any, body: any) {
    const { id } = user;
    const { content, topic } = body;
    console.log('✨user', user);
    console.log('✨files', files);
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
          fieldname: file.fieldname,
          originalname: file.originalname,
          encoding: file.encoding,
          mimetype: file.mimetype,
          destination: file.destination,
          filename: file.filename,
          size: file.size,
          path: file.path,
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
}
