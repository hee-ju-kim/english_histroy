import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500;  // 예외가 HttpException인 경우 상태 코드 반환, 아니면 500

    const errorResponse = {
      statusCode: status,
      message: exception.message || 'Internal server error',
      error: exception.response || exception.name || exception,
    };

    // 예외 로그 출력
    this.logger.error(`${status} - ${exception.message}`, exception.stack);

    // 클라이언트에 응답 보내기
    response.status(status).json(errorResponse);
  }
}
