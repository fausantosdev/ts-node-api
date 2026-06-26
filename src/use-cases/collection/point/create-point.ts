import { Point } from '../../../database/knex/models'
import { pointRepository } from '../../../database/repositories'
import { AppError } from '../../../shared/utils/errors/app-error'

type CreatePointInput = {
  user_id: number
  image: string
  name: string
  email: string
  whatsapp: string
  latitude: number
  longitude: number
  city: string
  uf: string
  items: number[]
}

const createPoint = async ({
  user_id,
  image,
  name,
  email,
  whatsapp,
  latitude,
  longitude,
  city,
  uf,
  items
}: CreatePointInput) => {
  const point = new Point()
  point.user_id = user_id
  point.image = image
  point.name = name
  point.email = email
  point.whatsapp = whatsapp
  point.latitude = latitude
  point.longitude = longitude
  point.city = city
  point.uf = uf
  point.items = items

  try {
    const newPoint = await pointRepository.create(point)

    return newPoint

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { createPoint }
