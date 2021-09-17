import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    this.repo = repo;
  }

  // ------------------ HELPERS -------------- //

  findOneById(user_id: number) {
    return this.repo.findOne(user_id);
  }

  findOneByUsername(username: string) {
    return this.repo.findOne({
      where: { username },
    });
  }

  list() {
    return this.repo.find();
  }

  // ------------------------- SIGN UP ------------------------------------------- //

  async signUp(username: string, password: string) {
    // CHECK IF THERE IS ALREADY EXISTING USER WITH SUCH AN USERNAME

    const existingUser = await this.findOneByUsername(username);
    if (existingUser) {
      throw new BadRequestException('The username is already in use');
    }

    // HASH THE PASSWORD

    const password_hash = await bcrypt.hash(password, 10);

    // CREATE USER AND SAVE

    const user = this.repo.create({ username, password_hash });
    return this.repo.save(user);
  }

  // ---------------------- SIGN IN -------------------------------------------- //

  async signin(username: string, password: string) {
    // CHECK IF THERE IS ALREADY EXISTING USER WITH SUCH AN USERNAME

    const existingUser = await this.findOneByUsername(username);
    if (!existingUser) {
      throw new BadRequestException('wrong username or password');
    }

    // COMPARE PASSWORD WITH PASSWORDHASH

    const correctPassword = bcrypt.compare(
      existingUser.password_hash,
      password,
    );
    if (!correctPassword) {
      throw new BadRequestException('wrong username or password');
    }

    // CREATE USER'S TOKEN

    const userForToken = {
      ...existingUser,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    return {
      token,
      username,
    };
  }
}
