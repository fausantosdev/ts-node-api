import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'

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
  try {
    const { page, limit, filter } = request.query

    return response.status(StatusCodes.CREATED).json({
      status: true,
      data: { page, limit, filter },
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
