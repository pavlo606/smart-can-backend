import { Injectable } from '@nestjs/common';
import { VehicleStateRepository } from './vehicle-state.repository';
import { CreateVehicleStateDto } from './dto/create-vehicle-state.dto';
import { UpdateVehicleStateDto } from './dto/update-vehicle-state.dto';

@Injectable()
export class VehicleStateService {
  constructor(private readonly repo: VehicleStateRepository) {}

  async create(dto: CreateVehicleStateDto, userId: string) {
    return this.repo.create({
      ...dto,
    });
  }

  async getById(vehicleId: string, userId: string) {
    return this.repo.getById(vehicleId, userId);
  }

  async update(vehicleId: string, data: UpdateVehicleStateDto, userId: string) {
    return this.repo.update(vehicleId, data, userId);
  }

  async delete(vehicleId: string, userId: string) {
    return this.repo.delete(vehicleId, userId);
  }
}
