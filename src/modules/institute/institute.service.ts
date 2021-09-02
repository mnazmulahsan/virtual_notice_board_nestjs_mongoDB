import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InstituteRegisterDto, InstituteLoginDto } from './dto';
import { InstituteRepository } from './repositories/definitions/institute.repository.abstract';

@Injectable()
export class InstituteService {
  constructor(
    private readonly repository: InstituteRepository,
  ) {}

  async register(
    data: InstituteRegisterDto,
  ): Promise<any> {
    return await this.repository.register(data);
  }

  async login(
    data: InstituteLoginDto,
  ): Promise<any> {
    return await this.repository.login(data);
  }
}
