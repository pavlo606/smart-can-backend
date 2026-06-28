import { EmptyStringToNull } from '@/common/decorators/empty-string-to-null';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateServiceIntervalDto {
  @ApiProperty({ example: '' })
  @IsString()
  @EmptyStringToNull()
  vehicleId!: string;

  @ApiProperty({ example: '' })
  @IsString()
  @EmptyStringToNull()
  serviceTypeId!: string;

  @ApiProperty({ example: 10_000 })
  @IsNumber()
  intervalKm!: number;
  
  @ApiProperty({ example: 356 })
  @IsNumber()
  intervalDays!: number;
}
