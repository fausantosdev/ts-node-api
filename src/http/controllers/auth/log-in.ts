import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { env } from '../../../env'

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
  const isWeb = Number(request.headers['x-is-web']) === 1

  try {
    const result = await signIn(request.body)

    return isWeb ?
      response
        .status(StatusCodes.CREATED)
        .cookie(env.APP_KEY, String(result), {
          maxAge: 24 * 60 * 60 * 1000, // 1 dia
          httpOnly: true
        })
        .json(responseHelper({})) :
      response
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
