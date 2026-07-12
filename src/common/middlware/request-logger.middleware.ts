import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger();
    logger.log(
      {
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        query: req.query,
        params: req.params
      },
      'Request',
    );

    next();
  }
