export class ServiceRecordDto {
  id!: string;
  vehicleId!: string;
  serviceTypeId!: string;
  performedAt!: string;
  performedOdometer!: number | null;
  comment!: string | null;
  createdAt!: string;
  updatedAt!: string;
}
