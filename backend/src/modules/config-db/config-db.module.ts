import { Module } from '@nestjs/common';
import { ConfigDBService } from './config-db.service';
import { ConfigDBController } from './config-db.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigDBModel, ConfigSchema } from './entities/config-db.entity';

@Module({
  imports: [ MongooseModule.forFeature([{ name: ConfigDBModel.modelName, schema: ConfigSchema }])],
  controllers: [ConfigDBController],
  providers: [ConfigDBService],
  exports: [ConfigDBService]
})
export class ConfigDBModule {}
