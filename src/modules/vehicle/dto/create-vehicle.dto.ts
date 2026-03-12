import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Some name' })
  @IsString()
  @EmptyStringToNull()
  name: string;

  @ApiProperty({ example: 'Skoda' })
  @IsString()
  @EmptyStringToNull()
  brand: string;

  @ApiProperty({ example: 'Octavia' })
  @IsString()
  @EmptyStringToNull()
  model: string;

  @ApiProperty({ example: '2016' })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  year?: string;

  @ApiProperty({ example: 'TMJ123456' })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  vin?: string;
}
