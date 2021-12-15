import { BadRequestException } from '@nestjs/common';
import type { ErrorMessage } from 'src/utils/http.utils';

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: ErrorMessage[]) {
    super();
  }
}
