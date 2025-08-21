import { Body, Controller, Post, Req } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('/presigned-url')
  getPresignedUrl(@Body() body: any, @Req() req: any) {
    return this.s3Service.getPresignedUrl(body);
  }
}
