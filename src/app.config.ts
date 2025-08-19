import { ConfigModule } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const config = ConfigModule.forRoot({
  cache: true,
  isGlobal: true,
});

const staticConfig = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', 'uploads'),
  serveRoot: '/uploads',
});

export default [config, staticConfig];
