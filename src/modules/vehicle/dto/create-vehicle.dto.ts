import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { StringToUpperCase } from '@/common/decorators/string-to-uppercase';
import { IsVin } from '@/common/validators/is-vin.validator';
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
  @IsVin()
  @StringToUpperCase()
  @EmptyStringToNull()
  vin?: string;

  @ApiPropertyOptional({ example: 100_000 })
  @IsNumber()
  initialOdometer!: number;
}
