import { ConfigModule } from '@nestjs/config';

const config = ConfigModule.forRoot({
  cache: true,
  isGlobal: true,
});
export default config;
