import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './event.model';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { User } from '../users/user.model';  // Import the User model for associations

@Module({
  imports: [SequelizeModule.forFeature([Event, User])], // Import Event and User models
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
