import { CreateNoticeDto, UpdateNoticeDto} from '@modules/notice/dto';

export abstract class NoticeRepository {
  abstract createNotice(
    institute_id: string,
    data: CreateNoticeDto,
  ): Promise<any>;

  abstract getAll(
    institute_id: string,
  ): Promise<any>;

  abstract getNotice(
    institute_id: string,
    notice_id: string,
  ): Promise<any>;

  abstract updateNotice(
    notice_id: string,
    data: UpdateNoticeDto,
  ): Promise<any>;

  abstract deleteNotice(
    notice_id: string,
  ): Promise<any>;
}
