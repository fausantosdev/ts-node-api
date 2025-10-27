import { Router } from 'express'

import { itemController } from '../controllers/collection'

import { ensureAuthenticated } from '../middleware'

const itemRoutes = Router()

itemRoutes.get(
  '/',
  ensureAuthenticated,
  itemController.getQueryValidation,
  itemController.get
)

export { itemRoutes }
