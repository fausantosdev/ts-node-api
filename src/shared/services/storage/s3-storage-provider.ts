import fs from 'node:fs'
import path from 'node:path'

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand } from '@aws-sdk/client-s3'

import { AppError } from '../../utils/errors/app-error'
import uploadConfig from '../../../config/upload'

export class S3StorageProvider {
  #client = new S3Client({
    region: uploadConfig.aws.region!
  })

  async saveFile(file: string, folder: string | null = null): Promise<string> {
    try {
      const filePath = path.resolve(uploadConfig.tmpFolder, file)

      const stream = fs.createReadStream(filePath)

      const key = folder ? `${folder}/${file}` : file

      await this.#client.send(
        new PutObjectCommand({
          Bucket: uploadConfig.aws.bucket,
          Key: key,
          Body: stream
        })
      )

      await fs.promises.unlink(filePath)

      return file
    } catch (error) {
      throw new AppError(`Error uploading file: ${(error as Error).message}`, 500)
    }
  }

  async deleteFile(file: string, folder: string | null = null): Promise<void> {
    try {
      const key = folder ? `${folder}/${file}` : file

      await this.#client.send(
        new DeleteObjectCommand({
          Bucket: uploadConfig.aws.bucket,
          Key: key
        })
      )
    } catch (error) {
      throw new AppError(`Error deleting file: ${(error as Error).message}`, 500)
    }
  }
}
