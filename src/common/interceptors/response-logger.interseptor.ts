import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class ResponseLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const logger = new Logger()

    const req = context.switchToHttp().getRequest()
    const start = Date.now()

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse()

        logger.log({
          method: req.method,
          url: req.url,
          status: res.statusCode,
          duration: Date.now() - start,
        }, "Response")
      })
    )
  }
}