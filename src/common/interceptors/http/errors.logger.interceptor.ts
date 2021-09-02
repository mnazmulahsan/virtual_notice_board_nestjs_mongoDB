import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Logger, HttpException } from '@nestjs/common';

@Injectable()
export class ErrorsLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // console.log(context);
        console.log(err instanceof HttpException);

        Logger.error(err.message, err.stack);
        return throwError(err);
      }),
    );
  }
}
