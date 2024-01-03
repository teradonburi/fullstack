import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorDTO } from './dtos/error.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorStatus =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const errorResponse =
      exception instanceof HttpException ? exception.getResponse() : {};

    // status >= 500のときはログに出力する
    if (errorStatus >= 500) {
      console.error('Internal Server Error', {
        error: exception,
      });
    }

    response.status(errorStatus).json(new ErrorDTO(errorResponse));
  }
}
