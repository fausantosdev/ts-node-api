import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { getFiles } from '../../../use-cases'

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
  const { page , limit } = request.query

  try {
    const result = await getFiles({ pagination: { page, limit } })

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

export {
  getAll,
  getAllQueryValidation
}
