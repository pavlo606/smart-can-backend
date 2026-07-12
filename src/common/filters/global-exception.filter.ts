import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = {
      reqId: request.id,
      method: request.method,
      url: request.originalUrl,
      body: request.body,
      query: request.query,
      params: request.params,
      status,
      message: exception instanceof Error ? exception.message : String(exception),
      stack: exception instanceof Error ? exception.stack : undefined
    };

    if (status >= 400 && status < 500) {
      this.logger.warn(message)
    } else {
      this.logger.error(message)
    }

    response.status(status).json({
      statusCode: status,
      message: exception instanceof HttpException ? exception.message : 'Internal server error',
    });
  }
}
