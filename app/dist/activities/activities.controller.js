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
exports.ActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const activities_service_1 = require("./activities.service");
const currentUser_decorator_1 = require("../users/decorators/currentUser.decorator");
const addActivity_dto_1 = require("./dtos/addActivity.dto");
let ActivitiesController = class ActivitiesController {
    constructor(activitiesService) {
        this.activitiesService = activitiesService;
    }
    getUserActivities(user_id, period) {
        return this.activitiesService.getUserActivities(user_id, period);
    }
    addActivity(user_id, body) {
        return this.activitiesService.addActivity(user_id, body);
    }
};
__decorate([
    (0, common_1.Get)('/my'),
    __param(0, (0, currentUser_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "getUserActivities", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, currentUser_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, addActivity_dto_1.AddActivityDto]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "addActivity", null);
ActivitiesController = __decorate([
    (0, common_1.Controller)('activities'),
    __metadata("design:paramtypes", [activities_service_1.ActivitiesService])
], ActivitiesController);
exports.ActivitiesController = ActivitiesController;
//# sourceMappingURL=activities.controller.js.map