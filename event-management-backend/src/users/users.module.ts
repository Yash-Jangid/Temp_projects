import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])], // Import User model
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Allow other modules to use UsersService
})
export class UsersModule {}
