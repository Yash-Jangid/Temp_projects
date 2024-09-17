import { IsOptional, IsString } from 'class-validator';

export class SortEventDto {
    @IsOptional()
    @IsString()
    name?: 'ASC' | 'DESC';

    @IsOptional()
    @IsString()
    date?: 'ASC' | 'DESC';
}
