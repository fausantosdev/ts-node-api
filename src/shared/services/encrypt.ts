import bcrypt from 'bcrypt'
import { env } from '../../env'

const encrypt = {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(env.APP_KEY + value, 13)
  },

  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(env.APP_KEY + value, hashed)
  }
}

export { encrypt }
