import { Test } from '@nestjs/testing';
import { TelemetryService } from './telemetry.service';
import { TelemetryRepository } from './telemetry.repository';

describe('TelemetryService', () => {
  let service: TelemetryService;
  let repo: jest.Mocked<TelemetryRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TelemetryService,
        {
          provide: TelemetryRepository,
          useValue: {
            create: jest.fn(),
            getMany: jest.fn(),
            count: jest.fn(),
            getUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(TelemetryService);
    repo = module.get(TelemetryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

      repo.create.mockResolvedValue(expected as any);

      const result = await service.create(dto as any);

      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expected);
    });
  });

  // =========================
  // GET MANY
  // =========================
  describe('getMany', () => {
    it('should return telemetry list', async () => {
      const query = {
        deviceId: 'dev-1',
        gte: '2025-01-01T00:00:00Z',
        lte: '2027-01-01T00:00:00Z',
        limit: 10,
      };

      const data = [
        { id: '1', deviceId: query.deviceId },
        { id: '2', deviceId: query.deviceId },
      ];

      const expected = {
        items: data,
        meta: {
          limit: query.limit,
          total: 2,
          totalPages: 1,
        },
      };

      repo.getMany.mockResolvedValue(data as any);
      repo.count.mockResolvedValue(2);

      const result = await service.getMany(query);

      expect(repo.getMany).toHaveBeenCalledWith(
        {
          deviceId: query.deviceId,
          timestamp: {
            gte: query.gte,
            lte: query.lte,
          },
        },
        { timestamp: 'desc' },
        query.limit,
      );
      expect(repo.count).toHaveBeenCalledWith(
        {
          deviceId: query.deviceId,
          timestamp: {
            gte: query.gte,
            lte: query.lte,
          },
        },
      );
      expect(result).toEqual(expected);
    });

    it('should return correct pagination', async () => {
      const query = {
        deviceId: 'dev-1',
        gte: '2025-01-01T00:00:00Z',
        lte: '2027-01-01T00:00:00Z',
        limit: 20,
      };

      const expected = {
        items: [],
        meta: {
          limit: query.limit,
          total: 55,
          totalPages: 3,
        }
      }

      repo.getMany.mockResolvedValue([]);
      repo.count.mockResolvedValue(55);

      const result = await service.getMany(query);

      expect(result).toEqual(expected);
    });
  });

  // =========================
  // GET UNIQUE
  // =========================
  describe('getUnique', () => {
    it('should return one telemetry', async () => {
      const deviceId = 'dev-1';
      const timestamp = '2025-01-01T00:00:00Z';

      const expected = { id: '1', deviceId, timestamp };

      repo.getUnique.mockResolvedValue(expected as any);

      const result = await service.getUnique(deviceId, timestamp);

      expect(repo.getUnique).toHaveBeenCalledWith(deviceId, timestamp);
      expect(result).toEqual(expected);
    });
  });

  // =========================
  // UPDATE
  // =========================
  describe('update', () => {
    it('should return one telemetry', async () => {
      const deviceId = 'dev-1';
      const timestamp = '2025-01-01T00:00:00Z';
      const data = { speed: 10 }

      const expected = { id: '1', deviceId, timestamp, speed: data.speed };

      repo.update.mockResolvedValue(expected as any);

      const result = await service.update(deviceId, timestamp, data);

      expect(repo.update).toHaveBeenCalledWith(deviceId, timestamp, data);
      expect(result).toEqual(expected);
    });
  });

  // =========================
  // DELETE
  // =========================
  describe('delete', () => {
    it('should return one telemetry', async () => {
      const deviceId = 'dev-1';
      const timestamp = '2025-01-01T00:00:00Z';

      const expected = { id: '1', deviceId, timestamp };

      repo.delete.mockResolvedValue(expected as any);

      const result = await service.delete(deviceId, timestamp);

      expect(repo.delete).toHaveBeenCalledWith(deviceId, timestamp);
      expect(result).toEqual(expected);
    });
  });
});
