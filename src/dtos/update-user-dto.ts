// Os DTOs não devem nascer da Entity.
// Eles representam o contrato HTTP, não a entidade do domínio.
interface UpdateUserDTO {
  name?: string | undefined
  email?: string | undefined
  password?: string | undefined
}

export type { UpdateUserDTO }
