import bcrypt from 'bcrypt'

const encrypt = {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10)
  },

  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed)
  }
}

export { encrypt }
