import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLogger implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      {
        reqId: req.id,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies
      },
      'Request',
    );

    next();
  }
}
