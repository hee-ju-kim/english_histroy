import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModel, AdminSchema } from './entities/admin.entity';
import { LogDbModule } from '../index'
import { ConfigModule } from '../../configs/index';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AdminModel.modelName, schema: AdminSchema }]),
    LogDbModule,
    ConfigModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
