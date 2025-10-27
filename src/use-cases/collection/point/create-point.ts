import { pointRepository } from '../../../database/repositories'
import { AppError } from '../../../shared/utils/errors/app-error'
import { CreatePointDTO } from '../../../dtos/collection/create-point-dto'

const createPoint = async ({
  user_id,
  image,
  name,
  email,
  whatsapp,
  latitude,
  longitude,
  city,
  uf
}: CreatePointDTO) => {
  try {
    const newPoint = await pointRepository.create({
      user_id,
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    })

    return newPoint

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { createPoint }
