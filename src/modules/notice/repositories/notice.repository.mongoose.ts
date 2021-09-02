import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NoticeRepository } from './definitions/notice.repository.abstract';
import { Notice, NoticeDocument } from '@modules/notice/entities/notice.entity';
import { INotice } from '@modules/notice/entities/definitions/notice.entity.interface';
import { CreateNoticeDto, UpdateNoticeDto} from '@modules/notice/dto';

@Injectable()
export class NoticeMongo extends NoticeRepository {
  constructor(
    @InjectModel(Notice.name) private model: Model<NoticeDocument>,
  ) {
    super();
  }

  async createNotice(
    institute_id: string,
    noticeData: CreateNoticeDto,
  ): Promise<any> {
    const newNotice: any = await this.model.create({...noticeData, institute_id});
    if(!newNotice) throw new BadRequestException('Notice not created!');
    
    const noticeInfo = {
      _id: newNotice._id,
      title: newNotice.title,
      body: newNotice.body
    }

    return noticeInfo;
  }

  async getAll(
    institute_id: string,
  ): Promise<any> {
    const notices: NoticeDocument[] = await this.model.find({institute_id})
      .select('-institute_id -createdAt -updatedAt -__v');
    if(!notices) throw new BadRequestException('Notice not found!');

    return notices;
  }

  async getNotice(
    institute_id: string,
    notice_id: string,
  ): Promise<any> {
    const notice: NoticeDocument = await this.model
      .findOne({_id: notice_id, institute_id} as any)
      .select('-institute_id -createdAt -updatedAt -__v');
    if(!notice) throw new BadRequestException('Notice not found!');

    return <any>notice.toJSON();
  }

  async updateNotice(
    notice_id: string,
    noticeData: UpdateNoticeDto,
  ): Promise<any> {
    const {title, body} = noticeData;
    const updatedNotice: NoticeDocument = await this.model
      .findOneAndUpdate
      (
        { _id: notice_id } as any,
        { title, body },
        { new: true }
      )
      .select('-institute_id -createdAt -updatedAt -__v');
    if(!updatedNotice) throw new BadRequestException('Notice was not updated!');

    return <any>updatedNotice.toJSON();
  }

  async deleteNotice(
    notice_id: string,
  ): Promise<any> {
    const deletedNotice: NoticeDocument = await this.model
      .findByIdAndDelete(notice_id);
    if(!deletedNotice) throw new BadRequestException('Notice was not deleted!');

    return;
  }
}