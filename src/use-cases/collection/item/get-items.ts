import { IItem } from '../../../database/knex/models'
import { itemRepository } from '../../../database/repositories'
import { AppError } from '../../../shared/utils/errors/app-error'

type FiltersTypes = {
  id?: number
  title?: string
}

type PaginationTypes = {
  limit: number| undefined
  page: number| undefined
}

type GetItemTypes = {
  filters?: FiltersTypes
  pagination?: PaginationTypes
}

const getItems = async (queryParams?: GetItemTypes): Promise<IItem | IItem[] | Error> => {
  try {
    let result

    if (queryParams?.filters?.id) {
      result = await itemRepository.getById(queryParams.filters.id)
      if (!result) {
        throw new AppError('Item não encontrado', 404)
      }
      return result
    }

    // se nenhum filtro foi informado → retorna todos
    result = await itemRepository.read({
      page: queryParams?.pagination?.page,
      limit: queryParams?.pagination?.limit
    })

    return result

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { getItems }
