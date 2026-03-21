import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { forgotPassword } from '../../../use-cases'
import { ForgotPasswordDTO } from '../../../dtos/forgot-password-dto'

const forgotPassValidation = validation((getSchema) => ({
  body: getSchema<ForgotPasswordDTO>(
      yup
        .object()
        .shape({
          email: yup.string().email().required(),
        })
  )
}))

async function forgotPass(
  request: Request<{}, {}, ForgotPasswordDTO>,
  response: Response
){
  const { email } = request.body

  try {
    const result = await forgotPassword({ email })

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
  forgotPass,
  forgotPassValidation
}
