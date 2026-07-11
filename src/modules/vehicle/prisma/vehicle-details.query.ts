import { Prisma } from '@/generated/prisma/client';

export const vehicleDetailsInclude = {
  include: {
    device: true,
    vehicleState: true,
  },
} satisfies Prisma.VehicleDefaultArgs;

export type VehicleDetailsEntity = Prisma.VehicleGetPayload<typeof vehicleDetailsInclude>;
