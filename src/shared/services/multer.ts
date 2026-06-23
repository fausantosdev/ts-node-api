import crypto from 'node:crypto'
import multer from 'multer'

import { toSlug } from '../utils/to-slug'
import { AppError } from '../utils/errors/app-error'
import uploadConfig from '../../config/upload'

const multerConfig: multer.Options = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadConfig.tmpFolder)
    },

    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) return cb(new AppError(err.message, 400), '')

        cb(null, `${hash.toString('hex')}-${toSlug(file.originalname)}`)
      })
    }
  }),

  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedMimes = [ 'image/webp', 'image/jpeg', 'image/pjpeg', 'image/png' ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new AppError('Formato de arquivo inválido', 400))
    }
  }
}

export { multerConfig }
