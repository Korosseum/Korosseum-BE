import { Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import multer from 'multer';
import { db } from 'src/lib/db';

@Injectable()
export class PostService {
  constructor(private configService: ConfigService) {}

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
      console.log('✨newPost', newPost);
      const postUser = await tx.post_user.create({
        data: {
          userId: id,
          postId: newPost.id,
        },
      });
      if (!postUser) {
        throw new Error('Failed to create post user');
      }

      console.log('✨postUser', postUser);
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
      console.log('✨postFiles', postFiles);
      return { newPost, postUser, postFiles };
    });
    return {};
  }
}
