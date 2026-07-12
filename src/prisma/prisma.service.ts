import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions> implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    super({
      adapter,
      log:
        process.env.NODE_ENV === 'production'
          ? undefined
          : [
              { emit: 'event', level: 'query' },
              { emit: 'event', level: 'info' },
              { emit: 'event', level: 'warn' },
              { emit: 'event', level: 'error' },
            ],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on('query' as never, (e: Prisma.QueryEvent) => {
      this.logger.log(`Query: ${e.query} | Params: ${e.params} | Duration: ${e.duration}ms`);
    });

    this.$on('info' as never, (e: Prisma.LogEvent) => {
      this.logger.log(e.message);
    });

    this.$on('warn' as never, (e: Prisma.LogEvent) => {
      this.logger.warn(e.message);
    });

    this.$on('error' as never, (e: Prisma.LogEvent) => {
      this.logger.error(e.message);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
