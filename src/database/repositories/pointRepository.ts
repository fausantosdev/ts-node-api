import { connection } from '../knex/connection'
import { CreatePointDTO } from '../../dtos/collection/create-point-dto'
import { IPoint } from '../knex/models'
import { UpdatePointDTO } from '../../dtos/collection/update-point-dto'
import { DatabaseError } from '../../shared/utils/errors/database-error'
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
}: CreatePointDTO): Promise<number | Error> => {
  try {
    const trx = await connection.transaction()

    const insertedPoints  = await trx(ETableNames.points)
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
      throw new DatabaseError('Erro ao associar itens ao ponto de coleta')
    }

    if (!point.id){
      throw new DatabaseError('Erro ao criar ponto de coleta')
    }

    return point.id
  } catch (error: any) {
    throw new DatabaseError(error)
  }
}

const read = async ({
  where = {},
  page = 1,
  limit = 20,
  filter
}:{
  where?: Partial<IPoint>
  page?: number | undefined
  limit?: number | undefined
  filter?: {
    city?: string | undefined
    uf?: string | undefined
    items?: string | undefined
  }
}): Promise<IPoint[]> => {
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
    throw new DatabaseError(error)
  }
}

const getById = async (id: number): Promise<IPoint | undefined> => {
  try {
    const result = await connection(ETableNames.points)
      .select('*')
      .where('id', '=', id)

    return result[0]

  } catch (error: any) {
    throw new DatabaseError(error)
  }
}

const update = async ({
  data,
  where
}:{
  data: UpdatePointDTO
  where: Partial<IPoint>
}): Promise<number> => {
  try {
    const result = await connection(ETableNames.points)
      .update(data)
      .where(where)

    return result

  } catch (error: any) {
    throw new DatabaseError(error)
  }
}

const remove = async (where: Partial<IPoint>): Promise<number> => {
  try {
    const result = await connection(ETableNames.points)
      .where(where)
      .del()

    return result

  } catch (error: any) {
    throw new DatabaseError(error)
  }
}

export const pointRepository = {
  create,
  read,
  getById,
  update,
  remove,
}
