import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigDBModel } from './entities/config-db.entity';
import { WinstonLoggerService } from '../../configs/index'; 
import { ConfigDBStatic } from './entities/config-db.interface'

@Injectable()
export class ConfigDBService implements OnModuleInit{
  constructor(
    private readonly logger: WinstonLoggerService,
    @InjectModel(ConfigDBModel.modelName) private readonly configModel: ConfigDBStatic,
  ) {}

  async onModuleInit() {
    this.logger.log('config init')
    const config = await this.configModel.findOne()
    if (!config) {
      const defaultConfig = new this.configModel();
      await defaultConfig.save();
      this.logger.log('Default config data has been added');
    }
  }

  async getNo (key: string): Promise<number | boolean> {
    this.logger.log(`type ${key}`)
    try {
      const result = await this.configModel.getNo(key)
      return result
    } catch (error) {
      this.logger.error('getNo', JSON.stringify(error))
      return false
    }
  }
}
