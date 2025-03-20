import { Controller, Get, Post, Body, HttpStatus, UseGuards, Res, Req, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { Public } from '../../configs/index'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() param:{id: string, password: string}, @Response() res: ExpressResponse) {
    console.log('login', param)
    return res.status(HttpStatus.OK).send();
  }
}
