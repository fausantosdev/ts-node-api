import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { SignInDTO } from '../../../dtos/sign-in-dto'
import { signIn } from '../../../use-cases'

const logInValidation = validation((getSchema) => ({
  body: getSchema<SignInDTO>(
      yup
        .object()
        .shape({
          email: yup.string().email().required(),
          password: yup.string().min(6).required().label('senha')
        })
  )
}))

async function logIn(
  request: Request<{}, {}, SignInDTO>,
  response: Response
){
  try {
    const result = await signIn(request.body)

    return response
      .status(StatusCodes.CREATED)
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
  logIn,
  logInValidation
}
