import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@/generated/prisma/client';
import { QueryUserDto } from './dto/query-user.dto';
import { Role } from '../auth/roles/roles.enum';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async create({ username, email, password, role }: CreateUserDto) {
    if (await this.findByEmail(email)) throw new ConflictException('Email is already in use');

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.repo.create({
      email,
      username,
      passwordHash,
      role,
    });

    return user;
  }

  async createForRegister(username: string, email: string, passwordHash: string, role: Role) {
    return this.repo.create({
      username,
      email,
      passwordHash,
      role,
    });
  }

  async findByEmail(email: string) {
    return this.repo.getByEmail(email);
  }

  async findByIdSafe(id: string) {
    const user = await this.repo.getById(id);
    return this.getSafeUserData(user);
  }

  async findById(id: string) {
    return this.repo.getById(id);
  }

  async findAll(query: QueryUserDto) {
    const where: Prisma.UserWhereInput = {
      ...(query.search && {
        OR: [
          { email: { contains: query.search, mode: 'insensitive' } },
          { username: { contains: query.search, mode: 'insensitive' } },
        ],
      }),
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.UserOrderByWithAggregationInput = {
      ...(query.sortBy ? { [query.sortBy]: query.sortOrder } : { createdAt: 'desc' }),
    };

    const users = await this.repo.getMany(where, orderBy, skip, query.limit);

    const total = await this.repo.count(where);

    return {
      items: users.map((user) => this.getSafeUserData(user)),
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async updateRefreshToken(id: string, data: Partial<{ refreshToken: string | null }>) {
    return this.repo.update(id, data);
  }

  async update(id: string, { email, username, password, role }: UpdateUserDto) {
    let passwordHash: string | undefined = undefined;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    return this.repo.update(id, {
      email,
      username,
      passwordHash,
      role,
    });
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  private getSafeUserData = (user: any) => {
    return {
      id: user?.id,
      username: user?.username,
      email: user?.email,
      role: user?.role,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
  };
}
