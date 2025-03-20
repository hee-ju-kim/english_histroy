import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLoggerService } from '../configs/winston/winston.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // 생성자에서 의존성 주입을 받지 않으므로, 모듈에서 해당 서비스를 가져와서 사용합니다.
  constructor(private readonly logger: WinstonLoggerService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now(); // 요청 시작 시간을 기록
    const { ip, method, originalUrl } = req;
    // 응답이 끝나는 이벤트가 발생하면 로그를 찍는다.
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${ip} ${Date.now() - start}ms`,
      );
    });

    next();
  }
}
