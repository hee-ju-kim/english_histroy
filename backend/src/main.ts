import 'reflect-metadata';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, AllExceptionsFilter } from './configs/index';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<any>(AppModule, {logger: ['error', 'warn']});

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableShutdownHooks(); // 애플리케이션 종료 시 clean-up 작업

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const configService = app.get(ConfigService);
  const port = configService.get('port') || '39988';
  await app.listen(parseInt(port));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
