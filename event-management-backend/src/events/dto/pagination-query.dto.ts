import { IsOptional, IsInt, Min } from 'class-validator';

export class PaginationQueryDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    readonly limit?: number = 10; // Default limit of 10

    @IsOptional()
    @IsInt()
    @Min(0)
    readonly offset?: number = 0; // Default offset of 0
}
