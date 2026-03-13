interface IPoint {
  id: number
  user_id: number
  image: string
  name: string
  email: string
  whatsapp: string
  latitude: number
  longitude: number
  city: string
  uf: string
  created_at: Date
  updated_at: Date
}

export type { IPoint }
