import { IsOptional, IsInt, IsString, IsDate } from 'class-validator';

export class ListEventDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsDate()
    readonly startDate?: Date;

    @IsOptional()
    @IsDate()
    readonly endDate?: Date;

    @IsOptional()
    @IsInt()
    readonly page?: number;

    @IsOptional()
    @IsInt()
    readonly limit?: number;
}
