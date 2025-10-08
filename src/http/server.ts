import express, { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import './../shared/services/yup-translations'
import { routes } from './routes'
import { responseHelper } from '../shared/helpers/response-helper'

const server = express()

server.use(express.json())

routes(server)

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(responseHelper({
        status: false,
        errors: err.message
      }))
  }

  next()
})

export { server }
