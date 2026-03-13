import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'
import { getPoints } from '../../../use-cases/collection/point/get-points'

type QueryTypes = {
  page?: number | undefined
  limit?: number | undefined
  city?: string | undefined
  uf?: string | undefined
  items?: string | undefined
}

type ParamsTypes = {
  id?: number | undefined
}

const findPointsQueryValidation = validation((getSchema) => ({
  query: getSchema<QueryTypes>(
      yup
        .object()
        .shape({
          page: yup.number().moreThan(0),
          limit: yup.number().moreThan(0),
          city: yup.string().optional(),
          uf: yup.string().length(2).optional(),
          items: yup.string().optional()
        })
  ),
  params: getSchema<ParamsTypes>(
    yup
      .object()
      .shape({
        id: yup.number().optional()
      })
  )
}))


async function findPoints(
  request: Request<ParamsTypes, {}, {}, QueryTypes>,
  response: Response
){
  const { page , limit, city, uf, items } = request.query

  try {
    let result

    if (request.params.id) {
      result = await getPoints({ id: request.params.id })
    } else {
      result = await getPoints({
        pagination: { page, limit },
        filter: { city, uf, items }
      })
    }

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
  findPoints,
  findPointsQueryValidation
}
