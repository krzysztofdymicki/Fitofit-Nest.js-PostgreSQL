import { IsString } from 'class-validator';

export class AddActivityDto {
  @IsString()
  start: string;

  @IsString()
  end: string;

  @IsString()
  date: string;
}
