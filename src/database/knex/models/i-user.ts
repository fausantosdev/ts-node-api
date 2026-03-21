interface IUser {
  id: number
  name: string
  email: string
  password_hash: string
  role: string
  password_reset_token: string | null
  password_reset_expires: Date | null
  created_at: Date
  updated_at: Date
}

export type { IUser }
