export type ResponseHelper = {
  status?: boolean
  data?: any
  errors?: string | Array<string> | object | null
}

export function responseHelper({
  status = true,
  data = null,
  errors = null,
}: ResponseHelper): ResponseHelper {
  return {
    status,
    data,
    errors,
  }
}
