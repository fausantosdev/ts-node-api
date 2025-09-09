import { create, createUserValidation } from './create'
import { getAll, getAllQueryValidation } from './getAll'
import { getById, getByIdParamsValidation } from './getById'
import { update, updateValidation } from './update'
import { deleteById, deleteByIdValidation } from './deleteById'

const userController = {
  create,
  createUserValidation,
  getAll,
  getAllQueryValidation,
  getById,
  getByIdParamsValidation,
  update,
  updateValidation,
  deleteById,
  deleteByIdValidation
}

export { userController }
