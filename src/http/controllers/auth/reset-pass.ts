import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { resetPassword } from '../../../use-cases'
import { ResetPasswordDTO } from '../../../dtos/reset-password-dto'

const resetPassValidation = validation((getSchema) => ({
  body: getSchema<ResetPasswordDTO>(
      yup
        .object()
        .shape({
          email: yup.string().email().required(),
          token: yup.string().required(),
          newPassword: yup.string().required(),
        })
  )
}))

async function resetPass(
  request: Request<{}, {}, ResetPasswordDTO>,
  response: Response
){
  const { email, token, newPassword } = request.body

  try {
    const result = await resetPassword({ email, token, newPassword })

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
  resetPass,
  resetPassValidation
}
