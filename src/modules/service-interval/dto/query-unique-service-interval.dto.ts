import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QueryUniqueServiceIntervalDto {
  @ApiPropertyOptional({
    type: String,
    description: 'vehicleId',
    required: false,
  })
  @IsString()
  vehicleId!: string;

  @ApiPropertyOptional({
    type: String,
    description: 'serviceTypeId',
    required: false,
  })
  @IsString()
  serviceTypeId!: string;
}
