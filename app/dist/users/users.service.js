"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users_entity_1 = require("./users.entity");
let UsersService = class UsersService {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    findOneById(user_id) {
        return this.repo.findOne(user_id);
    }
    findOneByUsername(username) {
        return this.repo.findOne({
            where: { username },
        });
    }
    list() {
        return this.repo.find();
    }
    async signUp(username, password) {
        const existingUser = await this.findOneByUsername(username);
        if (existingUser) {
            throw new common_1.BadRequestException('The username is already in use');
        }
        const password_hash = await bcrypt.hash(password, 10);
        const user = this.repo.create({ username, password_hash });
        return this.repo.save(user);
    }
    async signin(username, password) {
        const existingUser = await this.findOneByUsername(username);
        if (!existingUser) {
            throw new common_1.BadRequestException('wrong username or password');
        }
        const correctPassword = bcrypt.compare(existingUser.password_hash, password);
        if (!correctPassword) {
            throw new common_1.BadRequestException('wrong username or password');
        }
        const userForToken = Object.assign({}, existingUser);
        const token = jwt.sign(userForToken, process.env.JWT_SECRET);
        return {
            token,
            username,
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map