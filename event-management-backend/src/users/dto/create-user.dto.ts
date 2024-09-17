import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: 'Password is too short. It should be at least 6 characters long.',
    })
    readonly password: string;
}
