import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserMapper } from './mappers/user.mapper';

@Module({
  providers: [UserService, UserRepository, UserMapper],
  controllers: [UserController]
})
export class UserModule {}
