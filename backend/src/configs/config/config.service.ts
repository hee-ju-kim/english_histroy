
import { Injectable } from '@nestjs/common';
import config from './env/index';  // config.ts에서 설정 값 불러오기

@Injectable()
export class ConfigService {
  private readonly config = config();

  get(key: string): any {
    return this.config[key];
  }
}