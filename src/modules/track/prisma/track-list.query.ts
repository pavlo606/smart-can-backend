import { Prisma } from '@/generated/prisma/client';

export const trackListInclude = {
  include: {
    device: true,
  },
} satisfies Prisma.TrackDefaultArgs;

export type TrackListEntity = Prisma.TrackGetPayload<typeof trackListInclude>;
