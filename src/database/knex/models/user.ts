class User {
  id: number
  name: string
  email: string
  password: string
  role: string
  password_reset_token: string | null
  password_reset_expires: Date | null
  created_at: Date
  updated_at: Date
}

export { User }
