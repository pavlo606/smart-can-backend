import { Prisma } from '@/generated/prisma/client';

export const deviceDetailsInclude = {
  include: {
    vehicle: true,
    tracks: true
  },
} satisfies Prisma.DeviceDefaultArgs;

export type DeviceDetailsEntity = Prisma.DeviceGetPayload<typeof deviceDetailsInclude>;
