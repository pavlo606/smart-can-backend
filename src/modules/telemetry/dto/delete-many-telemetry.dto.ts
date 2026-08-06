import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class DeleteManyDto {
  @ApiProperty({
    type: String,
    description: 'Device Id',
    required: true,
  })
  @IsString()
  deviceId!: string

  @ApiProperty({
    type: String,
    description: 'Start date string',
    example: '2023-10-25T14:30:00Z',
    required: true,
  })
  @IsDateString()
  gte!: string

  
  @ApiProperty({
    type: String,
    description: 'End date string',
    example: '2023-10-25T14:30:00Z',
    required: true,
  })
  @IsDateString()
  lte!: string
}
