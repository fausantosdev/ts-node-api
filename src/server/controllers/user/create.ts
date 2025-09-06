import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

type UserTypes = {
  name: string
  email: string
  password: string
}

async function create(
  request: Request<{}, {}, UserTypes>,
  response: Response
){
  const bodySchema: yup.Schema<UserTypes> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  })

  try {
    const { name, email, password } = await bodySchema.validate(request.body, { abortEarly: false })

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

export { create }
