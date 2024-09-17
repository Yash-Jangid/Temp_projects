// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model'; // Adjust the path as needed

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) { }

    async createUser(username: string, password: string): Promise<User> {
        return this.userModel.create({ username, password });
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({
            where: {
                username: username // Ensure 'username' is a valid property of the User model
            }
        });
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll(); // Retrieves all users
    }

    async findById(id: number): Promise<User | null> {
        return this.userModel.findByPk(id); // Retrieves a user by primary key (id)
    }
}
