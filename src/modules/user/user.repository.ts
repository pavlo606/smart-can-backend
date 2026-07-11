import { Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async getMany(
    where: Prisma.UserWhereInput,
    orderBy: Prisma.UserOrderByWithAggregationInput,
    skip: number,
    take: number,
  ) {
    return this.prisma.user.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getById(id: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async count(where?: Prisma.UserWhereInput) {
    return this.prisma.user.count({ where });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
