import { Module } from '@nestjs/common';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import s3 from 'src/lib/s3';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { S3_TOKEN } from './s3.contant';

@Module({
  imports: [ConfigModule],
  controllers: [S3Controller],
  providers: [
    S3Service,
    {
      provide: S3_TOKEN,
      useFactory: (configService: ConfigService) =>
        new S3Client({
          region: configService.get('AWS_REGION'),
          credentials: {
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID') as string,
            secretAccessKey: configService.get(
              'AWS_SECRET_ACCESS_KEY',
            ) as string,
          },
        }),
      inject: [ConfigService],
    },
  ],

  exports: [S3Service, S3_TOKEN],
})
export class S3Module {}
