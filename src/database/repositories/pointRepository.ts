import { connection } from '../knex/connection'
import { Point } from '../knex/models'
import { AppError } from '../../shared/utils/errors/app-error'
import { ETableNames } from '../knex/e-table-names'

const create = async ({
  user_id,
  image,
  name,
  email,
  whatsapp,
  latitude,
  longitude,
  city,
  uf,
  items
}: Point): Promise<number | Error> => {
  try {
    const trx = await connection.transaction()

    const insertedPoints = await trx(ETableNames.points)
      .insert({
        user_id,
        image,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
      })
      .returning('id')

    const point = insertedPoints[0]

    const pointItems = items.map((item_id) => {
      return {
        item_id,
        point_id: point.id
      }
    })

    const item_points = await trx(ETableNames.point_items)
      .insert(pointItems)

    await trx.commit()

    if (!item_points){
      throw new AppError('Erro ao associar itens ao ponto de coleta')
    }

    if (!point.id){
      throw new AppError('Erro ao criar ponto de coleta')
    }

    return point.id
  } catch (error: any) {
    throw new AppError(error)
  }
}

const read = async ({
  where = {},
  page = 1,
  limit = 20,
  filter
}:{
  where?: Partial<Point>
  page?: number | undefined
  limit?: number | undefined
  filter?: {
    city?: string | undefined
    uf?: string | undefined
    items?: string | undefined
  }
}): Promise<Point[]> => {
  let result
  try {
    const query = connection(ETableNames.points)

    // Se tiver filtro, aplica condicionalmente
    if (filter) {
      // Filtro por items
      if (filter.items) {
        const parcedItems = filter.items
          .split(',')
          .map(item => Number(item.trim()))
          .filter(Boolean) // evita NaN caso venha vazio

          query
            .join(ETableNames.point_items, 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parcedItems)
      }

      // Filtros individuais
      if (filter.city) {
        query.where('city', filter.city)
      }

      if (filter.uf) {
        query.where('uf', filter.uf)
      }

      query
        .distinct()
        .select('points.*')
    } else {
      // Caso não tenha filtro, seleciona tudo
      query.select('*')
    }

    result = await query
      .where(where)
      .offset((page - 1) * limit)
      .limit(limit)

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

const getById = async (id: number): Promise<Point | undefined> => {
  try {
    const result = await connection(ETableNames.points)
      .select('*')
      .where('id', '=', id)

    return result[0]

  } catch (error: any) {
    throw new AppError(error)
  }
}

const update = async ({
  data,
  where
}:{
  data: Point
  where: Partial<Point>
}): Promise<number> => {
  try {
    const result = await connection(ETableNames.points)
      .update(data)
      .where(where)

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

const remove = async (where: Partial<Point>): Promise<number> => {
  try {
    const result = await connection(ETableNames.points)
      .where(where)
      .del()

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

export const pointRepository = {
  create,
  read,
  getById,
  update,
  remove,
}
