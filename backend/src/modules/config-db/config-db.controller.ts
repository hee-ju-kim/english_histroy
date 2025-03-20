import { Controller } from '@nestjs/common';
import { ConfigDBService } from './config-db.service';

@Controller('config-db')
export class ConfigDBController {
  constructor(private readonly ConfigDBService: ConfigDBService) {}

}
