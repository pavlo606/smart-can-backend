import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVehicleStateDto {
  @ApiProperty({ example: '' })
  @IsUUID()
  @EmptyStringToNull()
  vehicleId!: string;

  @ApiProperty({ example: '2023-10-25T14:30:00Z' })
  @IsDateString()
  @EmptyStringToNull()
  lastSeen!: string;

  @ApiProperty({ example: '12.345' })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: '12.345' })
  @IsOptional()
  @IsNumber()
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

  @ApiProperty({ example: '20000' })
  @IsOptional()
  @IsNumber()
  currentOdometer?: number;
}
