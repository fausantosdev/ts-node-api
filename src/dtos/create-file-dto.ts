interface CreateFileDTO {
  user_id: string
  name: string
  mime_type: string
  size: number
  status?: 'pending' | 'attached'
}

export type { CreateFileDTO }
