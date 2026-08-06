import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ example: 'abc123' })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  id?: string;

  @ApiProperty({ example: 'abc123' })
  @IsString()
  @EmptyStringToNull()
  imei!: string;

  @ApiProperty({ example: 'abc123' })
  @IsString()
  @EmptyStringToNull()
  secret!: string;

  @ApiProperty({ example: '' })
  @IsUUID()
  @IsOptional()
  @EmptyStringToNull()
  vehicleId?: string;

  @ApiProperty({ example: '0.0.1' })
  @IsString()
  @EmptyStringToNull()
  firmwareVersion!: string;
}
