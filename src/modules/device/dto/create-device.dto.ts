import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ example: 'abc123' })
  @IsString()
  @EmptyStringToNull()
  imei!: string;

  @ApiProperty({ example: '' })
  @IsUUID()
  @EmptyStringToNull()
  vehicleId!: string;

  @ApiProperty({ example: '0.0.1' })
  @IsString()
  @EmptyStringToNull()
  firmwareVersion!: string;
}
