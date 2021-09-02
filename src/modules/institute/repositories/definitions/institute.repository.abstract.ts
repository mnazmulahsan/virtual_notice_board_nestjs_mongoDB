import { InstituteLoginDto, InstituteRegisterDto} from '@modules/institute/dto';

export abstract class InstituteRepository {
  abstract register(
    data: InstituteRegisterDto,
  ): Promise<any>;

  abstract login(
    data: InstituteLoginDto,
  ): Promise<any>;
}
