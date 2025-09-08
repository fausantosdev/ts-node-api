import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'

type UserTypes = {
  name: string
  email: string
  password: string
}

const createUserValidation = validation((getSchema) => ({
  body: getSchema<UserTypes>(
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
  request: Request<{}, {}, UserTypes>,
  response: Response
){
  try {
    const { name, email, password } = request.body

    return response.status(StatusCodes.CREATED).json({
      status: true,
      data: { name, email, password },
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
  create,
  createUserValidation
}
