import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateServiceTypeDto {
  @ApiProperty({ example: 'abc123' })
  @IsString()
  @EmptyStringToNull()
  name!: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  @EmptyStringToNull()
  description?: string;
}
