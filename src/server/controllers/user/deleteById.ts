import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'

type ParamsTypes = {
  id?: number
}

const deleteByIdValidation = validation((getSchema) => ({
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
  )
}))

async function deleteById(
  request: Request<ParamsTypes, {}, {}, {}>,
  response: Response
){
  try {
    const { id } = request.params

    return response.status(StatusCodes.OK).json({
      status: true,
      data: { id },
      message: 'Ok'
    })

  } catch (error: any) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      data: null,
      message: 'Internal server error'
    })
  }
}

export {
  deleteById,
  deleteByIdValidation
}
