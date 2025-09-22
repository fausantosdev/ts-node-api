import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { userProvider } from '../../../database/providers/users'
import { CreateUserDTO } from '../../../dtos/create-user-dto'

const createUserValidation = validation((getSchema) => ({
  body: getSchema<CreateUserDTO>(
      yup
        .object()
        .shape({
          name: yup.string().min(3).required().label('nome'),
          email: yup.string().email().required(),
          password: yup.string().min(6).required().label('senha')
        })
  )
}))

async function create(
  request: Request<{}, {}, CreateUserDTO>,
  response: Response
){
  const result = await userProvider.create(request.body)

  try {
    if (result instanceof Error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json(responseHelper({
          status: false,
          data: null,
          errors: result.message
        }))
    }

    return response
      .status(StatusCodes.CREATED)
      .json({
        status: true,
        data: result,
        errors: null
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
  create,
  createUserValidation
}
