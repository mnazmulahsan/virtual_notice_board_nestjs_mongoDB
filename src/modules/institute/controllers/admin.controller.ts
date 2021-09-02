import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { InstituteRegisterDto, InstituteLoginDto } from '../dto';
import { InstituteService } from '@modules/institute/institute.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '@common/constants';

@ApiTags('Institue')
@ApiBearerAuth(TOKEN_NAME)
@Controller('auth')
export class AdminController {
  constructor(private readonly service: InstituteService) {}

  @ApiOperation({ description: 'Institute registration' })
  @Post('register/')
  async register(
      @Body() instituteInfo: InstituteRegisterDto,
    ) {
     
    return {
      ...(await this.service.register(instituteInfo)),
      success: true,
      message: `Registerd successfully`,
    };
  }

  @ApiOperation({ description: 'Institute login' })
  @Post('login/')
  async login(
      @Body() loginInfo: InstituteLoginDto,
    ) {
     
    return {
      ...(await this.service.login(loginInfo)),
      success: true,
      message: `Logged in successfully`,
    };
  }
}
