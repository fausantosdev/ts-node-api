import uploadConfig from '../../../config/upload'

import { LocalStorageProvider } from './local-storage-provider'
import { S3StorageProvider } from './s3-storage-provider'

function StorageProviderFactory() {
  if (uploadConfig.driver === 's3') {
    return new S3StorageProvider()
  }

  return new LocalStorageProvider()
}

export { StorageProviderFactory }
