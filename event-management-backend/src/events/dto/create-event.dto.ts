import { IsString, IsDate, IsOptional, IsInt, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsDate()
  readonly startDate: Date;

  @IsDate()
  readonly endDate: Date;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly totalGuests?: number;

  @IsInt()
  readonly userId: number; 
}
