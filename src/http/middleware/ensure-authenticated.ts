import { RequestHandler } from 'express'
import { responseHelper } from '../../shared/helpers/response-helper'
import { jwt } from '../../shared/services/jwt'

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

  const decoded = jwt.decoded(token!)

  const { id, email, role } = decoded as { id: string, email: string, role: string }

  request.user = { id, email, role }

  return next()
}

export { ensureAuthenticated }
