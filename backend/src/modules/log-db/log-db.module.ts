import { Module } from '@nestjs/common';
import { LogDBService } from './log-db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LogDBModel, LogDBSchema } from './entities/log-db.entity';

@Module({
  imports: [ MongooseModule.forFeature([{ name: LogDBModel.modelName, schema: LogDBSchema }])],
  controllers: [],
  providers: [LogDBService],
  exports: [LogDBService],
})
export class LogDbModule {}
