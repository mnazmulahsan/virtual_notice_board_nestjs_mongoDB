import { Types } from 'mongoose';

export interface IInstitute {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
