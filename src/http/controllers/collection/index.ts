import { findItems, findItemsQueryValidation } from './getItems'
import { addPoint, addPointValidation } from './createPoint'
import { findPoints, findPointsQueryValidation } from './findPoints'

const collectionController = {
  item: {
    findItems,
    findItemsQueryValidation,
  },
  point: {
    addPoint,
    addPointValidation,
    findPoints,
    findPointsQueryValidation
  }
}

export { collectionController }
