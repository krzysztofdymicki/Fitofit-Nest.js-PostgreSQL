import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '../users.entity';

const authorizeAndReturnId = (authorization: string) => {
  const token = authorization.substring(7);
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as User;
    return decodedToken.user_id;
  } catch (e) {
    throw new UnauthorizedException(e.message);
  }
};

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!request.get('authorization')) {
      throw new BadRequestException('token is missing');
    }
    const user_id = authorizeAndReturnId(request.headers['authorization']);
    return +user_id;
  },
);
