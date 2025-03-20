import { Body, Controller, Post, ValidationPipe, HttpStatus, Res, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Response as ExpressResponse, Request } from 'express';
import { makeReqWhoInfo } from '../../functions/common';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post()
  // async create(@Body(new ValidationPipe({
  //   transform: true, 
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  // })) createAdminDto: CreateAdminDto, @Req() req: Request, @Res() res: ExpressResponse) {
  //   const reqInfo = makeReqWhoInfo(req)
  //   console.log(reqInfo)
  //   const result = await this.adminService.create(reqInfo, createAdminDto)
  //   if (result) {
  //     return res.status(HttpStatus.OK).send(result)
  //   } else {
  //     return res.status(HttpStatus.BAD_REQUEST).send(result)
  //   }
  // }
}
