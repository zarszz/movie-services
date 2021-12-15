import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { makeErrorResponse } from 'src/utils/http.utils';
import { ValidationException } from './validation.exception';

import type { Response } from 'express';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): Response {
    const context = host.switchToHttp();
    const response = context.getResponse();
    let message: string;

    if (response.req.originalUrl.includes('login')) {
      message = 'Login Gagal';
    } else if (response.req.originalUrl.includes('register')) {
      message = 'Register Gagal';
    } else {
      message = 'Operasi gagal';
    }
    return makeErrorResponse(
      response,
      400,
      exception.validationErrors,
      message,
    );
  }
}
