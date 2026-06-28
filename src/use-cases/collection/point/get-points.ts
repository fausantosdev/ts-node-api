import { Point, Item } from '../../../database/knex/models'
import { pointRepository, itemRepository } from '../../../database/repositories'
import { AppError } from '../../../shared/utils/errors/app-error'
import { env } from '../../../config/env'

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
  point: Point
  items: Item[]
}

const getPoints = async (queryParams?: GetPointTypes): Promise<GetPointWithItemsTypes | Point[] | Error> => {
  try {
    let result

    if (queryParams && queryParams.id) {
      result = await pointRepository.getById(queryParams.id)

      if (!result) {
        throw new AppError('Ponto não encontrado', 404)
      }

      const point = { ...result, image: `${env.APP_URL}/files/${result.image}` }

      const items = await itemRepository.getByPointId(result.id)

      return {
        point,
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

    const points = result.map(point => ({ ...point, image: `${env.APP_URL}/files/${point.image}` }))

    return points

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { getPoints }
