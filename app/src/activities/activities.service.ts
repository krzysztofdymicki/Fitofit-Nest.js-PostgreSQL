import { BadRequestException, Injectable } from '@nestjs/common';
import { AddActivityDto } from './dtos/addActivity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './activities.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as geolib from 'geolib';
import {
  startOfWeek,
  endOfWeek,
  currentMonth,
  now,
} from 'src/utils/dateFunctions';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity) private repo: Repository<Activity>,
    private httpService: HttpService,
  ) {}

  // GET ALL USER'S ACTIVITIES (ADDITIONALLY BASED ON PERIOD )

  getUserActivities(user_id: number, period?: string) {
    if (!period) {
      return this.repo.find({ user_id });
    }
    // FOR WEEK
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
          startDate: startOfWeek(),
          endDate: endOfWeek(),
        })
        .andWhere('a.user_id = :user_id', { user_id })
        .getRawMany();
    }
    // FOR MONTH
    else if (period === 'month') {
      return this.repo
        .createQueryBuilder('a')
        .select([
          `to_char(a.activity_date, 'fmDD') as "day"`,
          `sum(a.activity_distance)::DECIMAL as total`,
        ])
        .where(`a.user_id = :user_id`, { user_id })
        .andWhere(
          `to_char(a.activity_date, 'MM')::INTEGER = :currentMonth AND to_char(a.activity_date, 'YYYY')::INTEGER = :currentYear`,
          { currentMonth, currentYear: now.getFullYear() },
        )
        .groupBy(`to_char(a.activity_date, 'fmDD')`)
        .getRawMany();
    }
  }

  // HELPER FUNCTIONS TO CALCULATE DISTANCE BETWEEN TWO ADRESSES

  private returnLocationIQUrl(adress: string): string {
    const url = `https://eu1.locationiq.com/v1/search.php?key=${
      process.env.LOCATIONIQ_KEY
    }&q=${encodeURI(adress)}&format=json`;
    return url;
  }

  private getCoordinates(url: string) {
    return this.httpService.get(url);
  }

  private async calculateDistance(start: string, end: string) {
    try {
      const startCoordinates = await lastValueFrom(
        this.getCoordinates(this.returnLocationIQUrl(start)),
      );
      const endCoordinates = await lastValueFrom(
        this.getCoordinates(this.returnLocationIQUrl(end)),
      );

      const distance =
        geolib.getDistance(
          {
            latitude: +startCoordinates.data[0].lat,
            longitude: +startCoordinates.data[0].lon,
          },
          {
            latitude: +endCoordinates.data[0].lat,
            longitude: +endCoordinates.data[0].lon,
          },
        ) / 1000;
      return Math.round(distance);
    } catch (e) {
      throw new BadRequestException(
        'At least one of provided adresses is not correct',
      );
    }
  }

  // ADD A NEW ACTIVITY

  async addActivity(user_id: number, activityFromRequest: AddActivityDto) {
    const newActivity = this.repo.create({
      activity_start: activityFromRequest.start,
      activity_end: activityFromRequest.end,
      activity_date: new Date(activityFromRequest.date),
      activity_distance: await this.calculateDistance(
        activityFromRequest.start,
        activityFromRequest.end,
      ),
      user_id,
    });
    const savedActivity = await this.repo.save(newActivity); // CO ZROBIC, ZEBY W TYM PRZYPADKU ZWROCONY REKORD MIAL INNE NAZWY KOLUMN? (id, start, end itd.)

    return {
      id: savedActivity.activity_id,
      start: savedActivity.activity_start,
      end: savedActivity.activity_end,
      date: savedActivity.activity_date,
      distance: savedActivity.activity_distance,
      user_id: savedActivity.user_id,
    };
  }
}
