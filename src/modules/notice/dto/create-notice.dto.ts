import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateNoticeDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 200)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly body: string;
}