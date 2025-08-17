import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import {  FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';
// import { Public } from 'src/auth/public.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async create(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('files', files);

    return {
      message: 'post created',
    };
  }
}
