// src/users/users.controller.ts

import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model'; // Adjust the path as needed

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(
        @Body() createUserDto: { username: string; password: string }
    ): Promise<User> {
        return this.usersService.createUser(createUserDto.username, createUserDto.password);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findById(+id);
    }
}
