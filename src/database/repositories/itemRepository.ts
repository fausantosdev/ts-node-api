import { connection } from '../knex/connection'
import { CreateItemDTO } from '../../dtos/collection/create-item-dto'
import { IItem } from '../knex/models'
import { UpdateItemDTO } from '../../dtos/collection/update-item-dto'
import { DatabaseError } from '../../shared/utils/errors/database-error'
import { env } from '../../env'

const create = async ({ user_id, title, image }: CreateItemDTO): Promise<number | Error> => {
  try {
    const [ result ] = await connection('items')
      .insert({
        user_id,
        title,
        image
      })
      .returning('id')


    if (!result){
      throw new DatabaseError('Erro ao criar item')
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
  where?: Partial<IItem>
  page?: number | undefined
  limit?: number | undefined
}): Promise<IItem[]> => {
  try {
    const result = await connection('items')
      .select('*')
      .where(where)
      .offset((page - 1) * limit)
      .limit(limit)

    const serializedItens = result.map((item: IItem) => {
      return {
        id: item.id,
        user_id: item.user_id,
        title: item.title,
        image: `${env.APP_URL}/uploads/${item.image}`,
        created_at: item.created_at,
        updated_at: item.updated_at
      }
    })

    return serializedItens

  } catch (error: any) {
    throw new DatabaseError(error)
  }
}

const getById = async (id: number): Promise<IItem | undefined> => {
  try {
    const result = await connection('items')
      .select('*')
      .where('id', '=', id)

    return result[0]

  } catch (error: any) {
    throw new DatabaseError(error)
  }
}

const getByPointId = async (id: number): Promise<IItem[]> => {
  try {
    const result = await connection('items')
      .select('items.title')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', '=', id)

    return result

  } catch (error: any) {
    throw new DatabaseError(error)
  }
}

const update = async ({
  data,
  where
}:{
  data: UpdateItemDTO
  where: Partial<IItem>
}): Promise<number> => {
  try {
    const result = await connection('item')
      .update(data)
      .where(where)

    return result

  } catch (error: any) {
    throw new DatabaseError(error)
  }
}

const remove = async (where: Partial<IItem>): Promise<number> => {
  try {
    const result = await connection('items')
      .where(where)
      .del()

    return result

  } catch (error: any) {
    throw new DatabaseError(error)
  }
}

export const itemRepository = {
  create,
  read,
  getById,
  getByPointId,
  update,
  remove,
}
