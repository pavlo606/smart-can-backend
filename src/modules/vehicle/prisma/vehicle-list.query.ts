import { Prisma } from '@/generated/prisma/client';

export const vehicleListInclude = {
  include: {
    device: true,
    vehicleState: true,
  },
} satisfies Prisma.VehicleDefaultArgs;

export type VehicleListEntity = Prisma.VehicleGetPayload<typeof vehicleListInclude>;
