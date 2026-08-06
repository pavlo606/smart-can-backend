import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryTelemetryDto {
  @ApiProperty({
    type: String,
    description: 'Device Id',
    required: true,
  })
  @IsString()
  deviceId!: string

  @ApiProperty({
    type: String,
    description: 'Start date string',
    example: '2000-10-25T14:30:00Z',
    required: true,
  })
  @IsDateString()
  gte!: string

  
  @ApiProperty({
    type: String,
    description: 'End date string',
    example: '2050-10-25T14:30:00Z',
    required: true,
  })
  @IsDateString()
  lte!: string

  @ApiPropertyOptional({
    type: Number,
    description: 'Limit',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 20000;
  
  @ApiPropertyOptional({
    type: String,
    description: 'Last Timestamp for pagination',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  lastTimestamp?: string;
}
