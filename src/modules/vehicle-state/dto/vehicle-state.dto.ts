export class VehicleStateDto {
  vehicleId!: string;
  lastSeen!: string;
  latitude!: number | null;
  longitude!: number | null;
  speed!: number | null;
  rpm!: number | null;
  coolantTemp!: number | null;
  fuelLevel!: number | null;
  currentOdometer!: number | null;
  createdAt!: string;
  updatedAt!: string;
}
