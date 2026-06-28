import { connection } from '../knex/connection'
import { AppError } from '../../shared/utils/errors/app-error'
import { File } from '../knex/models'

const create = async ({
  user_id,
  name,
  mime_type,
  size,
  status
}: File): Promise<number> => {
  try {
    const [result] = await connection('files')
      .insert({
        user_id,
        name,
        mime_type,
        size,
        status
      })
      .returning(['id', 'name'])

    if (!result) throw new AppError('Erro ao criar arquivo')

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

const read = async ({
  where = {},
  page = 1,
  limit = 20
}: {
  where?: Partial<File>
  page?: number | undefined
  limit?: number | undefined
}): Promise<File[]> => {
  try {
    const result = await connection('files')
      .select('*')
      .where(where)
      .offset((page - 1) * limit)
      .limit(limit)

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

const getById = async (
  id: number
): Promise<File | undefined> => {
  try {
    const result = await connection('files')
      .select('*')
      .where('id', '=', id)

    return result[0]

  } catch (error: any) {
    throw new AppError(error)
  }
}

const remove = async (
  where: Partial<File>
): Promise<number> => {
  try {
    const result = await connection('files')
      .where(where)
      .del()

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

export const fileRepository = {
  create,
  read,
  getById,
  remove
}
