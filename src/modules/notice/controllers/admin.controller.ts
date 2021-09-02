import {
  Controller,
  Get,
  Post,
  Patch,
  Req,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@common/guards';
import { CreateNoticeDto, UpdateNoticeDto } from '../dto';
import { NoticeService } from '@modules/notice/notice.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '@common/constants';

@ApiTags('Institue')
@ApiBearerAuth(TOKEN_NAME)
@Controller('notices')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly service: NoticeService) {}

  @ApiOperation({ description: 'Notice create' })
  @Post('/')
  async createNotice(
      @Body() noticeInfo: CreateNoticeDto,
      @Req() req: any,
    ) {
     
    return {
      ...(await this.service.createNotice(req.user._id, noticeInfo)),
      success: true,
      message: `Notice created successfully`,
    };
  }

  @ApiOperation({ description: 'All Notice of an Institute' })
  @Get('/')
  async getAll(
      @Req() req: any,
    ) {

    const data = await this.service.getAll(req.user._id);
     
    return {
      data,
      success: true,
      message: `Notices fetched successfully`,
    };
  }

  @ApiOperation({ description: 'Specific Notice of an Institute' })
  @Get('/:notice_id')
  async getNotice(
      @Param('notice_id') notice_id: string,
      @Req() req: any,
    ) {

    // const data = await this.service.getNotice(req.user._id, notice_id);
     
    return {
      ...(await this.service.getNotice(req.user._id, notice_id)),
      success: true,
      message: `Notice fetched successfully`,
    };
  }

  @ApiOperation({ description: 'Notice update' })
  @Patch('/:notice_id')
  async updateNotice(
      @Param('notice_id') notice_id: string,
      @Body() noticeInfo: UpdateNoticeDto,
    ) {
     
    return {
      ...(await this.service.updateNotice(notice_id, noticeInfo)),
      success: true,
      message: `Notice updated successfully`,
    };
  }

  @ApiOperation({ description: 'Notice delete' })
  @Delete('/:notice_id')
  async deleteNotice(
      @Param('notice_id') notice_id: string,
    ) {
     
    return {
      ...(await this.service.deleteNotice(notice_id)),
      success: true,
      message: `Notice deleted successfully`,
    };
  }
}
