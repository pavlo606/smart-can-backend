export class VehicleDto {
  id!: string;
  name!: string;
  userId!: string;
  brand!: string;
  model!: string;
  year!: string | null;
  vin!: string | null;
  initialOdometer!: number;
  trackerDistance!: number | null;
  createdAt!: string;
  updatedAt!: string;
}