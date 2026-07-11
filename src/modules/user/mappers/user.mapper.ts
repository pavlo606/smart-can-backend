import { BaseMapper } from "@/common/mappers/base.mapper";
import { User } from "@/generated/prisma/client";
import { Injectable } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class UserMapper extends BaseMapper<User, UserDto> {
  toBaseResponse(entity: User): UserDto {
    return {
      id: entity?.id,
      username: entity?.username,
      email: entity?.email,
      role: entity?.role,
      createdAt: entity?.createdAt.toDateString(),
      updatedAt: entity?.updatedAt.toISOString(),
    }
  }
}