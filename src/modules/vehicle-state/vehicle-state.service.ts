import { Injectable } from '@nestjs/common';
import { VehicleStateRepository } from './vehicle-state.repository';
import { CreateVehicleStateDto } from './dto/create-vehicle-state.dto';
import { UpdateVehicleStateDto } from './dto/update-vehicle-state.dto';
import { VehicleStateMapper } from './mappers/vehicle-state.mapper';

@Injectable()
export class VehicleStateService {
  constructor(
    private readonly repo: VehicleStateRepository,
    private readonly mapper: VehicleStateMapper,
  ) {}

  async create(dto: CreateVehicleStateDto, userId: string) {
    const res = await this.repo.create({
      ...dto,
    });
    return this.mapper.toBaseResponse(res);
  }

  async getById(vehicleId: string, userId: string) {
    const res = await this.repo.getById(vehicleId, userId);
    return this.mapper.toBaseResponse(res);
  }

  async update(vehicleId: string, data: UpdateVehicleStateDto, userId: string) {
    const res = await this.repo.update(vehicleId, data, userId);
    return this.mapper.toBaseResponse(res);
  }

  async delete(vehicleId: string, userId: string) {
    const res = await this.repo.delete(vehicleId, userId);
    return this.mapper.toBaseResponse(res);
  }
}
