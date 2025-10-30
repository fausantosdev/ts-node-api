import { IPoint, IItem } from '../../../database/knex/models'
import { pointRepository, itemRepository } from '../../../database/repositories'
import { AppError } from '../../../shared/utils/errors/app-error'

type FilterYypes ={
    city?: string | undefined
    uf?: string | undefined
    items?: string | undefined
  }

type PaginationTypes = {
  limit: number | undefined
  page: number | undefined
}

type GetPointTypes = {
  id?: number
  pagination?: PaginationTypes
  filter?: FilterYypes
}

type GetPointWithItemsTypes = {
  point: IPoint
  items: IItem[]
}

const getPoints = async (queryParams?: GetPointTypes): Promise<GetPointWithItemsTypes | IPoint[] | Error> => {
  try {
    let result

    if (queryParams && queryParams.id) {
      result = await pointRepository.getById(queryParams.id)

      if (!result) {
        throw new AppError('Ponto não encontrado', 404)
      }

      const items = await itemRepository.getByPointId(result.id)

      return {
        point: result,
        items
      }
    }

    result = await pointRepository.read({
      page: queryParams?.pagination?.page,
      limit: queryParams?.pagination?.limit,
      filter: {
        city: queryParams?.filter?.city,
        uf: queryParams?.filter?.uf,
        items: queryParams?.filter?.items
      }
    })

    return result

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { getPoints }
