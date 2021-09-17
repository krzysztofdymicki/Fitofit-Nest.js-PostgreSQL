"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesModule = void 0;
const common_1 = require("@nestjs/common");
const activities_controller_1 = require("./activities.controller");
const activities_service_1 = require("./activities.service");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("@nestjs/axios");
const activities_entity_1 = require("./activities.entity");
let ActivitiesModule = class ActivitiesModule {
};
ActivitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([activities_entity_1.Activity]), axios_1.HttpModule],
        controllers: [activities_controller_1.ActivitiesController],
        providers: [activities_service_1.ActivitiesService],
    })
], ActivitiesModule);
exports.ActivitiesModule = ActivitiesModule;
//# sourceMappingURL=activities.module.js.map