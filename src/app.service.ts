import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getConfig(): { host: string; port: number } {
    const host = this.configService.get<string>('HOST', 'localhost');
    const port = this.configService.get<number>('PORT', 4000);
    return {
      host,
      port,
    };
  }
}
