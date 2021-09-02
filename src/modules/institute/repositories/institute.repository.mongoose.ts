import {
  Injectable,
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { InstituteRepository } from './definitions/institute.repository.abstract';
import { Instutute, InstituteDocument } from '@modules/institute/entities/institute.entity';
import { IInstitute } from '@modules/institute/entities/definitions/institute.entity.interface';
import { InstituteLoginDto, InstituteRegisterDto} from '@modules/institute/dto';

@Injectable()
export class InstituteMongo extends InstituteRepository {
  constructor(
    @InjectModel(Instutute.name) private model: Model<InstituteDocument>,
  ) {
    super();
  }

  async register(
    instituteData: InstituteRegisterDto,
  ): Promise<any> {
    const newInstitute: any = await this.model.create(instituteData);
    if(!newInstitute) throw new BadRequestException('Institute not created!');

    const token = await jwt.sign
      (
        { 
          _id: newInstitute._id,
          email: newInstitute.email
        },
        process.env.JWT_SECRET,
        { expiresIn: 86400 * 30 },
      );
    
    const response = {
      name: newInstitute.name,
      email: newInstitute.email,
    }

    return { token, institute: response };
  }

  async login(
    loginData: InstituteLoginDto,
  ): Promise<any> {
    const {email, password} = loginData;
    const institute: any = await this.model
      .findOne({ email: email})
      .select('-createdAt -updatedAt -__v');
    if(!institute) throw new BadRequestException('Institute not found!');

    const isValidPassword = bcrypt.compareSync(password, institute.password);
    if(!isValidPassword) throw new BadRequestException('Inavlid password!');

    const token = await jwt.sign
      (
        { 
          _id: institute._id,
          email: institute.email
        },
        process.env.JWT_SECRET,
        { expiresIn: 86400 * 30 },
      );
    delete institute._doc.password;
    delete institute._doc._id;

    return {token, institute: institute};
  }
}
