import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { UpdateUserDTO } from '../../dtos/update-user-dto'
import { updateUser } from '../../../use-cases'

type ParamsTypes = {
  id?: number
}

// Impede que os parâmetros sejam passados incorretamente
const updateValidation = validation((getSchema) => ({
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
  ),
  body: getSchema<UpdateUserDTO>(
    yup
      .object()
      .shape({
        name: yup.string().min(3).optional(),
        email: yup.string().email().optional(),
        password: yup.string().min(6).optional()
      })
  )
}))

async function update(
  request: Request<ParamsTypes, {}, UpdateUserDTO, {}>,
  response: Response
){
  const { id } = request.params

  try {
    const result = await updateUser({ id: id!, data: request.body as any })

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
  update,
  updateValidation
}
