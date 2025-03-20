import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { LoggingMiddleware } from './middlewares/logger.middleware';
import { WinstonLoggerModule, DBModule, ConfigModule } from './configs/index';
import { ConfigDBModule, AdminModule, AuthModule } from './modules/index';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),  // 빌드된 파일이 위치한 경로
      serveRoot: '/*', // 클라이언트가 접근하는 경로
      exclude: ['/api*'],
    }),
    ConfigModule,
    WinstonLoggerModule,
    DBModule,
    ConfigDBModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}