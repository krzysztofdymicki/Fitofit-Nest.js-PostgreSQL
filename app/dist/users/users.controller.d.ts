import { SignDto } from './dtos/sign.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    signIn(body: SignDto): Promise<{
        token: string;
        username: string;
    }>;
    signUp(body: SignDto): Promise<import("./users.entity").User>;
    getAll(): Promise<import("./users.entity").User[]>;
}
