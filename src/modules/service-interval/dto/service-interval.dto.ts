export class ServiceIntervalDto {
  id!: string;
  vehicleId!: string;
  serviceTypeId!: string;
  intervalKm!: number | null;
  intervalDays!: number | null;
  createdAt!: string;
  updatedAt!: string;
}
