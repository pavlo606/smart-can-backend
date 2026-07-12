import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    switch (exception.code) {
      case 'P2025':
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: 404,
          message: 'Record not found',
          error: 'Not Found',
        });

      case 'P2002':
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: 409,
          message: 'Record already exists',
          error: 'Conflict',
        });

      case 'P2003':
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: 409,
          message: 'Foreign Key Failed: record does not exist',
          error: 'Conflict',
        });

      default:
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: 500,
          message: 'Database error',
        });
    }
  }
}
