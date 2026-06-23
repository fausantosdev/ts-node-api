import { fileRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'
import { StorageProviderFactory } from '../../shared/services/storage'

const deleteFile = async (id: number): Promise<number | Error> => {
  const storage = StorageProviderFactory()

  try {
    const fileExists = await fileRepository.getById(id)

    if(!fileExists){
      throw new AppError('Arquivo não encontrado', 404)
    }

    const fileRemoved = await fileRepository.remove({ id })

    if (fileRemoved) await storage.deleteFile(fileExists.name)

    return fileRemoved

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { deleteFile }
