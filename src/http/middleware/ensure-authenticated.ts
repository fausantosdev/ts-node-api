import { RequestHandler } from 'express'
import { responseHelper } from '../../shared/helpers/response-helper'

const ensureAuthenticated: RequestHandler = (request, response, next) => {
  const { authorization } = request.headers

  if (!authorization) {
    return response
      .status(401)
      .json(responseHelper({
        status: false,
        errors: ['Não autorizado [1]']
      }))
  }

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') {
    return response
      .status(401)
      .json(responseHelper({
        status: false,
        errors: ['Não autorizado [2]']
      }))
  }

  if (token !== 'teste.teste.teste') {
    return response
      .status(401)
      .json(responseHelper({
        status: false,
        errors: ['Não autorizado [3]']
      }))
  }

  return next()
}

export { ensureAuthenticated }
