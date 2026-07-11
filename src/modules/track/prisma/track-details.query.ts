import { Prisma } from '@/generated/prisma/client';

export const trackDetailsInclude = {
  include: {
    device: true,
  },
} satisfies Prisma.TrackDefaultArgs;

export type TrackDetailsEntity = Prisma.TrackGetPayload<typeof trackDetailsInclude>;
