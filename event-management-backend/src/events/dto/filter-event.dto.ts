import { IsOptional, IsString, IsDate } from 'class-validator';

export class FilterEventDto {
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
    @IsString()
    readonly category?: string; // Assuming you want to filter by event category
}
