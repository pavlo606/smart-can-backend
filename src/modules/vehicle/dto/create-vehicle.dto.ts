import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Some name' })
  @IsString()
  @EmptyStringToNull()
  name!: string;

  @ApiProperty({ example: 'Skoda' })
  @IsString()
  @EmptyStringToNull()
  brand!: string;

  @ApiProperty({ example: 'Octavia' })
  @IsString()
  @EmptyStringToNull()
  model!: string;

  @ApiPropertyOptional({ example: '2016' })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  year?: string;

  @ApiPropertyOptional({ example: 'TMJ123456' })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  vin?: string;

  @ApiPropertyOptional({ example: 100_000 })
  @IsNumber()
  initialOdometer!: number;
}
