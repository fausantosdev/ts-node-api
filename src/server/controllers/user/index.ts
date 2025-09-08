import { create, createUserValidation } from './create'
import { getAll, getAllQueryValidation } from './getAll'

const userController = {
  create,
  createUserValidation,
  getAll,
  getAllQueryValidation
}

export { userController }
