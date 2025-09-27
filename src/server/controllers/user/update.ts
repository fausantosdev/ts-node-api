import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { userProvider } from '../../../database/providers'
import { UpdateUserDTO } from '../../../dtos/update-user-dto'

type ParamsTypes = {
  id?: number
}

type BodyTypes = {
  name?: string | undefined
  email?: string | undefined
  password?: string | undefined
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
  body: getSchema<BodyTypes>(
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
  request: Request<ParamsTypes, {}, BodyTypes, {}>,
  response: Response
){
  const { id } = request.params

  try {
    const result = await userProvider.update({
      data: request.body as UpdateUserDTO,
      where: { id: id! }
    })

    return response
      .status(StatusCodes.OK)
      .json(responseHelper({
        data: result
      }))

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
  update,
  updateValidation
}
