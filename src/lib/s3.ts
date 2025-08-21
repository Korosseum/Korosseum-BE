import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

const Bucket = process.env.AMPLIFY_BUCKET;

export default { bucket: Bucket };
