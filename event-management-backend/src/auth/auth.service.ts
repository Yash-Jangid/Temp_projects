import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface'; // Define this interface for JWT payload

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByUsername(username);
        if (user && user.password === password) { // Add password hashing for security
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload: JwtPayload = { username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
