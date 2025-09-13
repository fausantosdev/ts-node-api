declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: number
      name: string
      email: string
      password_hash: string
      role: string
      password_reset_token: string
      password_reset_expires: string
      created_at: Date
      updated_at: Date
    }
  }
}
