import { Injectable } from '@nestjs/common';
import { AdminService } from '../index';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService
  ) {}

  async validateUser(id: string, pass: string): Promise<any> {
    const admin = await this.adminService.login(id)
    if (admin && admin.authenticate(pass)) {
      return admin
    }
    return null
  }
}
