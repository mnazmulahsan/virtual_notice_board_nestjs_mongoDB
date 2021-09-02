import {
  ArgumentsHost,
  Catch,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

@Catch(ValidationError)
export class MongoValidationErrorFilter implements RpcExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost): any {
    const data = {
      success: false,
      message: exception.message.replace(/[^\w\s]/gi, ''),
      data: null,
    };
    const ctx = host.switchToHttp(),
      response = ctx.getResponse(),
      request = ctx.getRequest();

    const requestDetails = {
      method: request.method,
      query_params: request.query,
      body: request.body,
      requested_endpoint: request.originalUrl,
      response_body: data,
      status: response.statusCode,
    };

    const logString =
      JSON.stringify(requestDetails) +
      '\n' +
      [request.method, request.originalUrl, response.statusCode].join(' ');

    Logger.log(logString, 'ValidationExceptionFilter');
    return response.status(400).json(data);
  }
}
