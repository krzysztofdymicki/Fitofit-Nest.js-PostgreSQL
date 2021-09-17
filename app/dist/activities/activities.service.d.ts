import { AddActivityDto } from './dtos/addActivity.dto';
import { Activity } from './activities.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
export declare class ActivitiesService {
    private repo;
    private httpService;
    constructor(repo: Repository<Activity>, httpService: HttpService);
    getUserActivities(user_id: number, period?: string): Promise<any[]>;
    private returnLocationIQUrl;
    private getCoordinates;
    private calculateDistance;
    addActivity(user_id: number, activityFromRequest: AddActivityDto): Promise<{
        id: number;
        start: string;
        end: string;
        date: Date;
        distance: number;
        user_id: number;
    }>;
}
