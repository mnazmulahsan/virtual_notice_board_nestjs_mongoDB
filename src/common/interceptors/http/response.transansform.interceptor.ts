import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();

      return next.handle().pipe(
        map((data) => {
          let message = null;
          let statusCode = null;
          let success = true;
          if (data?.message) {
            message = data.message;
            delete data.message;
          }

          if (data?.statusCode) {
            statusCode = data.statusCode;
            delete data.statusCode;
          }

          if (data?.success) {
            success = data.success;
            delete data.success;
          }
          statusCode = statusCode || response.statusCode;
          response.status(statusCode);
          return {
            success: success,
            message: message || response.statusMessage || 'OK',
            data: data?.data || data || {},
            count: data?.count,
          };
        }),
      );
    } else {
      return next.handle().pipe(map((data) => data));
    }
  }
}
