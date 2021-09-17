import { ActivitiesService } from './activities.service';
import { AddActivityDto } from './dtos/addActivity.dto';
export declare class ActivitiesController {
    private activitiesService;
    constructor(activitiesService: ActivitiesService);
    getUserActivities(user_id: number, period: 'week' | 'month'): Promise<any[]>;
    addActivity(user_id: number, body: AddActivityDto): Promise<{
        id: number;
        start: string;
        end: string;
        date: Date;
        distance: number;
        user_id: number;
    }>;
}
