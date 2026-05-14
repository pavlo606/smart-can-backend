import { PrismaService } from '@/prisma/prisma.service';
import { TelemetryRepository } from './telemetry.repository';
import { Test } from '@nestjs/testing';

describe('TelemetryRepository', () => {
  let repo: TelemetryRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TelemetryRepository,
        {
          provide: PrismaService,
          useValue: {
            telemetry: {
              create: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repo = module.get(TelemetryRepository);
    prisma = module.get(PrismaService);
  });

  // =========================
  // CREATE
  // =========================
  describe('create', () => {
    it('should create telemetry', async () => {
      const dto = {
        deviceId: 'dev-1',
        speed: 80,
        timestamp: new Date(),
      };

      const expected = { id: '1', ...dto };

      (prisma.telemetry.create as jest.Mock).mockResolvedValue(expected as any);

      const result = await repo.create(dto as any);

      expect(prisma.telemetry.create).toHaveBeenCalledWith({ data: dto });
      expect(result).toEqual(expected);
    });
  });

  // =========================
  // GET MANY
  // =========================
  describe('getMany', () => {
    it('should return telemetry list', async () => {
      const where = {
        deviceId: 'dev-1',
        timestamp: new Date(),
      };
      const orderBy = {
        timestamp: 'desc' as 'desc' | 'asc',
      };
      const take = 20;

      const expected = [
        {
          deviceId: where.deviceId,
          timestamp: where.timestamp,
        },
      ];

      (prisma.telemetry.findMany as jest.Mock).mockResolvedValue(
        expected as any,
      );

      const result = await repo.getMany(where, orderBy, take);

      expect(prisma.telemetry.findMany).toHaveBeenCalledWith({
        where,
        orderBy,
        take,
      });
      expect(result).toEqual(expected);
    });
  });
});
