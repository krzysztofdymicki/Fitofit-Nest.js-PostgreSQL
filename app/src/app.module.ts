// BASIC IMPORTS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// CONTROLLERS
import { AppController } from './app.controller';

// APP MODULES
import { ActivitiesModule } from './activities/activities.module';
import { UsersModule } from './users/users.module';

//ENTITIES
import { User } from './users/users.entity';
import { Activity } from './activities/activities.entity';

import { AppService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Activity],
      synchronize: true,
    }),
    ActivitiesModule,
    UsersModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
