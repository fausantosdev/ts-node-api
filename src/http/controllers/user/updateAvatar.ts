import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../middleware'
import { responseHelper } from '../../../shared/helpers/response-helper'

import { updateUserAvatar } from '../../../use-cases'

const updateAvatarValidation = validation((getSchema) => ({
  body: getSchema<{ avatar: string }>(
      yup
        .object()
        .shape({
          avatar: yup.string().required()
        })
  )
}))

async function updateAvatar(
  request: Request<{}, {}, { avatar: string }>,
  response: Response
){
  const { id } = request.user
  const { avatar } = request.body

  try {
    const result = await updateUserAvatar({ userId: id, avatar })

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
        message: error.message || 'Internal server error'
      }))
  }
}

export {
  updateAvatar,
  updateAvatarValidation
}
