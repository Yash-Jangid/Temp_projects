import { IsOptional, IsString } from 'class-validator';

export class SearchEventDto {
    @IsOptional()
    @IsString()
    readonly searchTerm?: string; // A term to search across event fields
}
