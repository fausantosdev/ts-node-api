import { File } from '../../database/knex/models'
import { fileRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'
import { StorageProviderFactory } from '../../shared/services/storage'

const deleteFile = async (where: Partial<File>): Promise<number | Error> => {
  const storage = StorageProviderFactory()

  try {
    const fileExists = await fileRepository.getOneWhere(where)

    if(!fileExists){
      throw new AppError('Arquivo não encontrado', 404)
    }

    await storage.deleteFile(fileExists.name)

    const fileRemoved = await fileRepository.remove(where)

    return fileRemoved

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { deleteFile }
