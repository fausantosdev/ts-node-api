import { findItems, findItemsQueryValidation } from './getItems'
import { addPoint, addPointValidation } from './createPoint'

const collectionController = {
  item: {
    findItems,
    findItemsQueryValidation,
  },
  point: {
    addPoint,
    addPointValidation
  }
}

export { collectionController }
