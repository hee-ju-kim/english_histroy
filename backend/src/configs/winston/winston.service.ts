import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file'; // winston-daily-rotate-file 플러그인 import

// 로그 출력 형식 설정
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const logDir = '../logs'

const logOpton = (level: string) => {
  return {
    filename: `%DATE%.${level}.log`, // 일별 파일 저장 경로
    datePattern: 'YYYY-MM-DD', // 날짜 패턴 (매일 새로운 파일)
    zippedArchive: true, // 파일 압축 여부
    maxSize: '20m', // 파일 최대 크기
    maxFiles: '30d', // 30일 이상된 파일 삭제
    level: level, // 저장할 로그 레벨
    dirname: logDir
  }
}

@Injectable()
export class WinstonLoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'silly', 
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
        winston.format.colorize({ all: true }),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
          ),
        }),
        new winston.transports.DailyRotateFile(logOpton('info')), 
        new winston.transports.DailyRotateFile(logOpton('warn')), 
        new winston.transports.DailyRotateFile(logOpton('error')),
        new winston.transports.DailyRotateFile(logOpton('http')),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
