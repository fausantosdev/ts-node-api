import { Router } from 'express'

import { collectionController } from '../controllers/collection'

import { ensureAuthenticated } from '../middleware'

const collectionRoutes = Router()

collectionRoutes.get(
  '/items',
  ensureAuthenticated,
  collectionController.item.findItemsQueryValidation,
  collectionController.item.findItems
)

collectionRoutes.post(
  '/points',
  ensureAuthenticated,
  collectionController.point.addPointValidation,
  collectionController.point.addPoint
)

export { collectionRoutes }
