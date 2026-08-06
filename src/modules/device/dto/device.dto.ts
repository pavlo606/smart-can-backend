export class DeviceDto {
  id!: string;
  imei!: string;
  vehicleId!: string | null;
  firmwareVersion!: string;
  createdAt!: string;
  updatedAt!: string;
}