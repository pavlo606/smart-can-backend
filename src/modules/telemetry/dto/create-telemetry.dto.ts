import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsLatitude, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTelemetryDto {
  @ApiProperty({ example: '' })
  @IsUUID()
  @EmptyStringToNull()
  deviceId!: string;

  @ApiProperty({ example: '2023-10-25T14:30:00Z' })
  @IsDateString()
  @EmptyStringToNull()
  timestamp!: string;

  @ApiProperty({ example: '12.345' })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiProperty({ example: '12.345' })
  @IsOptional()
  @IsLatitude()
  longitude?: number;
  
  @ApiProperty({ example: '12' })
  @IsOptional()
  @IsNumber()
  speed?: number;
  
  @ApiProperty({ example: '1200' })
  @IsOptional()
  @IsNumber()
  rpm?: number;
  
  @ApiProperty({ example: '90' })
  @IsOptional()
  @IsNumber()
  coolantTemp?: number;
  
  @ApiProperty({ example: '20' })
  @IsOptional()
  @IsNumber()
  fuelLevel?: number;
}
