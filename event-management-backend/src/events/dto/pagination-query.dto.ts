import { IsOptional, IsString } from 'class-validator';

export class PaginationQueryDto {
    @IsOptional()
    @IsString()
    readonly limit?: string;

    @IsOptional()
    @IsString()
    readonly offset?: string;
}
