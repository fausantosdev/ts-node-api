import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

type UserTypes = {
  name: string
}

function create(
  request: Request<{}, {}, UserTypes>,
  response: Response
){

  return response.status(StatusCodes.CREATED).json({
    message: 'Create user'
  })
}

export { create }
