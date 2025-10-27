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
  uf
}: CreatePointDTO): Promise<number | Error> => {
  try {
    const [ result ] = await connection(ETableNames.points)
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


    if (!result){
      throw new DatabaseError('Erro ao criar ponto de coleta')
    }

    return result.id

  } catch (error: any) {
    throw new DatabaseError(error)
  }
}

const read = async ({
  where = {},
  page = 1,
  limit = 20
}:{
  where?: Partial<IPoint>
  page?: number | undefined
  limit?: number | undefined
}): Promise<IPoint[]> => {
  try {
    const result = await connection(ETableNames.points)
      .select('*')
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
