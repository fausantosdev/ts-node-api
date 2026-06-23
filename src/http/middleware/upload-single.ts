import multer from 'multer'
import { RequestHandler } from 'express'

import { multerConfig } from '../../shared/services/multer'
import { AppError } from '../../shared/utils/errors/app-error'

const upload = multer(multerConfig)

const uploadSingle = (field: string): RequestHandler => {
  return (request, response, next) => {
    upload.single(field)(request, response, (err) => {
      if (err) return next(new AppError(err.message, 400))

      if (!request.file) return next(new AppError('Selecione um arquivo para realizar o upload', 400))

      return next()
    })
  }
}

export { uploadSingle }
