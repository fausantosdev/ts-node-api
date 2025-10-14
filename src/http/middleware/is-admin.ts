import { RequestHandler } from 'express'
import { responseHelper } from '../../shared/helpers/response-helper'
import { ensureAuthenticated } from './ensure-authenticated'
import { StatusCodes } from 'http-status-codes'

const isAdmin: RequestHandler = (request, response, next) =>
  ensureAuthenticated(request, response, () => {
    if (request.user.role === 'admin') return next()

    return response
      .status(StatusCodes.UNAUTHORIZED)
      .send(responseHelper({
        status: false,
        data: null,
        errors: ['Não autorizado [4]']
      }))
  })


export { isAdmin }
