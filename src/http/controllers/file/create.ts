import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { responseHelper } from '../../../shared/helpers/response-helper'
// REMOVER? >>> import { CreateFileDTO } from '../../../dtos/create-file-dto'
import { createFile } from '../../../use-cases/file/create-file'

async function create(
  request: Request,
  response: Response
){
  const { file } = request

  try {
    const result = await createFile({
        user_id: Number(request.user.id),
        name: file!.filename,
        mime_type: file!.mimetype,
        size: file!.size,
        status: 'pending'
      })

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
  create
}
