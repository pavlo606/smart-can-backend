import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ServiceIntervalSortField } from './sort-service-interval.dto';

export class QueryServiceIntervalDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'Page',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    type: Number,
    description: 'Limit',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 20;

  @ApiPropertyOptional({
    type: String,
    description: 'SortBy',
    required: false,
  })
  @IsOptional()
  @IsEnum(ServiceIntervalSortField)
  sortBy?: ServiceIntervalSortField;

  @ApiPropertyOptional({
    type: String,
    description: 'SortOrder',
    required: false,
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'asc';
}
