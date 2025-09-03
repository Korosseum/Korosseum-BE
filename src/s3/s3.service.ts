import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as uuid from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_TOKEN } from './s3.contant';
import { getPresignedUrlDto } from './dto/s3.dto';

@Injectable()
export class S3Service {
  constructor(
    private readonly configService: ConfigService,
    @Inject(S3_TOKEN) private readonly s3Client: S3Client,
  ) {}

  async getPresignedUrl(body: getPresignedUrlDto) {
    // 각각 파일들 / 파일 타입 / 업로드 폴더
    const { files, type, folder } = body;

    try {
      const commands = files.map(async (file: any) => {
        // 현재 파일 타입
        const fileType = file.type.split('/')[0];
        // 현재 파일 확장자
        const fileExt = file.type.split('/')[1];

        //파일 사이즈 검증
        const verifyedSize = file.size > 1024 * 1024 * 5; // 5MB 제한

        if (verifyedSize) {
          throw new Error('File size is too large');
        }
        //파일 타입 검증
        const verifyedType = type.split('/')[0] !== fileType;

        if (verifyedType) {
          throw new Error('File type is not allowed');
        }

        // 파일 경로 + 파일 명(uuid)
        // 파일 키 생성 (폴더 경로 + 랜덤 키)
        const key = `${folder}/${uuid.v4()}.${fileExt}`;
        const command = new PutObjectCommand({
          Bucket: this.configService.get('AMPLIFY_BUCKET'),
          Key: key,
        });

        const publicUrl = `https://${this.configService.get('AMPLIFY_BUCKET')}.s3.ap-northeast-2.amazonaws.com/${key}`;

        console.log('✨publicUrl', publicUrl);
        return { id: file.id, command, publicUrl };
      });

      console.log('✨commands', commands);

      const resultData = {};

      await Promise.all(
        commands.map(async (v) => {
          const presignedUrl = await getSignedUrl(
            this.s3Client,
            (await v).command,
            {
              expiresIn: 60 * 10, // 10분,
            },
          );

          resultData[(await v).id] = {
            presignedUrl,
            publicUrl: (await v).publicUrl,
          };
        }),
      );

      console.log('✨resultData', resultData);

      return { ok: true, data: resultData };
    } catch (error) {
      console.error(error);
      return { ok: false, error: error.message };
    }
  }
}
