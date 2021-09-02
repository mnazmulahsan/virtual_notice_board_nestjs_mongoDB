import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class InstituteLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 200)
  readonly password: string;
}