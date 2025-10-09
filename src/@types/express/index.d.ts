import 'express'

// Estende a interface Request do Express
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
        email: string
        role: string
      }
    }
  }
}
