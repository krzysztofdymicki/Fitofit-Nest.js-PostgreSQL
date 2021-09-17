import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { SignDto } from './dtos/sign.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signin')
  signIn(@Body() body: SignDto) {
    return this.usersService.signin(body.username, body.password);
  }

  @Post('/signup')
  signUp(@Body() body: SignDto) {
    return this.usersService.signUp(body.username, body.password);
  }

  @Get()
  getAll() {
    return this.usersService.list();
  }
}
