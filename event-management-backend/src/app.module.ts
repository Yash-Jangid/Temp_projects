import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Event } from './events/event.model';
import { User } from './users/user.model';
import { Image } from './images/image.model';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        dialectOptions: {
          ssl: false,
        },
        models: [Event, User, Image], 
      }),
      inject: [ConfigService],
    }),
    EventsModule,
    UsersModule,
    ImagesModule, 
  ],
  
})
export class AppModule {}
