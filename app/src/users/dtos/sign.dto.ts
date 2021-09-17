import { Length } from 'class-validator';

export class SignDto {
  @Length(8, 30)
  username: string;
  @Length(8, 30)
  password: string;
}
