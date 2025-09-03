import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { Public, User } from 'src/auth/public.decorator';
// import { Public } from 'src/auth/public.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@User() user: any, @Body() body: any) {
    console.log('✨user', user);
    console.log('✨body', body);
    return await this.postService.create(user, body);
  }

  @Get(':id')
  @Public()
  async getPost(@Param('id') id: string) {
    return await this.postService.getPost(id);
  }
}
