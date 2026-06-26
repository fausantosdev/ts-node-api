import { Item } from '../knex/models'
import { connection } from '../knex/connection'
import { AppError } from '../../shared/utils/errors/app-error'

const create = async ({ user_id, title, image }: Item): Promise<number | Error> => {
  try {
    const [ result ] = await connection('items')
      .insert({
        user_id,
        title,
        image
      })
      .returning('id')


    if (!result){
      throw new AppError('Erro ao criar item')
    }

    return result.id

  } catch (error: any) {
    throw new AppError(error)
  }
}

const read = async ({
  where = {},
  page = 1,
  limit = 20
}:{
  where?: Partial<Item>
  page?: number | undefined
  limit?: number | undefined
}): Promise<Item[]> => {
  try {
    const result = await connection('items')
      .select('*')
      .where(where)
      .offset((page - 1) * limit)
      .limit(limit)

    /*const serializedItens = result.map((item: Item) => {
      return {
        id: item.id,
        user_id: item.user_id,
        title: item.title,
        image: `${env.APP_URL}/uploads/${item.image}`,
        created_at: item.created_at,
        updated_at: item.updated_at
      }
    })*/

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

const getById = async (id: number): Promise<Item | undefined> => {
  try {
    const result = await connection('items')
      .select('*')
      .where('id', '=', id)

    return result[0]

  } catch (error: any) {
    throw new AppError(error)
  }
}

const getByPointId = async (id: number): Promise<Item[]> => {
  try {
    const result = await connection('items')
      .select('items.title')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', '=', id)

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

const update = async ({
  data,
  where
}:{
  data: Item
  where: Partial<Item>
}): Promise<number> => {
  try {
    const result = await connection('item')
      .update(data)
      .where(where)

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

const remove = async (where: Partial<Item>): Promise<number> => {
  try {
    const result = await connection('items')
      .where(where)
      .del()

    return result

  } catch (error: any) {
    throw new AppError(error)
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
