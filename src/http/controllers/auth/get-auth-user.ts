import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { responseHelper } from '../../../shared/helpers/response-helper'
import { me } from '../../../use-cases'

async function getAuthUser(
  request: Request<{}, {}, {}>,
  response: Response
){
  const { id } = request.user

  try {
    const result = await me(id)

    return response
      .status(StatusCodes.OK)
      .json(responseHelper({
        data: result
      }))

  } catch (error: any) {
    return response
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(responseHelper({
        status: false,
        data: null,
        message: error.message || 'Internal server error'
      }))
  }
}

export { getAuthUser }
