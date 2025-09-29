import { StatusCodes } from 'http-status-codes'
export class AppError extends Error {
  public statusCode: number

  constructor(
    message: string,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
  }
}
