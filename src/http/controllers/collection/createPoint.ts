import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { CreatePointDTO } from '../../../dtos/collection/create-point-dto'
import { createPoint } from '../../../use-cases/collection/point/create-point'

const addPointValidation = validation((getSchema) => ({
  body: getSchema<Omit<CreatePointDTO, 'user_id'>>(
    yup
      .object()
      .shape({
        image: yup.string().required(),
        name: yup.string().required(),
        email: yup.string().email().required(),
        whatsapp: yup.string().required(),
        latitude: yup.number().required(),
        longitude: yup.number().required(),
        city: yup.string().required(),
        uf: yup.string().length(2).required()
      })
  )
}))

async function addPoint(
  request: Request,
  response: Response
){
  const {
    image,
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf
  } = request.body

  try {
    const result = await createPoint({
      user_id: Number(request.user.id),
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    })

    return response
      .status(StatusCodes.OK)
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
  addPoint,
  addPointValidation
}
