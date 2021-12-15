import type { Response } from 'express';

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
