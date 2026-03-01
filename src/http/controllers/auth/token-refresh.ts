import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { env } from '../../../env'

import { responseHelper } from '../../../shared/helpers/response-helper'

import { refreshToken } from '../../../use-cases'

async function tokenRefresh(
  request: Request,
  response: Response
){
  const isWeb = Number(request.headers['x-is-web']) === 1

  const token = request.headers['authorization']?.split(' ')[1]

  try {
    const result = await refreshToken(token!)

    return isWeb ?
      response
        .status(StatusCodes.CREATED)
        .cookie(env.APP_KEY, String(result), {
          maxAge: 24 * 60 * 60 * 1000, // 1 dia
          httpOnly: true
        })
        .json(responseHelper({})) :
      response
        .status(StatusCodes.CREATED)
        .json(responseHelper({
          data: result
        }))

  } catch (error: any) {
    return response
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(responseHelper({
        status: false,
        data: null,
        errors: error.message || 'Internal server error'
      }))
  }
}

export { tokenRefresh }
