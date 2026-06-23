import fs from 'node:fs/promises'
import path from 'node:path'

import { AppError } from '../../utils/errors/app-error'

import uploadConfig from '../../../config/upload'

export class LocalStorageProvider {
  async saveFile(file: string, folder: string | null = null): Promise<string> {
    try {
      const destination = folder
        ? path.resolve(uploadConfig.uploadsFolder, folder, file)
        : path.resolve(uploadConfig.uploadsFolder, file)

      await fs.rename(
        path.resolve(uploadConfig.tmpFolder, file),
        destination
      )

      return file
    } catch (error) {
      throw new AppError(`Error uploading file: ${(error as Error).message}`, 500)
    }
  }

  async deleteFile(file: string, folder: string | null = null): Promise<void> {
    try {
      const filePath = folder
        ? path.resolve(uploadConfig.uploadsFolder, folder, file)
        : path.resolve(uploadConfig.uploadsFolder, file)

      if (await this.fileExists(filePath)) await fs.unlink(filePath)
    } catch (error) {
      throw new AppError(`Error deleting file: ${(error as Error).message}`, 500)
    }
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.stat(filePath)
      return true
    } catch {
      return false
    }
  }
}
