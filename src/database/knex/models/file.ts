type FileStatus = 'pending' | 'attached'

class File {
  id: number
  user_id: number
  name: string
  mime_type: string
  size: number
  status: FileStatus
  created_at: Date
  updated_at: Date
}

export { File }
