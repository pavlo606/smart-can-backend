export class TelemetryDto {
  deviceId!: string;
  timestamp!: string;
  latitude!: number | null;
  longitude!: number | null;
  speed!: number | null;
  rpm!: number | null;
  coolantTemp!: number | null;
  fuelLevel!: number | null;
  createdAt!: string;
}
