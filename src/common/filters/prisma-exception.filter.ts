import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpStatus, Logger, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    switch (exception.code) {
      case 'P2025':
          throw new NotFoundException("Resource not found");

      case 'P2002':
          throw new ConflictException("Duplicate value");

      case 'P2003':
          throw new BadRequestException("Foreign key violation");

      default:
        throw new InternalServerErrorException();
    }
  }
}
