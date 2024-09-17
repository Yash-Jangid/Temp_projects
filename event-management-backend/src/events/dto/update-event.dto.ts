import { IsString, IsDate, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsDate()
  readonly startDate?: Date;

  @IsOptional()
  @IsDate()
  readonly endDate?: Date;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly totalGuests?: number;
}
