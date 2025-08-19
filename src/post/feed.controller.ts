import { Controller, Get, Param } from '@nestjs/common';
import { FeedService } from './feed.service';
import { Public } from 'src/auth/public.decorator';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @Public()
  async getFeeds(): Promise<any> {
    const result = await this.feedService.getFeeds();

    console.log('✨result', result);
    return result;
  }
}
