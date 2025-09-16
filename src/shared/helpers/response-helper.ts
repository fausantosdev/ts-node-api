export type ResponseHelper = {
  status?: boolean
  data?: any
  errors: string | Array<string> | object
}

export function responseHelper({
  status = true,
  data = null,
  errors = '',
}: ResponseHelper): ResponseHelper {
  return {
    status,
    data,
    errors,
  }
}
