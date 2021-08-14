import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export function handleErrorsMiddleware(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      code: error.code,
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
}
