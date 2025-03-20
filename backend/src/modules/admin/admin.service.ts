import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { AdminModel } from './entities/admin.entity';
import { WinstonLoggerService } from '../../configs/winston/winston.service'; 
import { Model } from 'mongoose';
import { AdminStatic } from './entities/admin.interface';
import { LogDBService } from '../index';
import { ConfigService } from '../../configs/index';

@Injectable()
export class AdminService {
  constructor(
    private readonly logger: WinstonLoggerService,
    @InjectModel(AdminModel.modelName) private readonly adminModel: Model<AdminStatic>,
    private readonly logDB: LogDBService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const admin = await this.adminModel.findOne({id: 'admin'}, {_id: 1}).lean()
    if (!admin) {
      const defaultAdmin = new this.adminModel({
        id: this.configService.get('adminID'),
        password: this.configService.get('adminPWD'),
      })

      await defaultAdmin.save()
    }
  }

  async login (id: string): Promise<any> {
    this.logger.log(id)
    const admin = await this.adminModel.findOne({id: id, status: 'Normal'})
    return admin || false
  }
}
