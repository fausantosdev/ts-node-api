import { connection } from '../knex/connection'
import { AppError } from './../../shared/utils/errors/app-error'
import { User } from '../knex/models'

const create = async ({ name, email, password_hash }: User): Promise<number | Error> => {
  try {
    const [ result ] = await connection('users')
      .insert({
        name,
        email,
        password_hash
      })
      .returning('id')

    if (!result){
      throw new AppError('Erro ao criar usuário')
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
  where?: Partial<User>
  page?: number | undefined
  limit?: number | undefined
}): Promise<User[]> => {
  try {
    const result = await connection('users')
      .select('*')
      .where(where)
      .offset((page - 1) * limit)
      .limit(limit)

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

const getById = async (id: number): Promise<User | undefined> => {
  try {
    const result = await connection('users')
      .select('*')
      .where('id', '=', id)

    return result[0]

  } catch (error: any) {
    throw new AppError(error)
  }
}

const getByName = async (
  {
    name,
    pagination = {
      page: 1,
      limit: 20
    }
  }:{
    name: string,
    pagination?: {
      page?: number | undefined
      limit?: number | undefined
    }
  }): Promise<User[] | undefined> => {
  try {
    const result = await connection('users')
      .select('*')
      .where('name', 'like', `%${name}%`)
      .offset((pagination.page! - 1) * pagination.limit!)
    return result
  } catch (error: any) {
    throw new AppError(error)
  }
}

const getByEmail = async (email: string): Promise<User | undefined> => {
  try {
    const result = await connection('users')
      .select('*')
      .where('email', '=', email)

    return result[0]

  } catch (error: any) {
   throw new AppError(error)
  }
}

const update = async ({
  data,
  where
}:{
  data: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
  where: Partial<User>
}): Promise<number> => {
  try {
    const updateData: any = { ...data }

    if (data.password_hash) updateData.password_hash = data.password_hash
console.log(where)
console.log(updateData)
    const [result] = await connection('users')
      .update(updateData)
      .where(where)
      .returning('id')

    return result.id

  } catch (error: any) {
    throw new AppError(error.message)
  }
}

const remove = async (where: Partial<User>): Promise<number> => {
  try {
    const result = await connection('users')
      .where(where)
      .del()

    return result

  } catch (error: any) {
    throw new AppError(error)
  }
}

const count = async (): Promise<number> => {
  try {
    const rows = await connection('users')
      .count<{ count: string }[]>('* as count')

    const count = rows.length > 0 && rows[0] ? Number(rows[0].count) : 0

    if (Number.isInteger(Number(count))) return Number(count)

    return 0 // Default return if count is not an integer
  } catch (error: any) {
    throw new AppError(error)
  }
}

export const userRepository = {
  create,
  read,
  getById,
  getByName,
  getByEmail,
  update,
  remove,
  count
}
