import { Types } from 'mongoose';

export interface INotice {
  _id?: Types.ObjectId;
  title: string;
  body: string;
  institute_id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
