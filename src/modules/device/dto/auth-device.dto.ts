import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDeviceDto {
  @ApiProperty({ example: 'abc123' })
  @IsString()
  @EmptyStringToNull()
  deviceId!: string;

  @ApiProperty({ example: 'abc123' })
  @IsString()
  @EmptyStringToNull()
  secret!: string;
}