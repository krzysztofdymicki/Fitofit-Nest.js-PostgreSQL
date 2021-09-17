import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    findOneById(user_id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    list(): Promise<User[]>;
    signUp(username: string, password: string): Promise<User>;
    signin(username: string, password: string): Promise<{
        token: string;
        username: string;
    }>;
}
