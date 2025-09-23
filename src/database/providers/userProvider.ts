import { connection } from '../knex/connection'
import { CreateUserDTO } from '../../dtos/create-user-dto'
import { IUser } from '../knex/models'
import { UpdateUserDTO } from '../../dtos/update-user-dto'

const create = async ({ name, email, password }: CreateUserDTO): Promise<number | Error> => {
  try {
    const [ result ] = await connection('users')
      .insert({
        name,
        email,
        password_hash: password
      })
      .returning('id')


    if (!result){
      return new Error('Erro ao criar usuário')
    }

    return result.id

  } catch (error: any) {
    return new Error(error)
  }
}

const read = async ({
  page = 1,
  limit = 20
}:{
  page?: number
  limit?: number
}): Promise<IUser[] | Error> => {
  try {
    const result = await connection('users')
      .select('*')
      .offset((page - 1) * limit)
      .limit(limit)

    if (result) return result

    return new Error('Erro na busca de usuários')

  } catch (error: any) {
    return new Error(error)
  }
}

const getById = async (id: number): Promise<IUser | Error> => {
  try {
    const result = await connection('users')
      .select('*')
      .where('id', '=', id)

    if (result[0]) return result[0]

    return new Error('Usuário não encontrado')

  } catch (error: any) {
    return new Error(error)
  }
}

const update = async ({
  data,
  where
}:{
  data: UpdateUserDTO
  where: Partial<IUser>
}): Promise<number | Error> => {
  try {
    const updateData: any = { ...data }

    if (data.password) {
      updateData.password_hash = data.password
      delete updateData.password
    }

    const result = await connection('users')
      .update(updateData)
      .where(where)

    if (result) return result

    return new Error('Erro ao atualizar usuário')

  } catch (error: any) {
    return new Error(error)
  }
}

const remove = async (where: Partial<IUser>): Promise<number | Error> => {
  try {
    const result = await connection('users')
      .where(where)
      .del()

    if (result > 0) return result

    return new Error('Erro ao remover o usuário')

  } catch (error: any) {
    return new Error(error)
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
    throw new Error(error)
  }
}

export const userProvider = {
  create,
  read,
  getById,
  update,
  remove,
  count
}
