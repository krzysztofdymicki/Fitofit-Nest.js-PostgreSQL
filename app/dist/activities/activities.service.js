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
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activities_entity_1 = require("./activities.entity");
const typeorm_2 = require("typeorm");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const geolib = require("geolib");
const dateFunctions_1 = require("../utils/dateFunctions");
let ActivitiesService = class ActivitiesService {
    constructor(repo, httpService) {
        this.repo = repo;
        this.httpService = httpService;
    }
    getUserActivities(user_id, period) {
        if (!period) {
            return this.repo.find({ user_id });
        }
        else if (period === 'week') {
            return this.repo
                .createQueryBuilder('a')
                .select([
                'a.activity_id as id',
                'a.activity_date as "date"',
                'a.activity_start as "start"',
                'a.activity_end as "end"',
                'a.activity_distance as "distance"',
            ])
                .where('a.activity_date BETWEEN :startDate AND :endDate', {
                startDate: (0, dateFunctions_1.startOfWeek)(),
                endDate: (0, dateFunctions_1.endOfWeek)(),
            })
                .andWhere('a.user_id = :user_id', { user_id })
                .getRawMany();
        }
        else if (period === 'month') {
            return this.repo
                .createQueryBuilder('a')
                .select([
                `to_char(a.activity_date, 'fmDD') as "day"`,
                `sum(a.activity_distance)::DECIMAL as total`,
            ])
                .where(`a.user_id = :user_id`, { user_id })
                .andWhere(`to_char(a.activity_date, 'MM')::INTEGER = :currentMonth AND to_char(a.activity_date, 'YYYY')::INTEGER = :currentYear`, { currentMonth: dateFunctions_1.currentMonth, currentYear: dateFunctions_1.now.getFullYear() })
                .groupBy(`to_char(a.activity_date, 'fmDD')`)
                .getRawMany();
        }
    }
    returnLocationIQUrl(adress) {
        const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${encodeURI(adress)}&format=json`;
        return url;
    }
    getCoordinates(url) {
        return this.httpService.get(url);
    }
    async calculateDistance(start, end) {
        try {
            const startCoordinates = await (0, rxjs_1.lastValueFrom)(this.getCoordinates(this.returnLocationIQUrl(start)));
            const endCoordinates = await (0, rxjs_1.lastValueFrom)(this.getCoordinates(this.returnLocationIQUrl(end)));
            const distance = geolib.getDistance({
                latitude: +startCoordinates.data[0].lat,
                longitude: +startCoordinates.data[0].lon,
            }, {
                latitude: +endCoordinates.data[0].lat,
                longitude: +endCoordinates.data[0].lon,
            }) / 1000;
            return Math.round(distance);
        }
        catch (e) {
            throw new common_1.BadRequestException('At least one of provided adresses is not correct');
        }
    }
    async addActivity(user_id, activityFromRequest) {
        const newActivity = this.repo.create({
            activity_start: activityFromRequest.start,
            activity_end: activityFromRequest.end,
            activity_date: new Date(activityFromRequest.date),
            activity_distance: await this.calculateDistance(activityFromRequest.start, activityFromRequest.end),
            user_id,
        });
        const savedActivity = await this.repo.save(newActivity);
        return savedActivity;
    }
};
ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activities_entity_1.Activity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], ActivitiesService);
exports.ActivitiesService = ActivitiesService;
//# sourceMappingURL=activities.service.js.map