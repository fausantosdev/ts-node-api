import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { getUsers } from '../../../use-cases'

type ParamsTypes = {
  id?: number
}
// Impede que os parâmetros sejam passados incorretamente
const getByIdParamsValidation = validation((getSchema) => ({
  params: getSchema<ParamsTypes>(
    yup
      .object()
      .shape({
        id: yup
          .number()
          .integer()
          .required()
          .moreThan(0)
      })
  )
}))

async function getById(
  request: Request<ParamsTypes, {}, {}, {}>,
  response: Response
){
  const { id } = request.params

  try {
    const result = await getUsers({ filters: { id: id! } })

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
        errors: error.message || 'Internal server error'
      }))
  }
}

export {
  getById,
  getByIdParamsValidation
}
