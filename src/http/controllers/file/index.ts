import { create } from './create'
import { getAll, getAllQueryValidation } from './getAll'
import { deleteById, deleteByIdValidation } from './deleteById'

const fileController = {
  create,
  getAll,
  getAllQueryValidation,
  deleteById,
  deleteByIdValidation
}

export { fileController }
