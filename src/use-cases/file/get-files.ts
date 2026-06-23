import { File } from '../../database/knex/models'
import { fileRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'

type FiltersTypes = {
  id?: number
}

type PaginationTypes = {
  limit: number| undefined
  page: number| undefined
}

type GetFilesInput = {
  filters?: FiltersTypes
  pagination?: PaginationTypes
}

const getFiles = async (queryParams: GetFilesInput): Promise<File | File[] | Error> => {
  try {
    let result

    if (queryParams?.filters?.id) {
      result = await fileRepository.getById(queryParams.filters.id)
      if (!result) {
        throw new AppError('Usuário não encontrado', 404)
      }
      return result
    }

    // se nenhum filtro foi informado → retorna todos
    result = await fileRepository.read({
      page: queryParams?.pagination?.page,
      limit: queryParams?.pagination?.limit
    })

    return result

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { getFiles }
