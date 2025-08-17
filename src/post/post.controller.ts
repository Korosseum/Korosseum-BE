import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';
import { User } from 'src/auth/public.decorator';
// import { Public } from 'src/auth/public.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @User() user: any,
    @Body() body: any,
  ) {
    await this.postService.create(user, files, body);

    return {
      message: 'post created',
    };
  }
}
