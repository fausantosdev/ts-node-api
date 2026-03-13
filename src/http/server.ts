import path from 'node:path'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { StatusCodes } from 'http-status-codes'

import './../shared/services/yup-translations'
import { routes } from './routes'
import { responseHelper } from '../shared/helpers/response-helper'
import { env } from '../env'

const server = express()

server.use(cors({
  origin: env.ENABLED_CORS ?
    env.ENABLED_CORS.split(';')
      .map(origin => origin.trim())
      .filter(Boolean) : '*'
}))

server.use(express.json())
server.use(cookieParser())
server.use('/uploads', express.static(path.resolve(__dirname, '..', '..', 'uploads')))

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
