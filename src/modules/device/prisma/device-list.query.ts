import { Prisma } from '@/generated/prisma/client';

export const deviceListInclude = {
  include: {
    vehicle: true,
  },
} satisfies Prisma.DeviceDefaultArgs;

export type DeviceListEntity = Prisma.DeviceGetPayload<typeof deviceListInclude>;
