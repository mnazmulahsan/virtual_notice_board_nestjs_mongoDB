import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { InvalidTokenException } from '../exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  /**
   * Check if the user has permission to access the resource
   * @param context {ExecutionContext}
   * @returns{boolean}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    let accessToken;
    try {
      accessToken = req.headers['authorization'].split(' ')[1];
    } catch (e) {
      Logger.log(e);
    }

    if (!accessToken) {
      throw new InvalidTokenException();
    }
    const user = await this.tokenService.validate(accessToken);
    if (!user) {
      throw new UnauthorizedException();
    }
    
    req.user = user;
    return true;
  }
}
