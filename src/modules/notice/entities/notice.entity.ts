import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { INotice } from './definitions/notice.entity.interface';
export type NoticeDocument = Document<Notice>;

@Schema({
  timestamps: true,
})
export class Notice implements INotice {
  @Prop({
    required: [true, 'title is required'],
    trim: true,
    type: String,
  })
  title: string;

  @Prop({
    required: [true, 'body is required'],
    trim: true,
    type: String,
  })
  body: string;

  @Prop({
    required: [true, 'institute_id is required'],
    type: Types.ObjectId,
  })
  institute_id: Types.ObjectId;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);