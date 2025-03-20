import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WinstonLoggerService } from '../../configs/winston/winston.service'; 
import { LogDBModel } from './entities/log-db.entity';
import { LogDB } from './entities/log-db.interface';

@Injectable()
export class LogDBService {
  constructor(
    private readonly logger: WinstonLoggerService,
    @InjectModel(LogDBModel.modelName) private readonly logModel: Model<LogDB>
  ) {}

  insertLog (): void {
    this.logger.log('insertLog')
    const log = new this.logModel({
      who: {},
      when: new Date(),
      where: {},
      what: {},
      how: {
        action: 'insert'
      },
      memo: ''
    })

    log.save()
  }

  updateLog (): void {
    this.logger.log('insertLog')
    const log = new this.logModel({
      who: {},
      when: new Date(),
      where: {},
      what: {},
      how: {
        action: 'update'
      },
      memo: ''
    })

    log.save()
  }
}
