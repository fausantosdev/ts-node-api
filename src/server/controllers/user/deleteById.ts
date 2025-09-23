import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { userProvider } from '../../../database/providers'

type ParamsTypes = {
  id?: number
}

const deleteByIdValidation = validation((getSchema) => ({
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

async function deleteById(
  request: Request<ParamsTypes, {}, {}, {}>,
  response: Response
){
  try {
    const { id } = request.params

    const result = await userProvider.remove({ id: id! })

    if (result instanceof Error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json(responseHelper({
          status: false,
          data: null,
          errors: result.message
        }))
    }

    return response.status(StatusCodes.OK).json({
      status: true,
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
  deleteById,
  deleteByIdValidation
}
