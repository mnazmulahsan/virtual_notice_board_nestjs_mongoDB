import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateNoticeDto, UpdateNoticeDto } from './dto';
import { NoticeRepository } from './repositories/definitions/notice.repository.abstract';

@Injectable()
export class NoticeService {
  constructor(
    private readonly repository: NoticeRepository,
  ) {}

  async createNotice(
    institute_id: string,
    data: CreateNoticeDto,
  ): Promise<any> {
    return await this.repository.createNotice(institute_id, data);
  }

  async getAll(
    institute_id: string,
  ): Promise<any> {
    return await this.repository.getAll(institute_id);
  }

  async getNotice(
    institute_id: string,
    notice_id: string,
  ): Promise<any> {
    return await this.repository.getNotice(institute_id, notice_id);
  }

  async updateNotice(
    notice_id: string,
    data: UpdateNoticeDto,
  ): Promise<any> {
    return await this.repository.updateNotice(notice_id, data);
  }

  async deleteNotice(
    notice_id: string,
  ): Promise<any> {
    return await this.repository.deleteNotice(notice_id);
  }
}
