import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { userProvider } from '../../../database/providers'

type QueryTypes = {
  page?: number | undefined
  limit?: number | undefined
  filter?: string | undefined
}
// Impede que os parâmetros sejam passados incorretamente
const getAllQueryValidation = validation((getSchema) => ({
  query: getSchema<QueryTypes>(
      yup
        .object()
        .shape({
          page: yup.number().moreThan(0),
          limit: yup.number().moreThan(0),
          filter: yup.string()
        })
  )
}))

async function getAll(
  request: Request<{}, {}, {}, QueryTypes>,
  response: Response
){
  const { page = 1, limit = 20 } = request.query

  try {
    const result = await userProvider.read({ page, limit })

    return response.status(StatusCodes.OK).json({
      data: result,
      message: 'Ok'
    })

  } catch (error: any) {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(responseHelper({
        status: false,
        data: null,
        errors: error.message || 'Internal server error'
      }))
  }
}

export {
  getAll,
  getAllQueryValidation
}
