import { Controller, Get, Param, Req } from '@nestjs/common';
import { FeedService } from './feed.service';
import { Public, User } from 'src/auth/public.decorator';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @Public()
  async getFeeds(@User() user: any, @Req() req: Request): Promise<any> {
    return await this.feedService.getFeeds(user);
  }
}
