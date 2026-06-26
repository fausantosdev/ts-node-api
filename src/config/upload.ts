import { resolve } from 'node:path'

import { env } from './env'

export default {
  driver: env.STORAGE_DRIVER,

  tmpFolder: resolve(__dirname, '..', '..', 'tmp'),

  uploadsFolder: resolve(__dirname, '..', '..', 'storage', 'uploads'),

  aws: {
    bucket: env.AWS_BUCKET_NAME,
    region: env.AWS_REGION,
  }
}
