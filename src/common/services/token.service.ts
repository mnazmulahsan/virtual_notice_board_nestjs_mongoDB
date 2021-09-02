import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { AccessTokenExpiredException } from '../exceptions';
import { TokenType } from '../enums';

@Injectable()
export class TokenService {
  constructor() {}

  /**
   * Velidate JWT Token
   * @param token JWT token
   * @returns decrypted payload from JWT
   */
  public async validate(
    token: string,
  ) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return user;
    } catch (e) {
      throw new AccessTokenExpiredException();
    }
  }
}
