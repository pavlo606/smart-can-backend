import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: '' })
  @IsString()
  @EmptyStringToNull()
  deviceId!: string;

  @ApiProperty({ example: 'Some name' })
  @IsString()
  @EmptyStringToNull()
  name!: string;

  @ApiProperty({ example: '2023-10-25T14:30:00Z' })
  @IsDateString()
  @EmptyStringToNull()
  startTimestamp!: string;

  @ApiPropertyOptional({ example: '2023-10-25T14:30:00Z' })
  @IsDateString()
  @EmptyStringToNull()
  endTimestamp!: string;
}
