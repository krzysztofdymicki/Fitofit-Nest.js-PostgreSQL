import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CurrentUser } from '../users/decorators/currentUser.decorator';
import { AddActivityDto } from './dtos/addActivity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  // GET ONLY CURREN'T USER'S ACTIVITIES

  @Get('/my')
  getUserActivities(
    @CurrentUser() user_id: number,
    @Query('period') period: 'week' | 'month',
  ) {
    return this.activitiesService.getUserActivities(user_id, period);
  }

  // ADD NEW ACTIVITY

  @Post()
  addActivity(@CurrentUser() user_id: number, @Body() body: AddActivityDto) {
    return this.activitiesService.addActivity(user_id, body);
  }
}
