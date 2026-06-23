import { Router } from 'express'

import { fileController } from '../controllers'
import { ensureAuthenticated } from '../middleware'
import { uploadSingle } from '../middleware'

const fileRoutes = Router()

fileRoutes.post(
  '/',
  ensureAuthenticated,
  uploadSingle('file'),
  fileController.create
)

fileRoutes.get(
  '/',
  ensureAuthenticated,
  fileController.getAllQueryValidation,
  fileController.getAll
)

fileRoutes.delete(
  '/:id',
  ensureAuthenticated,
  fileController.deleteByIdValidation,
  fileController.deleteById
)

export { fileRoutes }
