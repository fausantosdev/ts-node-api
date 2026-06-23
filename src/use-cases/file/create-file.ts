import { File } from '../../database/knex/models/file'
import { fileRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'
import { StorageProviderFactory } from '../../shared/services/storage'

type CreateFileInput = {
  user_id: number
  name: string
  mime_type: string
  size: number
  status: 'pending' | 'attached'
}

const createFile = async ({
  user_id,
  name,
  mime_type,
  size,
  status = 'pending'
 }: CreateFileInput): Promise<number | Error> => {
  const storage = StorageProviderFactory()

  const filename = await storage.saveFile(name)

  const file = new File()
  file.user_id = user_id
  file.name = filename
  file.mime_type = mime_type
  file.size = size
  file.status = status

  try {
    const newFileId = await fileRepository.create(file)

    return newFileId

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { createFile }
