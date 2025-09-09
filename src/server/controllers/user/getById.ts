import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'

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
  try {
    const { id } = request.params

    return response.status(StatusCodes.OK).json({
      status: true,
      data: { id },
      message: 'Ok'
    })

  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        data: null,
        message: error.errors
      })
    }

    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      data: null,
      message: 'Internal server error'
    })
  }
}

export {
  getById,
  getByIdParamsValidation
}
