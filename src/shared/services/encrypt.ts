import { randomBytes } from 'node:crypto'
import bcrypt from 'bcrypt'
import { env } from '../../env'

const encrypt = {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(env.APP_KEY + value, env.SALT_ROUNDS)
  },

  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(env.APP_KEY + value, hashed)
  },

  random(): string {
    return randomBytes(20).toString('hex')
  }
}

export { encrypt }
