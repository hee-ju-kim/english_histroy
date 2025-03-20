import { Module, Global } from '@nestjs/common';
import { WinstonLoggerService } from './winston.service';

@Global()
@Module({
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService], // 다른 모듈에서 사용하도록 내보냄
})
export class WinstonLoggerModule {}
