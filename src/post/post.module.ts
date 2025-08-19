import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [],
  controllers: [PostController, FeedController],
  providers: [PostService, FeedService],
})
export class PostModule {}
