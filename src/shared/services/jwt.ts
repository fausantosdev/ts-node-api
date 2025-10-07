import jsonWebToken from 'jsonwebtoken'

import { env } from '../../env'

const jwt = {
  generate: (payload: object): string => {
    const jwtOptions = {
      expiresIn: env.JWT_EXPIRATION,
      algorithm: env.JWT_ALGORITHM
    } as jsonWebToken.SignOptions

    const token = jsonWebToken.sign(payload, env.APP_KEY, jwtOptions)

    return token
  },
  decoded: (token: string, secret: string): string | jsonWebToken.JwtPayload => {
    const decoded = jsonWebToken.verify(token, secret)

    return decoded
  }
}

export { jwt }
