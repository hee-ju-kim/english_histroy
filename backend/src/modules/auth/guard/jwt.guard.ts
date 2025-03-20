import { 
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '../../../configs/index'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = request.cookies['access_token']
    if (token) {
      request.headers['authorization'] = `Bearer ${token}`
    }
    const response: Response = context.switchToHttp().getResponse()
    try {
      try {
        // JWT 토큰 검증
        await super.canActivate(context) // 기본 토큰 검증 로직
        return true
      } catch (error) {
        console.log('검증실패')
        
        // 토큰 검증 실패시, 리프레시 토큰을 사용해 새로운 액세스 토큰을 발급
        const refreshToken = request.cookies['refresh_token']
        if (!refreshToken) {
          throw new UnauthorizedException()
        }

        // 리프레시 토큰 검증
        const payload = await this.jwtService.verifyAsync(refreshToken, {
          secret: this.configService.get('jwtRefreshKey'),
        })

        // 새로운 액세스 토큰을 발급
        const newAccessToken = await this.jwtService.signAsync(
          { id: payload.id, name: payload.name, _id: payload._id, lastActivityTime: new Date().getTime() },
          {
            secret: this.configService.get('jwtKey'),
            expiresIn: this.configService.get('jwtMaxAge'), // 액세스 토큰의 유효 기간 (예시: 1시간)
          },
        )

        // 클라이언트에게 새로운 액세스 토큰을 반환
        request.headers['authorization'] = `Bearer ${newAccessToken}`
        response.cookie('access_token', newAccessToken, {
          httpOnly: true,
          maxAge: this.configService.get('jwtMaxAge'),
        })

        response.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          maxAge: this.configService.get('jwtRefreshMaxAge'),
        })

        return true // 인증을 통과한 것으로 간주
      }
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException()
    }
  }

  handleRequest(err: any, admin: any, info: any) {
    if (err || !admin) {
      throw err || new UnauthorizedException()
    }
    return admin
  }
}
