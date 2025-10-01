import { IUser } from '../../database/knex/models'
import { userProvider } from '../../database/providers'
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

type GetUserTypes = {
  filters?: FiltersTypes
  pagination?: PaginationTypes
}

const getUsers = async (queryParams?: GetUserTypes): Promise<IUser | IUser[] | Error> => {
  try {
    let result

    if (queryParams?.filters?.id) {
      result = await userProvider.getById(queryParams.filters.id)
      if (!result) {
        throw new AppError('Usuário não encontrado', 404)
      }
      return result
    }

    if (queryParams?.filters?.name) {
      result = await userProvider.getByName({
        name: queryParams.filters.name,
        pagination: {
          limit: queryParams.pagination?.limit,
          page: queryParams.pagination?.page,
        },
      })
      if (!result || result.length === 0) {
        throw new AppError('Usuário não encontrado', 404)
      }
      return result
    }

    if (queryParams?.filters?.email) {
      result = await userProvider.getByEmail(queryParams.filters.email)
      if (!result) {
        throw new AppError('Usuário não encontrado', 404)
      }
      return result
    }

    // se nenhum filtro foi informado → retorna todos
    result = await userProvider.read({
      page: queryParams?.pagination?.page,
      limit: queryParams?.pagination?.limit
    })

    return result

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { getUsers }
