import { env } from '../../config/env'
import { User } from '../../database/knex/models'
import { userRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'

type FiltersTypes = {
  id?: number
  email?: string
  name?: string
}

type PaginationTypes = {
  limit: number| undefined
  page: number| undefined
}

type GetUserInput = {
  filters?: FiltersTypes
  pagination?: PaginationTypes
}

const getUsers = async (queryParams?: GetUserInput): Promise<User | User[] | Error> => {
  try {
    let result

    if (queryParams?.filters?.id) {
      result = await userRepository.getById(queryParams.filters.id)

      if (!result) {
        throw new AppError('Usuário não encontrado', 404)
      }

      return {
        ...result,
        avatar: result.avatar && `${env.STORAGE_URL}/${result.avatar}`
      }
    }

    if (queryParams?.filters?.name) {
      result = await userRepository.getByName({
        name: queryParams.filters.name,
        pagination: {
          limit: queryParams.pagination?.limit,
          page: queryParams.pagination?.page,
        },
      })

      if (!result || result.length === 0) {
        throw new AppError('Usuário não encontrado', 404)
      }

      return result.map(user => ({ ...user, avatar: user.avatar && `${env.STORAGE_URL}/${user.avatar}` }))
    }

    if (queryParams?.filters?.email) {
      result = await userRepository.getByEmail(queryParams.filters.email)
      if (!result) {
        throw new AppError('Usuário não encontrado', 404)
      }

      return {
        ...result,
        avatar: result.avatar && `${env.STORAGE_URL}/${result.avatar}`
      }
    }

    // se nenhum filtro foi informado → retorna todos
    result = await userRepository.read({
      page: queryParams?.pagination?.page,
      limit: queryParams?.pagination?.limit
    })

    return result.map(user => ({ ...user, avatar: user.avatar && `${env.STORAGE_URL}/${user.avatar}` }))

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { getUsers }
