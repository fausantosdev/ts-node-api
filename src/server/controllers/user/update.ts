import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'

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
  try {
    const { id } = request.params
    const { name, email, password } = request.body

    return response.status(StatusCodes.OK).json({
      status: true,
      data: { id, name, email, password },
      message: 'Ok'
    })

  } catch (error: any) {
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
      message: error.message
    })
  }
}

export {
  update,
  updateValidation
}
