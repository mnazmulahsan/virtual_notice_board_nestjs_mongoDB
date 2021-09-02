import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IInstitute } from './definitions/institute.entity.interface';
import * as bcrypt from 'bcryptjs';
export type InstituteDocument = Document<Instutute>;

@Schema({
  timestamps: true,
})
export class Instutute implements IInstitute {
  @Prop({
    required: [true, 'name is required'],
    trim: true,
    type: String,
  })
  name: string;

  @Prop({
    required: [true, 'email is required'],
    trim: true,
    index: true,
    unique: true,
    type: String,
  })
  email: string;

  @Prop({
    required: [true, 'password is required'],
    trim: true,
    type: String,
  })
  password: string;
}

export const InstituteSchema = SchemaFactory.createForClass(Instutute);

InstituteSchema.pre<any>('save', async function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});
