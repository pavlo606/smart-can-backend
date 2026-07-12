import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateServiceRecordDto {
  @ApiProperty({ example: '' })
  @IsUUID()
  @EmptyStringToNull()
  vehicleId!: string;

  @ApiProperty({ example: '' })
  @IsUUID()
  @EmptyStringToNull()
  serviceTypeId!: string;

  @ApiProperty({ example: '2023-10-25T14:30:00Z' })
  @IsDateString()
  @EmptyStringToNull()
  performedAt!: Date;
  
  @ApiProperty({ example: 90_000 })
  @IsNumber()
  performedOdometer!: number;
  
  @ApiProperty({ example: '' })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  comment!: string;
}
