import type { Response } from 'express';

export type ErrorMessage = {
  property: string;
  message: string[];
};

export function makeResponse<T>(
  response: Response,
  success: boolean,
  code: number,
  data: T | T[],
  message: string,
): Response {
  return response.status(code).send({
    success,
    code,
    data,
    message,
  });
}

export function makeErrorResponse(
  response: Response,
  code: number,
  errors: ErrorMessage | ErrorMessage[],
  message: string,
): Response {
  return response.status(code).send({
    success: false,
    message,
    errors,
  });
}
